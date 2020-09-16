#!/bin/bash

cd assets/img

images=(
  background-home.jpeg
  background-about.jpeg
  background-login.jpeg
  profil/profil.jpeg
)

extentions=(
  jpeg
  avif
  webp
)

convert () {
  # $1 == resize
  # $2 == suffix
  echo -e "\n$2 resize [$1%]"
  for img in ${images[@]}; do
    for ex in ${extentions[@]}; do
      FILE="$(echo $img | cut -f1 -d".")$2.$ex"
      if [ -f "$FILE" ]; then
        echo "file $FILE exists"
      else
        magick $img -resize "$1%" $FILE
        echo "[OK] $FILE..."
      fi
    done
  done
}

mobile () {
  convert "35" "-mobile"
}

tablet () {
  convert "70" "-tablet"
}

desktop () {
  convert "100" ""
}

all () {
  desktop
  tablet
  mobile
}

usage () {
  echo "Wrong command.."
  echo "Argments can be  all, mobile, tablet"
  exit -1
}

main() {
    for av in $@; do
        if [ $av == "all" ]; then
            all
        elif [ $av == "tablet" ]; then
          tablet
        elif [ $av == "mobile" ]; then
          mobile
        else
            usage
        fi
    done;
}

if [[ $# == 0 ]]; then
  usage
fi
main $@
