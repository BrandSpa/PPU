$ ->
  class ppu.LawyerJob extends Backbone.Model
    url: "/api/jobs"

  class ppu.LawyerJobs extends Backbone.Collection
    url: "/api/jobs"
    model: ppu.LawyerJob

  class ppu.LawyerJobCreate extends Backbone.View
    el: $ "#lawyer-form-job"
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

  class ppu.LawyerJobView extends Backbone.View
    tagName: 'li'
    template: $ '#lawyer-job-template'
   
    _.extend(@.prototype, mixins.lawyerRelationshipView)

  class ppu.LawyerJobsEdit extends Backbone.View
    el: $ "#lawyer-job-edit"
    view: ppu.LawyerJobView
    
    _.extend(@.prototype, mixins.lawyerRelationshipViews)