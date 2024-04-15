# MyNpmPackage

A simple NPM package according to my needs and likings. Contains starter projects  or scripts for 
- new npm package project 
- neutrino project
- vite config with tailwindcss
- umd
- build+watch scripts for all npm project types.
- new php composer package (no laravel)
- new php laravel package (composer compatible)
- scripts to rename php composer packages and vendor.
- scripts migrate an exiting laravel site to a laravel package
- automatic help display upon installation. The contents of the About section in this file is displayed when `running npm/composer --help` 

## To do upcoming
- proper scaffolding structure and consistent code-api across all project types. Its now heycon-bacon-script-party design pattern  
- cf-workers boilerplate and page-boilerplate
- gh create repo and gh-pages and .env sync to secrets.
- Python package project scripts
- php wrappers for python and virtual environments to run python from laravel backend
- cleanup script, depending on what project is scaffolded the rest should be removed upon running correct scrit

## Installation

There are unfortanly not a consisten way to create all package types yet.

### Step 1. 
Below are a few alternatives for installing be for i settle for name and npm públsh
```bash
git clone --template https://github.com/silentpatrik/npm-package-template.git new-package && cd new-package
npm run new.js
```

```bash
echo 'enter your package name' | (read NEW_NAME && git clone --template [ <this repo url >](https://github.com/silentpatrik/npm-package-template.git $NEW_NAME && (cd $NEW_NAME && npm run rename $NEW_NAME  ) 
NEW_NAME= && git clone --template [ <this repo url >](https://github.com/silentpatrik/npm-package-template.git) $NEW_NAME && cd <new-package-name> && npm run rename
```
or 
```bash
npm install git+ssh://git@github.com:silentpatrik/npm-package-template.git
``
or maybe even
```bash
npm install https://github.com/silentpatrik/npm-package-template.git
``


### Step 2
If not the package is already renamed, then run `npm run rename <new-name-in-alnum-dash>`.
The above rename command will rename class to `NewNameInAlnumDash`.

### Step 3 (optional)
the script pushinto can push the code and change remote if the remote branch does not exist or if the branch is empty, like a new repo.

# About
To initialize a new project:
