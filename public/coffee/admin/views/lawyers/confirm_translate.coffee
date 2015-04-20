$ ->
  class ppu.lawyerConfirmTranslate extends Backbone.View
    el: $ "#confirm-translate-modal"
    events:
      "click .continue": "continue"
      "click .cancel": "closeModal"

    render: ->
      $(@el).modal backdrop: "static"

    continue: (e) ->
      e.preventDefault()
      $(e.currentTarget).addClass("disabled").text("Guardando")
      app.pubsub.trigger("lawyer:translate")