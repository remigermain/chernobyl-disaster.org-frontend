import json


with open("./locales/fr-FR.json") as f:
    a = f.read()
    a = json.loads(a)
    print(a)
