$ ->
  class ppu.LawyerPharase extends Backbone.Model
    url: "/api/pharases"

  class ppu.LawyerPharases extends Backbone.Collection
    url: "/api/pharases"
    model: ppu.LawyerPharase

  class ppu.LawyerPharaseCreate extends Backbone.View
    el: $ "#lawyer-pharase-form"
    template: $ "#lawyer-form-pharase-template"
    events: 
      'click .lawyer-add-pharase': 'addFields'

    addFields: (e) ->
      e.preventDefault()
      source = $(@template).html()
      $(@el).find('form').append source
      ppu.appendDatePickerYear

    store: (lawyer_id) ->
      $form = $(@el).find('form')
      data = $form.serializeJSON()
      data = _.map data.fields, (model) -> _.extend(model, lawyer_id: lawyer_id)
      @model.save pharases:  data