ppu.admin.ExperiencesController = {
  index: function() {
    ppu.experiences = new ppu.Experiences;
    ppu.experiences.fetch({
      reset: true
    });
    ppu.admin.experiences = new ppu.admin.ExperiencesView({
      collection: ppu.experiences
    });
    return ppu.admin.experiencesFilters = new ppu.admin.ExperiencesFilters;
  },
  create: function() {
    ppu.admin.experience = new ppu.Experience;
    ppu.admin.experienceCreate = new ppu.admin.ExperienceCreate({
      model: ppu.admin.experience
    });
    ppu.admin.experienceCreate.render();
    ppu.categories = new ppu.Categories;
    ppu.categories.fetch({
      reset: true
    });
    ppu.admin.categoriesCheckboxnew = new ppu.admin.CategoriesCheckbox({
      collection: ppu.categories
    });
    ppu.admin.galleries = new ppu.admin.Galleries;
    return ppu.admin.galleries.fetch({
      reset: true,
      data: {
        name: "company_logo"
      }
    });
  },
  edit: function(id) {
    ppu.admin.experience = new ppu.Experience({
      id: id
    });
    ppu.admin.experience.fetch({
      data: {
        lang: app.lang
      }
    });
    ppu.admin.experienceEdit = new ppu.admin.ExperienceEdit({
      model: ppu.admin.experience
    });
    ppu.admin.galleries = new ppu.admin.Galleries;
    return ppu.admin.galleries.fetch({
      reset: true,
      data: {
        name: "company_logo"
      }
    });
  }
};
