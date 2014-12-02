$ ->
  class ppu.Lawyer extends Backbone.Model
    urlRoot: "/api/lawyers"

  class ppu.Lawyers extends Backbone.Collection
    url: "/api/lawyers"
    model: ppu.Lawyer

  class ppu.LawyerView extends Backbone.View
    template: $ '#lawyer-template'
    className: 'lawyer-list'
      
    render: ->
      source = @template.html()
      compile = Handlebars.compile(source)
      $(@el).html(compile( @model.toJSON() ))
      @

  class ppu.LawyersView extends Backbone.View
    el: $ '#lawyers'

    initialize: ->
      @listenTo(@collection, 'reset', @render)

    render: ->
      $(@el).html('')
      @collection.each (model) ->
        view = new ppu.LawyerView model: model
        $(@el).append(view.render().el).hide().fadeIn('slow')
      , @
      
  class ppu.LawyersFilters extends Backbone.View
    el: $ '#lawyers-filters'
    events:
      'change .position': 'byPosition'
      'change .country': 'byCountry'
      'submit .search': 'byQuery'

    byPosition: (e) ->
      el = $(e.currentTarget)
      position = el.val()
      ppu.lawyers.fetch reset: true, data: position: position
      
    byCountry: (e) ->
      el = $(e.currentTarget)
      country = el.val()
      ppu.lawyers.fetch reset: true, data: country: country

  class ppu.LawyerDetailView extends Backbone.View
    el: $ '#lawyer-detail'
    template: $ '#lawyer-show-template'
    
    initialize: ->
      @listenTo(@model, 'change', @render)

    render: ->
      source = @template.html()
      compile = Handlebars.compile(source)
      $(@el).html t( @model.toJSON() )

  class ppu.LawyerCreate extends Backbone.View
    el: $ "#lawyer-create"

    events:
      'click .lawyer-store': 'store'
      'click .lawyer-add-education': 'addEducation'
      'click .lawyer-add-job': 'addJob'
      'click .lawyer-add-recognition': 'addRecognition'
      'click .lawyer-add-institution': 'addInstitution'
      'click .lawyer-add-langs': 'addLang'
      'click .lawyer-add-pharase': 'addPharase'
      'change .lawyer-lang': 'changeLang'

    initialize: ->
      @listenTo @model, 'error', @showErrors
      @listenTo @model, 'sync', @stored
      @getCategories()
      @appendDatePicker()

    changeLang: (e) ->
      el = $(e.currentTarget)
      if el.val() == 'en'
        window.location = '/en/crear-abogado'
      else
        window.location = '/crear-abogado'

    getCategories: ->
      categories = new ppu.Categories
      source = $("#lawyer-categories-template").html()
      template = Handlebars.compile(source)
      categories.fetch().done (collection) ->
        $("#lawyer-list-categories").html template( collection  )

    appendDatePicker: ->
      $(document).find('.datepicker-year').datepicker
       format: 'yyyy'
       viewMode: "years"
       minViewMode: "years"
       language: 'es'
       autoclose: true

    addEducation: (e) ->
      e.preventDefault()
      el = $(e.currentTarget)
      source = $("#lawyer-form-education-template").html()
      el.parent().before source
      @appendDatePicker()

    addJob: (e) ->
      e.preventDefault()
      el = $(e.currentTarget)
      source = $("#lawyer-form-job-template").html()
      el.parent().before source
      @appendDatePicker()

    addRecognition: (e) ->
      e.preventDefault()
      el = $(e.currentTarget)
      source = $("#lawyer-form-recognition-template").html()
      el.parent().before source
      @appendDatePicker()

    addInstitution: (e) ->
      e.preventDefault()
      el = $(e.currentTarget)
      source = $("#lawyer-form-institution-template").html()
      el.parent().before source
      @appendDatePicker()

    addLang: (e) ->
      e.preventDefault()
      el = $(e.currentTarget)
      source = $("#lawyer-form-langs-template").html()
      el.parent().before source
      @appendDatePicker()

    addPharase: (e) ->
      e.preventDefault()
      el = $(e.currentTarget)
      source = $("#lawyer-form-pharase-template").html()
      el.parent().before source
      @appendDatePicker()

    store: (e) ->
      e.preventDefault()
      data = $(document).find(@el).find('form').serializeJSON()
      @model.save data

    stored: (model)->
      id = model.id
      ppu.lawyerFinish = new ppu.Lawyer id: id
      ppu.lawyerFinish.fetch()
      view = new ppu.LawyerFinish model: ppu.lawyerFinish
      $(@el).fadeOut().remove()
      
  class ppu.LawyerFinish extends Backbone.View
    el: $ '#lawyer-finish'
    template: $ '#lawyer-finish-template'
    events: 
      'click .lawyer-open-upload-photo': 'openUploadPhoto'
    
    initialize: ->
      @listenTo(@model, 'change', @render)

    render: ->
      source = @template.html()
      t = Handlebars.compile(source)
      $(@el).find(".panel-body").html t( @model.toJSON() )
      $(@el).removeClass("hidden")

    openUploadPhoto: (e)->
      e.preventDefault()
      el = $(e.currentTarget)
      id = el.data('lawyer')
      view = new ppu.LawyerImageUpload
      view.render(id)

  class ppu.LawyerImageUpload extends Backbone.View
    el: $ '#lawyer-upload-image-modal'

    render: (id)->
      t = @
      $(@el).modal backdrop: 'static'
      $(@el).find('input[name="lawyer_id"]').val(id)
      ppu.mediaDropzone = new Dropzone("#media-dropzone")
      ppu.mediaDropzone.on "success", (file, responseText) ->
        console.log responseText
        ppu.lawyerFinish.set responseText
        t.closeModal()

  class ppu.LawyerArticleUpload extends Backbone.View
    el: $ '#lawyer-upload-image-modal'

    render: (id) ->
      t = @
      $(@el).modal backdrop: 'static'
      $(@el).find('input[name="lawyer_id"]').val(id)
      ppu.mediaDropzone = new Dropzone("#media-dropzone")
      ppu.mediaDropzone.on "success", (file, responseText) ->
        t.closeModal()

  class ppu.LawyerDashboard extends Backbone.View
    tagName: 'tr'
    template: $ '#lawyer-dashbord-template'

    initialize: ->
      @listenTo(@model, 'change', @render)
      @listenTo(@model, 'error', @showErrors)

    render: ->
      source = @template.html()
      t = Handlebars.compile(source)
      $(@el).html t( @model.toJSON() )
      @


  class ppu.LawyersDashboard extends Backbone.View
    el: $ '#lawyers-dashboard'
    events:
      'click .lawyer-see-more' : 'seeMore'
      'submit .lawyer-search' : 'search'
      'change .lawyer-filter-lang' : 'filterLang'
      'change .lawyer-filter-country' : 'filterCountry'
      'change .lawyer-filter-position' : 'filterPosition'

    initialize: ->
      @listenTo(@collection, 'reset', @render)
      @listenTo(@collection, 'add', @addOne, @)

    addOne: (model) ->
      view = new ppu.LawyerDashboard model: model
      $(@el).find('thead').append view.render().el

    render: ->
      $(@el).find('tbody').html('')
      @collection.each (model) ->
        view = new ppu.LawyerDashboard model: model
        $(@el).find('tbody').append view.render().el
      , @

    seeMore: (e) ->
      e.preventDefault()
      el = e.currentTarget
      offset = $(el).data('offset')
      more = (offset + 10)
      @collection.fetch data: offset: more
      $(el).data('offset', more)

    search: (e) ->
      e.preventDefault()
      query = $('input[name="query"]').val()
      @collection.fetch reset: true, data: keyword: query

    filterLang: (e) ->
      el = $(e.currentTarget)
      @collection.fetch reset: true, data: lang: el.val()

    filterCountry: (e) ->
      el = $(e.currentTarget)
      @collection.fetch reset: true, data: country: el.val()

    filterPosition: (e) ->
      el = $(e.currentTarget)
      @collection.fetch reset: true, data: position: el.val()
