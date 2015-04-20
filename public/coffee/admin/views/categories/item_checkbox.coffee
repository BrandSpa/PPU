$ ->
  class ppu.admin.CategoryCheckbox extends Backbone.View
    template: $ "#category-checkbox-template"
    className: "checkbox"

    render: ->
      template = app.compile(@template)
      @$el.html(template( @model.toJSON() ))
      @
