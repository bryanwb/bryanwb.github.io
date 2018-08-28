---
path: "/blog/goodbye-vscode"
date: "2018-08-23T08:55:27Z"
title: "Goodbye VSCode, Hello Emacs (Again)"
tags: blog
excerpt: "VS Code is a wonderful tool, but after a serious attempt to make it my primary editor I found Emacs to be a better fit for me"
---


Some months ago I decided to reorient my development career from the DevOps space to web
development with JavaScript. I at first tried to apply my editor of choice
([emacs](https://www.gnu.org/software/emacs/))but was continually frustrated by
the mediocre support for working with JavaScript, particularly compared to
Python. After wasting at least a day trying to get my Emacs config to support basic completion and syntax checking in JavaScript I came across the blog post [10 Years
of love for Emacs Undone by one week of
VSCode](https://swizec.com/blog/vscode-better-editor-emacs/swizec/7921). The
title really struck me as I have spent exactly 10 years with Emacs myself. I decided
to top swimming upstream and jump wholeheartedly into VS Code. It has been a mixed experience.

I was instantly struck how amazing VS Code's support is for the JavaScript
language, libraries, and the web environment. Every tutorial on react, Vue.js, Electron, you name it, recommends using VS Code. My VS Code experience became even better when I
learned to drop `//@ts-check` in every file.  VS Code's language support is so
awesome that I highly doubt any other editor will ever seriously compete with it
in that regard. At the same time, I hit a pretty significant pain point
instantly. I use emacs keybindings everywhere, in the shell, browser, you name
it. On OS X, [Karabiner](https://pqrs.org/osx/karabiner/) mapped those bindings
for me and now on linux laptop with GNOME it is a top-level feature. In VS Code
I found that I was constantly closing the editor accidentally or deleting a
text in a buffer with the most common commands that I use thousands of times a
day. Here are just a few. I probably have >100 in muscle memory.

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
* and many more

I found an [emacs plugin for VS Code](https://github.com/SebastianZaha/vscode-emacs-friendly
) but it only muddled the situation memory as it only supported some
commands and then with annoying bugs that made the plugin more trouble than it was worth.

I dropped the emacs plugin and tried to do things the VS Code way. It only kind of worked for me but I soon encountered more hurdles. As a developer, there is a whole set of things we do that are project-related tasks such as:

* Working with git
* Renaming files, moving them around
* Maintaining a personal TODO list and logging errors, troubleshooting information in a personal log
* Executing shell commands
* Writing documentation in markdown, ReST, asciidoc

While VS Code likely has some support for these, I found the VS Code plugins in these areas lacking
when I tried them. For example, I found jumping between projects with [Project Manager](https://marketplace.visualstudio.com/items?itemName=alefragnani.project-manager) very poor in comparison to Emacs' incredible [Projectile](https://github.com/bbatsov/projectile). It is important to note that the Project Manager addon may have improved significantly since I last used it a few months ago. The existing git addons also pale in comparison to Emacs' fantastic [git interface](https://magit.vc/). [counsel-git-grep](https://github.com/abo-abo/swiper/blob/master/counsel.el#L1222) across a huge codebase truly is a superpower.

[![Counsel-git-grep demo](https://img.youtube.com/vi/AgRsYOJi6ao/0.jpg)](https://www.youtube.com/watch?v=AgRsYOJi6ao)

I am one of those crazy people that runs a terminal inside of emacs. I even have a keybinding (M-j) that
I use to toggle between character and line mode in the terminal. VS Code's terminal is OK but nothing to write home about.

I use Emacs [dired](https://www.gnu.org/software/emacs/manual/html_node/emacs/Dired.html) mode for manipulating files and directories. It works ridiculously well.

More than magit, projectile, dired, I missed emacs' [ivy](https://oremacs.com/swiper/) completion framework more than anything else. You really have to see it to believe it.

[![Ivy in Action](https://img.youtube.com/vi/VvnJQpTFVDc/0.jpg)](https://youtu.be/VvnJQpTFVDc "Ivy in Action")

So while I could use VS Code for writing JavaScript, I still found myself spending 30-50% of my work time in Emacs. The mismatch between keybindings in VSCode and rest of my tools just kept tying my fingers in knots.

So far I have talked a whole lot about the Emacs features that I miss in VS Code. But surely, you ask, won't VS Code implement all of those features even better than Emacs given the VS Code teams extensive developer resources? Maybe, but I would be surprised if they did. I doubt the VS Code team intends to give it a kitchen sink of capabilities that we see in Emacs.

After one month, I decided to reinvestigate using Emacs for JavaScript. I came upon the awesome [Tide-mode](https://github.com/ananthakumaran/tide). It took me about a day but I got it working to my satisfaction. It does not hold a candle to VS Code but it provides me enough features to be productive in JavaScript.

Some of the features tide-mode provides:

* auto-completion (via company-mode)
* linting
* syntax-checking (together w/ flycheck)
* documentation at point
* basic refactoring

Here is tide-mode in action

![tide in action](https://i.imgur.com/jEwgPsd.gif)

A few notes on using tide-mode:

1. You have to drop a jsconfig.json (for JavaScript) or tsconfig.json (for TypeScript) into your project in order to use it.
2. You have to install typescript into your projects for it to work optimally. As it leverages the `tsserver` that ships with TypeScript. Note that it does not need to be a project dependency. You can install it thus with `npm install typescript`
3. I am using Emacs 26. Not sure how well this works with Emacs 25
4. I haven't found a good way to fully support JSX in files with a regular `.js` extension. So far I have simply renamed any file containing JSX to `.jsx` in order to get web-mode + tide-mode to work properly.

I may be mistaken but I believe the `tsserver` that ships with TypeScript was developed by the same team that makes VS Code. It is not without irony that the Emacs mode I am using to replace of VS Code depends on software developed by the VS Code team.

VS Code is an excellent IDE and I would recommend any new software developer to use it. But with the excellent tide-mode, I no longer need to.

You can find my emacs configuration for JavaScript [here](https://github.com/bryanwb/dotfiles/blob/master/emacs.d/init.el#L845-L909).



