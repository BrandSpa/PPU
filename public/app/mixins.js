$(function() {
  mixins.lawyerRelationshipView = {
    tagName: "tr",
    events: {
      "click .open-edit": "openEdit",
      "click .remove": "remove"
    },
    initialize: function() {
      return this.listenTo(this.model, "change", this.render);
    },
    setPosition: function(position) {
      return this.model.save({
        position: position
      });
    },
    render: function() {
      var source, template;
      source = $(this.template).html();
      template = Handlebars.compile(source);
      this.$el.html(template(this.model.toJSON()));
      this.$el.data("id", this.model.get("id"));
      return this;
    },
    openEdit: function(e) {
      var view;
      e.preventDefault();
      view = new this.modal({
        model: this.model
      });
      return view.render();
    },
    remove: function(e) {
      e.preventDefault();
      this.model.destroy();
      this.$el.fadeOut();
      return this.$el.remove();
    }
  };

  mixins.lawyerRelationshipViews = {
    events: {
      "click .open-modal-create": "openCreate",
      sortstop: "stop"
    },

    initialize: function() {
      var _this = this;
      this.listenTo(this.collection, "reset", this.renderCollection);
      this.listenTo(this.collection, "add", this.renderCollection);
      $( this.el ).on( "sortstop", function(event, ui) {
        _this.stop(event, ui).bind(_this);
      });
    },

    renderCollection: function() {
      this.$el.find("table tbody").html("");
      return this.collection.each(function(model) {
        return this.renderOne(model);
      }, this);
    },

    renderOne: function(model) {
      var view;
      view = new this.view({ model: model });
      $(this.el).find("table").append(view.render().el);
      console.log('el', view.render().el);
      $(this.el).find(".sortable").sortable();

      $(this.el).attr('data-id', model.id);
    },

    stop: function(event, ui) {
      
      var _this, list;
      _this = this;
      list = $(this.el).find("tbody tr");

      return $.map(list, function(el) {
        var id, model, pos;
        pos = $(el).index();
        id = $(el).data("id");

        model = _this.collection.get(id);
        
        return model.save({
          fields: {
            position: pos
          }
        });
      });
    },
    openCreate: function(e) {
      var lawyer_id, view;
      e.preventDefault();
      lawyer_id =
        ppu.currentLawyerId || this.collection.models[0].get("lawyer_id");
      view = new this.modal({
        model: new this.collection.model(),
        collection: this.collection
      });
      return view.render(lawyer_id);
    }
  };

  mixins.lawyerRelationshipModalCreate = {
    events: {
      "click .create": "create",
      "click .modal-close": "close"
    },
    initialize: function() {
      return this.listenTo(this.model, "sync", this.created);
    },

    render: function(lawyer_id) {
      var data, source, template;
      data = {
        lawyer_id: lawyer_id
      };

      this.$el.find(".modal-body").empty();
      source = $(this.template).html();
      template = Handlebars.compile(source);
      this.$el.find(".modal-body").html(template(data));
      this.openModal();
      return this.appendDatePicker();
    },

    openModal: function() {
      return $(this.el).modal({
        backdrop: "static"
      });
    },

    appendDatePicker: function() {
      return $(this.el).find(".datepicker-year").datepicker({
        format: "yyyy",
        viewMode: "years",
        minViewMode: "years",
        language: "es",
        autoclose: true
      });
    },

    create: function(e) {
      var $form, data, el, lawyer_id;
      e.preventDefault();
      el = $(e.currentTarget);
      lawyer_id = el.data("lawyer_id");
      $form = this.$el.find("form");
      data = new FormData($form[0]);
      return this.store(data);
    },

    store: function(data) {
      return this.model.save(data, $.extend({}, ppu.ajaxOptions("POST", data)));
    },

    closeModal: function() {
      $(this.el).modal('hide');
    },

    created: function(model) {
      if (model.id) {
        this.collection.add(model);
        this.closeModal();
      }
    },

    close: function(e) {
      e.preventDefault();
      this.closeModal();
    }

    
  };

  mixins.lawyerRelationshipModalEdit = {
    events: {
      "click .update": "update",
      "click .modal-close": "close"
    },

    initialize: function() {
      return this.listenTo(this.model, "sync", this.updated);
    },

    render: function() {
      var source, template;
      this.$el.find(".modal-body").empty();
      source = $(this.template).html();
      template = Handlebars.compile(source);
      this.$el.find(".modal-body").html(template(this.model.toJSON()));
      $(this.el).modal({
        backdrop: "static"
      });
      return ppu.appendDatePickerYear(this.el);
    },

    update: function(e) {
      var $form, data;
      e.preventDefault();
      $form = this.$el.find("form");
      data = new FormData($form[0]);
      return this.model.save(data, $.extend({}, ppu.ajaxOptions("PUT", data)));
    },

    closeModal: function() {
      $(this.el).modal('hide');
    },

    updated: function(model) {
      if (model.id) {
        return this.closeModal();
      }
    },

    close: function(e) {
      e.preventDefault();
      return this.closeModal();
    }
  };
});
