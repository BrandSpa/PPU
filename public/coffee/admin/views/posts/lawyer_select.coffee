$ ->
  class ppu.admin.PostLawyerSelect extends Backbone.View
    tagName: 'tr'
    template: $ '#lawyer-select-template'
    events: 
      "click .append": "append"

    render: ->
      source = @template.html()
      template = Handlebars.compile(source)
      @$el.html template( @model.toJSON() )
      @

    append: (e) ->
      e.preventDefault()
      ppu.admin.postLawyersSelected =  new ppu.admin.PostLawyersSelected model: @model
      ppu.admin.postLawyersSelected.render()