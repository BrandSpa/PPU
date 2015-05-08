$ ->

  class ppu.CategoriesView extends Backbone.View
    el: $ "#categories"

    initialize: ->
      @listenTo(@collection, 'reset', @render)

    renderOne: (model) ->
      ppu.categoryView = new ppu.CategoryView model: model
      @$el.append ppu.categoryView.render().el

    render: ->
      @collection.each (model) ->
        @renderOne(model)
      , @
