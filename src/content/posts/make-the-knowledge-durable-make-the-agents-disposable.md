---
title: Make the Knowledge Durable. Make the Agents Disposable.
pubDatetime: 2026-09-30T04:41:00.000Z
description: What if enterprise agents were designed to be replaced? A case for making organisational knowledge and capability durable while treating the agents themselves as disposable.
tags:
- 'technology'
- 'engineering'
- 'leadership'
- 'ai'
- 'agentic-ai'
draft: false
---

# Make the Knowledge Durable. Make the Agents Disposable.

I think enterprise agents should come with an expiry date. My current thinking is six months.

Not a review date or a reminder to check whether the dependencies need upgrading. I mean starting with the assumption that six months from now, this agent should no longer exist in its current form.

This goes against a lot of how we think about enterprise software. We build technology assets with the expectation that they will last. We capitalise them, maintain them, extend them and create roadmaps for them. And, if we're being realistic, we tend to keep them alive considerably longer than anyone originally intended.

I'm increasingly convinced that applying the same thinking to agents would be a mistake.

## Six months is a long time in AI

Think about how much the way we build with AI has changed in just the last six months. Capabilities that required quite complicated orchestration are becoming native model capabilities. Models are changing, context windows are growing, tool use is improving and entirely new interaction patterns are appearing.

An agent we carefully engineer today might exist because we're compensating for a limitation that simply doesn't exist six months from now.

But I can easily imagine what happens inside an enterprise. We've invested in the agent. It works. People depend on it. Someone owns it. There's a backlog of improvements. So we keep building on it.

Eventually we end up maintaining an increasingly complicated agent architecture designed around the constraints of models that have long since moved on.

This is how legacy happens. The difference with AI is how quickly it could happen.

## What if we reversed the burden of proof?

Most enterprise technology gets an implicit right to continue existing. Once something reaches production, replacing it requires a business case. Someone needs funding, needs to justify the disruption and needs to demonstrate that the replacement will create enough value to warrant the effort.

I'd like to reverse that assumption for agents.

At six months, the question shouldn't be *"is there enough value in replacing this?"* It should be *"is there enough value in keeping this implementation?"*

Maybe there is. Maybe we change the underlying model. Maybe we rebuild the orchestration because the tools have moved on. Maybe the foundation model can now do something natively that previously required a lot of custom engineering. Maybe the capability has been absorbed somewhere else. Or perhaps we've discovered that nobody is really using it and we retire it completely.

I'm not suggesting we ceremonially rebuild every agent twice a year. Six months isn't magic. I'm suggesting we change the default: **continuation needs to be a deliberate decision rather than something that just happens.**

## If the agent disappears, what remains?

This is where I think it gets architecturally interesting.

If I delete an agent tomorrow, what do I lose?

The answer shouldn't be the organisational knowledge it has accumulated. Its data shouldn't belong to it. Its instructions, policies and operating rules shouldn't be buried inside its implementation. Its evaluations shouldn't disappear with it. The history of what it has done and why should remain available.

The agent can disappear without taking the organisational capability with it.

This means we need to be deliberate about where durable value lives. Knowledge needs its own architecture. Data needs to be treated as products. Instructions and policies need to exist independently of whichever model happens to execute them. Evaluations need to describe what good looks like so that we can evaluate the next implementation against the last one.

It gives me a fairly simple architectural fitness function:

**If replacing an agent means losing organisational knowledge, you've put the knowledge in the wrong place.**

## The product is not the implementation

In my last post, I wrote about treating institutional agents as products. I still think that's the right model, but I've realised there's an important distinction between the product and the implementation of it.

Imagine we have an institutional Product Health agent. Its role is to continuously understand the health of our digital products across customer, commercial, operational and engineering signals, identify material changes and make those insights available to the organisation.

That organisational capability could exist for years.

Product Health v1 might use one combination of models, tools and orchestration. Six months later, v2 might be dramatically simpler. A year later, the best way to deliver the capability could look nothing like what we originally built.

The identity can remain. The mandate can remain. Its consumers can remain. The data products, knowledge and evaluation criteria can remain. What doesn't need to remain is the implementation.

In fact, I think we should **design the agent so replacing it is cheaper than preserving it.**

## Build the system around the assumption of replacement

This doesn't mean throwing away good architecture. Quite the opposite.

Loose coupling, stable interfaces, separation of concerns and modularity become even more important. But perhaps we're using those principles towards a slightly different goal.

We're not designing the agent itself to survive change. We're designing the system around it so the agent **doesn't need to survive**.

Knowledge lives outside it. Data lives outside it. Identity and permissions are managed outside it. Instructions are portable. Outputs have provenance. Effectiveness can be independently measured.

The agent becomes a replaceable participant in a much more durable system.

This changes where I think the investment should go. Rather than investing heavily in making individual agents increasingly sophisticated and permanent, invest in the environment that makes agents cheap to create, evaluate, replace and retire.

## This might be uncomfortable for enterprises

There is an obvious tension here with how large organisations think about technology investment.

Our funding, accounting and governance processes have grown up around the idea that when we invest in technology, we're creating an asset with an expected useful life. There is something inherently uncomfortable about deliberately creating technology while expecting to throw away its implementation six months later.

But perhaps we're looking for durability in the wrong place.

The value we've created isn't necessarily the agent code. It's the organisational knowledge we've captured, the data we've made accessible, the evaluations we've developed, the processes we've understood and the interfaces we've established.

Most importantly, it's the ability to take advantage of the next generation of intelligence without having to rebuild the organisation around it.

I don't want today's exciting agent experiments quietly becoming the legacy estate we're complaining about five years from now.

So rather than asking:

**How do we build an agent that will last?**

I'm starting to ask:

**How do we build an organisation where the agent doesn't need to?**

Make the knowledge durable. Make the data durable. Make the capability durable.

And make the agent disposable.