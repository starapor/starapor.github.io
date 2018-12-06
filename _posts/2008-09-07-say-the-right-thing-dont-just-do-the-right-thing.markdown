---
author: Sarah
date: '2008-09-07 09:48:00'
layout: post
comments: true
slug: say-the-right-thing-dont-just-do-the-right-thing
status: publish
title: Say the right thing - don't just do the right thing.
wordpress_id: '11'
categories: testing
---

Often, I see tests like the following:
``` csharp
public void SuccessulUpdateOfCarDeatilsShouldReturnSuccessResponse()
{
	CarController controller = new CarController()
	controller.UpdateCarDetails(0, string.Empty, string.Empty, string.Empty)
	Assert.AreEqual(200, controller.Response)
}
```
<div>This conveys to me two things about the author of the test:</div>
<div>
<ol>
	<li>They treat tests as second-class citizens</li>
	<li>They have no respect for me, the unknown reader of the test</li>
</ol>
<div>Let me explain. I could be viewing these tests for a variety of reasons - to add new tests as bugs have appeared, to alter the functionality of the unit-under-test, to understand the unit-under-test ... etc.</div>
<div>Before I can understand what the test is actually testing, I need to look at the signature of the class (ie open the file, navigate to the constructor...) to determine what the string.empty and zeros are representing.  This takes extra effort on my part to understand the intent of the test*.
``` csharp
public class CarController{
	...
	public void UpdateCarDeatils(int carId, string carRegistration, string colour, string engineIdentificationNumber)
	{
		...
	}
}
```
</div>
<div>It also makes life difficult, because I am not sure if they are there for a particular purpose (ie the test is testing how the method handles nulls/empty strings) or if they are there because the author thinks they they are unimportant to the test.</div>
<div>I prefer to explicitly call out my unimportant parameters, by passing realistic but dummy values. I would rework the above example into:</div>
<div>
``` csharp
public void SuccessulUpdateOfCarDeatilsShouldReturnSuccessResponse()
{
	CarController controller = new CarController()
	controller.UpdateCarDetails(42, "car registration", "colour", "engineIdentificationNumber")
	Assert.AreEqual(200, controller.Response)
}
```
</div>
<div>This way I can see at a simple glance at the one test file what the method expects to take as parameters. I tend to use <a href="http://en.wikipedia.org/wiki/Answer_to_Life,_the_Universe,_and_Everything">42</a> as my default dummy id value, so when my team mates see it, they know it is an id value (zero is often an indicator of an object which is not persisted).</div>
<div>By replacing the meaningless empty values, with meaningless values which explain themselves you run into less problems adding the new tests, refactoring or altering functionality as the reader understands the intent of the test. Now, the test not only <span style="font-style:italic;">does</span> the right thing, but also <span style="font-style:italic;">says</span> the right thing.</div>
<div>*Even with Intelli-J or Resharper, there is work involved to understand these values</div>
</div>