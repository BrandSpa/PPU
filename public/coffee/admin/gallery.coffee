$ ->
  class ppu.admin.Gallery extends Backbone.Model
    urlRoot: "/api/galleries"

  class ppu.admin.Galleries extends Backbone.Collection
    url: "/api/galleries"
    model: ppu.admin.Gallery

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
      img = @model.get('id')
      $(document).find('.gallery_id').val(img)
      ppu.admin.galleryPostModal.closeModal()
      
  class ppu.admin.GalleryPostModal extends Backbone.View
    el: $ "#gallery-post-modal"

    events:
      "click .modal-close": "close"

    renderOne: (model) ->
      view = new ppu.admin.GalleryView model: model
      @$el.find('.modal-body .row').append view.render().el

    render: ->
      @$el.find('.modal-body .row').html('')
      @collection.each (model) ->
        @renderOne(model)
      , @
      @$el.modal()
     
    close: (e) ->
      e.preventDefault()
      @closeModal()

    

