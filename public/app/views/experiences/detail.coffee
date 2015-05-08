$ ->

  class ppu.ExperienceDetailView extends Backbone.View
    el: $ "#experience"
    template: $ "#experience-detail-template"

    initialize: ->
      @listenTo(@model, "change", @render)

    render: ->
      template = app.compile(@template)
      @$el.html(template( @model.toJSON() ))
      @setUrlTranslation(@model)
      dataRelated = category: @model.get('categories')[0].name, without: @model.id
      app.pubsub.trigger('experiences:getRelated', dataRelated)
