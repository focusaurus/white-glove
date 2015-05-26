#!/bin/bash

# run this script as root on the server
# pass the path to the distribution archive as the command line argument
set -o errexit    # always exit on error
set -o errtrace   # trap errors in functions as well
set -o pipefail   # don"t ignore exit codes when piping output
set -o posix      # more strict failures in subshells
# set -x          # enable debugging
IFS="$(printf "\n\t")"
if ! id carson 2> /dev/null; then
  adduser carson --quiet --no-create-home --disabled-login --gecos "Project Carson"
fi
prefix=/opt/white-glove
if [[ -d "${prefix}" ]]; then
  backup_dir=$(mktemp -d /tmp/white-glove.XXX)
  echo "backing up existing install to ${backup_dir}"
  mv "${prefix}" "${backup_dir}"
fi
install --directory --owner carson --group carson --mode 755 "${prefix}"
tar --directory "${prefix}" --strip-components 1 --extract --bzip2 --file "$1"
cd "${prefix}"
npm rebuild --update-binary
chown -R carson:carson "${prefix}"
