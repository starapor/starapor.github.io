---
author: Sarah
date: '2011-04-05 14:44:37'
layout: post
comments: true
slug: code-contracts-in-net4-0-first-impressions
status: publish
title: 'Code Contracts in .Net4.0: First impressions'
wordpress_id: '347'
categories: testing
---

<a href="http://msdn.microsoft.com/en-us/devlabs/dd491992">Code Contracts</a> is one of the new features in .Net4.0 which brings a little bit of formal specification to .Net applications. As someone who has a background in <a href="http://en.wikipedia.org/wiki/Formal_specification">formal specifications</a>[1] I thought it might be interesting to see what this new tool offers .Net developers.

<strong>What is formal specification?</strong>
Formal specification is a way that allows us to mathematically analyse our programs to formally verify that it is correct according to the specification. There are 3 basic constructs: pre condition,  post condition and invariant. Preconditions are the rules which describe the state of the world before an action, post conditions are the rules which describe the state of the world after an action, and invariants are the rules which are always true. Using a trivial example of a bank account (which is not allowed to go in the red):

Pre condition to Withdraw: withdraw amount > 0
Post condition to Deposit: balance > deposit amount
Invariant: account balance > 0

So, then a valid program would look something like:

account = new Account()
account.deposit(200)
account.withdraw(100)

All good there. Now what happens when I do the following?

account = new Account()
account.deposit(200)
account.withdraw(600)

My formal specification analysis would (should) verify that the last withdraw would mean balance is -400 < 0 which fails the invariant. So the program has a problem. Note that according to formal specification if you actually ran this invalid program, the result would be indeterminate: that is to say that (formally speaking) we cannot tell you what would happen (it may fail gracefully or blow up dramatically).

Ok, so good so far but can you see where this stuff might be useful? Do you ever explicitly write precondition code? The type that looks something like:

``` csharp
class Account 
{
	public void Deposit(int amount)
	{
		if (amount < 0) { return } // or throw exception or something else horrible
		//else continue
	}
}

class MyBanks 
{
	private Account account = new Account();
	public void Deposit(int amount){
		if (amount < 0) { return }
		account.Deposit(amount)
	}
}
```

I have seen this style a lot, especially when people heavily unit test each class for every possibility that could happen. In reality, your other classes bomb out before you get to the if statement in Account, but you really want to describe a precondition on deposit. I have felt that being able to unobtrusively define pre conditions, post conditions and invariants on classes has been lacking in common programming languages/ecosystems. So, lets take a look at CodeContracts which is coming bundled with .Net 4.0 


<strong>.Net 4.0 Code Contracts</strong>
Code contracts support pre-, post-conditions and invariants. They have the same meaning as I previously described. They can statically analyse your solution on compilation and also dynamically analyse during runtime. What would our previous solution look like:

``` csharp
class Account 
{
	private int balance
	
	[ContractInvariantMethod]
	private void BalanceHasToAlwaysBeInTheBlack()
	{
		// Note to reader: only conditions can be in here
		Contract.Invariant(balance >= 0)
	}
	
	public void Deposit(int amount)
	{
		Contract.Requires(amount > 0)
		Contract.Ensures(balance > amount)	// Note to reader: you can also ensure on the returned object e.g. Contract.Ensures(Contract.Result<int>() > 0)

		balance += amount
	}
	
	public void Withdraw(int amount)
	{
		Contract.Requires(amount > 0)
		
		balance -= amount
	}
}
```

Running statical analysis (hint: turn it on in the Properties tab panel) on <em>account.Deposit(-400)</em> would show produce a warning to say that this breaks the precondition however <em>if (amount > 0){ account.Deposit(amount)} </em>would be validated. If you did not listen to the warning and carried on regardless, in production the application would throw an exception.

So, what do you think? In my opinion, it is an interesting idea and in theory I would love to use it. However, Microsoft's execution has a lot to be desired. The analysis does not seem to find everything (the analysis checker said that <em>balance/50</em> would break the invariant). I don't think it is unobtrusive. Perhaps you can farm the Contracts off to a meaningfully-named method but I'm not sure that it works like that. 

I am also a little worried about the implications of this. I was talking to a few people who didn't write tests: they believed that unit tests were not DRY so they don't like doing it so they were really excited by code contracts because it made the specification DRY. However, effective TDD is more around understanding what to test than the tests themselves and it is the same thought process involved when formally specifying the system. I worry the level of false confidence this gives to developers who are not used to writing effective tests now.

I am eager to work with them properly and explore how they can be used successfully. There is some good in there, so that I don't want to throw the baby out with the bathwater. 


[1] for my university honours project I was working on a theorem prover in <a href="http://en.wikipedia.org/wiki/Prolog">prolog</a> for formal specifications written in <a href="http://en.wikipedia.org/wiki/B-Method">B</a>