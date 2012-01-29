---
author: Sarah
date: '2011-04-15 16:05:49'
layout: post
comments: true
slug: how-to-mug-tiny-types
status: publish
title: How to Mug Tiny Types
wordpress_id: '359'
categories: design
---

I love tiny types. I love how they make me feel, how they make me laugh, how easy it is to understand what is going on when they are around. The one annoying aspect, however, is when they have to cross application boundaries. Whenever you need to persist them, or present them onto the screen, in order to get to the value, you usually expose the underlying wrapped primitive. This always feels so icky reaching into them and stealing their values. But, on my current project, we up with some neat ideas as to how to rob our tiny types for their precious.

Here is how it works:

``` csharp
public interface IVictim<T>
{
	void MuggedBy(IRobber<T> robber);
}

public interface IRobber<T>
{
	T StealFrom(IVictim<T> victim);
	void Steal(T valuables);
}

public class Percentage : IVictim<T>
{
	private readonly decimal percentage;
	public Percentage(decimal percentage)
	{
		this.percentage = percentage;
	}

	public void MuggedBy(IRobber<decimal> robber)
	{
		robber.Steal(percentage);
	}
}

public class ValuablesRobber<T> : IRobber<T>
{
	private T stolenGoods;

	public T StealFrom(IVictim<T> victim)
	{
		victim.MuggedBy(this);
		return stolenGoods;
	}

	public void Steal(T valuables)
	{
		stolenGoods = valuables;
	}
}

public class PercentageFormatter : IFormatter
{
	public string Format(object toFormat)
	{
		if (toFormat == null) return string.Empty;
		var percentage = (Percentage)toFormat;
		var value = new ValuablesRobber<decimal>().StealFrom(percentage);
		return value.ToString("0.00") + "%";
	}
}
```