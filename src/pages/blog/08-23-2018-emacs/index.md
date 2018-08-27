---
path: "/blog/goodbye-vscode"
date: "2018-08-23T08:55:27Z"
title: "Goodbye VSCode, Hello Emacs (Again)"
tags: blog
excerpt: "VS Code is a wonderful tool, but after a serious attempt to make it my primary editor I found Emacs to be a better fit for me"
---


Some months ago I decided to reorient my development career around web
development with JavaScript. I at first tried to use my editor of choice
[emacs](https://www.gnu.org/software/emacs/) but was continually frustrated by
the mediocre support for working JavaScript, particularly compared to
Python. After wasting at least a day trying to get my Emacs config to support
JavaScript as well as I had it for Python I came across the blog post [10 Years
of love for Emacs Undone by one week of
VSCode](https://swizec.com/blog/vscode-better-editor-emacs/swizec/7921). The
title really struck me as I have spent exactly 10 years with Emacs myself. I decided
to top swimming upstream and jump wholeheartedly into VS Code. It was a mixed experience.

I was instantly struck how superior VS Code's support is for the JavaScript language, libraries,
and the web environment. It got significantly better when I learned to drop `//@ts-check` in every file.
VS Code's language support is so awesome that I highly doubt any other editor will ever seriously compete with it in that regard. At the same time, I hit a pretty significant pain point. I use emacs keybindings everywhere, in the shell, browser, you name it. On OS X, [Karabiner](https://pqrs.org/osx/karabiner/) mapped those bindings for me and now on linux laptop with GNOME its a top-level feature. In VS Code I foudnd that I was constantly breaking the editor with the most common commands that I use thousands of times a day. Here are just a few. I probably have ~100 in muscle memory.

* M-f forward word
* M-b backward word
* C-w cut text
* M-w copy text
* C-SPACE start a selection
* C-a beginning line
* C-e end of line
* M-a back paragraph
* M-e forward paragraph
* C-s search forward
* C-j Change buffer
* etc.

I found an [emacs plugin for VS Code](https://github.com/SebastianZaha/vscode-emacs-friendly
) but it only confused my muscle memory as it only supported some
commands and then with small annoying bugs that made the plugin more trouble than it was worth.

I dropped the emacs plugin and tried to do things the VS Code way. It only kind of worked for me. As a developer, there is a whole set of things we do that are code-related but not coding per se, here are just a few:

* Working with git
* Managing files
* Maintaining a personal TODO list and logging errors, troubleshooting information
* Executing shell commands
* Writing documentation

While VS Code likely has some support for these, I found the VS Code plugins in these areas lacking
when I tried them. For example, I found jumping between projects with [Project Manager](https://marketplace.visualstudio.com/items?itemName=alefragnani.project-manager) very lacking in comparison to Emacs' incredible [Projectile](https://github.com/bbatsov/projectile). It is important to note that the Project Manager addon may have improved significantly since I last used it. The existing git addons also pale in comparison to Emacs' fantastic [git interface](https://magit.vc/).

I am one of those crazy people that runs a terminal inside of emacs. I even have a keybinding (M-j) that
I use to toggle between character and line mode in the terminal. VS Code's terminal is OK but nothing to write home about.

I use Emacs [dired](https://www.gnu.org/software/emacs/manual/html_node/emacs/Dired.html) mode for manipulating files and directories. It works ridiculously well.

More than magit, projectile, dired, I missed emacs' [ivy](https://oremacs.com/swiper/) completion framework more than anything else. You really have to see it to believe it.

[![Ivy in Action](http://img.youtube.com/vi/VvnJQpTFVDc/0.jpg)](https://youtu.be/VvnJQpTFVDc "Ivy in Action")

So far I have talked a whole lot about the Emacs features that I miss in VS Code. But surely, you ask, won't VS Code implement all of those features even better than Emacs given the VS Code teams extensive developer resources? Maybe, but I would be surprised if they did. I doubt the VS Code team intends to give it a kitchen sink of capabilities. Emacs' kitchen sink approach made it unbearably slow some decades ago. Luckily, it is ridiculously fast by today's standards since it is written in C. VS Code, written primarily in JavaScript, will bog down if they flesh it out with the capabilities I have described here.


![tide in action](http://i.imgur.com/jEwgPsd.gif)l
