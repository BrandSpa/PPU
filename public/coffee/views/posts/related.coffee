$ ->

  class ppu.PostsRelated extends Backbone.View
    el: $ "#posts-related"

    initialize: ->
      @listenTo @collection, 'reset', @render
      app.pubsub.on('posts:getRelated', @get, @)

    get: (data) ->
      @collection.fetch reset: true, data: data

    renderOne: (model) ->
      ppu.postView = new ppu.PostView model: model
      @$el.append ppu.postView.render().el

    render: ->
      @$el.empty()
      if @collection.length > 0
        $('.related-title').removeClass('hidden')
        @collection.each (model) ->
          @renderOne(model)
        , @
