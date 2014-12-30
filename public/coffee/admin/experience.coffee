$ ->
  class ppu.Experience extends Backbone.Model
    urlRoot: '/api/experiences'

  class ppu.Experiences extends Backbone.Collection
    url: '/api/experiences'
    model: ppu.Experience

  class ppu.admin.ExperienceView extends Backbone.View
    template: $ '#experience-admin-template'
    tagName: 'tr'
    events: 
      "click .publish": "publish"
      "click .unpublish": "unpublish"
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
      @model.save published: true

    unpublish: (e) ->
      e.preventDefault()
      @model.save published: false

    translate: (e) ->
      e.preventDefault()
      @model.save duplicate: true 
        .done (model) ->
          window.location = "en/admin/experiences/#{model.id}/edit"

  class ppu.admin.ExperiencesView extends Backbone.View
    el: $ "#experiences-dasboard"

    initialize: ->
      @listenTo(@collection, 'reset', @render)
      @listenTo(@collection, 'add', @addOne, @)

    addOne: (model) ->
      view = new ppu.admin.ExperienceView model: model
      $(@el).find('thead').append view.render().el

    render: ->
      $(@el).find('tbody').html('')
      @collection.each (model) ->
        view = new ppu.admin.ExperienceView model: model
        $(@el).find('tbody').append view.render().el
      , @

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

    store: ->
      $form = @$el.find('form')
      content = $(@el).find('.summernote').code()
      data = new FormData($form[0])
      data.append("fields[content]", content)
      data.append("fields[lang]", app.lang)
      options = ppu.ajaxOptions("Post", data)
      @model.save data, $.extend({}, options)
    
    stored: (model) ->
      window.location = "/dashboard" if model

    openGallery: (e) ->
      e.preventDefault()
      ppu.admin.galleryPostModal = new ppu.admin.GalleryExperienceModal collection: ppu.admin.galleries
      ppu.admin.galleryPostModal.render()

    appendImageHeader: (id) ->
      @$el.find('.gallery_id').val(id)

    appendSelectedGallery: (gallery_id) ->
      console.log gallery_id
      $(@el).find('.gallery_id').val(gallery_id)
      ppu.admin.galleryPostModal.closeModal()


    searchLawyer: (e) ->
      query = $(e.currentTarget).val()
      if query.length > 3
        collection = new ppu.Lawyers
        ppu.admin.experienceLawyersSelect = new ppu.admin.ExperienceLawyersSelect collection: collection
        ppu.admin.experienceLawyersSelect.search(query)
      
  class ppu.admin.ExperienceEdit extends Backbone.View
    el: $ "#experience-edit"
    template: $ "#experience-create-template"
    events: 
      "click button.update": "update"
      "click .open-gallery": "openGallery"
      "keydown input[name='query']": "searchLawyer"
      "change .form-control": "removeError"
      "keydown .form-control": "removeError"

    initialize: ->
      @listenTo(@model, 'change', @render)
      @listenTo(@model, 'error', @renderExperienceErrors, @)
      @listenTo(@model, 'sync', @updated, @)

    render: ->
      source = @template.html()
      template = Handlebars.compile(source)
      @$el.find('.panel-body').html template( @model.toJSON() )
      ppu.appendDatePicker(@el)
      ppu.appendSummernote(@el)
      @getCategories()
      @showLawyers()

    update: (e) ->
      e.preventDefault()
      $form = @$el.find('form')
      content = $(@el).find('.summernote').code()
      data = new FormData($form[0])
      data.append("fields[content]", content)
      options = ppu.ajaxOptions("PUT", data)
      @model.save data, $.extend({}, options)
        .done (model) ->
          if model
            window.location = "/dashboard"

    getCategories: ->
      ppu.categories = new ppu.Categories
      el = @$el
      categories = @model.get('categories')
      ppu.categories.fetch(data: locale: app.lang).done (collection) ->
        source = $('#lawyer-categories-template').html()
        template = Handlebars.compile(source)
        $('#categories-checkbox').html template( collection )
        _.each categories, (category) ->
          $(el).find("#categories-checkbox input[value='#{category.id}']").attr("checked", "checked")

    showLawyers: ->
      lawyers = @model.get('lawyers')
      _.each lawyers, (lawyer) ->
        view = new ppu.admin.ExperienceLawyersSelected
        view.renderObject(lawyer)

    openGallery: (e) ->
      e.preventDefault()
      ppu.admin.galleryExperienceModal = new ppu.admin.GalleryExperienceModal collection: ppu.admin.galleries
      ppu.admin.galleryExperienceModal.render()

    appendImageHeader: (id) ->
      @$el.find('.gallery_id').val(id)

    searchLawyer: (e) ->
      query = $(e.currentTarget).val()
      if query.length > 3
        collection = new ppu.Lawyers
        ppu.admin.ExperienceLawyersSelect = new ppu.admin.ExperienceLawyersSelect collection: collection
        ppu.admin.ExperienceLawyersSelect.search(query)

  class ppu.admin.ExperienceSelectLawyers extends Backbone.View
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

  class ppu.admin.ExperienceLawyerSelect extends Backbone.View
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
      ppu.admin.experienceLawyersSelected =  new ppu.admin.ExperienceLawyersSelected model: @model
      ppu.admin.experienceLawyersSelected.render()

  class ppu.admin.ExperienceLawyersSelect extends Backbone.View
    el: $ "#lawyers-result"

    events: 
      "" : ""

    initialize: ->
     @listenTo(@collection, 'reset', @render)

    render: ->
      $("#lawyers-result").html('')
      @collection.each (model) ->
        view = new ppu.admin.ExperienceLawyerSelect model: model
        $("#lawyers-result").prepend view.render().el
      , @

    search: (query) ->
      @collection.fetch reset: true, data: keyword: query

  class ppu.admin.ExperienceLawyersSelected extends Backbone.View
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

