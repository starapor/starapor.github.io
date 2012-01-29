---
author: Sarah
date: '2009-06-25 22:16:42'
layout: post
comments: true
slug: canned-stubbed-and-mocked-fake-objects
status: publish
title: Canned, Stubbed and Mocked Fake Objects
wordpress_id: '209'
categories: testing
---

I had a very interesting discussion with <a href="http://twitter.com/JenniferSmithCo">Jen Smith</a> today about the differences in approach to faking objects during testing. As a result, I am finally putting down my thoughts on the matter.
<h3>Canned Objects</h3>
Canned objects are fantastic to use in situations where you want an object to respond with a predefined value or you don't care what the response is as it doesn't directly effect your test. It responds with the same value no matter how many times I call it. I use these objects most extensibly in my testing, especially for repositories. I only have one canned fake object per real object, except when I have services which, eg do validation; in this case, I create NegativeValidationService and PositiveValidationService objects to help readability of tests.

``` csharp
public class CannedBookRepository : IBookRepository
{
    private IBook book;
    public CannedBookRepository(IBook book)
    {
        this.book = book;
    }
    public CannedBookRepository() : this(new BookBuilder()) {}

    public IBook Find(IKey bookKey)
    {
        return this.book;
    }
    public void Save(IBook book) {}
}
```

<h3>Stubbed objects</h3>
Stubbed objects are fake representations of their real counterparts, and as such will tend to emulate their behaviour. The main difference, however, is that they do not talk to expensive services, eg database connections. I use stubbed objects mainly when I need my fake object to reply in different ways for different inputs, or when testing that I can put an object into a repository and will access an identical version of it. Again, generally I have at most one per real object; I usually don't use them.

``` csharp
public class StubbedBookRepository : IBookRepository
{
    private IList books = new List;

    public IBook Find(IKey bookKey)
    {
        return this.books.Find(book => book.Key.Equals(bookKey));
    }
    public void Save(IBook book)
    {
        this.books.Add(book);
    }
}
```

<h3>Mocked Objects</h3>
Mocked objects make use of existing mocking libraries, such as Mockito, Rhino mocks or mocha and are used mainly to test either that the correct method has been used for an API or when testing legacy code (ie when they have used static methods/classes and I cannot change that - TypeMock can do weird stuff with statics).

<h3>Why</h3>
The main reasons why I prefer these fake objects, as opposed to using a mocking library to stub certain methods are:
<ul>
<li>it is less lines of code in the test (only by declaration) - there are no setup, stub, replay/verify calls. All setup is done in the constructor</li>
<li>it is more maintainable - resharper can refactor it easily. Also if the methods are being refactored, eg changing a bool return type to an enum there is a single point of failure</li>
<li>it is easier to read (imho)</li>
<li>I don't have to worry about different syntax when creating real and fake objects - they are created in exactly the same manner. This also helps testing, as usually they are not the main concern of the test</li>
<li>once created, they are always there to be used</li>
<li>they help drive out design - if I find I have a fake object with many methods which throw the NotImplementedException, I can begin to ask "Are all these behaviours on the correct object?"</li>
</ul>

To summarize: canned fake objects are cool.