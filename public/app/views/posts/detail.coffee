$ ->

  class ppu.PostDetailView extends Backbone.View
    el: $ "#post-detail"
    template: $ "#post-detail-template"

    initialize: ->
      @listenTo(@model, "change", @render)
  
    render: ->
      template = app.compile(@template)
      @$el.html(template( @model.toJSON() ))
      @setUrlTranslation(@model)
      @model.get('categories')

      if @model.get('categories')[0]
        relatedData = category: @model.get('categories')[0].name, without: @model.id
        app.pubsub.trigger('posts:getRelated', relatedData)
