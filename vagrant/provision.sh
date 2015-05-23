#!/bin/bash
set -o errexit    # always exit on error
set -o errtrace   # trap errors in functions as well
set -o pipefail   # don"t ignore exit codes when piping output
set -o posix      # more strict failures in subshells
# set -x          # enable debugging
IFS="$(printf "\n\t")"
curl -sL https://deb.nodesource.com/setup_iojs_2.x | bash -
apt-get --assume-yes install iojs
