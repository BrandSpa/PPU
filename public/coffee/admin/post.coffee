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
      "click .highlight": "highlight"
      "click .unhighlight": "unhighlight"

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

    highlight: (e) ->
      e.preventDefault()
      that = 
      that.model.save fields: featured: 3
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
      @model.save duplicate: true 
        .done (model) ->
          window.location = "en/admin/posts/#{model.id}/edit"

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
      app.pubsub.on('post:unfeatured', @unfeatured, @)

    filterCollection: (filters) ->
      @collection.fetch reset: true, lang: app.lang, data: filters

    unfeatured: ->
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
      'change .country': 'byCountry'
      'change .category': 'byCategory'
      'keydown .query': 'byKeyword'

    initialize: ->
      @filtersAplied = {lang: "es"}

    render: ->
      template = app.compile(@template)
      @$el.html(template)

    filterBy: (data) ->
      data = _.extend(@filtersAplied,  data)
      app.pubsub.trigger("posts:filter", data)

    byCountry: (e) ->
      el = $(e.currentTarget)
      val = el.val()
      data = _.extend(@filtersAplied,  by_country: val)
      app.pubsub.trigger("posts:filter", data)

    CountryNotChecked: (el) ->
      val = if el.val() == "Colombia" then "Chile" else "Colombia"
      $(".countries").find("input[value='#{val}']").prop('checked', true)

    byCategory: (e) ->
      val = $(e.currentTarget).find('select').val()
      data = _.extend(@filtersAplied, by_category: val)
      app.pubsub.trigger("posts:filter", data)

    byKeyword: (e) ->
      val = $(e.currentTarget).val()
      console.log val
      if val.length >= 1
        @filterBy(keyword: val)

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

    store: ->
      $form = @$el.find('form')
      content = $(@el).find('.summernote').code()
      data = new FormData($form[0])
      data.append("fields[content]", content)
      data.append("fields[lang]", app.lang)
      options = ppu.ajaxOptions("POST", data)
      @model.save data, $.extend({}, options)
    
    stored: (model) ->
       window.location = "/posts/#{@model.get('slug')}"

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

