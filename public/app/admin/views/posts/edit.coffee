$ ->
  class ppu.admin.PostEdit extends Backbone.View
    el: $ "#post-edit"
    template: $ "#post-create-template"
    events: 
      "click button.update": "update"
      "click .open-gallery": "openGallery"
      "keydown input[name='query']": "searchLawyer"
      "change .form-control": "removeError"
      "keydown .form-control": "removeError"

    initialize: ->
      @listenTo(@model, 'change', @render)
      @listenTo(@model, 'error', @renderPostErrors, @)
      app.pubsub.bind('gallery:selected', @appendSelectedGallery, @)
      app.pubsub.on('post:socialPublished', @redirectTo, @)

    render: ->
      template = app.compile(@template)
      @$el.find('.panel-body').html template( @model.toJSON() )
      ppu.appendDatePicker(@el)
      ppu.appendSummernote(@el)
      @getCategories()
      @showLawyers()

    update: (e) ->
      e.preventDefault()
      that = @
      $form = @$el.find('form')
      content = $(@el).find('.summernote').code()
      data = new FormData($form[0])
      data.append("fields[content]", content)
      options = ppu.ajaxOptions("PUT", data)
      @model.save data, $.extend({}, options)
        .done (model) ->
          that.updated(model, that)

    updated: (model, that) ->
      window.location = "/admin/posts/#{model.id}/edit"

    redirectTo: ->
      window.location = '/admin/posts'
          
    getCategories: ->
      ppu.categories = new ppu.Categories
      el = @$el
      modelCategories = @model.get('categories')
      ppu.categories.fetch(data: locale: app.lang).done (collection) ->
        source = $('#lawyer-categories-template').html()
        template = Handlebars.compile(source)
        $('#categories-checkbox').html template( collection )
        _.each modelCategories, (category) ->
          $(el).find("#categories-checkbox input[value='#{category.id}']").attr("checked", "checked")

    showLawyers: ->
      lawyers = @model.get('lawyers')
      _.each lawyers, (lawyer) ->
        view = new ppu.admin.PostLawyersSelected
        view.renderObject(lawyer)

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