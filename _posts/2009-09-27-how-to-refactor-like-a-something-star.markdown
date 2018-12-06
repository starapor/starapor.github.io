---
author: Sarah
date: '2009-09-27 15:49:48'
layout: post
comments: true
slug: how-to-refactor-like-a-something-star
status: publish
title: How to Refactor like a Something star
wordpress_id: '230'
categories: design
---

Refactoring a piece of code can be such a thrilling experience when it's finished, but at the same time can also act as the blackhole of time. Recently, I have been observing how other people refactor, watching their looks of happiness when they finish it and also their despaired faces when they have realized they have spent a week trying to add one new argument to their method.

I love refactoring and I think I do a good job at it now, but there was a time in the not-so-distant past where I was one of those despaired faces. I got to where I am now thanks to pairing with refactoring gurus and practice. Here are some of the tricks that I have picked up:

## Plan your refactoring
Planning should never be considered overrated. Before I start a refactor, I like to assess everything that the existing code does, and map where I want that to sit. I also determine which angle is the best to start from after looking at all the possible combinations, so that I am always working with minimal changes. I like to use post-its to guide my work, so I usually start with a handful of post-its to show where I am going. If there are too many post-its, I also start questioning the scope of the refactor: what could I get done if I only had 2 days to do it in.

## Parallelize your work
This really works well when, instead of shuffling bits around, you are actually doing a rewrite of the current functionality. For instance, the other day I rewrote the legacy login code to the application. Obviously I couldn't be too ruthless as everyone needed to still login, and this code was not under test. So, I wrote the new login section alongside the existing code, and just swapping in my login code in the DI container on my local machine. When it was time to switch it over, we checked in the DI container change, and voila, everyone started using the new login code. This allowed us to check in frequently without breaking anyone regardless of it being incomplete. It also meant that we always had the original version to refer to as we proceeded

## Checkin often
This is helped by either doing minimal changes at a time, or by parallelizing the work. Checkin frequently, checkin small. That way if you ever need to revert your changes, you know the brilliant work that you did before the "screwup" won't be wasted. If you are working with a source control like mercurial or git, you are in an even better situation, as you still have source control without affecting the rest of your team with your breaking changes.

## Never be afraid to revert your changes
This one is such a valuable lesson to learn and it feels so wrong when your doing faced with the possibility but when you have painted yourself into a corner, the best thing to do is to revert all changes. What it does mean, however, is that all the lessons that you learned from your first attempt will help guide your decisions the next time round.

## Prepare your system before you add new concepts
I know that refactoring is all about improving your world without adding new functionality but sometimes people start adding new features before the world is setup for them. Ensuring that your world is good before you add new features will make your life simpler.

##Introduce new concepts top down
Obvious? I thought so, but I have seen a refactoring go horribly wrong because it was started from the wrong place. When you change a class, you can isolate the changes within it, but every consumer of it will be affected. This bubbling effect can be catastrophic if you start from objects in the lowest level.

## Only have top level tests
This one is slightly controversial, and I don't know if I completely agree with it anyway, but if you only test your entry-point object, and never use fake objects during your testing (except to simulate external dependancies like databases or external services) then you will not have the annoyance of changing loads of unnecessary tests. You will also find that you can be 100% certain that your tests are still relevant without touching every single test file.

## Start with tests which pass
Very important to ensure that you don't break anything, so start with passing tests on the highest layer, whether that means browser based tests or controller tests. Make sure you have a test for all scenarios as that way you can easily test that your refactor has not changed the world.

## Boy Scout rule
Make sure you leave your world better than you found it (or at least no worse) as it reduces the number of big risky refactor adventures


Do you have any other tricks that you use when you refactor?
