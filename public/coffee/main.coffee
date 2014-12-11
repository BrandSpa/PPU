window.ppu = 
  admin: {}

window.mixins = {}

Dropzone.autoDiscover = false

ppu.pathUrl = window.location.pathname.split( '/' )

lang = ppu.pathUrl[1]
if lang == "en"
  $.ajaxSetup
    data: lang: "en"

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
  @remove()
  $('body').removeClass 'modal-open'

ppu.appendDatePickerYear = (el) ->
  $(el).find('.datepicker-year').datepicker
    format: 'yyyy'
    viewMode: "years"
    minViewMode: "years"
    language: 'es'
    autoclose: true

ppu.appendForm = (el, template)->
  source = $(template).html()
  temp = Handlebars.compile(source)
  $(temp()).appendTo($(el).find('.fields')).hide().slideDown()
  ppu.appendDatePickerYear(el)

ppu.ajaxOptions = (type, data) ->
  type: type
  data: data
  processData: false
  cache: false
  contentType: false

ppu.saveMultipeForms = (el, model, lawyer_id) ->
  $forms = $(el).find("form")
  model = model
  $forms.each (index) ->
    data = new FormData($forms[index])
    data.append("fields[lawyer_id]", lawyer_id)
    model.save data, $.extend({}, ppu.ajaxOptions("POST", data))

Handlebars.registerHelper 'checked', (val1, val2) ->
    return val1 == val2 ? ' checked="checked"' : ''

$(document).ajaxSend (e, xhr, options) ->
  token = $("meta[name='csrf-token']").attr("content")
  xhr.setRequestHeader("X-CSRF-Token", token)

$(document).find('.datepicker-year').datepicker
  format: 'yyyy'
  viewMode: "years"
  minViewMode: "years"
  language: 'es'
  autoclose: true

$(document).find('.datepicker').datepicker
  format: 'yyyy'
  language: 'es'
  autoclose: true