$ ->

  class ppu.PostsView extends Backbone.View
    el: $ "#posts"

    initialize: ->
      @listenTo(@collection, 'reset', @render)
      @listenTo(@collection, 'add', @renderOne)

      app.pubsub.on("posts:filter", @filterCollection, @)

    filterCollection: (filters) ->
      filters = _.extend(lang: app.lang, filters)
      @collection.fetch reset: true, data: filters, beforeSend: () ->
        $('.preload').removeClass('hidden')
      , success: () ->
        $('.preload').addClass('hidden')

    renderOne: (model) ->
      ppu.postView = new ppu.PostView model: model
      @$el.append ppu.postView.render().el

    renderMain: (model) ->
      ppu.postMainFeaturedView = new ppu.PostMainFeaturedView model: model
      @$el.prepend ppu.postMainFeaturedView.render().el

    render: ->
      @$el.empty()
      if @collection.length <= 0
        $('.not-found').removeClass('hidden')
      else
        $('.not-found').addClass('hidden')

      i = 0
      @collection.each (model) ->
        if i == 0
          @renderMain(model)
        else
          @renderOne(model)
        i++
      , @
