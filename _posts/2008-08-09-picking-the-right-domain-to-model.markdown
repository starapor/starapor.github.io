---
author: Sarah
date: '2008-08-09 17:35:00'
layout: post
comments: true
slug: picking-the-right-domain-to-model
status: publish
title: Picking the right domain to model
categories: design
---

When designing your code, it is important to model the business domain. However, how do you know you have modelled the right domain? Sometimes you need to look beyond the domain objects, and see what you are actually implementing.

On my latest project, we started modelling what we thought were the correct business objects. Essentially, the project was to build online booking registration. The registration spans many pages (sections), has no session state (see [Dan Bodar's blog](http://dan.bodar.com/2007/10/06/3/) under heading No Session State just persistent documents) and has a similar usability concept as described in [Marc McNeill's blog](http://www.dancingmango.com/blog/2008/02/12/real-world-forms/).

Initially our model had discreet objects, and their complex relationship between them. We soon realised that what we should be representing was not these domain objects but actually the form itself.

So, we turned our model on its head and modelled the form instead. Now, the form consists of a list of sections on the form, and each section consists of a list of fields in the section. A field consists of a label, the value (which the user entered - represented as a string), validators (if this field have a value when submitting the form, or if the value has special qualities like a number between 100 and 1000) and converters (to transform the value from a string to the necessary type like integer). Representing it in this manner has the added benefit that we retain the user entered content, even if it was not of the right type.

We have been using this form based approach for a few months now, and I am sure it has really helped our progress. A new feature was requested the other day - the ability to turn off sections under certain circumstances. This has been quite easy to build with the form model; I don't know how much extra work it would be in the old design, but I'm sure a lot more complex.

What has this taught me? Don't just look at the forest - the tree may prove to be better after all.
