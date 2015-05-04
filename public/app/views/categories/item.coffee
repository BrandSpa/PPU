$ ->
  class ppu.CategoryView extends Backbone.View
    template: $ "#category-template"
    className: "col-md-6 col-sm-6 col-xs-12 category-item"
    events:
      "click": "open"

    open: ->
      window.location = "/areas/#{@model.get('slug')}"

    render: ->
      template = app.compile(@template)
      $(@el).html template( @model.toJSON() )
      @
