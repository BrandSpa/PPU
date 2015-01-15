$ ->
  class ppu.AppView extends Backbone.View
    el: $ "#ppu-app"
    events: 
      'click .change-lang-page': 'changeLangPage'

    initialize: ->
      app.pubsub.bind("filter:aplied", @paginateOff, @)

    paginateOff: ->
      @$el.data("paginate")

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
      