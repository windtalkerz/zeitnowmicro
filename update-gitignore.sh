#! /bin/bash

# reset & update .gitignore & update git origin MASTER
git rm -r --cached .
git add .
git commit -m ".gitignore is now working"
git push origin master