---
author: Sarah
date: '2008-12-04 22:11:41'
layout: post
slug: tdd-does-not-mean-test-first
status: publish
title: TDD does not mean Test First
wordpress_id: '107'
categories:
- agile
- testing
---

Those starting out on their XP or Agile journey often hear supposedly enlightening phrases touted by those in the know like "TDD will lead you to better, nicely encapsulated, decoupled code" which leaves them scratching their heads. They are scratching their heads because they understand the benefits of adopting these practices, but they can't see how to actually apply them in their situation.

Take TDD for example - how can doing Test Driven Development/Design lead to good code? After all, you are only writing the same unit test before you write your code, instead of after. 'How will that act magically transform my code base?' The problem is that when you first hear about TDD, all you really hear is 'Test First'. What you usually don't hear is that when you actually test drive your application, you need to ensure that each test you write should be a good test, and it will look nothing like the tests you are used to writing. So, the first problem is that we don't explain the what a good test should look like loudly enough.

Another problem is that you can't expect a code base filled with statics and procedural code to magically transform by adding tests. The developers who are responsible for that code will continue to work on it, and they will find a way of writing unit tests which allows them to continue with their procedural code (although it will violate the rules of a good test). This will cause two bad side effects: tests will be hard to write, so developers will not get into the habit of test-first; and the code will still be as stinky as ever, so they won't believe that TDD works. The other side of the coin is that the developers need to understand basic concepts and principles like single-responsibility, encapsulation and dependancy injection because without this understanding and mindset, it is really hard to write good tests, and the code base will never improve.

The other problem is that the developers don't actually realise that they can't just change how they write tests; they are actually changing how they think about code, how they write the code and how they design the code. And this can be scary, especially for the 'technical architects' who are used to spending a few weeks in front of a white board designing the application before writing a single line of code. It also takes a lot of discipline and you need to unlearn nearly all software development practices and instincts that you know. 

The simple phrase of "TDD will lead to better code" has bigger implications than just writing tests upfront. Those starting out on their XP journey need to understand the bigger ramifications before they can begin to embrace their new practices. Those in the know need to understand that others don't realise that there are bigger ramifications and when they see the head scratching, try to explain why the phrase is so (hopefully this post will help).

TDD does lead to better code - test first does not.