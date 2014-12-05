$ ->
  class ppu.LawyerRecognition extends Backbone.Model
    url: "/api/recognitions"

  class ppu.LawyerRecognitions extends Backbone.Collection
    url: "/api/recognitions"
    model: ppu.LawyerRecognition

  class ppu.LawyerRecognitionCreate extends Backbone.View
    el: $ "#lawyer-recognition-form"
    template: $ "#lawyer-form-recognition-template"
    events: 
      'click .lawyer-add-recognition': 'addFields'

    addFields: (e) ->
      e.preventDefault()
      source = $(@template).html()
      $(@el).find('form').append source
      ppu.appendDatePickerYear

    store: (lawyer_id) ->
      $form = $(@el).find('form')
      data = $form.serializeJSON()
      data = _.map data.fields, (model) -> _.extend(model, lawyer_id: lawyer_id)
      @model.save recognitions:  data