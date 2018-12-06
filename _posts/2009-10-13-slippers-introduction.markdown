---
author: Sarah
date: '2009-10-13 07:14:11'
layout: post
comments: true
slug: slippers-introduction
status: publish
title: 'Slippers: Introduction'
wordpress_id: '246'
categories: projects
---

There are many template engines that you can choose for the generation of views in your mvc application. The problem with most of the them, however, is that they are too permissive. These turing-complete engines allow for many complex constructs within the template, which begin at simple if statements and for loops, and expand to complex object traversal. While these permissive languages are intended to offer great flexibility, in reality they promote bad practices. Allowing logic to permeate your view is bad for many reasons: firstly, the code in views is rarely tested; secondly, the separation between the models and the view blurs and business logic creeps into the view.

All we want our template engine to do is read a string which has holes in it, and replace those holes with the desired string, much like mail merge. Luckily for me, there is already a templating engine which enforces strict separation of model and view by only supporting these strings with holes - String Template. [String Template](http://www.stringtemplate.org) is originally created in Java, however there has been subsequent ports to C# and python. It is [opinionated](http://www.stringtemplate.org/about.html), and I like it's opinions. (And if you prefer permissive views, I would recommend you reading about the origins of String Template before completely ruling it out.)

Unfortunately, when I started to try out [Ramaze](http://www.ramaze.net) (a great web framework for ruby - much better than rails imho) I looked around for a port of String Template to ruby, but couldn't find out. So, I decided that if no-one else would port it, I would...and so [Slippers](https://github.com/starapor/slippers) was born.

[Slippers](https://github.com/starapor/slippers) is a strict template engine for ruby, supporting the syntax from String Template including anonymous template, named templates and template group directories but also goes beyond this to allow you to use your own renderers. Nearly all the useful constructs from String Template have been ported, and you can see the comparison on the [Slippers vs String Template](http://starapor.github.com/slippers/slippers_vs_string_template.html) page.

To install:

``` ruby
# Run the following if you haven't done so before:
$ gem sources -a http://gemcutter.org
# Install the gem:
$ sudo gem install slippers
```
**Update: Please note that Slippers is no longer supported**
