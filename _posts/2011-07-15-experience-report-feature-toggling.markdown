---
author: Sarah
date: '2011-07-15 05:59:30'
layout: post
comments: true
slug: experience-report-feature-toggling
status: publish
title: 'Experience Report: Feature Toggling'
categories: design
---

Last week, I shared [my experiences with git and feature branching]({{ site.baseurl }}{% post_url 2011-07-08-experience-report-branch-by-feature %}). As I mentioned, we moved away from this and towards [feature toggles](http://martinfowler.com/bliki/FeatureToggle.html) and [branch by abstraction](http://continuousdelivery.com/2011/05/make-large-scale-changes-incrementally-with-branch-by-abstraction/). This is what happened when we did...

Our focus on feature toggles and branch by abstraction was quite accidental. We were changing a fundamental way our system handled calculations by moving from doing them ourselves to asking an external service to perform key calculations for us. As with many an integration point, the external system was not quite ready by the time we started to introduce the modifications, so testing our side was proving to be tricker than initially anticipated. One day, the pair working on the story came to me and said "Sarah, we are having problems changing our tests. We are going to need to change a whole bunch of tests, because they all rely on this value to be calculated on the fly but we now go out to the external system"[1]. We started spitballing ideas, when suddenly, it came to me in a light bulb moment. "Why don't we wrap this class with a switcher", I said. "The switcher can be told which calculator to use - the existing one, or the new external service". BAM. All of a sudden, it made brilliant sense.

You see, one we had this switcher in, we were then free to continue developing this new feature, share the code with everyone and not stuff up our testing in the process[2]. So we continued along, quite happily, with our QA toggling the switch when he wanted to test the new stuff, and switching it back when he wanted to do testing on the other features.

That might have been the end of the story, the brilliance of this solution being completely lost, until the inevitable happened[3]. The external team delivered working code, but it was not production ready - it was way too slow for us to use it in the specified manner. Uhoh! Here come the managers in a series of crisis meetings. After various performance tests, back-and-fro with the other team, and debating what the performance should be, our business sponsors were faced with a dilemma. What should they do? They can't release the software with the way it was performing, but they had a whole bunch of other features in that release that they were desperate to deploy.

"I can always turn off that feature", I said timidly in one meeting. "We haven't removed the ability to calculate internally, we have just hidden it behind a switch. All we need to do is release the current version with that switch turned to internal calculations. Then, when the performance has improved, we can switch the calculations to use the external system. We don't even need a new deployment for that. It will happen automatically with a simple configuration change on the fly". Silence. The room was gobsmacked. "You mean, the business has control of when this feature is to be deployed?", they thought. Of course. That is how it should be.

This incident was probably the only time when my sponsor came to me and told me that I had done a brilliant job[4], that I had saved the company a lot of money by having the foresight to have this architecture in place.

Our imagination and innovation grew from there.

There was a feature in the UI that our product owner wanted to get approval from the rest of the business to remove but it was taking a while to jump through all the necessary[5] hoops. As a release was scheduled for the next day and the next not for another month it was really important to get approval ASAP. But we didn't get approval in time and the product owner didn't care. You see, we added in another toggle around the visibility of that feature. That way when the decision finally came through, one week after the release, the business turned it off and started to see the reward immediately without waiting another 3 weeks for the next release train to come along. Yet another time when we saved the company valuable money.

I also started to talk about allowing our super users to have the external calculations for their plans, and internal calculations for all other uses so that we could get first hand feedback to determine when the performance was indeed good enough. The performance had not improved by the time I rolled off, but we were certainly starting to put thought into this plan.

My mind races to think of all the other uses. Take AB testing for instance. How easy would it be to use these to gather statistics, then discard the unpopular path. BAM - mind explosion.

You see, Feature Toggling is not just a different way to achieve feature branching. It is an architectural choice that, sure, helps with maintaining mainline development but the power is that it hands back control of what features should be enabled and when to the business. And it is there, ready for you to harness. No extra steps required. As awesome as Git is[6], you just cannot compete with something that allows you to not only control what features go into a release but what features are live at any one time[7].

So now you know how we were able to save money by introducing Feature Toggles. What could you do, if you had feature toggles?

---
### Update 16 July 2011
*Whenever you write an experience report, you run the risk of missing out some of your thoughts, assuming that they come across clearly. Thank you to everyone who has given me feedback on this post. I am adding answers at the bottom to address some of the questions that have been raised since originally posting this.*

*How do you ensure that what is going into prod works?*

We achieved this by making the default configuration always be that of production. So, for our QA to test a certain incomplete feature in our QA environment, he had to turn it on explicitly. When a new build was pushed out, the configuration had to be changed again.
My friend, [Chris Bird](http://www.christopherbird.co.uk) recommends that you could consider separating feature flags from the deploy package and make it environmental config. This would mean the QA would not be configuring after each deployment. Perhaps considering tools like Chef to control the environmental config?

*How do you know what toggle is on?*

We had an application configuration page which showed really cool things such as build numbers, db migration version and configuration values of the properties (and where the configuration was set eg app.config, prod.config). This page also exposed the values of all known feature toggles.

*When do you remove the toggle? And who makes that decision?*

I would agree with everyone that they have a TTL. Although we didn't do this, you could put a TTL on the configuration page...or how long it has been in place. Then, after it hits a threshold you remove it. On the project, once it was live we tidied up the code following the boyscout rule. You could also have a TTL wall, making it visible to everybody.
Also, if you know how long the feature has been there without being turned on, you could get that stats for monitoring waste.
As to who makes the decision, I would say that if the business knows you have these toggles, talk to them about keeping them in vs taking them out and the risk/debt you are carrying as a result.
My friend, [Chris Bird](http://www.christopherbird.co.uk) recommends marking the toggles with expirations through a mechanism like ignore attributes in the code. When those ignores expire it breaks a test (and then the build) to warn you about removing these attributes. This could also be a nice technique for reminding you when these things need to be addressed.

*Don't you get an explosion of combination of toggles?*

Yes, so remove them if they are no longer needed.

*If you switch it on in prod, what about testing? How can you ensure that it is tested?*

Doing this was completely to get around the fact that the business wouldn't let us release more frequently. We pushed and pushed and pushed really hard, but we were only able to do fortnightly releases twice before they thought the overhead was too much. What we did was to test it in UAT with the different combinations, so even though we switched it on in prod, we tested it thoroughly in UAT first. I would prefer to just push out a new release, but failing that, this was a good alternative. And I appreciate that that sentiment is not clear in the post, so I hope this clears things up.

[1] full confession - our tests were too unwieldy and smelly. This challenge just highlighted to me the problems with our tests.
[2] before this, we were faced with keeping the code on a separate branch, but with the amount of refactoring that was going on in that crucial area, we were not too keen on the day we had to merge back into master
[3] to be fair, given my talk on integration systems, I should have known better...
[4] if you ever wanted to hear a case study of how negative reinforcing loops impacts team morale, I have some stories for you...
[5] let's face it - they weren't necessary
[6] and it truly is awesome
[7] yes, I know the argument is to remove the toggles once it is turned on, which of course simplifies the code. I leave it as an exercise for the reader to determine the best course of action
