$ ->
  
  class ppu.ExperienceView extends Backbone.View
    template: $ "#experience-template"
    className: "col-md-6 col-sm-6 col-xs-12 experience-item"
    events:
      "click": "open"

    open: ->
      window.location = "/experiencias/#{@model.get('slug')}"

    render: ->
      template = app.compile(@template)
      $(@el).html template( @model.toJSON() )
      @
