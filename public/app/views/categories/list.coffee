$ ->

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
