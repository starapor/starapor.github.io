---
author: Sarah
date: '2009-06-29 06:20:04'
layout: post
comments: true
slug: coding-tip-42-turning-enums-into-classes
status: publish
title: 'Coding Tip #42: turning enums into classes'
wordpress_id: '203'
categories: design
---

In [Coding Tip no27]({{ site.baseurl }}{% post_url 2009-05-25-coding-tip-27-turning-bools-into-enums %}) I explained how I rarely like to use booleans to represent states, and prefer to use an enum. Now that I have all nice little enums everywhere, another pattern that I see emerge is that I want more from my enum than just a value: perhaps other values associated with it, or actual behaviour. These enums then get converted into fully-fledged objects (ie classes) in the system with a very simple refactor.

So, the code started with:
``` csharp
private bool hasVehicle;
```

then, by following [Coding Tip no27]({{ site.baseurl }}{% post_url 2009-05-25-coding-tip-27-turning-bools-into-enums %}), went to:
``` csharp
private Vehicle theVehicle;
public enum Vehicle
{
    Car,
    MotorBike,
    PeopleMover
}
```

and now can turn into:
``` csharp
private Vehicle theVehicle;
public class Vehicle
{
    public static Vehicle Car = new Vehicle("Car");
    public static Vehicle MotorBike = new Vehicle("MotorBike");
    public static Vehicle PeopleMover = new Vehicle("PeopleMover");

    private Vehicle(string name)
    {
        this.name = name
    }
    private string name;
}
```

so my objects are all setup to add additional functionality:
``` csharp
private Vehicle theVehicle;
...
theVehicle.WillSeatAPartyOf(4);
...
public class Vehicle
{
    public static Vehicle Car = new Vehicle("Car", 5);
    public static Vehicle MotorBike = new Vehicle("MotorBike", 2);
    public static Vehicle PeopleMover = new Vehicle("PeopleMover", 8);

    private Vehicle(string name, int passengerLimit)
    {
        this.name = name
        this.passengerLimit = passengerLimit;
    }
    private string name;
    private int passengerLimit;

    public bool WillSeatAPartyOf(int numberOfPassengers)
    {
        return numberOfPassengers =< passengerLimit;
    }
}
```

I debate whether the class should contain the name or the index, usually I use the name; you can use both. Obviously if someone was now relying on the enum order, you would need to give it the index. Another advantage of this is because the constructor is private, you know that there are a definitive list of representations for it.

I don't usually use class straight away. Indeed, I usually take bets to see how long it will stay an enum - sometimes the refactor is immediate, other times it remains an enum.
