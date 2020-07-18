import re
import json
import os
import sys
from os import listdir
from os.path import isfile, join, isdir, exists
import argparse

# path des dossiers a parser
PATH = [
    './pages',
    './components',
]

# clef ignorer pour le split des clef, pour pouvoir avoir des global.login de partout
IGNORE_KEY = [
  'global'
]

# le paths ou ecrire ces fichier json
LOCALES_PATH = './locales'

# regex pour trouver les traductions
REGEX = r'\$t\((.*?)\)'
reg = re.compile(REGEX)

# flags que prend le programme
flag = {}

# function de debug
def debug(string):
    global flag
    if flag.debug:
      print(string)

# verifie le nom du fichier clef
# TYPE == componenet ou page
# TYPE-name_file.XXXX
# ex: file = './pages/user.vue' devras etre "pages-user.XXXX"
error_name = False
def  check(ret, name, read):
  global error_name, flag
  error_type = 'Warning' if flag.ignore_error else 'Error'

  # on suprime les 2 premier char "./" et on enleve le .vue
  original_name = name[2:].replace('/', '.').replace('.vue', '')

  for message in ret:
    local_name_split = message.split('.')
    if local_name_split[0] in IGNORE_KEY:
      continue
    local_name = (".".join(local_name_split[:-1]))
    if local_name != original_name:
      key_trans = local_name_split[-1]

      # on recuper le position de l'error, pour pouvoir clicque sur le lien dans le terminal
      pos = read[:read.find(message)].split('\n')
      error_name = True
      print(f'{error_type}: Wrong prefix name in file {name}:{len(pos)}:{len(pos[-1])}')
      print(f'change "{local_name}.{key_trans}"\nto     "{original_name}.{key_trans}"\n')

# function qui lie le dossier, si c'est un fichier
# on apelle le parse_file
def read_dir(path):
    global reg, debug
    fnc = []

    for f in os.listdir(path):
        name = join(path, f)
        if isfile(name) and '.vue' in f:
          # lis le fichier, supprimer les quotes
          # et recupaire par une regex le $t(KEY)
          with open(name, 'r') as file:
            _read = file.read()

            # on supprimer les char non necessaire
            values = re.sub(r"['\"\n\s]", "", _read)
            # on supprime les comentaires
            values = re.sub(r"//.*?\n", "", values) # comentaire simple ligne // XXXX
            values = re.sub(r"/\*.*?\*/", "", values) # comentaire multiligne /*  XXXX */
            values = re.sub(r"<!--.*?-->", "", values) # comentaire html <!-- XXXX -->

            ret = reg.findall(values)
            check(ret, name, _read)
            debug(ret)
            fnc = fnc + ret

        elif isdir(name):
            # si c'est un dossier on rapelle la fonction
            fnc = fnc + read_dir(name)
    fnc.sort()
    return fnc


# function qui contruct le dictionaire
def construct(dct, element):
    global flag
    if element:
        key = element[0]
        del element[0]
        if key not in dct:
            dct[key] = {}
        _len = len(element)
        if _len:
            construct(dct[key], element)
        elif _len == 1:
            dct[key][element[0]] = key if flag.default else ""
        else:
            dct[key] = key if flag.default else ""


# function pour merge le json deja existant, avec le nouveau cree
newkeys = []
def merge(new, origi, path=""):
    global newkeys, flag
    dct = {}
    for key, value in new.items():
        if isinstance(new[key], dict) and key in origi:
            # si la valeur de la clef est un dict , on rapelle merge
            dct[key] = merge(new[key], origi[key], join(path, key))
        elif key in origi:
            # si la clef existe dans l'ancien json, on prend ca valeur
            dct[key] = value if flag.default and not origi[key] else origi[key]
        else:
            newkeys.append(join(path, key))
            # prend la valeur de la clef si le flag default existe, sinon string vide
            dct[key] = value if flag.default else ""
    return dct

def get_keys(origi):
  nn = []
  for key, value in origi.items():
    name = key
    if isinstance(origi[key], dict):
      for key in get_keys(origi[key]):
        if key:
          nn.append(f'{name}.{key}')
        else:
          nn.append(f'{name}')
    else:
      nn.append("")
  return nn

def change_update(dtc, fnc):
  nfnc = {}
  exist = []
  for f in fnc:
    spt = f.split('.')[:-1]
    name = f"{spt[0]}.{spt[-1]}"
    if name not in exist:
      exist.append(name)
      nfnc[name] = ".".join(spt)

  new = []
  nnew = {}
  for key in get_keys(dtc):
    spt = key.split('.')
    name = f"{spt[0]}.{spt[-1]}"
    if name not in new:
      new.append(name)
      nnew[name] = key

  change = {}
  for key, value in nnew.items():
    if value not in exist:
      change[key] = value

  rename = {}
  for key, value in change.items():
    if key in nfnc and nfnc[key] != value:
      c = input(f'do you rename file "{value}" in "{nfnc[key]}" ? y for yes , n for no')
      if c in ['y', 'Y']:
        rename[key] = value
  # TODO
  return dtc

# function qui enleve la dernier vigules des objects ( pause probleme a json python )
def clean_json(string):
    return re.sub(",[ \t\r\n]+\]", "]", re.sub(",[ \t\r\n]+}", "}", string))


def main():
    global flag, newkeys, error_name

    # on lis parse les dossiers
    fnc = []
    for path in PATH:
      fnc = fnc + read_dir(path)

    # check les errors , ignore si le flag error est set
    if not flag.ignore_error and error_name:
      print('exit')
      exit(0)
    debug(fnc)

    # on construct le dict
    dtc = {}
    for el in fnc:
        construct(dtc, el.split('.'))
    debug(dtc)

    #read local nuxt.config
    locales = []
    with open('nuxt.config.js') as f:
      # suprime les commentaires,
      res = re.sub(r"/\*(\n|.)*?\*/", "", re.sub(r"//.*?\n", "", f.read()))
      # suprime les espaces
      res = re.sub(r'\s+', '', res)
      # suprime les retour a la ligne
      res = res.replace('\n', '')
      # recupere les local
      res = re.findall(r'locales\s*:\s*\[(.+?)\]', res)
      # recupere le code
      locales = re.findall(r'code:"(.+?)"', "".join(res))

    # on ecrit le fichier
    for local in locales:
        name_file = join(LOCALES_PATH, local) + '.json'
        if not flag.reset and exists(name_file):
            with open(name_file, 'r') as f:
              # on merge les 2 json
              _ljson = json.loads(clean_json(f.read()), strict=False)
              _ljson = change_update(_ljson, fnc)
              result = json.dumps(merge(dtc, _ljson), sort_keys=True, indent=4)
        else:
            result = json.dumps(dtc, sort_keys=True, indent=4)

        # on ecrit le nouveau json
        with open(name_file, 'w') as f:
            f.write(result)

    print("Make messages OK")
    locales = ", ".join(locales)
    print(f"Messages generate for: {locales}")
    if newkeys:
        print("key add: ", newkeys)


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description="create locales languages files")
    parser.add_argument('-c', '--compile', action="store_true", help="this is required for compile message!", required=True)
    parser.add_argument('-r', '--reset', action="store_true", help="for replace old traductions", default=False)
    parser.add_argument('-v', '--debug', action="store_true", help="debug output", default=False)
    parser.add_argument('-i', '--ignore-error', action="store_true", help="debug output", default=False)
    parser.add_argument('-d', '--default', action="store_true", help="ignore error file name", default=False)
    flag = parser.parse_args()
    main()
