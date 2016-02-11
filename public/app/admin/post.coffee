$ ->
  class ppu.Post extends Backbone.Model
    urlRoot: '/api/posts'

  class ppu.Posts extends Backbone.Collection
    url: '/api/posts'
    model: ppu.Post

  class ppu.admin.PostView extends Backbone.View
    template: $ '#post-admin-template'
    tagName: 'tr'

    events:
      "click .publish": "publish"
      "click .unpublish": "unpublish"
      "click .change-featured": "changeFeatured"
      "click .publish-on-social-network": "publishFb"
      "click .highlight": "featured"
      "click .unhighlight": "unhighlight"
      "click .translate": "translate"

    initialize: ->
      @listenTo(@model, "change", @render)

    render: ->
      source = @template.html()
      t = Handlebars.compile(source)
      $(@el).html t( @model.toJSON() )
      @

    publish: (e) ->
      e.preventDefault()
      @model.save fields: published: true

    featured: (e) ->
      e.preventDefault()
      id = @model.id
      $.post "/api/posts/#{id}/featured"
      .done () ->
        app.pubsub.trigger('post:unfeatured')

    publishFb: (e)->
      e.preventDefault()
      url = setSubdomain(@model.get('lang')) + "posts/#{@model.get('slug')}"
      published = openShare(url)

    unpublish: (e) ->
      e.preventDefault()
      @model.save fields: published: false

    translate: (e) ->
      e.preventDefault()
      id = @model.id
      $.post "/api/posts/#{id}/duplicate"
      .done (model) ->
        window.location = "/en/admin/posts/#{model.id}/edit"

    changeFeatured: (e) ->
      el = $(e.currentTarget).find('input').val()
      app.pubsub.trigger('post:changeFeatured', el)
      @model.save fields: featured: el

  class ppu.admin.PostsView extends Backbone.View
    el: $ "#posts-dasboard"

    initialize: ->
      @listenTo(@collection, 'reset', @render)
      @listenTo(@collection, 'add', @addOne, @)
      app.pubsub.on("posts:filter", @filterCollection, @)
      app.pubsub.on("post:changeFeatured", @changeFeatured, @)
      app.pubsub.on('post:unfeatured', @pull, @)

    filterCollection: (filters) ->
      @collection.fetch reset: true, lang: app.lang, data: filters

    pull: ->
      @collection.fetch reset: true

    changeFeatured: (val) ->
      coll = new ppu.Posts
      @collection.fetch add: false, data: is_featured: val
        .done (models) ->
          coll.add models

    addOne: (model) ->
      view = new ppu.admin.PostView model: model
      $(@el).find('thead').append view.render().el

    render: ->
      $(@el).find('tbody').html('')
      @collection.each (model) ->
        view = new ppu.admin.PostView model: model
        $(@el).find('tbody').append view.render().el
      , @

  class ppu.admin.PostsFilters extends Backbone.View
    el: $ '.post-filter'

    events:
      'click .see-more' : 'seeMore'
      'change .country': 'byCountry'
      'change .category': 'byCategory'
      'keydown .query': 'byKeyword'
      'change .by-lang': 'byLang'

    initialize: ->
      @filtersAplied = {lang: "es", the_actual_ch: 0, the_actual_co: 0}

    # append template to $el
    render: ->
      template = app.compile(@template)
      @$el.html(template)

    filterBy: (data) ->
      data = _.extend(@filtersAplied,  data)
      app.pubsub.trigger("posts:filter", data)

    seeMore: (e) ->
      e.preventDefault()
      offset = $(@el).data('offset') || 20
      data = _.extend(@filtersAplied, paginate: offset)
      ppu.posts.fetch data: data
      $(@el).data('offset', (offset+20))

    byCountry: (e) ->
      el = $(e.currentTarget)
      val = el.val()
      data = _.extend(@filtersAplied, country: val)
      app.pubsub.trigger("posts:filter", data)

    byCategory: (e) ->
      val = $(e.currentTarget).find('select').val()
      data = _.extend(@filtersAplied, category: val)
      app.pubsub.trigger("posts:filter", data)

    byKeyword: (e) ->
      val = $(e.currentTarget).val()
      if val.length >= 1
        @filterBy(keyword: val)

    byLang: (e) ->
      val = $(e.currentTarget).val()
      @filterBy(lang: val)

  class ppu.admin.PostCreate extends Backbone.View
    el: $ "#post-create"
    template: $ "#post-create-template"

    events:
      "click button.store": "store"
      "click .open-gallery": "openGallery"
      "keydown input[name='query']": "searchLawyer"
      "change .form-control": "removeError"
      "keydown .form-control": "removeError"

    initialize: ->
      @listenTo(@model, 'error', @showErrors, @)
      @listenTo(@model, 'sync', @stored)
      app.pubsub.bind('gallery:selected', @appendSelectedGallery, @)
      app.pubsub.on('post:socialPublished', @redirectTo, @)

    render: ->
      source = @template.html()
      template = Handlebars.compile(source)
      @$el.find('.panel-body').html template()
      ppu.appendDatePicker(@el)
      ppu.appendSummernote(@el)

    # send data from form
    store: (e) ->
      e.preventDefault()
      $form = @$el.find('form')

      content = $(@el).find('.summernote').code()
      data = new FormData($form[0])

      data.append("fields[content]", content)
      data.append("fields[lang]", app.lang)

      options = ppu.ajaxOptions("POST", data)
      @model.save data, $.extend({}, options)

    # after store redirect to post
    stored: (model) ->
       window.location = "/posts/#{@model.get('slug')}"

    # show errors of validation
    showErrors: (model, b) ->
      _.each b.responseJSON, (error) ->
        _.each error, (message) ->
          toastr.error(message)

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

  class ppu.admin.PostEdit extends Backbone.View
    el: $ "#post-edit"
    template: $ "#post-create-template"
    removeImg: false
    removeGallery: false

    # jquery events
    events:
      "click button.update": "update"
      "click .open-gallery": "openGallery"
      "keydown input[name='query']": "searchLawyer"
      "change .form-control": "removeError"
      "keydown .form-control": "removeError"
      "click .remove-img": "removeImg"
      "click .remove-gallery": "removeGallery"

    # Start to listen events when the view it's initialize
    initialize: ->
      @listenTo(@model, 'change', @render)
      @listenTo(@model, 'error', @renderPostErrors, @)
      app.pubsub.bind('gallery:selected', @appendSelectedGallery, @)
      app.pubsub.on('post:socialPublished', @redirectTo, @)

    # apped template with data to $el
    render: ->
      template = app.compile(@template)
      @$el.find('.panel-body').html template( @model.toJSON() )
      ppu.appendDatePicker(@el)
      ppu.appendSummernote(@el)
      @getCategories()
      @showLawyers()

    removeImg: (e) ->
      e.preventDefault()
      @removeImg = true
      $(@el).find('.img-name').remove()

    removeGallery: (e)->
      e.preventDefault()
      @removeGallery = true
      $(@el).find('.gallery-img').remove()

    # send data modified to server
    update: (e) ->
      e.preventDefault()
      that = @

      $form = @$el.find('form')
      content = $(@el).find('.summernote').code()
      data = new FormData($form[0])

      if @removeImg == true
        data.append("fields[remove_img_name]", true)

      if @removeGallery == true
        data.append("fields[gallery_id]", null)

      data.append("fields[content]", content)
      options = ppu.ajaxOptions("PUT", data)
      @model.save data, $.extend({}, options)
        .done (model) ->
          that.updated(model, that)

    # redirect to post url when it's updated
    updated: (model, that) ->
      window.location = "/admin/posts/#{model.id}/edit"

    redirectTo: ->
      window.location = '/admin/posts'

    # get categories
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

  class ppu.admin.PostSelectLawyers extends Backbone.View
    el: $ "#"
    template: "#lawyer-select"
    events:
      "submit .search": "search"

    render: ->
      @$el.find('.modal-body').html app.compileTemplate(@template)
      @$el.modal()
      @

    search:  (e) ->
      query = $(e.currentTarget).val()
      @collection.fetch data: query: query

  class ppu.admin.PostLawyerSelect extends Backbone.View
    tagName: 'tr'
    template: $ '#lawyer-select-template'
    events:
      "click .append": "append"

    render: ->
      source = @template.html()
      template = Handlebars.compile(source)
      @$el.html template( @model.toJSON() )
      @

    append: (e) ->
      e.preventDefault()
      ppu.admin.postLawyersSelected =  new ppu.admin.PostLawyersSelected model: @model
      ppu.admin.postLawyersSelected.render()

  class ppu.admin.PostLawyersSelect extends Backbone.View
    el: $ "#lawyers-result"

    events:
      "" : ""

    initialize: ->
     @listenTo(@collection, 'reset', @render)

    render: ->
      $("#lawyers-result").html('')
      @collection.each (model) ->
        view = new ppu.admin.PostLawyerSelect model: model
        $("#lawyers-result").prepend view.render().el
      , @

    search: (query) ->
      @collection.fetch reset: true, data: search: query

  class ppu.admin.PostLawyersSelected extends Backbone.View
    template: $ '#lawyer-selected-template'
    tagName: 'tr'
    events:
      "click .remove": "destroy"

    render: ->
      source = @template.html()
      template = Handlebars.compile(source)

      $('#lawyers-selected tbody').append @$el.html( template( @model.toJSON() ) )

    renderObject: (model)->
      source = @template.html()
      template = Handlebars.compile(source)
      $('#lawyers-selected tbody').append @$el.html( template( model) )

    destroy: (e)->
      e.preventDefault()
      @$el.remove()
