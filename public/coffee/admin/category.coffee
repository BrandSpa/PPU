$ ->
  class ppu.admin.CategoryCheckbox extends Backbone.View
  	template: $ "#category-checkbox-template"
  	className: "checkbox"

  	render: ->
  		template = app.compile(@template)
  		@$el.html(template( @model.toJSON() ))
  		@

  class ppu.admin.CategoriesCheckbox extends Backbone.View
  	el: $ "#categories-checkbox"

  	initialize: ->
  		@listenTo(@collection, 'reset', @render)

  	renderOne: (model) ->
  		view = new ppu.admin.CategoryCheckbox model: model
  		$("#categories-checkbox").append view.render().el

  	render: ->
  		@collection.each (model) ->
  			@renderOne(model)
  		, @
