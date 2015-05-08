$ ->
  class ppu.CategoryDetail extends Backbone.View
    el: $ "#category"

    template: $ "#category-detail-template"

    # listen to events
    initialize: ->
      @listenTo(@model, "change", @render)

    render: ->
      template = app.compile(@template)
      @$el.html(template( @model.toJSON() ))
      @setUrlTranslation(@model)

      app.pubsub.trigger("categories:list")
      app.pubsub.trigger("lawyers:related", @model.get("name"))
