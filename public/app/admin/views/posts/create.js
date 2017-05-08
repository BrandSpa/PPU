$(function() {

    ppu.admin.PostCreate = (function(superClass) {
      extend(PostCreate, superClass);

      function PostCreate() {
        return PostCreate.__super__.constructor.apply(this, arguments);
      }

      PostCreate.prototype.el = $("#post-create");

      PostCreate.prototype.template = $("#post-create-template");

      PostCreate.prototype.events = {
        "click button.store": "store",
        "click .open-gallery": "openGallery",
        "keydown input[name='query']": "searchLawyer",
        "change .form-control": "removeError",
        "keydown .form-control": "removeError"
      };

      PostCreate.prototype.initialize = function() {
        this.listenTo(this.model, 'error', this.showErrors, this);
        this.listenTo(this.model, 'sync', this.stored);
        app.pubsub.bind('gallery:selected', this.appendSelectedGallery, this);
        return app.pubsub.on('post:socialPublished', this.redirectTo, this);
      };

      PostCreate.prototype.render = function() {
        var source, template;
        source = this.template.html();
        template = Handlebars.compile(source);
        this.$el.find('.panel-body').html(template());
        ppu.appendDatePicker(this.el);
        return ppu.appendSummernote(this.el);
      };

      PostCreate.prototype.store = function(e) {
        var $form, content, data, options;
        e.preventDefault();
        $form = this.$el.find('form');
        content = $(this.el).find('.summernote').code();
        data = new FormData($form[0]);
        data.append("fields[content]", content);
        data.append("fields[lang]", app.lang);
        options = ppu.ajaxOptions("POST", data);
        return this.model.save(data, $.extend({}, options));
      };

      PostCreate.prototype.stored = function(model) {
        return window.location = "/posts/" + (this.model.get('slug'));
      };

      PostCreate.prototype.showErrors = function(model, b) {
        return _.each(b.responseJSON, function(error) {
          return _.each(error, function(message) {
            console.log(message);
            return toastr.error(message);
          });
        });
      };

      PostCreate.prototype.getCategories = function() {
        ppu.categories = new ppu.Categories;
        return ppu.categories.fetch({
          data: {
            lang: app.lang
          }
        }).done(function(collection) {
          var source, template;
          source = $('#lawyer-categories-template').html();
          template = Handlebars.compile(source);
          return $('#categories-checkboxes').html(template(collection));
        });
      };

      PostCreate.prototype.openGallery = function(e) {
        e.preventDefault();
        ppu.admin.galleryPostModal = new ppu.admin.GalleryPostModal({
          collection: ppu.admin.galleries
        });
        return ppu.admin.galleryPostModal.render();
      };

      PostCreate.prototype.appendSelectedGallery = function(gallery_id) {
        $(this.el).find('.gallery_id').val(gallery_id);
        return ppu.admin.galleryPostModal.closeModal();
      };

      PostCreate.prototype.searchLawyer = function(e) {
        var collection, query;
        query = $(e.currentTarget).val();
        if (query.length > 3) {
          collection = new ppu.Lawyers;
          ppu.admin.postLawyersSelect = new ppu.admin.PostLawyersSelect({
            collection: collection
          });
          return ppu.admin.postLawyersSelect.search(query);
        }
      };

      return PostCreate;

    })(Backbone.View);

})
