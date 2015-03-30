$ ->
  class ppu.TheCurrentView extends Backbone.View
    template: $ "#the-actual-post-template"
    className: "col-md-6 col-sm-6 col-xs-12 post-item"
    events: 
      "click .share-hover": "open"

    open: ->
      window.location = "/el-actual/#{@model.get('slug')}"

    render: ->
      template = app.compile(@template)
      $(@el).html template( @model.toJSON() )
      @

  class ppu.TheActualFeaturedView extends Backbone.View
    template: $ "#the-actual-featured-template"
    className: "col-md-6 col-sm-6 col-xs-12 post-main-featured-item"
    events: 
      "click": "open"

    open: ->
      window.location = "/posts/#{@model.get('slug')}"
    
    render: ->
      template = app.compile(@template)
      $(@el).html template( @model.toJSON() )
      @

  class ppu.TheCurrentViews extends Backbone.View
    el: $ "#posts"

    initialize: ->
      @listenTo(@collection, 'reset', @render)
      @listenTo(@collection, 'add', @renderOne)
      app.pubsub.on("posts:filter", @filterCollection, @)
      app.pubsub.on("apply:filters", @filterCollection, @)
      app.pubsub.on("posts:paginate", @paginate, @)

    filterCollection: (filters) ->
      filters = _.extend(lang: app.lang, filters)
      @collection.fetch reset: true, data: filters, beforeSend: () ->
        $('.preload').removeClass('hidden')
      , success: () ->
        $('.preload').addClass('hidden')

    paginate: (data) ->
      @collection.fetch data: data, beforeSend: () ->
        $('.preload').removeClass('hidden')
      , success: () ->
        $('.preload').addClass('hidden')


    renderOne: (model) ->
      ppu.postView = new ppu.TheCurrentView model: model
      @$el.append ppu.postView.render().el

    renderMain: (model) ->
      ppu.postMainFeaturedView = new ppu.TheActualFeaturedView model: model
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
