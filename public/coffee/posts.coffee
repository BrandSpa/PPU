$ ->
	class ppu.Post extends Backbone.Model
    urlRoot: '/api/posts'

  class ppu.Posts extends Backbone.Collection
    url: '/api/posts'
    model: ppu.Post

  class ppu.PostView extends Backbone.View
  	template: $ "#post-template"
  	className: "col-md-6 col-sm-6 col-xs-12 post-item"

  	render: ->
  		template = app.compile(@template)
  		$(@el).html template( @model.toJSON() )
  		@

  class ppu.PostsView extends Backbone.View
  	el: $ "#posts"

  	initialize: ->
  		@listenTo(@collection, 'reset', @render)

  	renderOne: (model) ->
  		ppu.postView = new ppu.PostView model: model
  		@$el.append ppu.postView.render().el

  	render: ->
  		@collection.each (model) ->
  			@renderOne(model)
  		, @

  class ppu.PostMainFeaturedView extends Backbone.View
  	template: $ "#post-main-featured-template"
  	className: "col-md-6 col-sm-6 col-xs-12 post-main-featured-item"
  	
  	render: ->
  		template = app.compile(@template)
  		$(@el).html template( @model.toJSON() )
  		@

  class ppu.PostsFeaturedView extends Backbone.View
  	el: $ "#posts-featured"
  	
  	initialize: ->
  		@listenTo(@collection, "reset", @render)

  	renderMain: (model) ->
  		ppu.postMainFeaturedView = new ppu.PostMainFeaturedView model: model
  		@$el.append ppu.postMainFeaturedView.render().el

  	renderOne: (model) ->
      ppu.postView = new ppu.PostView model: model
      @$el.append ppu.postView.render().el

  	render: ->
  		@collection.each (model) ->
  			if model.get('featured') == 1
  				@renderMain(model)
  			else
  				@renderOne(model)
  		, @
  			
  class ppu.PostsFilters extends Backbone.View
    el: $ '#top-bar'
    template: $ "#posts-filter"

    events:
      'change .position': 'byPosition'
      'change .country': 'byCountry'
      'change .category': 'byCategory'
      'keydown .query': 'byQuery'

    render: ->
      template = app.compile(@template)
      @$el.html(template)

    byPosition: (e) ->
      val = $(e.currentTarget).find('select').val()
      ppu.lawyers.fetch reset: true, data: position: val
      
    byCountry: (e) ->
      val = $(e.currentTarget).val()
      ppu.lawyers.fetch reset: true, data: country: val

    byCategory: (e) ->
      val = $(e.currentTarget).find('select').val()
      ppu.lawyers.fetch reset: true, data: category: val

    byQuery: (e) ->
      val = $(e.currentTarget).val()
      if val.length >= 3
        ppu.lawyers.fetch reset: true, data: keyword: val

  class ppu.PostDetailView extends Backbone.View
    el: $ "#post-detail"
    template: $ "#post-detail-template"

    initialize: ->
      @listenTo(@collection, "reset", @render)

    getTitle: ->
      $("#top-bar").html $("#post-detail-title").html()

    render: ->
      @collection.each (model) ->
        template = app.compile(@template)
        @$el.html(template( model.toJSON() ))
      , @
      @getTitle()