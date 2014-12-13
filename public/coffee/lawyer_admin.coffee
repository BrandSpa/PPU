 $ ->
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
  
  class ppu.LawyerCreateForm extends Backbone.View
    el: $ "#lawyer-form-create"
    template: $ "#lawyer-form-template"
    events:
      "change .change-level": 'toggleDescription'

    initialize: ->
      @listenTo @model, "error", @renderErrors, @
      @listenTo @model, "error", @toErrors, @
      @listenTo @model, "sync", @stored, @
      @render()
      @getCategories()
      @changeLang()

    render: ->
      source = @template.html()
      template = Handlebars.compile(source)
      $(@el).find('.panel-body').html template()

    getCategories: ->
      ppu.categories = new ppu.Categories
      ppu.categories.fetch().done (collection) ->
        source = $('#lawyer-categories-template').html()
        template = Handlebars.compile(source)
        $('#lawyer-list-categories').html template( collection )
    
    toggleDescription: (e) ->
      el = $(e.currentTarget)
      val = el.val()
      if val >= 6
        $('.lawyer-description').removeClass('hidden').hide().slideDown()
      else
        $('.lawyer-description').fadeOut()
      

    changeLang: ->
      if lang == 'en'
        $('.lawyer-lang option:eq(2)').prop('selected', true)
      else
        $('.lawyer-lang option:eq(1)').prop('selected', true)
    store: (e) ->
      if e
        e.preventDefault()
      
      $forms = $("#lawyer-form-create").find('form')
      datas = new FormData($forms[0])
      options = ppu.ajaxOptions("POST", datas)
      @model.save(datas, $.extend({}, options))

    toErrors: ->
      window.location = '#lawyer-form-create'

    stored: (model)->
      id = model.id
      ppu.lawyerLanguageCreate.store(id)
      ppu.lawyerEducationCreate.store(id)
      ppu.lawyerJobCreate.store(id)
      ppu.lawyerRecognitionCreate.store(id)
      ppu.lawyerInstitutionCreate.store(id)
      ppu.lawyerAwardCreate.store(id)
      ppu.lawyerArticleCreate.store(id)
      ppu.lawyerPharaseCreate.store(id)
      window.location = "/dashboard"

  class ppu.LawyerCreate extends Backbone.View
    el: $ "#lawyer-create"
    events:
      'click .lawyer-store': 'store'
      'change .lawyer-lang': 'changeLang'
      "keydown .form-control": "removeError"
      "change .form-control": "removeError"

    initialize: ->
      ppu.appendDatePickerYear(@el)

    changeLang: (e) ->
      el = $(e.currentTarget)
      if el.val() == 'en'
        window.location = '/en/crear-abogado'
      else
        window.location = '/crear-abogado'

    store: (e) ->
      e.preventDefault()
      ppu.lawyerCreateForm.store()

    stored: (model) ->
      #duplicate fields

  class ppu.lawyerEdit extends Backbone.View
    el: $ "#lawyer-edit-modal"
    template: $ "#lawyer-form-template"
    events:
      "click .lawyer-edit-update": "update"
      "click .modal-close": "close"
      "keydown .form-control": "removeError"

    initialize: ->
      @listenTo @model, 'error', @renderErrors
      @listenTo @model, 'sync', @updated
      @getCategories()

    getCategories: ->
      ppu.categories = new ppu.Categories
      el = $(@el)
      categories = @model.get('categories')
      ppu.categories.fetch().done (collection) ->
        source = $('#lawyer-categories-template').html()
        template = Handlebars.compile(source)
        $(el).find('#lawyer-list-categories').html template( collection )
        _.each categories, (category) ->
          $(el).find("#lawyer-list-categories input[value='#{category.id}']").attr("checked", "checked")

    render: ->
      source = @template.html()
      t = Handlebars.compile(source)
      $(@el).find('.modal-body').html t( @model.toJSON() )
      $(@el).modal({backdrop: 'static'})

    update: (e) ->
      e.preventDefault()
      $forms = $(@el).find("form")
      data = new FormData($forms[0])
      #data.append("fields[lawyer_id]", lawyer_id)
      @model.save data, $.extend({}, ppu.ajaxOptions("PUT", data))
      

    updated: (model) ->
      if model.id
        @closeModal()
      

    close: (e) ->
      e.preventDefault()
      @closeModal()
 
  class ppu.LawyerFinish extends Backbone.View
    el: $ '.container-lawyer'
    template: $ '#lawyer-show-template'
    events: 
      'click .open-edit-lawyer': 'openEdit'
      'click .open-share': 'openShare'
    
    initialize: ->
      @listenTo(@model, 'change', @render)

    render: ->
      source = @template.html()
      t = Handlebars.compile(source)
      $(@el).html t( @model.toJSON() )
      $("#lawyer-finish").removeClass("hidden")
      @$el.append   '<a href="#" class="btn btn-info open-edit-lawyer"><i class="fa fa-pencil-square"></i></a>'
      @getRelationships(@model.get('id'))

    getRelationships: (id) ->

      mixins.renderCollection(ppu.LawyerEducations, ppu.LawyerEducationsEdit, lawyer_id: id)
      mixins.renderCollection(ppu.LawyerArticles, ppu.LawyerArticlesEdit, lawyer_id: id)
      mixins.renderCollection(ppu.LawyerJobs, ppu.LawyerJobsEdit, lawyer_id: id)
      mixins.renderCollection(ppu.LawyerRecognitions, ppu.LawyerRecognitionsEdit, lawyer_id: id)
      mixins.renderCollection(ppu.LawyerInstitutions, ppu.LawyerInstitutionsEdit, lawyer_id: id)
      mixins.renderCollection(ppu.LawyerLanguages, ppu.LawyerLanguagesEdit, lawyer_id: id)
      mixins.renderCollection(ppu.LawyerPharases, ppu.LawyerPharasesEdit, lawyer_id: id)
      mixins.renderCollection(ppu.LawyerAwards, ppu.LawyerAwardsEdit, lawyer_id: id)

    openEdit: (e) ->
      e.preventDefault()
      view = new ppu.lawyerEdit model: @model
      view.render()

    openShare: (e) ->
      $('#share-modal').modal()