$ ->
  class ppu.admin.ExperienceCreate extends Backbone.View
    el: $ "#experience-create"
    template: $ "#experience-create-template"
    events:
      "click button.store": "store"
      "click .open-gallery": "openGallery"
      "keydown input[name='query']": "searchLawyer"
      "change .form-control": "removeError"
      "keydown .form-control": "removeError"

    initialize: ->
      @listenTo(@model, 'error', @renderExperienceErrors, @)
      @listenTo(@model, 'sync', @stored)
      app.pubsub.bind('gallery:selected', @appendSelectedGallery, @)

    render: ->
      source = @template.html()
      template = Handlebars.compile(source)
      @$el.find('.panel-body').html template()
      ppu.appendDatePicker(@el)
      ppu.appendSummernoteExperience(@el)

    addDataPicker: ->
      $('.datepicker').datepicker
        format: 'dd/mm/yyyy'
        language: 'es'
        autoclose: true

    store: ->
      $form = @$el.find('form')
      content = $(@el).find('.summernote').code()
      data = new FormData($form[0])
      data.append("fields[content]", content)
      data.append("fields[lang]", app.lang)
      options = ppu.ajaxOptions("Post", data)
      @model.save data, $.extend({}, options)

    stored: (model) ->
      window.location = "/experiencias/" + model.slug if model

    openGallery: (e) ->
      e.preventDefault()
      ppu.admin.galleryExperienceModal = new ppu.admin.GalleryExperienceModal collection: ppu.admin.galleries
      ppu.admin.galleryExperienceModal.render()

    appendSelectedGallery: (gallery_id) ->
      $(@el).find('.gallery_id').val(gallery_id)
      ppu.admin.galleryExperienceModal.closeModal()

    searchLawyer: (e) ->
      query = $(e.currentTarget).val()
      if query.length > 3
        collection = new ppu.Lawyers
        ppu.admin.experienceLawyersSelect = new ppu.admin.ExperienceLawyersSelect collection: collection
        ppu.admin.experienceLawyersSelect.search(query)
