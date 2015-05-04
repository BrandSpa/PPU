$ ->
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
        $(el).find('#categories-checkbox').html template( collection )
        _.each categories, (category) ->
          $(el).find("#categories-checkbox input[value='#{category.id}']").attr("checked", "checked")

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
      @model.save data, $.extend({}, ppu.ajaxOptions("PUT", data))

    updated: (model) ->
      if model.id
        @closeModal()
      
    close: (e) ->
      e.preventDefault()
      @closeModal()