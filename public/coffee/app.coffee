$ ->
  class ppu.AppView extends Backbone.View
    el: $ "#ppu-app"
    events: 
      "click .change-lang-page": 'changeLangPage'

    changeLangPage: (e) ->
      e.preventDefault()

      if app.lang == 'en'
        window.location = "http://ppulegal.com#{app.pathname}"
      else
        window.location = "http://en.ppulegal.com#{app.pathname}"
      