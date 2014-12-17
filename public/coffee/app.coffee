$ ->
  class ppu.AppView extends Backbone.View
    el: $ "#ppu-app"
    events: 
      "click .change-lang-page": 'changeLangPage'

    changeLangPage: (e) ->
      e.preventDefault()
      if lang == 'en'
        window.location = "#{app.hostname}#{app.pathname}"
      else
        window.location = "en.#{app.hostname}#{app.pathname}"
      