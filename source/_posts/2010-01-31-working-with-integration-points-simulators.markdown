---
author: Sarah
date: '2010-01-31 22:03:10'
layout: post
comments: true
slug: working-with-integration-points-simulators
status: publish
title: 'Working With Integration Points: Simulators'
wordpress_id: '303'
categories: design
---

<div>In my last post about <a href="/thoughts/design/working-with-integration-points-anticorruption-layer/">working with integration points</a> I described how I use anti-corruption layers (wrappers) to hide away any warts of the integration point. In this post, I will explain how I used these wrappers to help develop against an integration point which was also under development.</div>
<div>The problem with two systems being developed concurrently is that it is rare that they are developed at the same rates, or even in the same priority. That means that the consumer can often be left waiting for functionality to be delivered before they can start developing against it. And that assumes that it all works (not a wise assumption if my previous projects are anything to go by).</div>
<div>There is another way however - by using simulators to develop against. The simulators can be as sophisticated as you need them be - either returning pre-canned values or randomising the responses. They can live in-memory or they can be across the wire depending on what your focus is. Or have both types and simulate less and less and you move through the CI pipeline. An in-memory simulator can replace your wrapper easily using your DI container (it also helps draw the distinction between logic for the business service and logic for the wrapper).</div>
<div><a href="/wp-content/uploads/2010/01/simulators.jpg"><img class="aligncenter size-medium wp-image-302" title="simulators" src="/wp-content/uploads/2010/01/simulators-300x201.jpg" alt="" width="300" height="201" /></a></div>
<div>The main importance of simulators is that they let you develop independently of other teams. An added benefit is that they help you define a consumer-driven contract (if you are the consumer). You can also use the simulators to help identify problems with the system - if it works against the simulator and not against the real integration system, then there is a problem with the integration system. If there is a problem even with the simulator then there is a problem in your system. If it works against the in-memory simulator but not against the simulator across the wire, then your problem lies somewhere on the wire.</div>
<div>Simulators can really help you in your development - don't be afraid by the effort you need to spend to create them. Obviously you need to weigh up the benefits of the sophistication of the simulator with the effort to maintain them but there is often a nice balance to strike.</div>