# learning_github

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

    * Cloning an Existing Repository
    You clone a repository with git clone <url>. For example, if you want to clone the Git linkable library called learning_github.git, you can do so like this:

    $ git clone https://github.com/kumarraja/learning_github.git

    If you want to clone the repository into a directory named something other than learning_github.git, you can specify the new directory name as an additional argument:

    $ git clone https://github.com/libgit2/libgit2 mylibgit

## Git Basics - Recording Changes to the Repository
    * Checking the Status of Your Files
    The main tool you use to determine which files are in which state is the git status command. If you run this command directly after a clone, you should see something like this:
    
    $ git status

    Let’s say you add a new file to your project, a simple README file. If the file didn’t exist before, and you run git status, you see your untracked file like so:

    $ echo 'My Project' > README
    $ git status

    * Tracking New Files
    In order to begin tracking a new file, you use the command git add. To begin tracking the README file, you can run this:

    $ git add README
    $ git status

    * Staging Modified Files
    Let’s change a file that was already tracked and then run your git status command again

    $ git add README.md
    $ git status

    * Ignoring Files
    Often, you’ll have a class of files that you don’t want Git to automatically add or even show you as being untracked. These are generally automatically generated files such as log files or files produced by your build system. In such cases, you can create a file listing patterns to match them named .gitignore. Here is an example .gitignore file:

    $ cat .gitignore
    *.[oa]
    *~
    The first line tells Git to ignore any files ending in “.o” or “.a” — object and archive files that may be the product of building your code. The second line tells Git to ignore all files whose names end with a tilde (~), which is used by many text editors such as Emacs to mark temporary files. You may also include a log, tmp, or pid directory; automatically generated documentation; and so on. Setting up a .gitignore file for your new repository before you get going is generally a good idea so you don’t accidentally commit files that you really don’t want in your Git repository.
    The rules for the patterns you can put in the .gitignore file are as follows:
    Blank lines or lines starting with # are ignored.
    Standard glob patterns work, and will be applied recursively throughout the entire working tree.
    You can start patterns with a forward slash (/) to avoid recursivity.
    You can end patterns with a forward slash (/) to specify a directory.
    You can negate a pattern by starting it with an exclamation point (!).
    Glob patterns are like simplified regular expressions that shells use. An asterisk (*) matches zero or more characters; [abc] matches any character inside the brackets (in this case a, b, or c); a question mark (?) matches a single character; and brackets enclosing characters separated by a hyphen ([0-9]) matches any character between them (in this case 0 through 9). You can also use two asterisks to match nested directories; a/**/z would match a/z, a/b/z, a/b/c/z, and so on.
    Here is another example .gitignore file:
    # ignore all .a files
    *.a

    # but do track lib.a, even though you're ignoring .a files above
    !lib.a

    # only ignore the TODO file in the current directory, not subdir/TODO
    /TODO

    # ignore all files in the build/ directory
    build/

    # ignore doc/notes.txt, but not doc/server/arch.txt
    doc/*.txt

    # ignore all .pdf files in the doc/ directory and any of its subdirectories
    doc/**/*.pdf

    * Committing Your Changes
    The simplest way to commit is to type git commit:

    $ git commit

    Alternatively, you can type your commit message inline with the commit command by specifying it after a -m flag, like this:

    $ git commit -m "Story 182: Fix benchmarks for speed"

    * Removing Files
    # it will remove the file from your hard drive as well as git tracking, after that commit and push these changes it will remove from you github repository
    
    $ rm PROJECTS.md
    # If you may want to keep the file on your hard drive but not have Git track it anymore. This is particularly useful if you forgot to add something to your .gitignore file and accidentally staged it, like a large log file or a bunch of .a compiled files. To do this, use the --cached option:
    
    $ git rm --cached README

    use "git checkout -- <file>..." to discard changes in working directory
    $ git checkout -- README.md

    You can pass files, directories, and file-glob patterns to the git rm command. That means you can do things such as:

    $ git rm log/\*.log
    $ git rm \*~


## Merging via command line
    If you do not want to use the merge button or an automatic merge cannot be performed, you can perform a manual merge on the command line.

    HTTPS ||  Git ||  Patch ->   https://github.com/kumarraja/learning_github.git

    Step 1: From your project repository, bring in the changes and test.

    $git fetch origin
    $git checkout -b test3 origin/test3
    $git merge master

    Step 2: Merge the changes and update on GitHub.

    $git checkout master
    $git merge --no-ff test3
    $git push origin master

## How do I delete a Git branch both locally and remotely?
    Executive Summary
    $ git push -d <remote_name> <branch_name>
    $ git branch -d <branch_name>
    Note that in most cases the remote name is origin.

    Delete Local Branch
    To delete the local branch use one of the following:

    $ git branch -d branch_name
    $ git branch -D branch_name
    Note: The -d option is an alias for --delete, which only deletes the branch if it has already been fully merged in its upstream branch. You could also use -D, which is an alias for --delete --force, which deletes the branch "irrespective of its merged status." [Source: man git-branch]

    Delete Remote Branch [Updated on 8-Sep-2017]
    As of Git v1.7.0, you can delete a remote branch using

    $ git push <remote_name> --delete <branch_name>
    which might be easier to remember than

    $ git push <remote_name> :<branch_name>
    which was added in Git v1.5.0 "to delete a remote branch or a tag."

    Starting on Git v2.8.0 you can also use git push with the -d option as an alias for --delete.

    Therefore, the version of Git you have installed will dictate whether you need to use the easier or harder syntax.

    ref:https://stackoverflow.com/questions/2003505/how-do-i-delete-a-git-branch-both-locally-and-remotely
