window.ppu = 
  admin: {}

window.mixins = {}
window.app = {}

ppu.pathUrl = window.location.pathname.split( '/' )

lang = ppu.pathUrl[1]

app.compile = (template) ->
  Handlebars.compile($(template).html())

Backbone.View::renderPostErrors = (model, response) ->
  model = model
  $form = @$el.find('form')
  errors = JSON.parse(response.responseText)
  _.each errors, (message, field) ->
    input = $form.find("[name='post[#{field}]' ]")
    input.addClass "error"
    input.after "<div class='error-message'>#{message}</div>"

app.compileTemplate = (source) ->
  source = $(source).html()
  Handlebars.compile source

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


ppu.appendDatePickerYear = (el) ->
  $(el).find('.datepicker-year').datepicker
    format: 'yyyy'
    viewMode: "years"
    minViewMode: "years"
    language: 'es'
    autoclose: true

ppu.appendDatePicker = (el) ->
  $(el).find('.datepicker').datepicker
    language: 'es'
    autoclose: true

ppu.appendSummernote = (el) ->
   $(el).find('.summernote').summernote
    fontNames: ['Arial', 'Helvetica', 'Roboto'],
    onImageUpload: (files, editor, welEditable) ->
      app.uploadPhotoSummernote(files[0], editor, welEditable)

app.uploadPhotoSummernote = (file, editor, welEditable) ->
  data = new FormData()
  data.append("gallery[name]", "post_content")
  data.append("gallery[img_name]", file)
  $.ajax
    data: data,
    type: "POST",
    url: "/api/galleries"
    cache: false
    contentType: false
    processData: false
    success: (url) ->
      console.log url
      editor.insertImage(welEditable, url)


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

Handlebars.registerHelper 'shortenText', (text, block) ->
  text.substring(0, 120) + " ..."

Handlebars.registerHelper 'shortenText2', (text, block) ->
  text.substring(0, 90)

Handlebars.registerHelper 'dateFormat', (context, block) ->
  if window.moment
    f = block.hash.format || "MMM Do, YYYY";
    moment(Date(context)).format(f)
  else
    context
    
$('.carousel').carousel()

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



