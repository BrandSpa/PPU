$ ->

  class ppu.TheActualCoFeaturedView extends Backbone.View
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
