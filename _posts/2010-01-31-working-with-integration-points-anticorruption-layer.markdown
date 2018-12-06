---
author: Sarah
date: '2010-01-31 21:09:48'
layout: post
comments: true
slug: working-with-integration-points-anticorruption-layer
status: publish
title: 'Working With Integration Points: Anticorruption Layer'
wordpress_id: '282'
categories: design
---

On my last few projects we had a requirement to integrate our application with another system. Adding to this complexity was the fact that these other systems where also still being developed. I learned a few tricks on the first of these types of projects which really helped the latter projects which I shall share with a wider audience here.

The first of these tricks was to enforce a strict layering of my application and introduce an anti-corruption layer. This layer was responsible for dealing with the interface to the other system, and often hiding any crapiness of either the api or transport protocol from the rest of the application. It ensured that any business logic remained in the business services layer and any api/transport logic remained in the anti-corruption layer (which we called a wrapper).

<a href="/wp-content/uploads/2010/01/layered-diagram.jpg"><img class="size-medium wp-image-291 aligncenter" style="margin: 10px;" title="AntiCorruptionLayer" src="/wp-content/uploads/2010/01/layered-diagram-300x201.jpg" alt="" width="300" height="201" /></a>

The main reason for this was to limit the amount of damage that would occur should the api change (i.e. try to decrease the amount of coupling between the two systems). To support this, the wrapper would talk to the business services in domain language and pass around domain objects which it would transform into the required transport objects.


There are a few cases where the wrappers proved their worth:

* when the service did not populate all the necessary fields for the domain object
* when the domain object did not logically contain a field necessary for the transport
* when the business layers dealt in synchronous calls, and the api dealt with asynchronous calls
* when the a wcf object type changed

It was sometimes hard, especially when dealing with a crappy api that we could not alter, to know if a piece of logic should reside in the business service or in the wrapper. The general rule of thumb we followed was to ask ourselves "if we ever changed this integration point to a different system, would we still need this bit of logic?". (The crappier the api the harder it was to answer).

However, despite what I considered to be the obvious benefits of introducing this layer, I faced a lot of resistance introducing it, especially when it looked like the business service was just a pass through to the wrapper i.e. when the method only had one line in it `_wrapper.Foo()` (actually it turned out that the only reason the service was pass through was because there were fat controllers - pushing the logic from the controller into the service made it look a lot healthier but that is a whole other discussion). What irked me the most is when people invoked YAGNI as a reason not to add a new object. Although that debate is a whole entire post in itself, all I am going to mention here is that YAGNI does not trump SOLID and that anti-corruption layers is nothing more than Single Responsibility Principle (i.e. Separation of Concerns) (and seriously - are you really telling me that adding another object is time consuming, in the world of resharper/intelli-j).
