---
author: Sarah
date: '2008-08-10 06:56:00'
layout: post
comments: true
slug: jquery-is-your-friend
status: publish
title: JQuery is your friend
wordpress_id: '7'
categories: design
---

Lately, I have had the opportunity to add some pretty funky usability behaviour on websites thanks to [JQuery](http://jquery.com/) and some UI Plugins.

If you haven't used JQuery before - start now. It is really simple to add some really cool behaviour. Need to find all the checkboxes on your page? Then `$('input[type="checkbox"]')` returns the list of them. Methods are also chained, which can often make long unreadable javascript files more concise, and more verbose at the same time.

I have played around with [sliders](http://docs.jquery.com/UI/Slider), [treeviews](http://docs.jquery.com/Plugins/Treeview/treeview), [tablesorting](http://plugins.jquery.com/project/tablesorter), [date pickers](http://docs.jquery.com/UI/Datepicker) and [ajax forms](http://plugins.jquery.com/project/form) and they have all been a dream to implement. Typically, we would start estimating stories for one of these functions as a Medium, but then as soon as we found and used the plugin, we realised it was actually a Small.

Of course, not all plugins are easy to use, especially when looking at cross browser issues. My rule now is if it is not on the JQuery plugin list, then I won't even bother looking at it. I also note who has written it - you will notice that a large number of good plugins come from one or two authors - now, I trust any plugin that they write and will use it if there is one there. My other rule is to spend no more than 10 minutes trying to make it work. If after that time I still haven't got it working (on at least all browsers other than IE) then I look for another plugin, or I roll my own.

We have been loving working on the stories which require funky usability controls, so much so that I have introduced a new motto for my current project - *jQuery is your friend*.

It's not all fun and games however - you do need to be disciplined as to when and how to use jQuery, as testing your app may not be so easy with a lot of javascript obfuscation. I have found browser based testing tools like Selenium have problems interacting with the jQuery functions especially when you bind an element to a click or change event.

All in all, however, you will find it a dream working with jQuery.
