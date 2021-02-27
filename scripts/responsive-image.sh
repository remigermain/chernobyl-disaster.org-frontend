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
  webp
)

convert_pictures () {
  # $1 == resize
  # $2 == suffix
  echo -e "\n$2 resize [$1%]"
  for img in ${images[@]}; do
    for ex in ${extentions[@]}; do
      FILE="$(echo $img | cut -f1 -d".")$2.$ex"
      if [ -f "$FILE" ]; then
        echo "[EXIST] $FILE..."
      else
        convert $img -resize "$1%" -sampling-factor 4:2:0 -strip -quality 85 -interlace JPEG -colorspace RGB $FILE
        echo "[OK] $FILE..."
      fi
    done
  done
}

mobile () {
  convert_pictures "35" "-mobile"
}

tablet () {
  convert_pictures "70" "-tablet"
}

desktop () {
  convert_pictures "100" ""
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
        elif [ $av == "desktop" ]; then
          desktop
        else
            usage
        fi
    done;
}

if [[ $# == 0 ]]; then
  usage
fi
main $@
