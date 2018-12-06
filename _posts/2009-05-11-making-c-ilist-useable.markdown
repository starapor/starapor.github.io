---
author: Sarah
date: '2009-05-11 13:17:25'
layout: post
comments: true
slug: making-c-ilist-useable
status: publish
title: Making C# IList Useable
wordpress_id: '169'
categories: design
---

Around my neck of the woods, I have been having a theoretical debate with my colleague [Dan Bodart](http://dan.bodar.com/) as to the best method signature when it comes to collections of data.

Dan's point of view is that in order to be good citizens, our methods should form around interfaces and not rely on the concrete representation, after all if you need the data as a list, you can always create a new one.

My argument is that the IList interface is so rubbish that you would always need to create a list in order to manipulate it, and then that just becomes noise.

Both sides of the argument have valid points, and valid critisisms. After a little searching, we have found the answer: use extension methods for IList to add the fantastic list methods to the interface. In fact, we have gone one step further, and added extension methods to IEnumerable, so that we can have the power for our dictionaries as well. We have taken the opportunity to add a lot more functional methods  such as Head, Tail, Exists,  Find and AsString.

Here is an excerpt from our class.

``` csharp
public static class EnumerableExtensionMethods
{
    public static void ForEach<T>(this IEnumerable<T> source, Action<T> action)
    {
        foreach (T t in source)
        {
            action(t);
        }
    }

    public static List<t> ConvertAll<s, T>(this IEnumerable<s> source, Converter<s, T> converter)
    {
        return new List<s>(source).ConvertAll(converter);
    }

    public static List<t> FindAll<t>(this IEnumerable<t> source, Predicate<t> predicate)
    {
        return new List<t>(source).FindAll(predicate);
    }
}
```
