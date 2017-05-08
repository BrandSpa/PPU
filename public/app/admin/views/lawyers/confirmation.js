ppu.lawyerConfirmTranslate = (function(superClass) {
  extend(lawyerConfirmTranslate, superClass);

  function lawyerConfirmTranslate() {
    return lawyerConfirmTranslate.__super__.constructor.apply(this, arguments);
  }

  lawyerConfirmTranslate.prototype.el = $("#confirm-translate-modal");

  lawyerConfirmTranslate.prototype.events = {
    "click .continue": "continue",
    "click .cancel": "closeModal"
  };

  lawyerConfirmTranslate.prototype.render = function() {
    return $(this.el).modal({
      backdrop: "static"
    });
  };

  lawyerConfirmTranslate.prototype["continue"] = function(e) {
    e.preventDefault();
    $(e.currentTarget).addClass("disabled").text("Guardando");
    return app.pubsub.trigger("lawyer:translate");
  };

  return lawyerConfirmTranslate;
})(Backbone.View);
