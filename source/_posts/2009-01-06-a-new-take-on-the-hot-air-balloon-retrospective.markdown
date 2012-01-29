---
author: Sarah
date: '2009-01-06 14:56:25'
layout: post
slug: a-new-take-on-the-hot-air-balloon-retrospective
status: publish
title: A New Take on the Hot Air Balloon Retrospective
wordpress_id: '132'
categories: agile
---

I am not a huge fan of the iteration-based retrospectives that people usually run. These are the retrospectives in the format where you write about
<ul>
	<li>What We Did Well</li>
	<li>What We Did Less Well and</li>
	<li>What's Puzzling Us</li>
</ul>
I find with these retrospectives, the same issues seem to crop up, with actions that don't get resolved and nothing really improves for the next iteration.

I think the main reason we should do iteration-based retrospectives is to focus on what will make us go faster next iteration, and what are our current impedances. The best retrospective 'game' I have seen to support this is the hot air balloon/speed boat** analogy. This means that issues should not get raised which do not directly impact how fast we could potentially go. I have tried this exercise before, and have found that it was too broad a scope, and so not many new ideas came out***.

Yesterday, I tried a variant on the hot air balloon exercise, with really good results.
<h3>The New Format</h3>
<ol>
	<li>Place the stories of the iteration (stories that were completed, in QA, in development and ones not started) on a wall in a pseudo timeline</li>
	<li>Group any 'bug' cards around the stories to which they belonged (these 'bugs' were issues that the QAs found which meant that a story could not be QA signed off and therefore needed more dev effort).</li>
	<li>Describe the story on the wall (similar to the timeline game), to get everyone back into the mindset of when they were working on the stories. It is also useful to state the estimate for the story and the actual time it took to deliver.</li>
	<li>Give the group time to write stickies for each story, with the focus on why they thought the story took longer to complete or was faster than expected. The idea is to explain the hot air balloon metaphor, and get them to focus their thoughts for each particular story. Essentially, I said to them "What was the magic sauce that made this story really quick and easy to do; and what was the crud that got in the way?"</li>
	<li>Walk through each sticky note, identify themes, discuss and record any action items.</li>
</ol>
<h3>The Result</h3>
The issues that we discussed highlighted problems that were not caught doing the usual style. The actions from the issues discussed directly corresponded with ways to improve the velocity of the team.

By turning the focus onto each story lifted the pressure of having to think generally out of the box, and focussed the teams effort to think about what was really the problem. This highlighted not only external problems, eg too many meetings, but also lead to an examination of the code base, eg It took me too long to add that line to the screen so I think that area of code needs a clean up.

All in all, this is an exercise that I will repeat.

** The narrative I give with the hot air balloon goes something along these lines. "The hot air balloon is like our velocity, it has the potential to go really high (fast) but the problem is two-fold. We have sandbags (impedances) which are currently actively slowing us down and we don't have enough fire (which is trying to lift us up). So lets think about what in our project are our sandbags and what is our fire. What is slowing us down, and what could we do to go faster". The speed boat has anchors in the water as impedances and an engine as fire.

***  Actually, I played this after weeks of the usual retrospectives defined above and most of the what we did well stickies were placed in the fire area, and the what we did less well were placed in the sand bags.