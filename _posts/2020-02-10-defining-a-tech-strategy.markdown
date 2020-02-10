---
author: Sarah
date: '2020-02-10 20:44:30'
layout: post
comments: true
slug: Defining a Tech Strategy
status: publish
title: 'Defining a Tech Strategy'
categories:
- agile
- design
- architecture
---

Recently, I have been consulting to CTO/CIOs to help them create and execute the Technology Strategy for their company. I wanted to share the types of things that I consider during this process.

To help set the direction for the creation of our Tech Strategy, I have found value in focusing around a document - creatively called the **_Tech Strategy document_**.

## Purpose
The Technology Strategy document defines a vision for the role technology plays in support of the business. It should define: 
- Our vision for how technology supports the business strategy 
- The values, principles and guidelines which inform our architecture and decisions 
- The architecture vision and roadmap to that vision 
- The [Cross Functional Requirements](https://sarahtaraporewalla.com/agile/design/decade_of_cross_functional_requirements_cfrs) which can be used to judge the operation of our system 
- The accepted defaults for tools, technologies and frameworks 
- Architecture Operating Model (a framework to support the aspects of the Tech Strategy) 
 
Ideally, a Tech Strategy document, once written, should not be left to go stale. Simultaneously, a Tech Strategy should provide enough direction that it does not require constant revision and updates. The strategy defined should be sufficient enough to support teams for six months. 
 
I recommend that teams revisit the Tech Strategy document quarterly to remind teams of the direction and update it with what we have learned from implementing the strategy during that time. Furthermore, a more comprehensive and deeper enquiry into the higher level concepts of the Business Strategy, Tech Strategy and Tech Vision every six months is key to the Tech Strategy remaining a _living document_. 

## Format
I encourage teams to actually create a _word(y) document_, instead of a _slideument_. By putting effort into writing proper sentences and paragraphs, supported by visuals, tables and graphs, I find the document can stand in your stead. Without the need for you to explain the nuances of the strategy, this document also serves well as an onboarding document and a refresher for teams to refer back to when making decisions.

The contents of the document follow roughly this format:

### Executive Summary
On the title page, we include an executive summary of any changes we have made in this version and highlight all important areas a reader who is already familiar with previous versions should pay particular attention to

### Purpose
I start the document with the purpose of the document (ie the Purpose section of this post). It helps set the tone and understanding of what we are doing.

### Business Strategy
Given the Tech Strategy should underpin the Business Strategy, I find it useful to give an understanding of the purpose and vision of the business, highlighting any important aspects where Technology is a significant enabler. I try to include a high level Capabilities Map of the business too to show how Business, Product and Technology capabilities intersect and support each other. 

### Tech Vision
This is where we define our vision. Are we continuing on the existing platform, or are we considering a legacy migration? Are we expanding into different technologies, or are we consolidating our services? What is our elevator pitch for what we are doing?

I also document our Tech and Architecture Values, Principles and Guidelines here. If you want great references for your own Architecture Values, Principles and Guidelines I recommend you look at the following examples:
- [John Lewis](http://engineering-principles.onejl.uk)
- [Monzo](https://monzo.com/blog/2018/06/29/engineering-principles)
- [UK Government Digital Service](https://www.gov.uk/service-manual/service-standard)
- [Scout24](https://github.com/Scout24/scout24-engineering-values-and-principles)
- [MYOB](https://res.infoq.com/presentations/platform-manifesto/en/slides/sl8.jpg)
- [ThoughtWorks](https://www.thoughtworks.com/insights/blog/what-are-our-core-values-and-practices-building-software)

### Architecture Vision
I recommend that teams adopt an Evolutionary Architecture approach to their architecture. So while we don’t prescribe the end state, we can set the direction we are headed. We do that by defining 
- the _current state_ (through high level diagrams of our software components, our infrastructure view and a commentary on the these aided by quantitative analysis eg toxicity reports)
- our _future state_ (through high level diagrams of software components and infrastructure and a commentary about what we are trying to achieve); and
- a _transition plan_ towards our future state - what is the next thing we are doing to get us there?
 
### Cross Functional Requirements
_[Many years ago](https://sarahtaraporewalla.com/agile/design/i-dont-believe-in-nfrs), I coined the phrase Cross Functional Requirements. You might know them as Non Functional Requirements, the Quality attributes or the -ilities_

Our Cross Functional Requirements (CFRs) help us understand and judge how our system will operate in production. Some requirements cut across the whole system; others have specific requirements to support certain business processes. The aim of this section is to detail the CFRs which guide the system as a whole. Each feature should use these CFRs as a baseline and adjust according to the specific requirements of that feature. 
 
### Tech Radar
In order to balance freedom and autonomy within teams with consistency across teams, I find having a default list of accepted tools and technologies helpful. 
 
Inspired and influenced by the ThoughtWorks biannual publication of the [Tech Radar](https://www.thoughtworks.com/radar), I help teams build their [own radar](https://www.thoughtworks.com/radar/byor) to define the tools, technologies, techniques and platforms applicable to their organisation. The radar creation exercise also provides an opportunity to have a conversation across all organizational levels and review the entire technology portfolio. 
 
### Architecture Operating Model
The Architecture Operating Model describes the approach to architecture and provides a framework for architectural decisions and direction. The framework provides an opinion on: 
- Roles and responsibilities 
- Ways of Working 
- Decision making process 
- Decision tracking 
- Artefacts produced 
- Sharing architectural decisions with the wider audience 
 
## Distribution
I usually find the initial impetus to produce this document wanes over time, so instead of getting teams to have a perfect first version, embrace the fact that we will continue to improve over time. We set a deadline to produce the document, do the best we can in that time, and then send it out into the world.

### Go Live
The Go Live for this usually involves gathering the Technical teams together to walk through the strategy and document. Then a follow up email with the pdf copy of it, and adding it to the teams wiki or confluence pages. Including reference page to previous copies as well as release dates can help teams go back to explore how our strategy has changed as we learnt more.

The editable word document is usually best kept as the working document between its authors, instead of sharing it with the wider team. 

### Using it for onboarding
As mentioned earlier, I like using this document when introducing new members to the team. Onboarding can often overload the new person, so providing a document that they can refer back to which describes the Whys and Hows of our strategy can help bridge any gaps. After giving them the lowdown, I usually email them a copy of the latest version and encourage them to read it. I also actively seek feedback on the document itself, to see where the gaps lie from a fresh perspective. 




## To Conclude
On one hand, I can’t believe I’m favouring long-form architectural documents! What happened to me…

On the other hand, I found this helps CIO/CTOs and architects formulate their direction, and more importantly communicate that direction to the wider team. What works for you?



