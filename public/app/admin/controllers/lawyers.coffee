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

  edit: (id) ->
    $("#lawyer-create").remove()
    ppu.lawyer = new ppu.Lawyer id: id
    ppu.lawyer.fetch data: lang: app.lang
    view = new ppu.LawyerEditView model: ppu.lawyer

    mixins.renderCollection(ppu.LawyerEducations, ppu.LawyerEducationsEdit, lawyer_id: id)
    mixins.renderCollection(ppu.LawyerArticles, ppu.LawyerArticlesEdit, lawyer_id: id)
    mixins.renderCollection(ppu.LawyerJobs, ppu.LawyerJobsEdit, lawyer_id: id)
    mixins.renderCollection(ppu.LawyerRecognitions, ppu.LawyerRecognitionsEdit, lawyer_id: id)
    mixins.renderCollection(ppu.LawyerInstitutions, ppu.LawyerInstitutionsEdit, lawyer_id: id)
    mixins.renderCollection(ppu.LawyerLanguages, ppu.LawyerLanguagesEdit, lawyer_id: id)
    mixins.renderCollection(ppu.LawyerPharases, ppu.LawyerPharasesEdit, lawyer_id: id)
    mixins.renderCollection(ppu.LawyerAwards, ppu.LawyerAwardsEdit, lawyer_id: id)
    mixins.renderCollection(ppu.LawyerAcademics, ppu.LawyerAcademicsEdit, lawyer_id: id)


}
