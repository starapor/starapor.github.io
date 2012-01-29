---
author: Sarah
date: '2008-09-29 06:44:44'
layout: post
slug: i-dont-believe-in-acceptance-tests
status: publish
title: I don't believe in Acceptance Tests
wordpress_id: '31'
categories: testing
---

There - I said it. Heresy. But, I am yet to be sold on their value.

Before I continue, I should describe my observations of acceptance testing. From what I've seen, acceptance tests are created as assurance that a story is complete. They are a layer above unit, integration and persistence tests. Their assertions are based around acceptance criteria, and verify the functionality for the story. And, from what I have seen (as with all other tests) they are not constantly maintained, once written forever forgotten, and quite long to run.

Somewhere down the road of the project, the build takes too long to run, or you spend too much time fixing broken acceptance tests or you have flaky acceptance tests, and your mind starts to filter out a red build, thinking the problem must be caused by the said flaky test. A common workaround to these problems is to stop writing as many acceptance tests.

I guess my biggest problem with acceptance testing (in this form) is that I can push down any assertion that is made in the acceptance tests onto integration, persistence or unit tests and have a higher level of confidence that the acceptance criteria has been met. In fact, when I finish developing my story, the integration/persistence/unit tests already cover all acceptance criteria.

Now, you might argue that acceptance tests make good reference material, as there is one place you can go do to find out what the story was meant to do at the time of sign-off. If this is true, why do I see developers constantly referring to the code or unit tests for this information, rather than the acceptance tests?

I don't see the value of these story-based acceptance tests.

What I can see real value in is scenario-based testing. What I would like are a handful of scenario tests which describe the system as a whole. After all, the stories we develop have all been derived from some scenario which delivers business value. That way, as I develop a new story, I just extend the scenario tests to capture the essence of the story, but have all acceptance criteria still tested on the unit/integration tests.

Testing is a form of art; I don't think we have mastered acceptance level testing. Perhaps scenario testing is the answer, but it requires constant improvement to them, maintaining them, refactoring were necessary; generally looking out for the well being of the tests: one thing I don't think we are good at. Remember, refactoring your code base is just as important as refactoring your test code.