---
published: 2019-07-26T21:37:47Z
updated: 2019-07-26T21:37:47Z
title: Change Mac OS default file associations from the command line with duti
---
While macOS makes it convenient to set your default file opener on a one-off basis, it fails to provide power users a way to manage them programmatically.

duti is a command-line utility that makes it possible to set default applications for specific document types, directly from the shell.

In the following [excerpt from my dotfiles](https://github.com/nficano/dotfiles/blob/master/misc/bootstrap#L156-L180), I use duti to configure Visual Studio Code to be my default “open with” application for various document types.

```bash
  duti -s com.microsoft.VSCode .c all
  duti -s com.microsoft.VSCode .cpp all
  duti -s com.microsoft.VSCode .cs all
  duti -s com.microsoft.VSCode .css all
  duti -s com.microsoft.VSCode .go all
  duti -s com.microsoft.VSCode .java all
  duti -s com.microsoft.VSCode .js all
  duti -s com.microsoft.VSCode .sass all
  duti -s com.microsoft.VSCode .scss all
  duti -s com.microsoft.VSCode .less all
  duti -s com.microsoft.VSCode .vue all
  duti -s com.microsoft.VSCode .cfg all
  duti -s com.microsoft.VSCode .json all
  duti -s com.microsoft.VSCode .jsx all
  duti -s com.microsoft.VSCode .lua all
  duti -s com.microsoft.VSCode .md all
  duti -s com.microsoft.VSCode .php all
  duti -s com.microsoft.VSCode .pl all
  duti -s com.microsoft.VSCode .py all
  duti -s com.microsoft.VSCode .rb all
  duti -s com.microsoft.VSCode .rs all
  duti -s com.microsoft.VSCode .sh all
  duti -s com.microsoft.VSCode .swift all
  duti -s com.microsoft.VSCode .txt all
  duti -s com.microsoft.VSCode .conf all
```

Duti requires you to use an know application's _bundle id_ in order to set it as the default for a given document type. Use the following command to list all known ids for your system.

```bash
lsappinfo | grep 'bundleID="' | cut -d'"' -f2 | sort
```
