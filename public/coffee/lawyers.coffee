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

  class ppu.LawyerCreateForm extends Backbone.View
    initialize: ->
      @listenTo @model, "error", @showErrors
      @listenTo @model, "sync", @stored

    store: (e) ->
      if e
        e.preventDefault()
      
      $forms = $("#lawyer-form-create").find('form')
      datas = new FormData($forms[0])
      options = ppu.ajaxOptions("POST", datas)
      @model.save(datas, $.extend({}, options))

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
      #window.location = "/terminar-abogado/#{id}"

  class ppu.LawyerCreate extends Backbone.View
    el: $ "#lawyer-create"
    events:
      'click .lawyer-store': 'store'
      'change .lawyer-lang': 'changeLang'

    initialize: ->
      @getCategories()
      ppu.appendDatePickerYear(@el)

    getCategories: ->
      ppu.categories = new ppu.Categories
      ppu.categories.fetch().done (collection) ->
        source = $('#lawyer-categories-template').html()
        template = Handlebars.compile(source)
        $('#lawyer-list-categories').html template( collection )

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
    template: $ "#lawyer-edit-template"
    events:
      "click .lawyer-edit-update" "update"

    render: ->
      source = @template.html()
      compile = Handlebars.compile(source)
      $(@el).html t( @model.toJSON() )
      $(@el).modal()

    update: (e) ->
      e.preventDefault()
      $forms = $(@el).find("form")
      data = new FormData($forms[0])
      #data.append("fields[lawyer_id]", lawyer_id)
      model.save data, $.extend({}, ppu.ajaxOptions("PUT", data))

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

  class ppu.LawyerFinish extends Backbone.View
    el: $ '#lawyer-finish'
    template: $ '#lawyer-finish-template'
    events: 
      'click .lawyer-save-img': 'uploadPhoto'
    
    initialize: ->
      @listenTo(@model, 'change', @render)

    render: ->
      source = @template.html()
      t = Handlebars.compile(source)
      $(@el).find(".panel-body").html t( @model.toJSON() )
      $(@el).removeClass("hidden")

    uploadPhoto: (e) ->
      e.preventDefault()
      $forms = $(@el).find("form")
      $forms.each (index) ->
        model = new ppu.LawyerAward
        datas = new FormData($forms[index])
        datas.append("fields[lawyer_id]", 6)
        options = ppu.ajaxOptions("POST", datas)
        model.save datas, $.extend({}, options)
