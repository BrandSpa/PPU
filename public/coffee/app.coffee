$ ->
  class ppu.AppView extends Backbone.View
    el: $ "#ppu-app"
    events: 
      "click .change-lang-page": 'changeLangPage'

    changeLangPage: (e) ->
      e.preventDefault()

      if lang == 'en'
        window.location = "http://#{app.hostname}#{app.pathname}"
      else
        window.location = "http://en.#{app.hostname}#{app.pathname}"
      