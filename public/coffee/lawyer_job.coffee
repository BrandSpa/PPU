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
      'click .lawyer-add-job': 'addForm'

    initialize: ->
      @appendForm()

    appendForm: ->
      ppu.appendForm(@el, @template)

     addForm: (e) ->
      e.preventDefault()
      @appendForm()

    store: (lawyer_id) ->
      ppu.saveMultipeForms(@el, @model, lawyer_id)