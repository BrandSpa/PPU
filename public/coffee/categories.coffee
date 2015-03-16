$ ->
  class ppu.Category extends Backbone.Model
    urlRoot: '/api/categories'

  class ppu.Categories extends Backbone.Collection
    url:  '/api/categories'
    model: ppu.Category

  class ppu.CategoryView extends Backbone.View
    template: $ "#category-template"
    className: "col-md-6 col-sm-6 col-xs-12 category-item"
    events:
      "click": "open"

    open: ->
      window.location = "/areas/#{@model.get('slug')}"

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

  class ppu.CategoryDetail extends Backbone.View
    el: $ "#category"
    template: $ "#category-detail-template"

    initialize: ->
      @listenTo(@model, "change", @render)
      @getTitle()

    getTitle: ->
      $("#top-bar").html $("#category-detail-title").html()

    render: ->
      template = app.compile(@template)
      @$el.html(template( @model.toJSON() ))
      @setUrlTranslation(@model)
      app.pubsub.trigger("categories:list")
      app.pubsub.trigger("lawyers:related", @model.get("name"))

  class ppu.CategoriesList extends Backbone.View
    el: $ "#categories-list"
    template: $ "#categories-list-template"

    initialize: ->
      @listenTo(@collection, "reset", @render)
      app.pubsub.bind("categories:list", @getAll, @)

    getAll: ->
      ppu.categories.fetch reset: true

    render: ->
      template = app.compile(@template)
      $("#categories-list").html template( @collection.toJSON() )
      console.log $("#categories-list").html()

