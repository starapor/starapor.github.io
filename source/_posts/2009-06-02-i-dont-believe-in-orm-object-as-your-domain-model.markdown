---
author: Sarah
date: '2009-06-02 22:45:31'
layout: post
slug: i-dont-believe-in-orm-object-as-your-domain-model
status: publish
title: I don't believe in ORM object as your domain model
wordpress_id: '204'
categories: design
---

I have been on a few projects now where we have used ORM libraries to help store our data (eg <a href="http://ar.rubyonrails.org/">ActiveRecord</a> for Rails, <a href="https://www.hibernate.org/">Hibernate</a> (and it's variants), <a href="http://www.castleproject.org/activerecord/index.html">Castle's ActiveRecord</a> for .Net). On these projects, we have used the domain models and the ORM models are the same.

The problem we faced with doing so is the same problems I think most people face : eventually, your domain wants to take your model in one direction, and your relational database wants to take it in another. Personally, I really like Domain Driven Design - I like my objects to be reflective of the domain - and I don't really care about how the database stores them, or indexes or stuff like that (I seem to remember something about BNF back in uni), so I am more inclined to let my model move towards the domain; but I do understand that there are consequences in doing so when looking at how my data is accessed.

I have now come to the belief that there is value in having my domain models but equally having ORM models. More so, I have decided that (despite the perceived increase in classes) there is a true distinction between the two and should be implemented as two separate classes. You can see from my examples what I am talking about, but basically my domain model knows nothing about the ORM model and anyone (apart from the necessary repository) knows about it either. The ORM model is used by the repository of concern as a helpful tool for it to store to the database; it could equally be done using SQL.

``` ruby
# The Domain model - yes there is more to it than that
class RegistrationForm

  def initialize(key)
    @key = key
    @name = ""
    @email = ""
  end
  ...
end
# The repository to find/save a registration
class RegistrationRepository

  def find(key)
    registration = find_registration(key)
    form = RegistrationForm.new
    return form unless registration
    update_form(form, registration)
  end

  def save(form)
    registration = find_registration(form[:key])
    registration = create_registration unless registration
    update_registration(registration, form)
    registration.save
  end

  private

    def find_registration(key)
      registration = Registration[:id => key]
     # This is the sequel equivalent of Registration.Find(key) in ActiveRecord
    end

    def create_registration
      registration = Registration.new
      registration
    end

    def update_form(form, registration)
      form.update(
        :key => registration.id,
        :name => registration.name,
        :email => registration.email)
      form
    end

    def update_registration(registration, form)
      registration.name = form[:name]
      registration.email = form[:email]
    end
end
# The ORM representation (using Sequel as my ORM library)
class Registration < Sequel::Model
  set_schema do
    primary_key :id
    varchar :name
    varchar :email
  end
end
```

Maybe this is something that other folk have already thought of, and I am just catching up, but the proliferation of web MVC style frameworks which mandate persistence layers (eg Rails) makes be think that this may need to be revisited.