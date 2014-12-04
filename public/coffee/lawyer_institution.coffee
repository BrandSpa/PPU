$ ->
  class ppu.LawyerInstitution extends Backbone.Model
    url: "/api/institutions"

  class ppu.LawyerInstitutions extends Backbone.Collection
    url: "/api/institutions"
    model: ppu.LawyerInstitution

  class ppu.LawyerInstitutionCreate extends Backbone.View
    el: $ "#lawyer-institution-form"
    template: $ "#lawyer-form-institution-template"
    events: 
      'click .lawyer-add-institution': 'addFields'

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