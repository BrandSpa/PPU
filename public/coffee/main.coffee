window.ppu = 
  admin: {}

window.mixins = {}
window.app = {}

ppu.pathUrl = window.location.pathname.split( '/' )

lang = ppu.pathUrl[1]

app.compile = (template) ->
  Handlebars.compile($(template).html())

app.pubsub = {}

_.extend(app.pubsub, Backbone.Events)

$(document).ajaxStart (t) ->
  NProgress.start()

$(document).ajaxStop () ->
  NProgress.done()

$(".select-cities li a").click (e) ->
  $(".select-cities li a").removeClass('active')
  $(e.currentTarget).addClass('active')
  $("#city-info .collapse").removeClass("in")

$('#footer-content').on 'shown.bs.collapse', () ->
  $(".open-contact-footer").css("color", "#002855")

$('#footer-content').on 'hidden.bs.collapse', () ->
  $(".open-contact-footer").css("color", "#fff")

app.compileTemplate = (source) ->
  source = $(source).html()
  Handlebars.compile source

ppu.appendDatePickerYear = (el) ->
  $(el).find('.datepicker-year').datepicker
    format: 'yyyy'
    viewMode: "years"
    minViewMode: "years"
    language: 'es'
    autoclose: true

ppu.appendDatePicker = (el) ->
  $(el).find('.datepicker').datepicker
    format: 'dd/mm/yyyy'
    language: 'es'
    autoclose: true


ppu.appendSelect = (el) ->
  $(el).find("select").selectBoxIt autoWidth: false

ppu.appendSummernote = (el) ->
   $(el).find('.summernote').summernote
    fontname: ['Lato'],
    onImageUpload: (files, editor, welEditable) ->
      app.uploadPhotoSummernote(files[0], editor, welEditable)

ppu.appendSummernoteExperience = (el) ->
  $(el).find('.summernote').summernote
    fontNames: ['Lato'],
    onImageUpload: (files, editor, welEditable) ->
      app.uploadPhotoSummernoteExperience(files[0], editor, welEditable)

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
      editor.insertImage(welEditable, url)

app.uploadPhotoSummernoteExperience = (file, editor, welEditable) ->
  data = new FormData()
  data.append("gallery[name]", "company_logo")
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
  temp = app.compile(template)
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

$(window).scroll () ->
  if($(window).scrollTop() + $(window).height() > $(document).height() - 150)
    app.pubsub.trigger("general:scroll")

$(window).scroll () ->
  if $(window).scrollTop() > 35
    $(".top-bar-container").addClass("to-top")
  else
    $(".top-bar-container").removeClass("to-top")

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
  