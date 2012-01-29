---
author: Sarah
date: '2008-10-02 20:45:08'
layout: post
slug: are-types-of-testing-important
status: publish
title: Are types of testing important?
wordpress_id: '61'
categories: testing
---

The comments on my last <a title="I don't believe in acceptance tests" href="/thoughts/?p=31" target="_blank">post about acceptance tests</a> have made me think a little more about testing, particularly the value in specifically declaring the type of testing you are doing. 
<blockquote>Unit testing is a method of testing that verifies the individual units of source code are working properly
<em><a class="alignright" title="Unit testing" href="http://en.wikipedia.org/wiki/Unit_testing" target="_blank">http://en.wikipedia.org/wiki/Unit_testing</a></em></blockquote>
 
<blockquote>Integration testing...is the phase of software testing in which individual software modules are combined and tested as a group
<a class="alignright" title="Integration Testing" href="http://en.wikipedia.org/wiki/Integration_testing" target="_blank"><em>http://en.wikipedia.org/wiki/Integration_testing</em></a></blockquote>
But what is the distinction between unit and integration tests? How granular do you make your unit tests? For instance, would you consider testing an <a title="Aggregate objects - Domain Driven Design" href="http://domaindrivendesign.org/discussion/messageboardarchive/Aggregates.html" target="_blank">aggregate object</a> unit testing or integration testing? More importantly, what value do we get in declaring it.

When first learning how to write good tests, and learning about TDD and other wonderful testing practices, specifying what type of test you are writing helps define the boundaries of the test. Knowing this helps you know what objects to piece together to form the test for example to use a canned repository or use the real one. But once mastered, do you still need to explicitly call out the type. 

I understand that some people use these distinctions in their CI process - their CI build runs the unit tests first and then, only if they are successful, they run the integration (mainly database) tests, and then the "acceptance" tests. The main drivers for doing this are that, by their nature, unit tests are quite fast and so you fail fast; integration (and acceptance) tests are often too slow as they sometimes start up the whole framework, or talk to slow database connections.

If someone gave me these reasons I think I would run through the <a title="5 Whys" href="http://en.wikipedia.org/wiki/5_Whys" target="_blank">5 Ys</a> with them to make sure that the problem they were actually solving by separating out the integration tests was the correct problem. For instance:

<em><strong>Why</strong> do you run integration tests after your unit tests? Because they are slow and take a long time to run.
<strong>Why</strong> do they take a long time to run? Because Rails initializes the whole environment when testing.
<strong>Why</strong> do you need to initialize the environment? Umm...I guess I don't need it for my tests...but Rails does it for me automatically.
<strong>Why </strong>don't you remove this unneeded dependancy? Umm.....</em>

That's where I would probably stop with the questioning, because I would point them in the direction of <a title="George Malamidis" href="http://nutrun.com/" target="_blank">George Malamidis</a>'s <a title="Fast testing in Rails" href="http://nutrun.com/weblog/rails-fast-test-suite/" target="_blank">work around for fast unit tests</a>. My point is that there maybe a better solution than separating the tests.

 

So, what value do we really get by explicitly declaring what type a test should conform to?