$ ->
  class ppu.LawyerEducation extends Backbone.Model
    url: "/api/educations"

  class ppu.LawyerEducations extends Backbone.Collection
    url: "/api/educations"
    model: ppu.LawyerEducation

  class ppu.LawyerEducationCreate extends Backbone.View
    el: $ "#lawyer-education-form"
    template: $ "#lawyer-form-education-template"
    events: 
      'click .lawyer-add-education': 'addFields'

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