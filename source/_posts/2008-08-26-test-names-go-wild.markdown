---
author: Sarah
date: '2008-08-26 14:41:00'
layout: post
slug: test-names-go-wild
status: publish
title: Test names go wild
wordpress_id: '10'
categories: testing
---

<div>Around <a href="http://www.thoughtworks.com/">Thoughtworks</a>, there is much discussion about test strategies. The arguments range from setup vs inline; named vs anonymous; mocks vs stubs; high level vs unit level, and everyone has their own preferred techniques. While a lot of people talk about the virtues of either side, I wanted to talk about using test names wisely.</div>
<div>I have worked with <a href="http://blog.jayfields.com/">Jay Fields</a>, a man who is quite passionate about tests. His blog has a whole stream of entries around testing. One post which I believe caused a bit of a stir was his entry on <a href="http://blog.jayfields.com/2008/05/testing-value-of-test-names.html">the value of test names.</a></div>
<div>I understand where he is coming from, and if you are fortunate to be writing in Ruby, then your testing battles are half won already. If you use the gems like <a href="http://mocha.rubyforge.org/">mocha</a> and <a href="http://expectations.rubyforge.org/">expectations</a>, then testing is so natural, that you do end up with 2 to 3 line tests, <a href="http://blog.jayfields.com/2007/06/testing-one-assertion-per-test.html">one assertion per test</a> and there isn't a need for test names because everything is so neat and understandable, that they become clutter.</div>
<div>However, if you are in a language like C# (which is what my current project is in) then testing becomes that little bit harder, a little more like running through treacle. Mocking is one example of this - compare <a href="http://www.nmock.org/">NMock</a> to mocha... well, actually don't bother because they can't compare. Mocha beats NMock hands down. On my current project, I started to use mocks as I would on another ruby-based project, and quickly switched to stubbed classes because it was lacking in far too many places.</div>
<div>So, sometimes your environments dictate which testing strategy you should use. But here is my plea - if you use test names, please oh please treat them with the same respect as you treat your method names.</div>
<div>My biggest problem with test names is that they may be perfectly fine when you write the code for the first time, but then sometime later someone starts refactoring the code base. Tests start failing (perhaps the requirements have changed, so the test failures are a good thing) and you fix the failing test...but not the test name. And so, a little while later you have a test which is similar to this very trivial example (and yes, I have seen tests like this):</div>
<div>
``` csharp
public void ShouldContainOrderedListOfClients()
{
	Event first = new Event("AAA")
	Event second = new Event("ZZZ")
	Event[] result = Order(first, second)
	Assert.AreEqual(first, result[0]) Assert.AreEqual(second, result[0])
}
```
</div>
<div>Hang on - what the...? That test name has nothing to do with what is being tested. But which is correct - the test name or the test itself. And has there been a test which is now lost? Or has it moved? What is the source of truth?</div>
<div>Sometimes, knowing what the requirements for the unit in question are should be enough to fix up the offending item. Sometimes they are not.</div>
<div>My take home advice - think about what your test is doing before you begin to write the test. Perhaps you even write the names for 4 tests at once, before implementing any of them. That way you can focus on the test at hand,  you don't have to be thinking of testing a whole variety of cases in the one test and your tests become small enough that you can easily identify when the test name differs from the test at hand.</div>
<div>Also, treat your test code not as a second class citizen, but as important, if not more important than your code. Tests give you a confidence in the application you are building. To increase your confidence in your tests, you need to increase the time you spend refactoring them and making sure they are testing exactly what they say they are testing, and that there are no holes where your code can fall through and fail.</div>