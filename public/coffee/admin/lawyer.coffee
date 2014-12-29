$ ->
  class ppu.admin.LawyerView extends Backbone.View
    tagName: 'tr'
    template: $ '#lawyer-dashbord-template'
    events: 
      "click .translate": "translate"

    initialize: ->
      @listenTo(@model, 'change', @render)
      @listenTo(@model, 'error', @showErrors)

    render: ->
      source = @template.html()
      t = Handlebars.compile(source)
      $(@el).html t( @model.toJSON() )
      @

    translate: (e) ->
      e.preventDefault()
      @model.save duplicate: true
        .done (mod) ->
          window.location = "en/admin/lawyers/#{mod.id}/edit"

  class ppu.admin.LawyersView extends Backbone.View
    el: $ '#lawyers-dashboard'
    events:
      'click .lawyer-see-more' : 'seeMore'
      'keyup .query' : 'search'
      'change .lawyer-filter-lang' : 'filterLang'
      'change .lawyer-filter-country' : 'filterCountry'
      'change .lawyer-filter-category' : 'filterCategory'
      'change .lawyer-filter-position' : 'filterPosition'

    initialize: ->
      @listenTo(@collection, 'reset', @render)
      @listenTo(@collection, 'add', @addOne, @)

    addOne: (model) ->
      view = new ppu.admin.LawyerView model: model
      $(@el).find('thead').append view.render().el

    render: ->
      $(@el).find('tbody').html('')
      @collection.each (model) ->
        view = new ppu.admin.LawyerView model: model
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
      query = $(e.currentTarget).val()
      if query.length >= 3
        @collection.fetch reset: true, data: keyword: query

    getSelectVal: (e) ->
      $(e.currentTarget).val()

    byFilter: (data) ->
      @collection.fetch reset: true, data: data

    filterLang: (e) ->
      val = @getSelectVal(e)
      @byFilter({lang: val})

    filterCountry: (e) ->
      val = @getSelectVal(e)
      @byFilter({country: val})

    filterPosition: (e) ->
      @byFilter position: @getSelectVal(e)

    filterCategory: (e) ->
      val = $(e.currentTarget).val()
      ppu.lawyers.fetch reset: true, data: category: val
  
  class ppu.LawyerCreateForm extends Backbone.View
    el: $ "#lawyer-form-create"
    template: $ "#lawyer-form-template"
    events:
      "change .change-level": 'toggleDescriptionByLevel'
      "change .change-position": 'toggleDescriptionByPosition'
      "change .change-position": 'toggleDescriptionByPosition'

    initialize: ->
      @listenTo @model, "error", @renderErrors, @
      @listenTo @model, "error", @toErrors, @
      @listenTo @model, "sync", @stored, @
      @render()
      @getCategories()

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
    
    toggleDescriptionByLevel: (e) ->
      el = $(e.currentTarget)
      val = el.val()
      if val >= 6
        $('.lawyer-description').removeClass('hidden').hide().slideDown()
      else
        $('.lawyer-description').fadeOut()

    toggleDescriptionByPosition: (e) ->
      el = $(e.currentTarget)
      val = el.val()
      if val == "Senior Counsel" || val == "Especialista" || val == "Socio"
        $('.lawyer-description').removeClass('hidden').hide().slideDown()
      else
        $('.lawyer-description').fadeOut()
      
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
      ppu.lawyerAcademicCreate.store(id)
      ppu.lawyerAwardCreate.store(id)
      ppu.lawyerArticleCreate.store(id)
      ppu.lawyerPharaseCreate.store(id)
      
      window.location = "/admin/lawyers/#{id}/edit"

  class ppu.LawyerCreateView extends Backbone.View
    el: $ "#lawyer-create"

    events:
      'click .lawyer-store': 'store'
      'change .lawyer-lang': 'changeLang'
      "keydown .form-control": "removeError"
      "change .form-control": "removeError"

    initialize: ->
      ppu.appendDatePickerYear(@el)

    store: (e) ->
      e.preventDefault()
      ppu.lawyerCreateForm.store()


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
      ppu.categories.fetch(data: locale: app.lang).done (collection) ->
        source = $('#lawyer-categories-template').html()
        template = Handlebars.compile(source)
        $(el).find('#lawyer-list-categories').html template( collection )
        _.each categories, (category) ->
          $(el).find("#lawyer-list-categories input[value='#{category.id}']").attr("checked", "checked")

    render: ->
      el = $ "#lawyer-edit-modal"
      source = @template.html()
      position = @model.get('position')
      level = @model.get('level')
      t = Handlebars.compile(source)
      $(@el).find('.modal-body').html t( @model.toJSON() )

      if level >= 6  
        $('.lawyer-description').removeClass('hidden')

      if  position == "Senior Counsel"
        $('.lawyer-description').removeClass('hidden')

      if position == "Especialista" || position == "Specialist"
        $('.lawyer-description').removeClass('hidden')

      if position == "Socio" || position == "Partner"
        $('.lawyer-description').removeClass('hidden')
      



      
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
 
  class ppu.LawyerEditView extends Backbone.View
    el: $ '.container-lawyer'
    template: $ '#lawyer-template'
    events: 
      'click .open-edit-lawyer': 'openEdit'
      'click .open-share': 'openShare'
    
    initialize: ->
      @listenTo(@model, 'change', @render)
      @listenTo(@model, 'change', @renderCategories)

    render: ->
      id = @model.get('id')
      source = @template.html()
      t = Handlebars.compile(source)
      $(@el).html t( @model.toJSON() )
      $("#lawyer-finish").removeClass("hidden")
      ppu.currentLawyerId = id
      @appendButtons()
      @getRelationships(id)
    
    renderCategories: ->
      source = $("#lawyer-category-template").html()
      t = Handlebars.compile(source)
      $("#lawyer-category-edit").find('ul').html t( @model.toJSON() )

    appendButtons: ->
      @$el.append   '<a href="#" class="btn btn-info open-edit-lawyer">Editar información & áreas</a>'

    getRelationships: (id) ->
      mixins.renderCollection(ppu.LawyerEducations, ppu.LawyerEducationsEdit, lawyer_id: id)
      mixins.renderCollection(ppu.LawyerArticles, ppu.LawyerArticlesEdit, lawyer_id: id)
      mixins.renderCollection(ppu.LawyerJobs, ppu.LawyerJobsEdit, lawyer_id: id)
      mixins.renderCollection(ppu.LawyerRecognitions, ppu.LawyerRecognitionsEdit, lawyer_id: id)
      mixins.renderCollection(ppu.LawyerInstitutions, ppu.LawyerInstitutionsEdit, lawyer_id: id)
      mixins.renderCollection(ppu.LawyerLanguages, ppu.LawyerLanguagesEdit, lawyer_id: id)
      mixins.renderCollection(ppu.LawyerPharases, ppu.LawyerPharasesEdit, lawyer_id: id)
      mixins.renderCollection(ppu.LawyerAwards, ppu.LawyerAwardsEdit, lawyer_id: id)
      mixins.renderCollection(ppu.LawyerAcademics, ppu.LawyerAcademicsEdit, lawyer_id: id)

    openEdit: (e) ->
      e.preventDefault()
      view = new ppu.lawyerEdit model: @model
      view.render()

    openShare: (e) ->
      $('#share-modal').modal()