---
author: Sarah
date: '2008-10-02 20:45:08'
layout: post
comments: true
slug: are-types-of-testing-important
status: publish
title: Are types of testing important?
wordpress_id: '61'
categories: testing
---

The comments on my last [post about acceptance tests]({{ site.baseurl }}{% post_url 2008-09-29-i-dont-believe-in-acceptance-tests %}) have made me think a little more about testing, particularly the value in specifically declaring the type of testing you are doing. 

> Unit testing is a method of testing that verifies the individual units of source code are working properly
*[http://en.wikipedia.org/wiki/Unit_testing](http://en.wikipedia.org/wiki/Unit_testing)*


> Integration testing...is the phase of software testing in which individual software modules are combined and tested as a group
*[http://en.wikipedia.org/wiki/Integration_testing](http://en.wikipedia.org/wiki/Integration_testing)*

But what is the distinction between unit and integration tests? How granular do you make your unit tests? For instance, would you consider testing an [aggregate object](http://domaindrivendesign.org/discussion/messageboardarchive/Aggregates.html) unit testing or integration testing? More importantly, what value do we get in declaring it.

When first learning how to write good tests, and learning about TDD and other wonderful testing practices, specifying what type of test you are writing helps define the boundaries of the test. Knowing this helps you know what objects to piece together to form the test for example to use a canned repository or use the real one. But once mastered, do you still need to explicitly call out the type. 

I understand that some people use these distinctions in their CI process - their CI build runs the unit tests first and then, only if they are successful, they run the integration (mainly database) tests, and then the "acceptance" tests. The main drivers for doing this are that, by their nature, unit tests are quite fast and so you fail fast; integration (and acceptance) tests are often too slow as they sometimes start up the whole framework, or talk to slow database connections.

If someone gave me these reasons I think I would run through the [5 Whys](http://en.wikipedia.org/wiki/5_Whys) with them to make sure that the problem they were actually solving by separating out the integration tests was the correct problem. For instance:

**Why** do you run integration tests after your unit tests? *Because they are slow and take a long time to run.*

**Why** do they take a long time to run? *Because Rails initializes the whole environment when testing.*

**Why** do you need to initialize the environment? *Umm...I guess I don't need it for my tests...but Rails does it for me automatically.*

**Why** don't you remove this unneeded dependancy? *Umm.....*

That's where I would probably stop with the questioning, because I would point them in the direction of [George Malamidis](http://nutrun.com/)'s [work around for fast unit tests](http://nutrun.com/weblog/rails-fast-test-suite/). My point is that there maybe a better solution than separating the tests.

 

So, what value do we really get by explicitly declaring what type a test should conform to?
