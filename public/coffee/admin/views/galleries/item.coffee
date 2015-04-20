$ ->
  class ppu.admin.GalleryView extends Backbone.View
    template: $ "#gallery-post-template"
    className: "col-xs-6 col-md-3"
    events: 
      "click .select": "selectImage"

    render: ->
      source = $(@template).html()
      template = Handlebars.compile source
      @$el.html template(@model.toJSON())
      @

    selectImage: (e) ->
      e.preventDefault()
      galleryId = @model.get('id')
      app.pubsub.trigger('gallery:selected', galleryId)