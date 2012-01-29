---
author: Sarah
date: '2008-08-16 07:56:00'
layout: post
comments: true
slug: lists-filter-map-and-reduce
status: publish
title: 'Lists: Filter, Map and Reduce'
wordpress_id: '9'
categories: design
---

<div>There are 3 very handy list functions which make dealing with lists a breeze: Map, Filter and Reduce. I have come to the belief that not everyone understands their power, so I will attempt to explain it.</div>
<h3>Filter</h3>
<div>The filter function  (fairly aptly named) aims to filter out (remove) items from the list which are not wanted. Typically, the Filter will take a list to be filtered and a condition to be met. Filter will then iterate through the list, and check each item in the list against the condition and form a new list from the items which pass the condition. A practical example would be: you have a list of names, and from that list you want the names that start with "S", so ["Snowy", "Shelly", "Muffin", "Oberon"] would filter to ["Snowy", "Shelly"].</div>
<div>
``` csharp
public bool FilterFunction(T item)
{
	return item.StartsWith("S")
}
public List Filter(List list, FilterFunction condition)
{
	List filteredList = new List()
	foreach (T item in list)
	{
		if (condition(item))
		{
			filteredList.Add(item)
		}
	}
	return filteredList
}
```
 </div>
<h3>Map</h3>
<div>The map function takes a list and a function and applies the function to every item in the list. A practical example would be: a repository returns a list of Cars, but you need to have a list of the number of seats in the car, so [GWiz, SmartCar, CleverCityCar, PeopleMover] would map to [1, 2, 5, 9]. </div>
 
<div>
``` csharp
public R MapFunction(T item)
{
	return item.NumberOfSeats()
}
public List Map(List list, MapFunction mapFunction)
{
	List mappedList = new List()
	foreach (T item in list)
	{
		mappedList.Add(mapFunction(item))
	}
	return mappedList
}
```
 </div>
 
<h3>Reduce</h3>
<div>Reduce is the hardest list function to understand (and explain). It is sometimes referred to as accumulate, fold, compress or inject. In effect, it takes the list and folds/compresses/reduces it down to a single value. Reduce takes a list and a function. It iterates over the list; it applies the function to the first item and a 'starting value'. The result of the first function will be used as the 'starting value' in the function of the next iteration. (Some implementations do not require a starting value, but start iterating over the second item in the list, using the first item as the starting value). A practical example would be: finding the total number of seats available in a set of cars, so using the example before of [GWiz, SmartCar, CleverCityCar, PeopleMover], the result would be 17 (1 + 2 + 5 + 9).  The common example you will see regarding this function is finding the total of all the numbers in a list, so [1, 2, 5, 9] would yield 17.</div>
<div>
``` csharp
public R ReduceFunction(T item, R accumalator)
{
	return item.NumberOfSeats + accumalator
}
public R Reduce(List list, ReduceFunction reduceFunction, R startingValue)
{
	R accumalator = startingValue
	foreach (T item in list)
	{
		accumalator = reduceFunction(item, accumalator)
	}
	return accumalator
}
```
 </div>
 
<h3>Summary</h3>
<div>The filter function transforms <span style="font-style:italic;">a set </span>(list) of items into <span style="font-style:italic;">a subset</span> of the items. </div>
<div>The map function transforms a list of items in <span style="font-style:italic;">one type</span> to a list of items in <span style="font-style:italic;">another type</span>.</div>
<div>The reduce function transforms <span style="font-style:italic;">a list</span> of items in one type to <span style="font-style:italic;">an object</span> in another type.</div>
<div>Both Ruby and Python make excellent use of these functions, so if you would like to further your understanding, I would suggest using these.</div>
<div>I am lead to believe that C# has these functions, but only for array implementations (and definitely not on IList). I don't believe Java has these at all, but you could always create reusable methods which provides this behaviour. </div>
<div>Next time you start to write a foreach loop, have a look to see if what you are really doing is a filter, a map or a fold. You may find you save yourself a few lines of code.</div>