$ ->
  class ppu.admin.ExperienceLawyerSelect extends Backbone.View
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
      ppu.admin.experienceLawyersSelected =  new ppu.admin.ExperienceLawyersSelected model: @model
      ppu.admin.experienceLawyersSelected.render()