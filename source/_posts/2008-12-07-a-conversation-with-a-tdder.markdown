---
author: Sarah
date: '2008-12-07 10:20:02'
layout: post
slug: a-conversation-with-a-tdder
status: publish
title: A conversation with a TDDer
wordpress_id: '111'
categories: testing
---

This is part of a conversation I had this week with my pair (in the conversation, I am <em>A</em> and he is <em>B</em>) as we were working on a new story. He, like many others, has been trying to do TDD but it wasn't until we had this conversation that he began to understand what I was talking about in my last post - that Test First does not drive out good design, but Test Driven Development can.

A: <em>What</em> are we trying to test

B: The instrument controller

A: Ok, <em>what</em> is it meant to do

B: Well, we are going to send it an instrument and its going to go to the Songs table in the database and query it for songs which use that instrument and then its going to render them on the page

A: Hmm - that sounds like <span style="text-decoration: underline;">how</span>. <em>What</em> is it meant to do?

B: Umm - find the songs that use the instrument and display it on the page.

A: That sounds pretty good. Except is it <em>responsible</em> for displaying it on the page or is that the <em>responsibility</em> of the view object?

B: Yeah - the view object actually renders it.

A: Ok - perhaps we can say that the instrument controller is <em>responsible</em> <em>for</em> finding the songs that use the instrument and returning it in a form that the view object can use.

B: Sounds good.

A: Ok, so what's our first test

B: Well, we give it an instrument and it should find all the songs and return them.

A: That seems to be a lot for our first test. Perhaps we should <em>split</em><em> that into two tests</em> and have one which returns a list of songs and one that asserts the songs are correct.

B: Cool, sounds good

A: Ok, so the first <em>test name</em> could be ShouldReturnListOfSongs and the second test could be ShouldReturnSongsWhichUseTheGivenInstrument. So, we want to assert that we get a list of songs. It is often useful to work bottom-up: work from the assertion up to the setup.

``` csharp
public void ShouldReturnListOfSongs()
{
	// Given

	// When

	// Then
	Assert.IsTrue(returnedList is List<song>);
}
public void ShouldReturnSongsWhichUseTheGivenInstrument()
{
	Assert.Fail()
}
```

B: But where does returnedList come from

``` csharp
public void ShouldReturnListOfSongs()
{
	// Given

	// When
	InstrumentController controller = new InstrumentController();
	List<song> returnedList = controller.FindSongs();

	// Then
	Assert.IsNotNull(returnedList);
}
public void ShouldReturnSongsWhichUseTheGivenInstrument()
{
	Assert.Fail()
}
```

A: Ok - your turn. Lets do the simplest thing to make that pass

``` csharp
public class InstrumentController
{
	public List<song> FindSongs()
	{
		return new List<song>();
	}
}
```

B: Cool. Ok, now I want to test that it finds the right songs from the database

A: Testing that we get the correct songs is good, but its not the responsibility of the controller to know that it is getting the songs from a database. What happens if you want to change your storage mechanism? Now you have to change everywhere that you just pulled information straight from it. Anyway, thats a how again. Lets get back to what it should do: return the songs which use the instrument.

``` csharp
public void ShouldReturnListOfSongs() { ... }
public void ShouldReturnSongsWhichUseTheGivenInstrument()
{
	// Given
	Song hereComeTheDrums = new SongBuilder().Build();

	// When
	InstrumentController controller = new InstrumentController();
	List<song> returnedList = controller.FindSongs("drums");

	// Then
	List<song> expectedSongs = Lists.Build(hereComesTheDrums);
	Assert.AreEqual(expectedSongs, returnedList);
}
```

A: Notice I have used a builder - this is so that our setup is not long, we know we have a valid Song object and if at anytime we need to change the way a song was constructed, we would only need to change the builder - not every test which created a Song. Now, we know that the controller needs to ask another object to do the finding, as it is not the controllers responsibility. An objet that usually encapsulates that work is called a Repository. As far as the controller is concerned, the Repository holds a bag full of Songs and it can ask it for songs that use instruments. It is the responsibility of the repository to actually find the songs. So, lets give the controller the repository when it is created.

``` csharp
public void ShouldReturnListOfSongs() { ... }
public void ShouldReturnSongsWhichUseTheGivenInstrument()
{
	// Given
	Song hereComeTheDrums = new SongBuilder().Build();
	ISongRepository songLibrary = new CannedSongRepository(hereComeTheDrums);

	// When
	InstrumentController controller = new InstrumentController(songLibrary);
	List<song> returnedList = controller.FindSongs("drums");

	// Then
	List<song> expectedSongs = Lists.Build(hereComeTheDrums);
	Assert.AreEqual(expectedSongs, returnedList);
}
```

A: Again, note that the controller takes in an interface and in the test we are using a Canned repository. A canned object is useful in testing as we can guarantee what it returns. Some people use mocking frameworks to stub the method call; the difference between a canned repository and a mock is that we can reuse the canned object without any effort in other tests, but we would need to recreate the mock every time. That leaves us with a failing test.

``` csharp
public class InstrumentController
{
	ISongRepository songLibrary;

	public InstrumentController(ISongRepository songs)
	{
		songLibrary = songs;
	}
	public List<song> FindSongs(string instrument)
	{
		return songLibrary.Find(instrument);
	}
}
```

A: Right, now the only problem with the code is that I don't really understand what the method Find does. I can't look at it and instinctively know what it will do. It is not an intention revealing method name. Perhaps we can call it FindSongsWhichUse so that the code now reads

``` csharp
public class InstrumentController
{
	ISongRepository songLibrary;

	public InstrumentController(ISongRepository songs)
	{
		songLibrary = songs;
	}
	public List<song> FindSongs(string instrument)
	{
		return songLibrary.FindSongsWhichUse(instrument);
	}
}
```

A: Now we have a choice - we can continue testing the controller or we can start testing the repository. If we test the repository, we can continue with a thin vertical slice, we can see the results on the page and get immediate feedback (this is my preferred method)

And so the development (and conversation) continued until we ended up with a nice design which was fully tested and only delivering what the business wanted.