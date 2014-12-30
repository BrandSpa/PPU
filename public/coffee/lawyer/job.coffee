$ ->
  class ppu.LawyerJob extends Backbone.Model
    urlRoot: "/api/lawyrs/jobs"

  class ppu.LawyerJobs extends Backbone.Collection
    url: "/api/lawyrs/jobs"
    model: ppu.LawyerJob

  class ppu.LawyerJobCreate extends Backbone.View
    el: $ "#lawyer-form-job"
    template: $ "#lawyer-form-job-template"
    events: 
      'click .lawyer-add-job': 'addForm'

    initialize: ->
      @appendForm()
      app.pubsub.bind('lawyer:stored', @store, @)

    appendForm: ->
      ppu.appendForm(@el, @template)

     addForm: (e) ->
      e.preventDefault()
      @appendForm()

    store: (data) ->
      ppu.saveMultipeForms(@el, @model, data.id)

  class ppu.LawyerJobsEditModal extends Backbone.View
    el: $ "#lawyer-job-edit-modal"
    template: $ "#lawyer-form-job-template" 
    _.extend(@.prototype, mixins.lawyerRelationshipModalEdit)

  class ppu.LawyerJobView extends Backbone.View
    tagName: 'li'
    template: $ '#lawyer-job-template'
    modal: ppu.LawyerJobsEditModal
    _.extend(@.prototype, mixins.lawyerRelationshipView)

  class ppu.LawyerJobModalCreate extends Backbone.View
    el: $ "#lawyer-relationship-create-modal"
    template: $ "#lawyer-form-job-template"
    _.extend(@.prototype, mixins.lawyerRelationshipModalCreate)

  class ppu.LawyerJobsEdit extends Backbone.View
    el: $ "#lawyer-job-edit"
    view: ppu.LawyerJobView
    modal: ppu.LawyerJobModalCreate
    _.extend(@.prototype, mixins.lawyerRelationshipViews)