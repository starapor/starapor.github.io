---
author: Sarah
date: '2009-10-14 07:13:28'
layout: post
slug: slippers-how-to-click-your-heels
status: publish
title: 'Slippers: How to click your heels'
wordpress_id: '260'
categories: Open source projects
---

In my l<a href="/thoughts/open-source-projects/slippers-introduction/">ast post</a> about <a href="http://slippersrb.com">Slippers</a>, I introduced it's philosophy and the places that you could find it. In this post, I will introduce some of its constructs.

Rendering template of a string without any holes
``` ruby
template = "This is a string without any holes in it"
engine = Slippers::Engine.new(template)
engine.render #=> "This is a string without any holes in it"
```

Filling in a hole within a template
``` ruby
template = "This is a string with a message of $message$"
engine = Slippers::Engine.new(template)
engine.render(:message => "hello world") #=> "This is a string with a message of hello world"
```

Rendering a subtemplate within a template
``` ruby
subtemplate = Slippers::Template.new("this is a subtemplate")
template_group = Slippers::TemplateGroup.new(:templates => {:message => subtemplate})
template = "This is a template and then $message()$"
engine = Slippers::Engine.new(template, :template_group => template_group)
engine.render #=> "This is a template and then this is a subtemplate"
```

Applying an object to a subtemplate
``` ruby
subtemplate = Slippers::Template.new("this is a subtemplate with a message of $saying$")
template_group = Slippers::TemplateGroup.new(:templates => {:message_subtemplate => subtemplate})
template = "This is a template and then $message:message_subtemplate()$!"
engine = Slippers::Engine.new(template, :template_group => template_group)
engine.render(:message => {:saying => 'hello world'}) #=> "This is a template and then this is a subtemplate with a message of hello world!"
```

Applying an object to an anonymous subtemplate
``` ruby
template = "This is a template and then $message:{this is a subtemplate with a message of $saying$}$!"
engine = Slippers::Engine.new(template)
engine.render(:message => {:saying => 'hello world'}) #=> "This is a template and then this is a subtemplate with a message of hello world!"
```

Render a subtemplate using a different rendering technology
``` ruby
age_renderer = AgeRenderer.new
subtemplate = Slippers::Engine.new('$first$ $last$')
person = OpenStruct.new({:name => {:first => 'Fred', :last => 'Flinstone'}, :dob => Date.new(DateTime.now.year - 34, 2, 4)})
template_group = Slippers::TemplateGroup.new(:templates => {:name => subtemplate, :age => age_renderer})
engine = Slippers::Engine.new("Introducing $name:name()$ who is $dob:age()$.", :template_group => template_group)
engine.render(person) #=> "Introducing Fred Flinstone who is 34 years old."
```

Select a renderer based on the type of the object to render
``` ruby
person = OpenStruct.new({:name => {:first => 'Fred', :last => 'Flinstone'}, :dob => Date.new(DateTime.now.year-34, 2, 4)})
template_group = Slippers::TemplateGroup.new(:templates => {:name => Slippers::Engine.new('$first$ $last$'), Date => AgeRenderer.new})
engine = Slippers::Engine.new("Introducing $name:name()$ who is $dob$.", :template_group => template_group)
engine.render(person) #=> "Introducing Fred Flinstone who is 34 years old."
```

Use the specified expression options to render list items
``` ruby
template = 'This is a list of values $values; null="-1", seperator=", "$'
engine = Slippers::Engine.new(template)
engine.render(:values => [1,2,3,nil]) #=> "This is a list of values 1, 2, 3, -1"
``` 