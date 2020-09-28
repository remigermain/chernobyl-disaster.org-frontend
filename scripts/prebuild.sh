#!/bin/bash


$($(apt install magick) || $(yum install magick) || true)

echo "[build image]"
./scripts/responsive-image.sh all

echo $GREEN"done"$RESET
