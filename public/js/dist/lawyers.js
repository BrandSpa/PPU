ppu.admin.LawyersController = {
  index: function() {
    ppu.lawyers = new ppu.Lawyers;
    ppu.lawyers.fetch({
      reset: true
    });
    ppu.admin.lawyers = new ppu.admin.LawyersView({
      collection: ppu.lawyers
    });
    return ppu.admin.lawyersFilters = new ppu.admin.LawyersFilters;
  },
  show: function() {
    ppu.lawyers = new ppu.Lawyers;
    ppu.lawyers.fetch({
      reset: true
    });
    ppu.admin.lawyers = new ppu.admin.LawyersView({
      collection: ppu.lawyers
    });
    return ppu.admin.lawyersFilters = new ppu.admin.LawyersFilters;
  },
  create: function() {
    ppu.lawyer = new ppu.Lawyer;
    ppu.lawyerCreateForm = new ppu.LawyerCreateForm({
      model: ppu.lawyer
    });
    ppu.lawyerCreateForm.render();
    ppu.categories = new ppu.Categories;
    ppu.categories.fetch({
      reset: true
    });
    ppu.admin.categoriesCheckboxnew = new ppu.admin.CategoriesCheckbox({
      collection: ppu.categories
    });
    return ppu.lawyerCreate = new ppu.LawyerCreateView;
  },
  editEducations: function(id) {
    var collection, view;
    collection = new ppu.LawyerEducations;
    collection.fetch({
      reset: true,
      data: {
        lawyer_id: id
      }
    });
    return view = new ppu.LawyerEducationsEdit({
      collection: collection
    });
  },
  editArticles: function(id) {
    var collection, view;
    collection = new ppu.LawyerArticles;
    collection.fetch({
      reset: true,
      data: {
        lawyer_id: id
      }
    });
    return view = new ppu.LawyerArticlesEdit({
      collection: collection
    });
  },
  editJobs: function(id) {
    var collection, view;
    collection = new ppu.LawyerJobs;
    collection.fetch({
      reset: true,
      data: {
        lawyer_id: id
      }
    });
    return view = new ppu.LawyerJobsEdit({
      collection: collection
    });
  },
  editRecognitions: function(id) {
    var collection, view;
    collection = new ppu.LawyerRecognitions;
    collection.fetch({
      reset: true,
      data: {
        lawyer_id: id
      }
    });
    return view = new ppu.LawyerRecognitionsEdit({
      collection: collection
    });
  },
  editInstitutions: function(id) {
    var collection, view;
    collection = new ppu.LawyerInstitutions;
    collection.fetch({
      reset: true,
      data: {
        lawyer_id: id
      }
    });
    return view = new ppu.LawyerInstitutionsEdit({
      collection: collection
    });
  },
  editLanguages: function(id) {
    var collection, view;
    collection = new ppu.LawyerLanguages;
    collection.fetch({
      reset: true,
      data: {
        lawyer_id: id
      }
    });
    return view = new ppu.LawyerLanguagesEdit({
      collection: collection
    });
  },
  editPharases: function(id) {
    var collection, view;
    collection = new ppu.LawyerPharases;
    collection.fetch({
      reset: true,
      data: {
        lawyer_id: id
      }
    });
    return view = new ppu.LawyerPharasesEdit({
      collection: collection
    });
  },
  editAwards: function(id) {
    var collection, view;
    collection = new ppu.LawyerAwards;
    collection.fetch({
      reset: true,
      data: {
        lawyer_id: id
      }
    });
    return view = new ppu.LawyerAwardsEdit({
      collection: collection
    });
  },
  editAcademics: function(id) {
    var collection, view;
    collection = new ppu.LawyerAcademics;
    collection.fetch({
      reset: true,
      data: {
        lawyer_id: id
      }
    });
    return view = new ppu.LawyerAcademicsEdit({
      collection: collection
    });
  },
  edit: function(id) {
    var view;
    $("#lawyer-create").remove();
    ppu.lawyer = new ppu.Lawyer({
      id: id
    });
    ppu.lawyer.fetch({
      data: {
        lang: app.lang
      }
    });
    view = new ppu.LawyerEditView({
      model: ppu.lawyer
    });
    this.editEducations(id);
    this.editArticles(id);
    this.editJobs(id);
    this.editRecognitions(id);
    this.editInstitutions(id);
    this.editLanguages(id);
    this.editPharases(id);
    this.editAwards(id);
    return this.editAcademics(id);
  }
};
