---
author: Sarah
date: '2008-10-15 20:53:12'
layout: post
slug: recursive-trees
status: publish
title: Recursive Trees
wordpress_id: '73'
categories: design
---

I like recursive algorithms, and I like trees (I mean the data structure, not the <span style="text-decoration: underline;">perennial</span><a title="Trees" href="http://en.wikipedia.org/wiki/Tree" target="_blank"> wooden plant</a> - of course I like them too). So today, I was very glad when I had the chance to implement one on my current project. 

The main construct of the tree is the node. Generally, the node is comprised of the data which describes the node, and a list of all children nodes. For example, in the tree below, node 6 (the circle with 6 in it) has the children node 5 and node 11, and has the data of 6.

<img class="aligncenter" title="Example of a Tree" src="http://upload.wikimedia.org/wikipedia/commons/f/f7/Binary_tree.svg" alt="" width="289" height="253" />

There a certain descriptors of a tree, and their use is context specific. One such descriptor would be the root node - a node without any parents. The root node for this tree is node 2 (the one at the top). Another descriptor would be leaf nodes - nodes without any children. The leaf nodes for this tree are nodes 2, 5, 11 and 4. 

For my project, I had to create my tree from the data in a structure similar to : [ [7, 2], [7, 6, 5], [7, 6, 11], [5, 9, 4] ], where the root node was empty (not 2 as in this diagram). Creating the tree was easy with the help of a little recursion and the use of a stack.

``` csharp
public void BuildTree(List data)
{
	Node rootNode = new Node()
	for each (List treePath in data)
	{
		rootNode.AddChild(treePath as Stack)
	}
}

public class Node
{
	private string _name;
	private List<node> _children = new List<node>();

	public void AddChild(Stack path)
	{
		Node child = FindOrCreate(path.pop())
		if (path.Count > 0)
		{
			child.AddChild(path)
		}
	}

	private void FindOrCreate(string name)
	{
		Maybe<node> child = _children.Find(name)
		if (child.IsPresent)
		{
			return child.Force()
			// if you haven't seen my post on maybe objects, this will return the child node
		}
		return CreateChild(name)
	}

	private void CreateChild(string name)
	{
		Node child = new Node(name)
		_children.Add(child)
		return child
	}
}
```

Persisting this is not as complicated as we first thought. When kicking around persistence ideas, we talked about using Oracle's parent-child recursive constraints. But, all you need is a Node table [int id; string name] which holds the data for each Node, and a mapping table (I called it a parentage table) [int parent_Id; int child_Id] which holds the relationship between parent and child node. Voila! No need of recursive constraints within the database layer.

Recursion is a really powerful tool, and as I proved to myself, trees are actually quite easy to persist.