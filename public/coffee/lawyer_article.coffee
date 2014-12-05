$ ->
  class ppu.LawyerAward extends Backbone.Model
    urlRoot: "/api/awards"

  class ppu.LawyerAwards extends Backbone.Collection
    url: "/api/awards"
    model: ppu.LawyerAward

  class ppu.LawyerAwardCreate extends Backbone.View
    el: $ "#lawyer-award-form"
    template: $ "#lawyer-form-award-template"
    events: 
      'click .lawyer-add-award': 'addFields'

    addFields: (e) ->
      e.preventDefault()
      source = $(@template).html()
      $(@el).find('form').append source
      ppu.appendDatePickerYear

    store: (lawyer_id) ->
      $form = $(@el).find('form')
      data = $form.serializeJSON()
      data = _.map data.fields, (model) -> _.extend(model, lawyer_id: lawyer_id)
      @model.save educations:  data