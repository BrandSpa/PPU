$ ->

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
