$ ->

  class ppu.CategoryDetail extends Backbone.View
    el: $ "#category"
    template: $ "#category-detail-template"

    initialize: ->
      @listenTo(@model, "change", @render)
      @getTitle()

    getTitle: ->
      $("#top-bar").html $("#category-detail-title").html()

    render: ->
      template = app.compile(@template)
      @$el.html(template( @model.toJSON() ))
      @setUrlTranslation(@model)
      app.pubsub.trigger("categories:list")
      app.pubsub.trigger("lawyers:related", @model.get("name"))
