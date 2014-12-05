window.ppu = {}

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
  
Backbone.View::showErrors = (model, response) ->
    errors = JSON.parse(response.responseText)
    _.each errors, (message, row) ->
      console.log message
      toastr.error message
      
Backbone.View::closeModal = ->
  @remove()
  $('.modal-backdrop').remove()
  $('body').removeClass 'modal-open'


  ppu.appendDatePickerYear = ->
    $(document).find('.datepicker-year').datepicker
    format: 'yyyy'
    viewMode: "years"
    minViewMode: "years"
    language: 'es'
    autoclose: true

ppu.ajaxOptions = (type, data) ->
  type: type
  data: data
  processData: false
  cache: false
  contentType: false

$(document).ajaxSend (e, xhr, options) ->
  token = $("meta[name='csrf-token']").attr("content")
  xhr.setRequestHeader("X-CSRF-Token", token)

 $(document).find('.datepicker-year').datepicker
        format: 'yyyy'
        viewMode: "years"
        minViewMode: "years"
        language: 'es'
        autoclose: true
