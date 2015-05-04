$ ->
  class ppu.AppView extends Backbone.View
    el: $ "#ppu-app"
    events: 
      'click .change-lang-page': 'changeLangPage'

    initialize: ->
      @activeLink()

    activeLink: ->
      links = $(@el).find('.nav-main li a')
      links.each (link, b) ->
        if $(b).data('url') == "/#{ppu.pathUrl[1]}"
          $(b).parent().addClass('active')

    changeLangPage: (e) ->
      e.preventDefault()
      urlTranslation = window.urlTranslation
      
      if app.lang == 'en'
        if urlTranslation == ""
          window.location = "http://ppulegal.com#{app.pathname}"
        else
          window.location = "http://ppulegal.com/#{ppu.pathUrl[1]}/#{urlTranslation}"
      else
        if urlTranslation == ""
          window.location = "http://en.ppulegal.com#{app.pathname}"
        else
          window.location = "http://en.ppulegal.com/#{ppu.pathUrl[1]}/#{urlTranslation}"
      