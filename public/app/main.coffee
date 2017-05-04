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

$(document).ajaxSend (e, xhr, options) ->
  token = $("meta[name='csrf-token']").attr("content")
  xhr.setRequestHeader("X-CSRF-Token", token)
  console.log('ajax send', token)

$.ajaxSetup beforeSend: (xhr) ->
  console.log 'ajax setup'
  token = $('meta[name=\'csrf-token\']').attr('content')
  xhr.setRequestHeader('X-CSRF-Token', token)

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
 $(el).find('.selectpicker').selectpicker()

ppu.appendCheck = (el) ->
  $(el).find("input").iCheck labelHover: false, cursor: true, checkboxClass: 'icheckbox_square-blue'

ppu.appendSummernote = (el) ->
   $(el).find('.summernote').summernote
    fontname: ['Lato'],
    onImageUpload: (files) ->
      app.uploadPhotoSummernote(files[0])

ppu.appendSummernoteExperience = (el) ->
  editor = $(el).find('.summernote').summernote
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
      imgNode = document.createElement("IMG")
      imgNode.src = url
      $(document).find('.summernote').summernote('insertNode', imgNode);

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
  headers:  'X-CSRF-Token': $('meta[name=\'csrf-token\']').attr('content')
  beforeSend: -> 
    console.log('model before send')

ppu.saveMultipeForms = (el, model, lawyer_id) ->
  $forms = $(el).find("form")
  model = model
  $forms.each (index) ->
    data = new FormData($forms[index])
    data.append("fields[lawyer_id]", lawyer_id)
    model.save data, $.extend({}, ppu.ajaxOptions("POST", data))

$(window).on "scroll", _.throttle (event) =>

  body = document.body
  tolerance = 200
  threshold = body.scrollHeight - window.innerHeight - tolerance

  if $(window).scrollTop() > threshold
    app.pubsub.trigger("general:scroll")
, 1000


$('.carousel').carousel interval: 7000

$('.popver').popover()



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

if ($(window).width() < 768)
  app.topPadding = 200
else if ($(window).width() > 768 &&  $(window).width() <= 992)
  app.topPadding = 150
else if ($(window).width() > 992 &&  $(window).width() <= 1200)
  app.topPadding = 35
else
  app.topPadding = 35

$(document).scroll () ->
  if $(window).scrollTop() > app.topPadding
    $(".top-bar-container").addClass("to-top")
  else
    $(".top-bar-container").removeClass("to-top")
