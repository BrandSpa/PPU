$ ->
  class ppu.Category extends Backbone.Model
    urlRoot: '/api/categories'

  class ppu.Categories extends Backbone.Collection
    url:  '/api/categories'
    model: ppu.Category

  class ppu.CategoryView extends Backbone.View
  	template: $ "#category-template"
  	className: "col-md-6 col-sm-6 col-xs-12 category-item"

  	render: ->
  		template = app.compile(@template)
  		$(@el).html template( @model.toJSON() )
  		@

  class ppu.CategoriesView extends Backbone.View
  	el: $ "#categories"

  	initialize: ->
  		@listenTo(@collection, 'reset', @render)
  		@getTitle()
  	getTitle: ->
      $("#top-bar").html $("#category-title").html()


  	renderOne: (model) ->
  		ppu.categoryView = new ppu.CategoryView model: model
  		@$el.append ppu.categoryView.render().el

  	render: ->
  		@collection.each (model) ->
  			@renderOne(model)
  		, @