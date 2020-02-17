---
author: Sarah
date: '2020-02-17 11:26:30'
layout: post
comments: true
slug: Is Kafka the only option 
status: publish
title: 'Is Kafka the only option?'
categories:
- architecture
---

It’s _Eventuary_ all month long at [ThoughtWorks Australia](https://www.thoughtworks.com/careers/jobs). We have so many projects incorporating Event Driven Architecture underfoot that we thought we would celebrate and share our insights. 

In my last post, I shared an [explanation of the key concepts](https://sarahtaraporewalla.com/architecture/Event-Driven-Architecture-Terminology) that fall under the Event Driven Architecture umbrella. However, there is a significant distance between understanding the concepts of Event Driven Architecture and getting your first event published in production. Today I want to share one of the quandaries we faced as we implemented our Event Driven Architecture - is Kafka the only option?

[Kafka](https://kafka.apache.org/) is gaining popularity and I have heard many teams using it successfully for both data-streaming purposes and Event Driven choreography. Indeed, most of the conversations around EDA seems to assume you are using Kafka, and centralises on Kafka concepts such as Topics and Partitions. It is really impressive, processing messages in the order of magnitude of millions of events per second. Pretty impressive stuff. 

![Kafka](https://kafka.apache.org/images/kafka_diagram.png){: .img-thumbnail}

I’ve also heard that you need to really understand how to deploy a Kafka cluster, and also have lots of pieces deployed to set it up for production performance. The biggest drawback that I have heard people talk about is the complexity of operating a productionised Kafka. 

Our team, though, is coming from a background of C++ MFC app deployed in a data center. While they are doing a great job coming up to speed with dot net core, Azure, docker and [Kubernetes](https://kubernetes.io/), we felt that operating a productionised Kafka system was just a step too far right now.

So we were faced with the quandary of whether to choose a popular technology, which stretches our team’s ability to learn and operate it, or look at alternatives. 

It turns out that [Event Hub](https://azure.microsoft.com/en-au/services/event-hubs/) on Azure is a good alternative for us. As a managed service the operating complexity is significantly reduced. It even provides [Kafka connectors to Event Hub](https://docs.microsoft.com/en-us/azure/event-hubs/event-hubs-kafka-connect-tutorial), which gives us a path towards a managed Kafka service like [Confluent Cloud](https://www.confluent.io/confluent-cloud) if we decide Event Hub no longer meets our needs. 

This decision has allowed us to focus on the design of our events, understand how to play with it locally (FYI - we decided to use a Kafka docker container in our local environment rather than spin up an Event Hub for each dev pair), concentrate on supporting the [Cross Functional Requirements](https://sarahtaraporewalla.com/agile/design/decade_of_cross_functional_requirements_cfrs) and allowed our team the space to address other quandaries we encountered implementing our Event Driven Architecture.

So remember, as you start your EDA journey, that Kafka isn’t the only option. There are a variety of managed services that enable you to do Event Streaming. Apache Kafka might work for you, but [Amazon Kinesis](https://aws.amazon.com/kinesis/), [Microsoft Event Hubs](https://azure.microsoft.com/en-au/services/event-hubs/)  or [Google Pub/Sub](https://cloud.google.com/pubsub/docs/overview) could get you there faster.  It is far better to concentrate on getting the design and model of your Eventing right first than choosing a technology that will unnecessarily burden your team.

