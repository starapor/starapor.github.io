---
author: Sarah
date: '2009-05-20 18:53:52'
layout: post
comments: true
slug: as-a-user-i-want-to-log-in
status: publish
title: As a user I want to Log In
wordpress_id: '188'
categories:
- agile
- design
---

The classic log-in story is often the story that new-to-agile-ist assume you need to develop first. In fact, it is often the last story that should be developed.

The problem is that they see the order that stories should be developed in should mirror the process flow of the tasks that the customer needs to take; after all, you can't buy an item without choosing what you want to buy and you can't buy anything before you login. This might also be due to the stories revolving around the tasks the user needs to undertake instead of the goals they are trying to achieve.

Now,  if I was to build a classic shop-on-line website, the first story that I would start with would be to implement a page which accepts payment information and a Buy Now button in the middle of the page. What is the customer going to buy? The same product that every other customer will buy. Now, this does not seem to be that fantastic for the user - they don't even have a choice in what they are buying, but this is actually the best place to start because it is not the *As a Customer I want to buy a book So that I can learn new stuff* story that we are implementing; it is the *As a Business Stakeholder I want customers to buy my products So that I can make a living* story. By defining our stories based on goals, and ordering the development based on what is more valuable, we can launch our site with only one story complete and still make money.

Now, lets go back to the beloved login story. One thing that I hate is a website which puts up a high barrier-to-entry before I can buy a product. At a real-life store, they don't make me fill in a form to say who I am before I can buy my Big Mac meal; there is no real-world equivalent to the login functionality. What is the real reason that I as a customer needs to login? Where is the value? What is their goal? The next story in this area that you could play would be *As a Customer I want to view my purchase order in an email So that I can keep a record of the payment*. This story could just involve a text field where the user enters their email address if they wish to receive the email receipt (remember, back in the day, receipts from over-the-phone sales would be sent in the post). Again, we can go live with this and we are still not requiring the customer to login.

The final goal that summaries the customers experience is that *As a customer I would like the computer to do some work and remember their details So next time I make a purchase, I only need to place items in the basket and checkout*.  All this requires is the customers email address (a perfect URN by the way - why would you even think about having usernames???) and a password. Importantly, however, the gathering of this information does not need to occur before they purchase their items! It can happen at the end of the transaction, thereby allowing the customer to complete their goal (purchasing their items) without hinderance. 

The customer's goals are now met, and the business stakeholder's goals were met in the very first story, it is only the marketers' goal of wanting to capture information about the customers on the site which has not been met. Usually marketing departments ask that the customers complete a 4 page registration form, in order for customers to register (*As a marketer I want to know information about our customers So that I can target our features to meet their needs*). But, what value or incentive is there for the customer to fill in this information? To appease both our market departments, and our customers, however, we could incentivise the customers by rewarding bonus points which go towards their next purchase for completing their registration form. But also importantly, this does not stop the customer from spending money on your site.

So, next time you go to add a login box on your site, think about what the customers true benefits are.
