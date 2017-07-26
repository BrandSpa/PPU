ppu.admin.ExperienceEdit = (function(superClass) {
  extend(ExperienceEdit, superClass);

  function ExperienceEdit() {
    return ExperienceEdit.__super__.constructor.apply(this, arguments);
  }

  ExperienceEdit.prototype.el = $("#experience-edit");

  ExperienceEdit.prototype.template = $("#experience-create-template");

  ExperienceEdit.prototype.events = {
    "click button.update": "update",
    "click .open-gallery": "openGallery",
    "keydown input[name='query']": "searchLawyer",
    "change .form-control": "removeError",
    "keydown .form-control": "removeError"
  };

  ExperienceEdit.prototype.initialize = function() {
    this.listenTo(this.model, "change", this.render);
    this.listenTo(this.model, "error", this.renderExperienceErrors, this);
    this.listenTo(this.model, "sync", this.updated, this);
    return app.pubsub.bind(
      "gallery:selected",
      this.appendSelectedGallery,
      this
    );
  };

  ExperienceEdit.prototype.render = function() {
    var source, template;
    source = this.template.html();
    template = Handlebars.compile(source);
    this.$el.find(".panel-body").html(template(this.model.toJSON()));
    ppu.appendSummernote(this.el);
    ppu.appendDatePicker(this.el);
    this.getCategories();
    return this.showLawyers();
  };

  ExperienceEdit.prototype.addDataPicker = function() {
    ppu.appendDatePicker(this.el);
    // return $(this.el).find(".datepicker").datepicker({
    //   orientation: "bottom left",
    //   format: "dd/mm/yyyy",
    //   language: "es",
    //   autoclose: true
    // });
  };

  ExperienceEdit.prototype.update = function(e) {
    var $form, content, data, options;
    e.preventDefault();
    $form = this.$el.find("form");
    content = $(this.el).find(".summernote").code();
    data = new FormData($form[0]);
    data.append("fields[content]", content);
    options = ppu.ajaxOptions("PUT", data);
    return this.model.save(data, $.extend({}, options)).done(function(model) {
      if (model) {
        return (window.location = "/admin/experiences2");
      }
    });
  };

  ExperienceEdit.prototype.getCategories = function() {
    var categories, el;
    ppu.categories = new ppu.Categories();
    el = this.$el;
    categories = this.model.get("categories");
    return ppu.categories
      .fetch({
        data: {
          locale: app.lang
        }
      })
      .done(function(collection) {
        var source, template;
        source = $("#lawyer-categories-template").html();
        template = Handlebars.compile(source);
        $("#categories-checkbox").html(template(collection));
        return _.each(categories, function(category) {
          return $(el)
            .find("#categories-checkbox input[value='" + category.id + "']")
            .attr("checked", "checked");
        });
      });
  };

  ExperienceEdit.prototype.showLawyers = function() {
    var lawyers;
    lawyers = this.model.get("lawyers");
    return _.each(lawyers, function(lawyer) {
      var view;
      view = new ppu.admin.ExperienceLawyersSelected();
      return view.renderObject(lawyer);
    });
  };

  ExperienceEdit.prototype.openGallery = function(e) {
    e.preventDefault();
    ppu.admin.galleryExperienceModal = new ppu.admin.GalleryExperienceModal({
      collection: ppu.admin.galleries
    });
    return ppu.admin.galleryExperienceModal.render();
  };

  ExperienceEdit.prototype.appendSelectedGallery = function(gallery_id) {
    $(this.el).find(".gallery_id").val(gallery_id);
    return ppu.admin.galleryExperienceModal.closeModal();
  };


  ExperienceEdit.prototype.searchLawyer = function(e) {
    var collection, query;
    query = $(e.currentTarget).val();
    if (query.length > 3) {
      collection = new ppu.Lawyers();
      ppu.admin.experienceLawyersSelect = new ppu.admin.ExperienceLawyersSelect({
        collection: collection
      });
      return ppu.admin.experienceLawyersSelect.search(query);
    }
  };


  return ExperienceEdit;
})(Backbone.View);
