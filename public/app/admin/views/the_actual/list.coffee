$ ->
  class ppu.admin.TheActualViews extends Backbone.View
    el: $ "#posts-dasboard"

    initialize: ->
      @listenTo(@collection, 'reset', @render)
      @listenTo(@collection, 'add', @addOne, @)
      app.pubsub.on("posts:filter", @filterCollection, @)
      app.pubsub.on("post:changeFeatured", @changeFeatured, @)
      app.pubsub.on('post:unfeatured', @unfeatured, @)

    filterCollection: (filters) ->
      @collection.fetch reset: true, lang: app.lang, data: filters

    unfeatured: ->
      @collection.fetch reset: true

    changeFeatured: (val) ->
      coll = new ppu.Posts
      @collection.fetch add: false, data: is_featured: val
        .done (models) ->
          coll.add models

    addOne: (model) ->
      view = new ppu.admin.TheActualView model: model
      $(@el).find('thead').append view.render().el

    render: ->
      $(@el).find('tbody').html('')
      @collection.each (model) ->
        view = new ppu.admin.TheActualView model: model
        $(@el).find('tbody').append view.render().el
      , @