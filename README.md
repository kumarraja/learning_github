# leanring_github

## First-Time Git Setup
    * git config
    $ git config --global user.name "John Doe"
    $ git config --global user.email johndoe@example.com

    * Checking Your Settings
    $ git config --list
    $ git config user.name

    * Getting Help
    $ git help <verb>
    $ man git-<verb>
    - Ex: $ git help config 
          $ git add -h

## Getting a Git Repository
You typically obtain a Git repository in one of two ways:
You can take a local directory that is currently not under version control, and turn it into a Git repository, or
You can clone an existing Git repository from elsewhere.

$ cd /c/user/my_project
$ git init

* adding files to repository
$ git add *.c
$ git add LICENSE
$ git commit -m 'initial project version'