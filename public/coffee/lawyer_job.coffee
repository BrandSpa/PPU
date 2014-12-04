$ ->
  class ppu.LawyerJob extends Backbone.Model
    url: "/api/jobs"

  class ppu.LawyerJobs extends Backbone.Collection
    url: "/api/jobs"
    model: ppu.LawyerJob

  class ppu.LawyerJobCreate extends Backbone.View
    el: $ "#lawyer-job-form"
    template: $ "#lawyer-form-job-template"
    events: 
      'click .lawyer-add-job': 'addFields'

    addFields: (e) ->
      e.preventDefault()
      source = $(@template).html()
      $(@el).find('form').append source
      ppu.appendDatePickerYear

    store: (lawyer_id) ->
      $form = $(@el).find('form')
      data = $form.serializeJSON()
      data = _.map data.fields, (model) -> _.extend(model, lawyer_id: lawyer_id)
      @model.save jobs:  data