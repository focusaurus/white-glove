#!/bin/bash

# run this script as root on the server
# pass the path to the distribution archive as the command line argument

# Start unofficial bash strict mode boilerplate
# http://redsymbol.net/articles/unofficial-bash-strict-mode/
set -o errexit    # always exit on error
set -o errtrace   # trap errors in functions as well
set -o pipefail   # don't ignore exit codes when piping output
set -o posix      # more strict failures in subshells
# set -x          # enable debugging

IFS="$(printf "\n\t")"
# End unofficial bash strict mode boilerplate

if ! id carson 2> /dev/null; then
  adduser carson --quiet --no-create-home --disabled-login --gecos "Project Carson"
fi
archive="$1"
backup_dir=$(mktemp -d /tmp/white-glove.XXX)
prefix=/opt/white-glove
top_dir=$(basename "${archive}" .tar.bz2)
cd "${backup_dir}"
tar --extract --bzip2 --file "${archive}"
cd "${top_dir}"
npm rebuild --update-binary
chown -R carson:carson .
cd "${backup_dir}"
if [[ -d "${prefix}" ]]; then
  echo "backing up existing install to ${backup_dir}"
  mv "${prefix}" "${backup_dir}/white-glove.backup"
fi
# install --directory --owner carson --group carson --mode 755 "${prefix}"
mv "${backup_dir}/${top_dir}" "${prefix}"
