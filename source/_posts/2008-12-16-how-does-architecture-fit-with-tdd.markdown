---
author: Sarah
date: '2008-12-16 21:12:25'
layout: post
slug: how-does-architecture-fit-with-tdd
status: publish
title: How does Architecture fit with TDD
wordpress_id: '121'
categories:
- design
- testing
---

The question a lot of people (especially software architects) ask when adopting TDD is how does Architecture fit in the whole Test Driven Design paradigm.

Traditionally, any new functionality is vetted by a software architect who completely designs it (on paper) and sometimes adds the foundation to the code base. The developers in the team then take the designs and implement them, sometimes in a cookie-cutter fashion. The developers often don't understand the design (at least why it is in the form that the architect has specified) and when they start to query it get negative reaction from the architect.

The question is, if we now say our tests will drive out design, where does the architecture go? Won't this just lead to a micro-optimisation, without anyone looking at the system as a whole. Chaos!

In my mind, the role the architect plays in this brave new world is to provide the team with a 50000-ft view of the system. The architecture declares that MVC will be used, how the infrastructure is strung together, but it does not specify which classes will be created, what services will be used and what design patterns will be used. These are really implementation details, and are the elements which are driven by your tests.

Other XP and agile principles will also help with ensuring your newly TDD code base does not turn into chaos. If you adopt a domain driven design approach, then your business layer and logic will be driven out by the business and you will know from that which classes need to be created, what should be a service and what are your repositories. If you adopt pair programming, then the 'architects' experience can be shared with other team members and the knowledge of what constitutes good design increases, lessening the role of the architect. 

So, how does Architecture fit into TDD? Quite nicely, I think.