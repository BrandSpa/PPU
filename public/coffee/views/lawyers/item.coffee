$ ->
  class ppu.LawyerView extends Backbone.View
    template: $ '#lawyer-template'
    className: 'col-md-6 col-sm-6 col-xs-12 lawyer-item'
    events:
      "click": "open"

    open: ->
      window.location = "/abogados/#{@model.get('slug')}"

    render: ->
      source = @template.html()
      compile = Handlebars.compile(source)
      $(@el).html(compile( @model.toJSON() ))
      @
