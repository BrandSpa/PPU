$ ->
  class ppu.TheActualCoDetailView extends Backbone.View
    el: $ "#post-detail"
    template: $ "#post-detail-template"

    initialize: ->
      @listenTo(@model, "change", @render)
      @getTitle()

    getTitle: ->
      $("#top-bar").html $("#post-detail-title").html()

    render: ->
      template = app.compile(@template)
      @$el.html(template( @model.toJSON() ))
      @setUrlTranslation(@model)
      @model.get('categories')
      if @model.get('categories')[0]
        relatedData = category: @model.get('categories')[0].name, without: @model.id, the_actual_co: 1
        app.pubsub.trigger('posts:getRelated', relatedData)

  class ppu.TheActualCoRelated extends Backbone.View
    el: $ "#posts-related"

    initialize: ->
      @listenTo @collection, 'reset', @render
      app.pubsub.on('posts:getRelated', @get, @)

    get: (data) ->
      @collection.fetch reset: true, data: data

    renderOne: (model) ->
      ppu.postView = new ppu.TheCurrentView model: model
      @$el.append ppu.postView.render().el

    render: ->
      @$el.empty()
      if @collection.length > 0
        $('.related-title').removeClass('hidden')
        @collection.each (model) ->
          @renderOne(model)
        , @
