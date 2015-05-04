$ ->

  class ppu.PostsFeaturedView extends Backbone.View
    el: $ "#posts-featured"

    initialize: ->
      @listenTo(@collection, "reset", @render)
      app.pubsub.bind("posts:rendered", @getFeatured, @)
      app.pubsub.on("posts:filter", @remove, @)

    getFeatured: ->
      @collection.fetch reset: true, data: featured: true

    renderMain: (model) ->
      ppu.postMainFeaturedView = new ppu.PostMainFeaturedView model: model
      @$el.prepend ppu.postMainFeaturedView.render().el

    renderOne: (model) ->
      ppu.postView = new ppu.PostFeaturedView model: model
      @$el.append ppu.postView.render().el

    render: ->

      @collection.each (model) ->
        if model.get('featured') == 1
          @renderMain(model)
        else
          @renderOne(model)
      , @
