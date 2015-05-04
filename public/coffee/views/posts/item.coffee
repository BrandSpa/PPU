$ ->
  class ppu.PostView extends Backbone.View
    template: $ "#post-template"
    className: "col-md-6 col-sm-6 col-xs-12 post-item"
    events:
      "click .share-hover": "open"

    open: ->
      window.location = "/posts/#{@model.get('slug')}"

    render: ->
      template = app.compile(@template)
      $(@el).html template( @model.toJSON() )
      @
