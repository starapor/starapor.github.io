---
author: Sarah
date: '2020-02-20 17:26:30'
layout: post
comments: true
slug: Commands not passive aggressive events
status: publish
title: 'Commands, not passive aggressive events'
categories:
- architecture
---

In my last post, I shared an [explanation of the key concepts](https://sarahtaraporewalla.com/architecture/Event-Driven-Architecture-Terminology) that fall under the Event Driven Architecture umbrella. However, there is a significant distance between understanding the concepts of Event Driven Architecture and getting your first event published in production. Today I want to share one of the quandaries we faced as we implemented our Event Driven Architecture - how to treat events that seem critical to the flow of a business process. 

In our restaurant example that I talked about in [a previous post](https://sarahtaraporewalla.com/architecture/Event-Driven-Architecture-Terminology), let us consider the process of taking an order and making it.

In our first implementation, we modelled the Waiter raising an event _Table 26 has ordered Steak and Chips_ to which the Kitchen picked it up and started to make the order. But the more we thought about this the more we realised that those two processes were joined - if the Waiter raised the _Ordered_ event, the Kitchen needed to make it. After all, you wouldn’t be too happy sitting in the restaurant with a Kitchen that didn’t listen to your _Ordered_ event. We started to refer to these events as _passive aggressive events_. We don’t want passive aggressive events.

![Restaurant Services](/assets/posts/event_driven_architecture_terminology/passive-aggressive-event.png){: .img-thumbnail}

So we changed the design so that the Waiter went and told the Kitchen directly. Now - whenever I see a service talking directly to another I pause to wonder if we have the right bounded context. Should the services really be separated? Or are they actually parts of the same service? In this case, we were happy to keep the Waiter and the Kitchen separated.

![Restaurant Services](/assets/posts/event_driven_architecture_terminology/direct-call.png){: .img-thumbnail}


As the restaurant got busier, we started to see inefficiencies. Our Waiter was standing at the Kitchen, waiting for the Kitchen to stop talking to other Waiters. In the time our Waiter had to wait, they could be taking orders from other tables. The number of orders that we could take was limited. And when the Kitchen went on their smoko break, no orders could be taken at all! 

We needed the decoupling of processes that our Events provided, with the guarantee that an event would be picked up. 

We changed our model again. In our third attempt, the Waiter would pin the order _Steak and Chips for Table 26_ on the Order Queue Board at the Kitchen door. The Waiter then went back to taking orders for other tables. When it was available, the Kitchen would take the Order from the Order Queue Board and start making it. Incidentally, the Waiter also the _Table 26 has ordered Steak and Chips_ event so any other listeners could continue to react to the event.

![Restaurant Services](/assets/posts/event_driven_architecture_terminology/event-and-command.png){: .img-thumbnail}

In changing our passive aggressive event, into a command which was directed to the Kitchen and only the kitchen we were able to provide a nice way to decouple the processes within separate services. We also made use of the underlying eventing technology, by creating a separate topic for these commands from the main event stream topic. 

Commands, not Passive Aggressive Events was our answer to the quandary of how to treat events that seem critical to the flow of a business process. It might have taken us a few goes to arrive at this, so I hope this post helps you on your journey to jump straight to this answer for you.

