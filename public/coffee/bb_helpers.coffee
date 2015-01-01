Backbone.View::renderPostErrors = (model, response) ->
  model = model
  $form = @$el.find('form')
  errors = JSON.parse(response.responseText)
  _.each errors, (message, field) ->
    input = $form.find("[name='post[#{field}]' ]")
    input.addClass "error"
    input.after "<div class='error-message'>#{message}</div>"

Backbone.View::en = ->
  lang = ppu.pathUrl[1]
  if lang == "en"
    return true
  else
    return false

Backbone.View::renderModel = ->
  source = $(@template).html()
  template = Handlebars.compile(source)
  @container.html template( @model.toJSON() )
  @

Backbone.View::renderCollection = ->
  @collection.each (model) ->
    @renderOne(model)
  , @

Backbone.View::notifyError = (model, response) ->
    errors = JSON.parse(response.responseText)
    if errors && lang == 'es'
      toastr.error "Tiene errores"
      
Backbone.View::renderErrors = (model, response) ->
    model = model
    $form = @$el.find('form')
    errors = JSON.parse(response.responseText)
    _.each errors, (message, field) ->
      input = $form.find("[name='fields[#{field}]' ]")
      input.addClass "error"
      input.after "<div class='error-message'>#{message}</div>"

Backbone.View::removeError = (e) ->
  el = $(e.currentTarget)
  el.removeClass "error"
  el.parent().find('.error-message').remove()

Backbone.View::closeModal = ->
  $('.modal-backdrop').remove()
  $('body').removeClass 'modal-open'
  @remove()

Backbone.View::setUrlTranslation = (model) ->

  translations = model.get("translations")
  translation = model.get("translation")

  if translations
    window.urlTranslation = translations.slug
  else
    window.urlTranslation = translation.slug

Backbone.View::openShare = ->
  $("#share-modal").modal()

