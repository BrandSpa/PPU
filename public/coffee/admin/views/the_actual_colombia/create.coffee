$ ->
  class ppu.admin.TheActualColombiaCreate extends Backbone.View
    el: $ "#post-create"
    template: $ "#the-actual-colombia-create-template"
    
    events: 
      "click button.store": "store"
      "click .open-gallery": "openGallery"
      "keydown input[name='query']": "searchLawyer"
      "change .form-control": "removeError"
      "keydown .form-control": "removeError"

    initialize: ->
      @listenTo(@model, 'error', @renderPostErrors, @)
      @listenTo(@model, 'sync', @stored)
      app.pubsub.bind('gallery:selected', @appendSelectedGallery, @)
      app.pubsub.on('post:socialPublished', @redirectTo, @)

    render: ->
      source = @template.html()
      template = Handlebars.compile(source)
      @$el.find('.panel-body').html template()
      ppu.appendDatePicker(@el)
      ppu.appendSummernote(@el)

    store: (e) ->
      e.preventDefault()
      $form = @$el.find('form')
      content = $(@el).find('.summernote').code()
      data = new FormData($form[0])
      data.append("fields[content]", content)
      data.append("fields[lang]", app.lang)
      data.append("fields[country]", "Chile")
      data.append('fields[the_actual]', 1)
      options = ppu.ajaxOptions("POST", data)
      @model.save data, $.extend({}, options)
    
    stored: (model) ->
       window.location = "/el-actual/#{@model.get('slug')}"

    publishFb: (model) ->
      url = setSubdomain(model.get('lang')) + "posts/#{model.get('slug')}"
      published = fb_check_and_publish(model.get('title'), url)

    redirectTo: ->
      window.location = '/admin/posts'

    getCategories: ->
      ppu.categories = new ppu.Categories
      ppu.categories.fetch(data: lang: app.lang).done (collection) ->
        source = $('#lawyer-categories-template').html()
        template = Handlebars.compile(source)
        $('#categories-checkboxes').html template( collection )

    openGallery: (e) ->
      e.preventDefault()
      ppu.admin.galleryPostModal = new ppu.admin.GalleryPostModal collection: ppu.admin.galleries
      ppu.admin.galleryPostModal.render()

    appendSelectedGallery: (gallery_id) ->
      $(@el).find('.gallery_id').val(gallery_id)
      ppu.admin.galleryPostModal.closeModal()

    searchLawyer: (e) ->
      query = $(e.currentTarget).val()
      if query.length > 3
        collection = new ppu.Lawyers
        ppu.admin.postLawyersSelect = new ppu.admin.PostLawyersSelect collection: collection
        ppu.admin.postLawyersSelect.search(query)