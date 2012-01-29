---
author: Sarah
date: '2011-07-08 12:45:06'
layout: post
slug: experience-report-branch-by-feature
status: publish
title: 'Experience Report: Branch by Feature'
wordpress_id: '370'
categories: design
---

I have been made aware of some negative responses to <a href="http://martinfowler.com/" title="Martin Fowler" target="_blank">Martin Fowler</a> & <a href="http://mikemason.ca/blog/" target="_blank">Mike Mason</a>'s <a href="http://www.thoughtworks.com/perspectives/30-06-2011-continuous-delivery">discussion on Branch By Feature</a>.

Perhaps unsurprisingly, I agree with Martin & Mike's view on branching. I have been on several projects that have adopted various strategies like branching by features, feature toggling & branching by abstraction so I have personal history to back up what others say about branching. But, the argument goes that that was when we were using source control systems that made branching and merging difficult and painful, like CVS, subversion and Perforce. This is true. But on my last client, we used git and branch by feature. This is my experience working in this way....

At my last client, we used started by using Git and branch-by-feature[1]. Features would take anywhere from 1 day to 5 days to complete. At the end of the feature, it would be merged back to master (having been good little girls and boys and continuously merging from master ...that is CI isn't it???)[2], pushed and then CI would trigger. 

Guess what happened - tests on CI would fail because CI was running a bigger suite of tests than our cmd line. Ok, so we didn't have CI running on the branch, but really - what harm did it do? So you had to spend a little extra time fixing those tests....we're not buying that whole "you're not really doing CI" argument. Branch by Feature is cool - look - you can clearly see which changes relate to a story and you can back them all out if you need to.

Then, QA gets their mits on it for the first time. Those little devils..they're raising little pink stickies on my story! Well, better go fix them....on master. Wait - so the paradigm of branch-by-feature is only until the dev's think its finished?[3]

But lol - a nice big juicy refactor story comes along. You know the one - the kind where you roll up your sleeve, batten down the hatch cause you are going to be there for a while. After 5 -7 days, you poke your head up again, and decide - jobs a goodin', lets merge and push to master. But despite how well git handles merges, if you have removed/renamed/modified a method that a new piece of code relies on, git cannot help you. So you fix all compilation problems, and run tests (of course, we're agile) and BOOOM!!! failed tests. They are harder to decipher. And didn't we fix half of these before? grrr....so, 5-7 days after you finished the refactor, you spend another 1-2 days in merge hell...and this was with GIT!!!

Boy, you think we would've learnt that first time. But in spectacular face-palm fashion, we persevered with branch-by-feature always promising we would do it better next time. Fool me once, shame on — shame on you. Fool me — You can't get fooled again.

Don't worry - we did learn. We added feature toggles to help with the testing of a story (also using branch-by-abstraction). Then, when the 3rd party the new code was talking to wasn't ready by the release date, we switched the toggle back to the old way, released all the other new features, thoroughly impressed the client (who believed that we would need to wait another 3 months for the 3rd party) and felt chuffed ourselves. After that, we hopped onto the release train, all stories developed on master with feature toggles where necessary and got the business back into fortnightly cycles, without the pain of branching-per-release[4]

Next time, I don't think that I would be so diplomatic towards branch-by-feature....if I see it again, I think that I might stamp it out straight away. Every time I have seen it (and this is on 6 mthly branches, monthly branches, fortnightly, weekly & daily) the same problems keep coming up[5]. 


[1] actually - to clarify...when I rolled onto the project, that is what the team was doing so I decided to see how well it would go...
[2] for those who are sarcastically-challenged, that was said tongue-in-cheek.
[3] that wasn't the only strategy tried..but it was the quickest for small fixes...for larger change there was a debate as to whether you should create a new branch or just merge current master into the old branch and continue...both send shivers down my spine...
[4] we also tried various techniques with branching-per-release...we had another Go pipeline setup so that any releases or hotfixes would move through that. For a little while, this was important as UAT uncovered some stuff to fix, but in the end it was unnecessary as we just released whatever was the lastest good build - and toggled off all the other incomplete features. 
[5] actually...git's branching does make it really cool for spikes and helping you work out how to refactor a piece of code...but once discovered, ditch it and start from scratch on master