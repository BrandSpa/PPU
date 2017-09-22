ppu.admin.ExperienceCreate = (function(superClass) {
  extend(ExperienceCreate, superClass);

  function ExperienceCreate() {
    return ExperienceCreate.__super__.constructor.apply(this, arguments);
  }

  ExperienceCreate.prototype.el = $("#experience-create");

  ExperienceCreate.prototype.template = $("#experience-create-template");

  ExperienceCreate.prototype.events = {
    "click button.store": "store",
    "click .open-gallery": "openGallery",
    "keydown input[name='query']": "searchLawyer",
    "change .form-control": "removeError",
    "keydown .form-control": "removeError"
  };

  ExperienceCreate.prototype.initialize = function() {
    this.listenTo(this.model, "error", this.showErrors, this);
    this.listenTo(this.model, "sync", this.stored);
    return app.pubsub.bind(
      "gallery:selected",
      this.appendSelectedGallery,
      this
    );
  };

  ExperienceCreate.prototype.render = function() {
    var source, template;
    source = this.template.html();
    template = Handlebars.compile(source);
    this.$el.find(".panel-body").html(template());
    ppu.appendDatePicker(this.el);
    return ppu.appendSummernoteExperience(this.el);
  };

  ExperienceCreate.prototype.store = function(e) {
    e.preventDefault();
    var $form, content, data, options;
    $form = this.$el.find("form");
    content = $(this.el).find(".summernote").code();
    data = new FormData($form[0]);
    data.append("fields[content]", content);
    data.append("fields[lang]", app.lang);
    options = ppu.ajaxOptions("Post", data);
    return this.model.save(data, $.extend({}, options))
      .done(function(model) {
        console.log(model);
        if (model) {

          // return (window.location = "/admin/experiences2");
        }
      });
  };

  ExperienceCreate.prototype.stored = function(model) {
    if (model) {
      return (window.location = "/admin/experiences2");
    }
  };

  ExperienceCreate.prototype.showErrors = function(model, b) {
    return _.each(b.responseJSON, function(error) {
      return _.each(error, function(message) {
        return toastr.error(message);
      });
    });
  };

  ExperienceCreate.prototype.openGallery = function(e) {
    e.preventDefault();
    ppu.admin.galleryExperienceModal = new ppu.admin.GalleryExperienceModal({
      collection: ppu.admin.galleries
    });
    return ppu.admin.galleryExperienceModal.render();
  };

  ExperienceCreate.prototype.appendSelectedGallery = function(gallery_id) {
    $(this.el).find(".gallery_id").val(gallery_id);
    return ppu.admin.galleryExperienceModal.closeModal();
  };

  ExperienceCreate.prototype.searchLawyer = function(e) {
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

  return ExperienceCreate;
})(Backbone.View);
