#!/bin/bash

# Start unofficial bash strict mode boilerplate
# http://redsymbol.net/articles/unofficial-bash-strict-mode/
set -o errexit    # always exit on error
set -o errtrace   # trap errors in functions as well
set -o pipefail   # don't ignore exit codes when piping output
set -o posix      # more strict failures in subshells
# set -x          # enable debugging

IFS="$(printf "\n\t")"
# End unofficial bash strict mode boilerplate

main() {
  cd "$(dirname "$0")/.."
  local git_ref="${1-HEAD}"
  local build_dir=".build"
  local prefix="white-glove-${git_ref}-$(date +%Y%m%d%H%M)"
  mkdir -p "${build_dir}/${prefix}"
  # OSX build support. BSD tar vs GNU tar issue
  if [[ "$(uname)" == "Darwin" ]]; then
    alias tar=gtar
  fi

  echo -n "git archive…"
  if [[ "${git_ref}" == "WORK" ]]; then
    # create a temporary tar archive of the working directory and
    # extract it inside the build directory via pipeline
    git ls-files \
      | tar -T - --create --file - \
      | tar --directory "${build_dir}/${prefix}" --extract --file -
  else
    # create a temporary tar archive of the provided git ref
    # extract it inside the build directory via pipeline
    git archive --format=tar --prefix="${prefix}/" "${git_ref}" \
      | tar --directory "${build_dir}" --extract
  fi
  git log -n 1 "${git_ref}" > "${build_dir}/${prefix}/.commit"
  echo ✓; echo -n "npm packages…"
  tar --create --file - node_modules \
    | tar --directory "${build_dir}/${prefix}" --extract --file -
  cd "${build_dir}/${prefix}"
  npm --silent --production install
  npm --silent dedupe
  npm prune --production
  #remove development-only files
  find ./src -name '*.tape.js' -delete
  rm -rf bin vagrant .eslintrc.json .gitignore .nvmrc Vagrantfile
  cd -
  echo ✓; echo -n "archive…"
  local dist_path="${build_dir}/${prefix}.tar.bz2"
  tar --directory "${build_dir}" --create --bzip2 --file "${dist_path}" "${prefix}"
  echo ✓
  ls -lh "${dist_path}"
}

main "$@"
