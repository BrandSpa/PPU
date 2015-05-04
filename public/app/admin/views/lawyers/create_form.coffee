$ ->
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

    render: ->
      source = @template.html()
      template = Handlebars.compile(source)
      $(@el).find('.panel-body').html template()

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
      window.location = "/admin/lawyers/#{model.id}/edit"