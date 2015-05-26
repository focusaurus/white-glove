#!/bin/bash
set -o errexit    # always exit on error
set -o errtrace   # trap errors in functions as well
set -o pipefail   # don"t ignore exit codes when piping output
set -o posix      # more strict failures in subshells
# set -x          # enable debugging
IFS="$(printf "\n\t")"
curl -sL https://deb.nodesource.com/setup_iojs_2.x | bash -
apt-get --assume-yes install build-essential iojs

prefix=/opt/white-glove
#prefix=/vagrant
if ! id setup 2> /dev/null; then
  adduser setup --quiet --gecos "Project Carson" --shell "${prefix}/scan/setup.js"
fi
install /dev/null --owner setup --group setup --mode 644 /home/setup/.hushlogin

if ! id scan 2> /dev/null; then
  adduser scan --quiet --gecos "Project Carson" --shell "${prefix}/scan/ssh.js"
fi
install /dev/null --owner scan --group scan --mode 644 /home/scan/.hushlogin

cat <<EOF >> /etc/ssh/sshd_config
# plyons customizations 2015-05-23
UseDNS no
Match User setup,scan
  PermitEmptyPasswords yes
  AllowTcpForwarding yes
EOF

reload ssh
