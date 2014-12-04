$ ->
  class ppu.LawyerLanguage extends Backbone.Model
    url: "/api/languages"

  class ppu.LawyerLanguages extends Backbone.Collection
    url: "/api/languages"
    model: ppu.LawyerLanguage

  class ppu.LawyerLanguageCreate extends Backbone.View
    el: $ "#lawyer-language-form"
    template: $ "#lawyer-form-language-template"
    events: 
      'click .lawyer-add-language': 'addFields'

    addFields: (e) ->
      e.preventDefault()
      source = $(@template).html()
      $(@el).find('form').append source
      ppu.appendDatePickerYear

    store: (lawyer_id) ->
      $form = $(@el).find('form')
      data = $form.serializeJSON()
      data = _.map data.fields, (model) -> _.extend(model, lawyer_id: lawyer_id)
      @model.save languages: data