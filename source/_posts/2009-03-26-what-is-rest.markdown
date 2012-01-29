---
author: Sarah
date: '2009-03-26 13:50:28'
layout: post
slug: what-is-rest
status: publish
title: What is REST?
wordpress_id: '159'
categories: design
---

There has been quite a lot of discussion on mailing lists that I am on about what it means to be RESTful. It has occurred to me that the reason for many of these discussions is that people only hear tidbits about REST and therefore draw wrong conclusions about it.
Here is my understanding:

<strong>Representation State Transfer</strong> (<a href="http://en.wikipedia.org/wiki/Representational_State_Transfer">REST</a>) was introduced in 2000 by <a href="http://www.ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.htm">Roy Fielding</a>, who is one of the authors of the HTTP specification. It is an architectural style for the web (or distributed hypermedia systems) which dictates how clients will access your application. It puts the method information in the <a href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html">HTTP method</a> and the scoping information in the URI. There are commonly 4 questions that REST allows a client to ask your application:

1. can you please <strong>GET </strong>me the <strong>REPRESENTATION </strong>for <strong>THIS_RESOURCE </strong>from your application
2. can you please <strong>PUT </strong>THESE_VALUES for <strong>THIS_RESOURCE</strong> into your application
3. can you please <strong>DELETE THIS_RESOURCE</strong> from your application
4. can you please <strong>POST </strong>THIS_MESSAGE so <strong>THIS_RESOURCE</strong> can handle it.

The GET request is idempotent and should not change anything on the server; it is a read-only action. Ideally, these requests should be cachable so that your application benefits from the architecture of the web. Your PUT and DELETEs should be idempotent, which means that it doesn't matter how many times you send an identical request, the result is always the same as if you only sent down a single request (excluding concurrency issues). The idempotent nature is important as this allows you to have stateless servers.
GET and PUT are not Yin/Yang messages - just because you PUT a certain message to a resource, <em>does not</em> mean that you will get that same message back on a GET.

You will notice that unlike many other articles, I <strong><em>have not </em></strong>mentioned or related the verbs to CRUD. This is important to note, as it is something which I think confuses people. The REST representation of the resources dictate <em>how</em> the client would like to <em>view</em> the data, not how the server should manipulate or store that data. Like any good contract, it does not ask you to reveal its internal structure, so long as you satisfy the request. (Note: REST works really well with consumer-driven contracts).

<strong>Resources</strong>
A resource can be anything that is of interest to you. For instance, you might have a resource for a Book, for an author, for many books or for the collection of all authors and all books available. Resources are addressed by unique URIs.
Ideally, for humans, you want your URIs to be logical and guessable ie a URI for a specific author would be<em> /author/{authors_name}</em> a URI for all authors would be <em>/author</em> a URI for all the books written by a specific author would be <em>/author/{authors_name}/books</em>.
Contradictory to this, it is also good to treat URIs opaquely and therefore you can't assume a hierarchical nature, eg ISBN is a classic opaque non-hierarchical URN. The more we support this, the more interconnected our websites can be; imagin searching for ISBN:0321125215 and getting all the results from Amazon, Waterstones, eBay and Borders. This is the vision of the semantic web.

<strong>Representations</strong>
A representation is nothing more that a view of a resource. Kind of like shining a light on a cone, depending upon where the spotlight is shining, you may get a circle, an ellipse or a triangle. It does not take away from the fact that the object is actually a cone. And just as shining a spotlight on a cone is like the response of a GET request, the message sent by POST needs specify only parts of the object, perhaps the height of the triangle, or the circumference of the circle.

Jim Webber, Ian Robinson and Savas Parastatidis have written a nice article on<a href="http://www.infoq.com/articles/webber-rest-workflow" target="_blank"> how to GET a cup</a> of coffee that I recommend reading.