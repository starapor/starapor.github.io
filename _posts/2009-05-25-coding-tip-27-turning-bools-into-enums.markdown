---
author: Sarah
date: '2009-05-25 15:48:51'
layout: post
comments: true
slug: coding-tip-27-turning-bools-into-enums
status: publish
title: 'Coding Tip #27: turning bools into enums'
wordpress_id: '162'
categories: design
---

On my recent project, I have noticed a resurgence in a pattern that I have seen many times previously: where a field which is represented as a `boolean` needs to evolve to represent more than just two values (`true` and `false`). The number of times that I have encounted this makes me believe that you should always start with `enum`, regardless if the values are `true` and `false`, just to make your life easier down the line.

As much as refactoring tools like resharper help you out, when it comes to refactoring a `bool` into an `enum`, it's a pain in the arm. One of these pain points being that quite often, you see:

`if (fieldRepresentedByBool) {}`

which makes it quite annoying to turn it into:

`if (fieldNowRepresentedByEnum.Equals(Enum.True))`

Another pain point is refactoring your database is not much fun, especially if you have to ensure that you also migrate data.

The other benefit that you get from enums when compared to booleans is that your method signatures are more expressive. Consider these two signatures (yes, I know completely contrived, but I couldn't think of a better example), and tell me which one you prefer.

```
render(foo, true) // where true represents isVisible
render(foo, Display.Visible)
```

So, next time you start to type `bool` think about using an `enum` instead.
