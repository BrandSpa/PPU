$ ->
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