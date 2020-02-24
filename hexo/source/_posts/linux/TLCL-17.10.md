---
title: TLCL-17.10手册简要笔记
tags: [linux, study notes]
categories: linux
---

## basic

command -options arguments

## 1. what is the shell

terminal: give us access to the shell.

shell prompt: \[username@machinename ~\]$.  if the last character of the prompt is '#' instead of '$', it means the terminal session has superuser privileges.

simple commands:

- date
- cal:  calendar
- df: the current amount of free space on your disk drivers.
- free: display the amount of free memory.(does not exist in mac's terminal)
- exit: ending a terminal session

## 2. Navigation
 
 Linux's files are organised in a tree-like pattern of directories

commands:

- pwd: print name of current working directory
- cd: change directory
    
    - cd: to your home directory
    - cd -: to the previous working directory
    - cd ~use_name: to the home directory of user 'who'
     
- ls: list directory contents

    - ls -a: show all files including the hidden files, which begin with a period.
    
## 3. Exploring The System

commands: 
- ls: list directory contents
    - ls: see a list of files and subdirectories contained in the current working directory.
    - ls dir1: see a list of files and subdirectories contained in the dir1.
    - ls dir1 dir2: like run `ls dir1` first and then run `ls dir2` .
    - ls -options: pdf-p15
    
    
- file: determine file type
- less: view text file contents. (pdf-p43)

## 4. Manipulating Files And Directories

wildcards: special characters to select files' name based on patterns of characters.

|wildcard|meaning|
|----|----|
|*|matches any characters.|
|?|matches any `single` character.|
|\[characters]|matches any `single` character that is a member of the set characters.|
|\[!characters]|matches any `single` character that is `not` a member of the set characters.|
|\[\[:class:]]|matches any character that is a member of the specified class.|

there are the most commonly used character classes.

|character class|meaning|tip|
|----|----|---|
|\[:alnum:]|matches any alphanumeric character|alnum = alpha + digit|
|\[:alpha:]|matches any alphabetic character|alpha = lower + upper ?|
|\[:digit:]|matches any numeric character|
|\[:lower:]|matches any lowercase letter|
|\[:upper:]|matches any uppercase letter|



commands:
- cp: copy files and directories.(pdf-p52)
    
    if copy files to directory, the destination directory must exist.(I guess it may involve permission problems. when running copy commands, if commands created new directory, it's confusing for new directory's permission)
- mv: move/rename files and directories.(pdf-p54)
- rm: remove files and directories. (pdf-p55)
- mkdir: create directories.
- ln: create hard and symbolic links. (pdf-p57)
    - ln file link: create a hard link
    - ln -s item link: create a symbolic link where "item" is either a file or a directories.

#### hard links (pdf-57)
By default, every file has a single hard link that gives the file its name. when we create a hard link, we create an additional directory entry for a file. Hard links have two important limitations:

1. A hard link cannot reference a file that is not on the same disk partition as the link itself.
2. A hard link may not reference a directory.

When a hard link is deleted, the link is removed but the contents of the file itself continue to exist(that is, its space is not deallocated) until all links to the file are deleted.

#### symbolic links (pdf-58)
Symbolic links were created to overcome the limitation of hard links. Symbolic links work by creating a special type of file that contains a text pointer to the referenced file or directory. In this regard, they operate in much the same way as a Windows shortcut though of course, they predate the Windows feature by many years.

when you delete a symbolic link, only the link is deleted, not the file itself. If the file is deleted before the symbolic link, the link will continue to exist, but will point to nothing. In this case, the link is said to be `broken`.

## 5. working with commands

commands:
- type: indicate how a command name is interpreted.
- which: Display which executable program will be executed.
- help: get help for shell builtins.
- man: display a command's manual page.(pdf-p69)
- apropos: display a list of appropriate commands.
- info: display a command's info entry.
- whatis: display a very brief description of a command.
- alias: create an alias for a command. (pdf-p74)


#### what exactly are commands(pdf-p66)

A command can be one of four different things(use type to identify):

1. <b>An executable program</b>
1. <b>A command built in the shell itself</b>
1. <b>A shell function</b>
1. <b>An alias</b>

## 6. redirection

commands:
- cat: concatenate files. (pdf-p82)
- sort: sort lines of text. (filters pdf-85)
- uniq: report or omit repeated lines. (filters pdf-85)
- grep: print lines matching a pattern. (pdf-86)
- wc: print newline, word, and byte counts for each line.(pdf-86)
- head: output the first part of a file. (pdf-87)
- tail: output the last part of a file. (pdf-87)
    - `tail -f` continues to monitor the file and when new lines are appended, they immediately appear on the display, until you type `Ctrl-c`.
- tee: read from standard input and write to standard output and files. It is useful for capturing a pipeline's contents at an intermediate stage of processing. (pdf-p89)

#### redirecting standard output(pdf-p78)
We can use the ">" redirection operator to change standard output to another file instead of the screen. For example:

````
ls -l /usr/bin > ls-output.txt
````
The results will overwrite 'ls-output.txt'. But if there an error occurs, the error message won't appear in the txt. Because ls program does not send its error messages to standard output. Instead, it sends its error messages to standard error.

you can do this to truncate a file or create a new, empty file:

````$xslt
> empty.txt
````

Using the ">>" operator will result in the output being appended to the file.If the file does not already exist, it is created just as though the ">" operator had been used.

````
ls -l /usr/bin >> ls-output.txt
ls -l /usr/bin >> ls-output.txt 
````
repeated the command 2 times resulting in an output file 2 times as large. 

#### redirecting standard error (pdf-p79)

To redirect standard error we must refer to its file descriptor:

````$xslt
ls -l /bin/usr 2 > ls-error.txt
````

#### redirecting standard output and standard error to one file

The traditional way, which works with old versions of the shell:
````$xslt
ls -l /bin/usr > ls-output.txt 2>&1
````
The more streamlined method for performing this combined redirection:
````$xslt
ls -l /bin/usr &> ls-output.txt
````
Or you may also append the standard output and standard error streams to a single file like so:
````$xslt
ls -l /bin/usr &>> ls-output.txt
````

#### disposing of unwanted output

A special file called "dev/null" accepts input and does nothing with it.
````$xslt
ls -l /bin/usr 2> /dev/null
````

#### redirecting standard input (pdf-83)
use `cat` or `<` can redirect standard input.

### pipelines
The ability of commands to read data from standard input and send to standard output is utilized by a shell feature called pipelines. Using the pipe operator "|", the standard output of one command can be piped into standard input of another:

````
    commands1 | commands2
````

The difference between ">" and "|"(pdf-p84):

The redirection operator connects a command with a file, while the pipeline operator connects the output of one command with the input of a second command.
````
command1 > file1
command1 | command2
````
Sometimes something really bad will happen if:
````
command1 > command2
````

## 7. seeing the world as the shell sees it

commands:
- echo: display a line of text.

#### expansion
Each time we type a command and press the enter key, `bash` performs several processes upon the text before it carries out our command. The process called expansion.
- pathname expansion *.html (pdf-p92)
- tilde expansion ~ (pdf-p93)
- arithmetic expansion $((2+2))(pdf-p94)
- brace expansion 2019-{01..12}(pdf-p95)
- parameter expansion $USER(pdf-p96)
- command substitution echo $(ls)(pdf-p97)

#### quotes

- double quotes: If we place text inside double quotes, all the special characters used by the shell lose their special meaning and are treated as ordinary characters,exclude parameter expansion, arithmetic expansion and command substitution. Word-splitting is suppressed and embedded spaces become part of the arguments instead of delimiters.
- single quotes: If we need suppress all expansions, we use single quotes.
- escaping characters: Sometimes we only want to quote a single character. To do this, we can precede a character with a backslash, which in this context is called the `escape character`.(pdf-p101)

## 8. advanced keyboard tricks

commands:
- clear: Clear the screen.
- history: Display the contents of the history list.

cursor movement (pdf-p106 has all the commands. The commands below works well on my pc):
- Ctrl - a: move cursor to the beginning of the line.
- Ctrl - e: move cursor to the end of the line.
- Ctrl - l: Just do the same thing like `clear` commands does.

cut and paste:
- Ctrl - k: kill text from cursor location to the end of line.
- Ctrl - u: kill text from cursor location to the begging of the line.
- Ctrl - y: Yank text from kill-ring and insert it at the cursor location.

history expansion:
- !\[number]: \[number\] means a line number of the command in the history list. Bash will expand "!number" into the contents of number'th line in the history.
 
# 9. Permissions

Operating systems in the Unix are not only multitasking systems, but also multi-user systems.Multi-user system means that more than one person  can be using computer at the same time.

commands:
- id: Display user identity.
- chmod: Change a file's mode(pdf-117). chmod supports octal notation(pdf-118) and symbolic notation(pdf-119)
- umask: Set the default file permissions(pdf-121). It use octal notation to express a mask of bits to be removed from a file's mode attributes.
- su: Run a shell as another user(pdf-125).
- sudo: Execute a command as another user(pdf-126).
- chown: Change the owner and group owner of a file or directory(pdf-127).
- chgrp: In older versions of Unix, change a files' group ownership(pdf-128).
- passwd: Change a user's password.
- more commands: adduser, useradd, groupadd

 file types(the first character of the file attribute):
 - \-: A regular file.
 - d: A directory.
 - l: A symbolic link.
 - c: A character special file.
 - b: A block special file.
 
 file mode(nine characters of the file attribute):
 
 Permissions for the file's owner, the file's group owner, and anybody else.
 
 permission attributes:
 - r(4): 
 
    files: Allows a file to be opened and read.
    
    directories: Allows a directory's content to be listed if the execute attribute is also set.
 - w(2): 
 
    files: Allows a file to be written to or truncated. However the ability to delete or rename files is determined by directory attributes.
    
    directories: Allows files within a directory to be created, deleted, and renamed if the execute attribute is also set.
    
 - x(1): 
 
    files: Allows a file to be treated as a program and executed.
 Program files written in scripting languages must also be set as readable to be executed.
 
    directories: Allows a directory to be entered.
 
 - some special permissions(pdf-123).
 
## 10. Processes

commands:
- ps: Report a snapshot of current processes(pdf-134).
- top: Display tasks to view processes dynamically(pdf-136).
- jobs: List active jobs that have been launched from our terminal(pdf-140).
- bg: Place a job in the background(pdf-141).
- fg: Place a job in the foreground(pdf-140).
- kill: Send a signal to process(pdf-142).
    
    kill \[-signal(pdf-142)] PID
     
- killall: Kill processes by name(pdf-145).
- shutdown: shutdown or reboot the system（pdf-146).
- &: Putting a process in the background(pdf-139).
- other commands: pstree, vmstat, xload, tload(pdf-147)

How a Process Works(keywords):
- init(pdf-133)
- parent process and child process(pdf-133)
- process ID (pdf-134)
- STAT: process states(pdf-135)
- stopping(pausing) a process(pdf-141)
- signals: Signals are one of several ways that the operating system communicates with programs.(pdf-142)

## 11. The Environment