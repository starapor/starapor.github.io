---
author: Sarah
date: '2008-08-11 21:15:00'
layout: post
comments: true
slug: maybe-null
status: publish
title: Maybe null
wordpress_id: '8'
categories: design
---

My colleague <a href="http://andyp-tw.blogspot.com/">Andy</a> posted today about <a href="http://andyp-tw.blogspot.com/2008/08/returning-null-considered-dishonest.html">Returning null considered Dishonest</a> and while I agree with his sentiments, I disagree with his solution.
<div>Andy's premise is that you should never expect or return a null object as "<span style="font-family:'times new roman';"><span style="font-style:italic;">Returning null is dishonest. It requires others to check that we've upheld our side of the bargain</span></span>".  His solution is to throw meaningful exceptions within the method, so the happy path will return a not-null object, and the unhappy path throws exceptions.</div>
<div>This highlights one practice which I get annoyed with when I see it. Programming by exception is never a good idea. Exceptions should be reserved for exceptional circumstances only and should not contain business logic. If there is a possibility that the system can get into a state which returns null, then it should handle that situation, instead of letting it throw a tantrum and yell at the caller. </div>
<div>A better alternative would be to return an object which may or may not contain the value required. This Maybe object can have two implementations: when it can return the value, it returns a Something which contains the value;  and when it cannot return the value (ie value would be null) it returns a Nothing (perhaps with a message detailing why).</div>
<div>To continue Andy's example of the Vending Machine which dispenses a drink only if enough money has been inserted and there is enough stock, we can take a look at how Maybe objects can be used. </div>
``` csharp
public Maybe<drink> giveMeADrink()
{
	if (weDontHaveEnoughMoney)
	{
		return new Nothing<drink>(notEnoughMoneyMessage);
	}

	if (weDontHaveEnoughStock)
	{
		new Nothing<drink>(weDontHaveEnoughStockMessage);
	}

	return new Something<drink>(new Drink());
}

// Caller
Maybe[Drink] drink = giveMeADrink()
if (drink.IsPresent)
{ 
	SlideDownChute(drink.Force())
} else { 
	ReportProblem(drink.Force())
}
```
To me its a much cleaner version, you are coding for the situations that can actually occur, and not relying on try-catch statements around the place. 

<div>My advice? Steer clear of exceptions and return Maybes instead of nulls.</div>