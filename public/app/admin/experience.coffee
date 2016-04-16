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
      @model.save published: true

    translate: (e) ->
      e.preventDefault()
      id = @model.id

      $.post "/api/experiences/#{id}/duplicate"
      .done (model) ->
        window.location = "/en/admin/experiences/#{model.id}/edit"

  class ppu.admin.ExperiencesView extends Backbone.View
    el: $ "#experiences-dasboard"

    initialize: ->
      @listenTo(@collection, 'reset', @render)
      @listenTo(@collection, 'add', @addOne, @)
      app.pubsub.on("experiences:filter", @filterCollection, @)

    filterCollection: (filters) ->
      @collection.fetch reset: true, data: filters

    addOne: (model) ->
      view = new ppu.admin.ExperienceView model: model
      $(@el).find('tbody').append view.render().el

    render: ->
      $(@el).find('tbody').html('')
      @collection.each (model) ->
        view = new ppu.admin.ExperienceView model: model
        $(@el).find('tbody').append view.render().el
      , @

  class ppu.admin.ExperiencesFilters extends Backbone.View
    el: $ '.experience-filter'

    events:
      'change .position': 'byPosition'
      'change .country': 'byCountry'
      'change .category': 'byCategory'
      'keydown .query': 'byQuery'
      'click .see-more' : 'seeMore'

    initialize: ->
      @filtersAplied = {lang: "es"}

    render: ->
      template = app.compile(@template)
      @$el.html(template)

    filterBy: (data) ->
      data = _.extend(@filtersAplied,  data)
      app.pubsub.trigger("experiences:filter", data)

    seeMore: (e) ->
      e.preventDefault()
      offset = $(@el).data('offset') || 20
      data = _.extend(@filtersAplied, paginate: offset)
      ppu.experiences.fetch data: data
      $(@el).data('offset', (offset+20))

    byPosition: (e) ->
      val = $(e.currentTarget).find('select').val()
      @filterBy({position: val})

    byCountry: (e) ->
      val = $(e.currentTarget).val()
      @filterBy({country: val})

    byCategory: (e) ->
      val = $(e.currentTarget).find('select').val()
      @filterBy(category: val)

    byQuery: (e) ->
      val = $(e.currentTarget).val()
      if val.length >= 3
        @filterBy(keyword: val)

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
      @listenTo(@model, 'error', @showErrors, @)
      @listenTo(@model, 'sync', @stored)
      app.pubsub.bind('gallery:selected', @appendSelectedGallery, @)

    render: ->
      source = @template.html()
      template = Handlebars.compile(source)
      @$el.find('.panel-body').html template()
      @addDataPicker()

      ppu.appendSummernoteExperience(@el)

    addDataPicker: ->
      $(@el).find('.datepicker').datepicker
        orientation: "bottom left"
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
      window.location = "/admin/experiences" if model

    showErrors: (model, b) ->
      _.each b.responseJSON, (error) ->
        _.each error, (message) ->
          toastr.error(message)

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
      app.pubsub.bind('gallery:selected', @appendSelectedGallery, @)

    render: ->
      source = @template.html()
      template = Handlebars.compile(source)
      @$el.find('.panel-body').html template( @model.toJSON() )
      ppu.appendSummernote(@el)

      @addDataPicker()
      @getCategories()
      @showLawyers()

    addDataPicker: ->
      $(@el).find('.datepicker').datepicker
        orientation: "bottom"
        format: 'dd/mm/yyyy'
        language: 'es'
        autoclose: true

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
            window.location = "/admin/experiences"

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

    appendSelectedGallery: (gallery_id) ->
      $(@el).find('.gallery_id').val(gallery_id)
      ppu.admin.galleryExperienceModal.closeModal()

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
      @collection.fetch reset: true, data: search: query

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
