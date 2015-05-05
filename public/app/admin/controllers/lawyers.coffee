ppu.admin.LawyersController = {

  index: ->
    ppu.lawyers = new ppu.Lawyers
    ppu.lawyers.fetch reset: true
    ppu.admin.lawyers= new ppu.admin.LawyersView collection: ppu.lawyers
    ppu.admin.lawyersFilters = new ppu.admin.LawyersFilters

  show: ->
    ppu.lawyers = new ppu.Lawyers
    ppu.lawyers.fetch reset: true
    ppu.admin.lawyers= new ppu.admin.LawyersView collection: ppu.lawyers
    ppu.admin.lawyersFilters = new ppu.admin.LawyersFilters

  create: ->
    ppu.lawyer =  new ppu.Lawyer
    ppu.lawyerCreateForm = new ppu.LawyerCreateForm model: ppu.lawyer
    ppu.lawyerCreateForm.render()

    ppu.categories = new ppu.Categories
    ppu.categories.fetch reset: true
    ppu.admin.categoriesCheckboxnew = new ppu.admin.CategoriesCheckbox collection: ppu.categories

    ppu.lawyerCreate = new ppu.LawyerCreateView

  editEducations: (id) ->
    collection = new ppu.LawyerEducations
    collection.fetch reset: true, data: lawyer_id: id
    view = new ppu.LawyerEducationsEdit collection: collection

  editArticles: (id) ->
    collection = new ppu.LawyerArticles
    collection.fetch reset: true, data: lawyer_id: id
    view = new ppu.LawyerArticlesEdit collection: collection

  editJobs: (id) ->
    collection = new ppu.LawyerJobs
    collection.fetch reset: true, data: lawyer_id: id
    view = new ppu.LawyerJobsEdit collection: collection

  editRecognitions: (id) ->
    collection = new ppu.LawyerRecognitions
    collection.fetch reset: true, data: lawyer_id: id
    view = new ppu.LawyerRecognitionsEdit collection: collection

  editInstitutions: (id) ->
    collection = new ppu.LawyerInstitutions
    collection.fetch reset: true, data: lawyer_id: id
    view = new ppu.LawyerInstitutionsEdit collection: collection

  editLanguages: (id) ->
    collection = new ppu.LawyerLanguages
    collection.fetch reset: true, data: lawyer_id: id
    view = new ppu.LawyerLanguagesEdit collection: collection

  editPharases: (id) ->
    collection = new ppu.LawyerPharases
    collection.fetch reset: true, data: lawyer_id: id
    view = new ppu.LawyerPharasesEdit collection: collection

  editAwards: (id) ->
    collection = new ppu.LawyerAwards
    collection.fetch reset: true, data: lawyer_id: id
    view = new ppu.LawyerAwardsEdit collection: collection

  editAcademics: (id) ->
    collection = new ppu.LawyerAcademics
    collection.fetch reset: true, data: lawyer_id: id
    view = new ppu.LawyerAcademicsEdit collection: collection

  edit: (id) ->
    $("#lawyer-create").remove()
    ppu.lawyer = new ppu.Lawyer id: id
    ppu.lawyer.fetch data: lang: app.lang
    view = new ppu.LawyerEditView model: ppu.lawyer

    @editEducations(id)
    @editArticles(id)
    @editJobs(id)
    @editRecognitions(id)
    @editInstitutions(id)
    @editLanguages(id)
    @editPharases(id)
    @editAwards(id)
    @editAcademics(id)



}
