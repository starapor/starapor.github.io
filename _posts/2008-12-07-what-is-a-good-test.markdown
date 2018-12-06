---
author: Sarah
date: '2008-12-07 10:19:40'
layout: post
comments: true
slug: what-is-a-good-test
status: publish
title: What is a good test?
wordpress_id: '110'
categories: testing
---

I have been helping my current client introduce TDD, and in doing so explaining principles such as single-responsibility, encapsulation and intention revealing names. As I said in my previous post Test first does not magically improve the code base, but you need to concentrate on writing good tests to help you drive out good design. This is my list of what I think characterises a good test (although I don't think its definitive - I am sure I have missed some things out).

 
<ul>
	<li>Test <em>the what, not the </em><em>how</em>. Concentrate on the behaviour of your object, not how it will achieve that behaviour.</li>
	<li>Have<em> minimal, simple setup</em>. This will help drive out classes which have low dependancies, low coupling and single responsibility. Use builders to help you minimise the number of lines in your setup.</li>
	<li><em>Write</em> your test<em> bottom up</em> - start with your assertion, then fill in the blanks</li>
	<li>Test <em>one behaviour at a time</em> (often referred to one assertion per test). If you hear the magic keyword And when describing the behaviour, you have two tests.</li>
	<li>It is useful to structure your test in the<em> Given When Then </em>format. This allows you to see the what is just there to form as setup and how much setup you need to do (in the Given), see the intention of the test (in the Then) and understand which method you should alter to make the test work (in the When).</li>
	<li><em>Naming is important</em>. Give your test a good name - it will help with your documentation and it will also help you concentrate on what you are testing, not how it will be implemented. Also, names of your test variables should reveal the different examples of the values that could be used. Instead of declaring User user = new User("mary jane") try User maryJane  = new User("mary jane") and see how that changes your understanding of the class.</li>
</ul>
In my next post I will share a conversation I had this week with my client, which shows how I introduce these characteristics to my test.