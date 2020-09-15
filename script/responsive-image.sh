#!/bin/bash

cd assets/img

images=(
  background-home.jpeg
  background-about.jpeg
  background-login.jpeg
  profil/profil.jpeg
)

convert () {
  # $1 == resize
  # $2 == suffix
  echo -e "\n$2 resize [$1%]"
  for img in ${images[@]}; do
    magick $img -resize $1% "$(echo $img | cut -f1 -d".")$2.webp"
    magick $img -resize $1% "$(echo $img | cut -f1 -d".")$2.avif"
    magick $img -resize $1% "$(echo $img | cut -f1 -d".")$2.jpeg"
    echo "[OK] $img..."
  done ;
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
