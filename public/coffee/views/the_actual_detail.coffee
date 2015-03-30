$ -> 
  class ppu.TheActualDetailView extends Backbone.View
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
      relatedData = category: @model.get('categories')[0].name, without: @model.id, the_actual: true
      app.pubsub.trigger('posts:getRelated', relatedData)

  class ppu.PostsRelated extends Backbone.View
    el: $ "#posts-related"

    initialize: ->
      @listenTo @collection, 'reset', @render
      app.pubsub.on('posts:getRelated', @get, @)

    get: (data) ->
      @collection.fetch reset: true, data: data

    renderOne: (model) ->
      console.log @
      ppu.postView = new ppu.PostView model: model
      @$el.append ppu.postView.render().el

    render: ->
      @$el.empty()
      @collection.each (model) ->
        @renderOne(model)
      , @

