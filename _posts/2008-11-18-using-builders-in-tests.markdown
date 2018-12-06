---
author: Sarah
date: '2008-11-18 20:03:05'
layout: post
comments: true
slug: using-builders-in-tests
status: publish
title: Using Builders in Tests
wordpress_id: '90'
categories: testing
---

An annoying part of writing a test is the amount of setup an object can need in order to use it within the test. 

``` csharp
public void ShouldCalculateVolume()
{
	Box box = new Box();
	box.Type = Cardboard;
	box.Width = 10;
	box.Height = 20;
	box.Depth = 40;
	Assert.AreEqual(8000, box.Volume)
}
```

However, there is a solution: builders. Builders help by allowing you to only setup the data relevant to the test, but still having a fully formed object. By chaining your methods, you also reduce the amount of lines required for setup. Another advantage of using builders is obvious when you start to refactor the object: instead of fixing all your tests because you have added a new mandatory field, you only have one point of failure.

``` csharp
public void ShouldCalculateVolume()
{
	Box box = new BoxBuilder().Width(10).Height(20).Depth(40).Build();
	Assert.AreEqual(8000, box.Volume)
}

public class BoxBuilder
{
	int width = 1;
	int height = 1;
	int depth = 1;
	Material type = Cardboard;

	public Box Build()
	{
		Box box = new Box();
		box.Type = Cardboard;
		box.Width = width;
		box.Height = height;
		box.Depth = depth;
		return box;
	}

	public BoxBuilder Width(width)
	{
		this.width = width;
		return this;
	}
	public BoxBuilder Height(height)
	{
		this.height = height;
		return this;
	}
	public BoxBuilder Depth(depth)
	{
		this.depth = depth;
		return this;
	}
}
```

Of course, my example is quite trivial and the only obvious benefit is that I put all the property definitions on one line. However, when you start adding other more complex objects (like perhaps those within your aggregate), then you have some powerful testing techniques under your fingers.
