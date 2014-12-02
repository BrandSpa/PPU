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
      new_model = new ppu.Lawyer id: id
      new_model.fetch()
      view = new ppu.LawyerFinish model: new_model
      $(@el).fadeOut().remove()
      
  class ppu.LawyerFinish extends Backbone.View
    el: $ '#lawyer-finish'
    template: $ '#lawyer-finish-template'
    
    initialize: ->
      @listenTo(@model, 'change', @render)

    render: ->
      source = @template.html()
      t = Handlebars.compile(source)
      $(@el).find(".panel-body").html t( @model.toJSON() )
      $(@el).removeClass("hidden")


  class ppu.LawyerImageUpload extends Backbone.View
    el: $ '#lawyer-upload-image-modal'

    render: ->
      $(@el).modal backdrop: 'static'
      ppu.mediaDropzone = new Dropzone("#media-dropzone")
      ppu.mediaDropzone.on "success", (file, responseText) ->
        console.log responseText
