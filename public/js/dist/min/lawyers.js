var __hasProp={}.hasOwnProperty,__extends=function(e,t){function r(){this.constructor=e}for(var n in t)__hasProp.call(t,n)&&(e[n]=t[n]);return r.prototype=t.prototype,e.prototype=new r,e.__super__=t.prototype,e};$(function(){return ppu.Lawyer=function(e){function t(){return t.__super__.constructor.apply(this,arguments)}return __extends(t,e),t.prototype.urlRoot="/api/lawyers",t.prototype.fetchBySlug=function(e){return this.fetch({data:$.param({slug:e,locale:app.lang})})},t}(Backbone.Model),ppu.Lawyers=function(e){function t(){return t.__super__.constructor.apply(this,arguments)}return __extends(t,e),t.prototype.url="/api/lawyers",t.prototype.model=ppu.Lawyer,t}(Backbone.Collection),ppu.LawyerView=function(e){function t(){return t.__super__.constructor.apply(this,arguments)}return __extends(t,e),t.prototype.template=$("#lawyer-template"),t.prototype.className="col-md-6 col-sm-6 col-xs-12 lawyer-item",t.prototype.render=function(){var e,t;return t=this.template.html(),e=Handlebars.compile(t),$(this.el).html(e(this.model.toJSON())),this},t}(Backbone.View),ppu.LawyersView=function(e){function t(){return t.__super__.constructor.apply(this,arguments)}return __extends(t,e),t.prototype.el=$("#lawyers"),t.prototype.initialize=function(){var e;return this.listenTo(this.collection,"reset",this.render),this.listenTo(this.collection,"add",this.renderOne),e=this.order_by(),this.collection.fetch({reset:!0,data:e})},t.prototype.order_by=function(){return"en"===app.lang?{order_by_english:!0}:{order_by_spanish:!0}},t.prototype.paginate=function(){return this.collection.fetch({data:{offset:offset}})},t.prototype.renderOne=function(e){var t;return t=new ppu.LawyerView({model:e}),$(this.el).append(t.render().el)},t.prototype.render=function(){return $(this.el).html(""),this.collection.each(function(e){return this.renderOne(e)},this)},t}(Backbone.View),ppu.LawyersFilters=function(e){function t(){return t.__super__.constructor.apply(this,arguments)}return __extends(t,e),t.prototype.el=$("#top-bar"),t.prototype.template=$("#lawyers-filter"),t.prototype.offset=20,t.prototype.events={"change .position":"byPosition","change .country":"byCountry","change .category":"byCategory","keyup .query":"byQuery","submit .search":"bySearch"},t.prototype.initialize=function(){return this.render(),this.filtersAplied={lang:app.lang},this.order_by(),this.$el.data("filtersAplied",this.filtersAplied),app.pubsub.on("general:scroll",this.paginate,this),app.pubsub.trigger("filters:showPosition")},t.prototype.order_by=function(){return"en"===app.lang?_.extend(this.filtersAplied,{order_by_english:!0}):_.extend(this.filtersAplied,{order_by_spanish:!0})},t.prototype.render=function(){var e;return e=app.compile(this.template),this.$el.html(e),ppu.appendSelect(this.el)},t.prototype.paginate=function(){var e;return e=_.extend(this.filtersAplied,{paginate:this.offset}),ppu.lawyers.fetch({data:e}),this.offset=this.offset+20},t.prototype.byPosition=function(e){var t,r;return r=$(e.currentTarget).find("select").val(),t=_.extend(this.filtersAplied,{paginate:0,position:r}),ppu.lawyers.fetch({reset:!0,data:t})},t.prototype.byCountry=function(e){var t,r,n,o;return r=$(e.currentTarget),2===$(".countries").find('input[type="checkbox"]:checked').length?(t=_.extend(this.filtersAplied,{paginate:0,country:""}),ppu.lawyers.fetch({reset:!0,data:t})):(r.find(":not(:checked)")&&(o=r.val()),n="Colombia"===o?"Chile":"Colombia",$(".countries").find("input[value='"+n+"']").prop("checked",!0),t=_.extend(this.filtersAplied,{paginate:0,country:n}),ppu.lawyers.fetch({reset:!0,data:t}))},t.prototype.byCategory=function(e){var t,r;return r=$(e.currentTarget).find("select").val(),t=_.extend(this.filtersAplied,{paginate:0,category:r}),ppu.lawyers.fetch({reset:!0,data:t})},t.prototype.byQuery=function(e){var t,r;return r=$(e.currentTarget).val(),r.length>=1?(t=_.extend(this.filtersAplied,{paginate:0,search:r}),ppu.lawyers.fetch({reset:!0,data:t})):void 0},t.prototype.bySearch=function(e){var t,r;return e.preventDefault(),r=$(e.currentTarget).find(".query").val(),t=_.extend(this.filtersAplied,{paginate:0,search:r}),ppu.lawyers.fetch({reset:!0,data:t})},t}(Backbone.View),ppu.LawyerDetailView=function(e){function t(){return t.__super__.constructor.apply(this,arguments)}return __extends(t,e),t.prototype.el=$("#lawyer"),t.prototype.template=$("#lawyer-template"),t.prototype.events={"click .share":"openShare"},t.prototype.initialize=function(){return this.listenTo(this.model,"change",this.render),this.getTitle(),this.model.fetch()},t.prototype.getTitle=function(){return $("#top-bar").html($("#lawyer-detail-title").html())},t.prototype.render=function(){var e;return e=app.compile(this.template),$(this.el).html(e(this.model.toJSON()))},t}(Backbone.View),ppu.lawyersRelatedCategory=function(e){function t(){return t.__super__.constructor.apply(this,arguments)}return __extends(t,e),t.prototype.el=$("#lawyers-related"),t.prototype.template=$("#lawyer-related-template"),t.prototype.initialize=function(){return this.listenTo(this.collection,"reset",this.render),app.pubsub.bind("lawyers:related",this.getRelated,this)},t.prototype.getRelated=function(e){var t;return t="en"===app.lang?"Partner":"Socio",this.collection.fetch({reset:!0,data:{lang:app.lang,category:e,position:t}})},t.prototype.render=function(){var e;return e=app.compile(this.template),$("#lawyers-related").html(e(this.collection.toJSON()))},t}(Backbone.View)});