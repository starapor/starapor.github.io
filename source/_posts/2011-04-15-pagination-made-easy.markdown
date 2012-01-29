---
author: Sarah
date: '2011-04-15 15:37:39'
layout: post
comments: true
slug: pagination-made-easy
status: publish
title: Pagination Made Easy
wordpress_id: '352'
categories: design
---

Ok, so I am doing a little happy dance right now, because I managed to get pagination into our application in less than a day. It is not your traditional pagination: where you specify the page number (and if you are lucky enough, also the page size). I find no real user meaning behind this. Instead, it allows you to specfy the range you want to look at. So, for the first 20 items, you would look at the items starting at 1 and ending at 20. To look at the next 20 items, you start at 21 and ending at 40. So far, that is just a different implementation to Page 2. Now, suppose the items that are actually interesting to you are items 10-30. In the Page model, you need to go back and forth between page 1 and 2. In this model, you only need to look at items starting at 10 and ending at 30. Brilliant huh! Nice implementations of this would be sliding windows, facebook style "more items", and the version that we have (a hybrid between predefined pages and the ability to specify an exact range).


Here is how I did it (tests and other junk removed for readability):

<strong>.Net Code</strong>
``` csharp
public class Pagination<PaginatedType> : IEnumerable<Pagination<PaginatedType>.Page>
{
	private readonly IList<Page> pages = new List<Page>();
	private readonly Page currentPage;
	private readonly IEnumerable<PaginatedType> paginatedCollection;
	private readonly int maximumCount;

	public Pagination(IEnumerable<PaginatedType> paginatedCollection, int maxCount, Page currentPage)
	{
		this.maximumCount = maxCount;
		this.paginatedCollection = paginatedCollection;
		var pageSize = currentPage.PageSize();
		for (var i = 1; i < maxCount; i+=pageSize)
		{
			pages.Add(new Page {StartingAt = i, EndingAt = i+pageSize-1});
		}
		this.currentPage = currentPage;
	}

	public IEnumerable<PaginatedType> PaginatedCollection
	{
		get { return paginatedCollection; }
	}

	public int MaximumCount
	{
		get { return maximumCount; }
	}

	public Page CurrentPage
	{
		get { return currentPage; }
	}

	public bool IsTheCurrentPage(Page page)
	{
		return currentPage.Equals(page);
	}

	public IEnumerator<Page> GetEnumerator()
	{
		return pages.GetEnumerator();
	}

	IEnumerator IEnumerable.GetEnumerator()
	{
		return GetEnumerator();
	}

	public struct Page
	{
		public int StartingAt;
		public int EndingAt;

		public string Name()
		{
			return string.Format("{0}-{1}", StartingAt,EndingAt);
		}
		public int PageSize()
		{
			return EndingAt - StartingAt + 1;
		}
		public bool IsValid()
		{
			return StartingAt <= EndingAt &amp;&amp; StartingAt > 0;
		}
	}
}

public interface IWillFindYouTreasures
{
	Pagination<Treasure> FindTreasuresFor(Pagination<Treasure>.Page page);
	Pagination<Treasure>.Page FirstPage();
}

public class PaginatedTreasureFinder : IWillFindYouTreasures
{
	private readonly IPropertyStore propertyStore;
	public PaginatedTreasureFinder(IPropertyStore propertyStore)
	{
		this.propertyStore = propertyStore;
	}

	public Pagination<Treasure> FindTreasureFor(Pagination<Treasure>.Page page)
	{
		if (!page.IsValid())
		{
			return new Pagination<Treasure>(new Treasure[] {}, Treasure.Count, FirstPage());
		}

		var criteria = DetachedCriteria.For<Treasure>()			
			.SetFirstResult(page.StartingAt-1)
			.SetMaxResults(page.PageSize());

		var treasures = ActiveRecordMediator<Treasure>.FindAll(criteria);
		return new Pagination<Treasure>(treasures, Treasures.Count, page);
	}

	public Pagination<Treasure>.Page FirstPage()
	{
		var endingAt = propertyStore.Get(ApplicationProperty.FirstPageEndingAt).AsIntOr(1);
		return new Pagination<Treasure>.Page {StartingAt = 1, EndingAt = endingAt};
	}
}

public class TreasureController : Controller
{
	private readonly IWillFindYouTreasures treasureFinder;

	public TreasureController(IWillFindYouTreasures treasureFinder)
	{
		this.treasureFinder = treasureFinder;
	}

	[AcceptVerbs(HttpVerbs.Get)]
	public ActionResult Show(int id, int startingAt, int endingAt)
	{
		var page = new Pagination<Treasure>.Page {StartingAt = startingAt, EndingAt = endingAt};
		var treasures = treasureFinder.FindTreasureFor(page);
		ViewData["Pages"] = treasures;
		return View("Show");
	}
}
```

<strong>View</strong>
``` html
<div>
	<span>There are currently <span class="treasure-count"><%= Pages.MaximumCount %></span> treasures available.</span>
</div>

<div class="pagination custom-page-select">
  <div class="options">To view specific treasures, please enter the number to start at <%= (RawHtml)Html.TextBox("StartingAt", Pages.CurrentPage.StartingAt)%> and to finish at <%= (RawHtml)Html.TextBox("EndingAt", Pages.CurrentPage.EndingAt)%> and click <%=(RawHtml)Html.ActionLink("Go", "Show", "Treasure", new { }, new { id = "paginateDirectly" })%></div>
  <div class="clear"/>
</div>

<div class="treasures-list">
	<% new TreasuresRenderer().RenderTreasures(Pages.PaginatedCollection); %>
</div>

<div class="pagination menu">
	<span class="info">Please select a range of treasures to view.</span>
	<ul>
		<% foreach (var page in Pages) { %>
		<li class="pages<%= Pages.IsTheCurrentPage(page)? " currentPage" : string.Empty %>"><%=(RawHtml) Html.ActionLink(page.Name(), "Show", "Treasure", new {startingAt=page.StartingAt,endingAt=page.EndingAt}, new {}) %></li>
		<% } %>
	</ul>
</div>
```

<strong>Helpful Javascript</strong>
``` javascript
function SetupPagination() {   
	$(".pages a").click(function () {
		$("#content-main-container").load(
					$(this).attr('href'),
					function () {
						SetupPagination();
					});
		return false;
	});

	$('a#paginateDirectly').click(function () {
		var url = $(this).attr('href') + '?StartingAt=' + $('input[name="StartingAt"]').val() + '&amp;EndingAt=' + $('input[name="EndingAt"]').val();
		$("#content-main-container").load(
					url,
					function () {
						SetupPagination();
					});
		return false;
	});

	$('input[name="StartingAt"]').numeric().limit(9);
	$('input[name="EndingAt"]').numeric().limit(9);

	$('input[name="EndingAt"]').keyup(function (e) {
		var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
		// return should trigger the pagination
		if (key == 13) { $('a#paginateDirectly').click(); }       
	});
}
``` 