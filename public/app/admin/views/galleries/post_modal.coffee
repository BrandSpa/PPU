$ ->
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