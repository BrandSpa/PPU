var lang;window.ppu={admin:{}},window.mixins={},window.app={},ppu.pathUrl=window.location.pathname.split("/"),lang=ppu.pathUrl[1],app.compile=function(e){return Handlebars.compile($(e).html())},app.pubsub={},_.extend(app.pubsub,Backbone.Events),$(document).ajaxStart(function(){return NProgress.start()}),$(document).ajaxStop(function(){return NProgress.done()}),$(".select-cities li a").click(function(e){return $(".select-cities li a").removeClass("active"),$(e.currentTarget).addClass("active"),$("#city-info .collapse").removeClass("in")}),$("#footer-content").on("shown.bs.collapse",function(){return $(".open-contact-footer").css("color","#002855")}),$("#footer-content").on("hidden.bs.collapse",function(){return $(".open-contact-footer").css("color","#fff")}),app.compileTemplate=function(e){return e=$(e).html(),Handlebars.compile(e)},ppu.appendDatePickerYear=function(e){return $(e).find(".datepicker-year").datepicker({format:"yyyy",viewMode:"years",minViewMode:"years",language:"es",autoclose:!0})},ppu.appendDatePicker=function(e){return $(e).find(".datepicker").datepicker({format:"dd/mm/yyyy",language:"es",autoclose:!0})},ppu.appendSelect=function(e){return $(e).find("select").selectBoxIt({autoWidth:!1})},ppu.appendCheck=function(e){return $(e).find("input").iCheck({labelHover:!1,cursor:!0,checkboxClass:"icheckbox_square-blue"})},ppu.appendSummernote=function(e){return $(e).find(".summernote").summernote({fontname:["Lato"],onImageUpload:function(e,t,r){return app.uploadPhotoSummernote(e[0],t,r)}})},ppu.appendSummernoteExperience=function(e){return $(e).find(".summernote").summernote({fontNames:["Lato"],onImageUpload:function(e,t,r){return app.uploadPhotoSummernoteExperience(e[0],t,r)}})},app.uploadPhotoSummernote=function(e,t,r){var o;return o=new FormData,o.append("gallery[name]","post_content"),o.append("gallery[img_name]",e),$.ajax({data:o,type:"POST",url:"/api/galleries",cache:!1,contentType:!1,processData:!1,success:function(e){return t.insertImage(r,e)}})},app.uploadPhotoSummernoteExperience=function(e,t,r){var o;return o=new FormData,o.append("gallery[name]","company_logo"),o.append("gallery[img_name]",e),$.ajax({data:o,type:"POST",url:"/api/galleries",cache:!1,contentType:!1,processData:!1,success:function(e){return console.log(e),t.insertImage(r,e)}})},ppu.appendForm=function(e,t){var r;return r=app.compile(t),$(r()).appendTo($(e).find(".fields")).hide().slideDown(),ppu.appendDatePickerYear(e)},ppu.ajaxOptions=function(e,t){return{type:e,data:t,processData:!1,cache:!1,contentType:!1}},ppu.saveMultipeForms=function(e,t,r){var o;return o=$(e).find("form"),t=t,o.each(function(e){var n;return n=new FormData(o[e]),n.append("fields[lawyer_id]",r),t.save(n,$.extend({},ppu.ajaxOptions("POST",n)))})},$(window).on("scroll",_.throttle(function(){return function(){var e,t,r;return e=document.body,r=100,t=e.scrollHeight-window.innerHeight-r,e.scrollTop>t?(console.log("scroll"),app.pubsub.trigger("general:scroll")):void 0}}(this),1e3)),$(".carousel").carousel({interval:2e3}),$(".popver").popover(),$(document).ajaxSend(function(e,t){var r;return r=$("meta[name='csrf-token']").attr("content"),t.setRequestHeader("X-CSRF-Token",r)}),$(document).find(".datepicker-year").datepicker({format:"yyyy",viewMode:"years",minViewMode:"years",language:"es",autoclose:!0}),$(document).find(".datepicker").datepicker({format:"yyyy",language:"es",autoclose:!0}),app.topPadding=$(window).width()<768?200:$(window).width()>768&&$(window).width()<=992?150:$(window).width()>992&&$(window).width()<=1200?35:35,$(window).scroll(function(){return $(window).scrollTop()>app.topPadding?$(".top-bar-container").addClass("to-top"):$(".top-bar-container").removeClass("to-top")}),Handlebars.registerHelper("checked",function(e,t){var r;return null!=(r=e===t)?r:{' checked="checked"':""}}),Handlebars.registerHelper("shortenText",function(e){return e.substring(0,95)+" ..."}),Handlebars.registerHelper("shortenText2",function(e){return e.substring(0,120)+" ..."}),Handlebars.registerHelper("dateFormat",function(e,t){var r;return window.moment?(r=t.hash.format||"DD/MM/YYYY",moment(e).format(r)):void 0}),Handlebars.registerHelper("toUpperCase",function(e){return e.toUpperCase()}),Handlebars.registerHelper("getYear",function(e,t){var r;return window.moment?(r=t.hash.format||"YYYY",moment(e).format(r)):e}),Backbone.View.prototype.renderPostErrors=function(e,t){var r,o;return e=e,r=this.$el.find("form"),o=JSON.parse(t.responseText),_.each(o,function(e,t){var o;return o=r.find("[name='post["+t+"]' ]"),o.addClass("error"),o.after("<div class='error-message'>"+e+"</div>")})},Backbone.View.prototype.en=function(){var e;return e=ppu.pathUrl[1],"en"===e?!0:!1},Backbone.View.prototype.renderModel=function(){var e,t;return e=$(this.template).html(),t=Handlebars.compile(e),this.container.html(t(this.model.toJSON())),this},Backbone.View.prototype.renderCollection=function(){return this.collection.each(function(e){return this.renderOne(e)},this)},Backbone.View.prototype.notifyError=function(e,t){var r;return r=JSON.parse(t.responseText),r&&"es"===lang?toastr.error("Tiene errores"):void 0},Backbone.View.prototype.renderErrors=function(e,t){var r,o;return e=e,r=this.$el.find("form"),o=JSON.parse(t.responseText),r.find(".error-message").remove(),_.each(o,function(e,t){var o;return o=r.find("[name='fields["+t+"]' ]"),o.addClass("error"),o.after("<div class='error-message'>"+e+"</div>")})},Backbone.View.prototype.removeError=function(e){var t;return t=$(e.currentTarget),t.removeClass("error"),t.parent().find(".error-message").remove()},Backbone.View.prototype.closeModal=function(){return $(".modal-backdrop").remove(),$("body").removeClass("modal-open"),this.remove()},Backbone.View.prototype.setUrlTranslation=function(e){var t,r;return r=e.get("translations"),t=e.get("translation"),window.urlTranslation=r?r.slug:t.slug},Backbone.View.prototype.openShare=function(){return $("#share-modal").modal()};var __hasProp={}.hasOwnProperty,__extends=function(e,t){function r(){this.constructor=e}for(var o in t)__hasProp.call(t,o)&&(e[o]=t[o]);return r.prototype=t.prototype,e.prototype=new r,e.__super__=t.prototype,e};$(function(){return ppu.AppView=function(e){function t(){return t.__super__.constructor.apply(this,arguments)}return __extends(t,e),t.prototype.el=$("#ppu-app"),t.prototype.events={"click .change-lang-page":"changeLangPage"},t.prototype.changeLangPage=function(e){var t;return e.preventDefault(),t=window.urlTranslation,window.location="en"===app.lang?""===t?"http://ppulegal.com"+app.pathname:"http://ppulegal.com/"+ppu.pathUrl[1]+"/"+t:""===t?"http://en.ppulegal.com"+app.pathname:"http://en.ppulegal.com/"+ppu.pathUrl[1]+"/"+t},t}(Backbone.View)});var __hasProp={}.hasOwnProperty,__extends=function(e,t){function r(){this.constructor=e}for(var o in t)__hasProp.call(t,o)&&(e[o]=t[o]);return r.prototype=t.prototype,e.prototype=new r,e.__super__=t.prototype,e};$(function(){return ppu.FiltersMobile=function(e){function t(){return t.__super__.constructor.apply(this,arguments)}return __extends(t,e),t.prototype.el=$("#filters-modal"),t.prototype.events={"click .apply-filters":"applyFilters","change .category":"addCategory","change .country":"addCountry"},t.prototype.initialize=function(){return this.filters={},app.pubsub.on("filters:showPosition",this.showPosition,this)},t.prototype.applyFilters=function(e){return e.preventDefault(),app.pubsub.trigger("apply:filters",this.filters),this.$el.modal("hide")},t.prototype.showPosition=function(){return console.log("dale remove"),$("#filters-modal").find(".position").removeClass("hidden")},t.prototype.addFilter=function(e){return this.filters=_.extend(this.filters,e)},t.prototype.addCategory=function(e){var t;return t=$(e.currentTarget).find("select").val(),this.addFilter({category:t})},t.prototype.addCountry=function(e){var t;return t=$(e.currentTarget).find("select").val(),this.addFilter({country:t})},t}(Backbone.View)});var __hasProp={}.hasOwnProperty,__extends=function(e,t){function r(){this.constructor=e}for(var o in t)__hasProp.call(t,o)&&(e[o]=t[o]);return r.prototype=t.prototype,e.prototype=new r,e.__super__=t.prototype,e};$(function(){return ppu.Category=function(e){function t(){return t.__super__.constructor.apply(this,arguments)}return __extends(t,e),t.prototype.urlRoot="/api/categories",t}(Backbone.Model),ppu.Categories=function(e){function t(){return t.__super__.constructor.apply(this,arguments)}return __extends(t,e),t.prototype.url="/api/categories",t.prototype.model=ppu.Category,t}(Backbone.Collection),ppu.CategoryView=function(e){function t(){return t.__super__.constructor.apply(this,arguments)}return __extends(t,e),t.prototype.template=$("#category-template"),t.prototype.className="col-md-6 col-sm-6 col-xs-12 category-item",t.prototype.render=function(){var e;return e=app.compile(this.template),$(this.el).html(e(this.model.toJSON())),this},t}(Backbone.View),ppu.CategoriesView=function(e){function t(){return t.__super__.constructor.apply(this,arguments)}return __extends(t,e),t.prototype.el=$("#categories"),t.prototype.initialize=function(){return this.listenTo(this.collection,"reset",this.render),this.getTitle()},t.prototype.getTitle=function(){return $("#top-bar").html($("#category-title").html())},t.prototype.renderOne=function(e){return ppu.categoryView=new ppu.CategoryView({model:e}),this.$el.append(ppu.categoryView.render().el)},t.prototype.render=function(){return this.collection.each(function(e){return this.renderOne(e)},this)},t}(Backbone.View),ppu.CategoryDetail=function(e){function t(){return t.__super__.constructor.apply(this,arguments)}return __extends(t,e),t.prototype.el=$("#category"),t.prototype.template=$("#category-detail-template"),t.prototype.initialize=function(){return this.listenTo(this.model,"change",this.render),this.getTitle()},t.prototype.getTitle=function(){return $("#top-bar").html($("#category-detail-title").html())},t.prototype.render=function(){var e;return e=app.compile(this.template),this.$el.html(e(this.model.toJSON())),this.setUrlTranslation(this.model),app.pubsub.trigger("categories:list"),app.pubsub.trigger("lawyers:related",this.model.get("name"))},t}(Backbone.View),ppu.CategoriesList=function(e){function t(){return t.__super__.constructor.apply(this,arguments)}return __extends(t,e),t.prototype.el=$("#categories-list"),t.prototype.template=$("#categories-list-template"),t.prototype.initialize=function(){return this.listenTo(this.collection,"reset",this.render),app.pubsub.bind("categories:list",this.getAll,this)},t.prototype.getAll=function(){return ppu.categories.fetch({reset:!0})},t.prototype.render=function(){var e;return e=app.compile(this.template),$("#categories-list").html(e(this.collection.toJSON())),console.log($("#categories-list").html())},t}(Backbone.View)});var __hasProp={}.hasOwnProperty,__extends=function(e,t){function r(){this.constructor=e}for(var o in t)__hasProp.call(t,o)&&(e[o]=t[o]);return r.prototype=t.prototype,e.prototype=new r,e.__super__=t.prototype,e};$(function(){return ppu.Lawyer=function(e){function t(){return t.__super__.constructor.apply(this,arguments)}return __extends(t,e),t.prototype.urlRoot="/api/lawyers",t.prototype.fetchBySlug=function(e){return this.fetch({data:$.param({slug:e,locale:app.lang})})},t}(Backbone.Model),ppu.Lawyers=function(e){function t(){return t.__super__.constructor.apply(this,arguments)}return __extends(t,e),t.prototype.url="/api/lawyers",t.prototype.model=ppu.Lawyer,t}(Backbone.Collection),ppu.LawyerView=function(e){function t(){return t.__super__.constructor.apply(this,arguments)}return __extends(t,e),t.prototype.template=$("#lawyer-template"),t.prototype.className="col-md-6 col-sm-6 col-xs-12 lawyer-item",t.prototype.render=function(){var e,t;return t=this.template.html(),e=Handlebars.compile(t),$(this.el).html(e(this.model.toJSON())),this},t}(Backbone.View),ppu.LawyersView=function(e){function t(){return t.__super__.constructor.apply(this,arguments)}return __extends(t,e),t.prototype.el=$("#lawyers"),t.prototype.initialize=function(){var e;return this.listenTo(this.collection,"reset",this.render),this.listenTo(this.collection,"add",this.renderOne),e=this.order_by(),this.collection.fetch({reset:!0,data:e}),app.pubsub.on("apply:filters",this.filterCollection,this)},t.prototype.filterCollection=function(e){return e=_.extend({lang:app.lang},e),this.collection.fetch({reset:!0,data:e})},t.prototype.order_by=function(){return"en"===app.lang?{order_by_english:!0}:{order_by_spanish:!0}},t.prototype.paginate=function(){return this.collection.fetch({data:{offset:offset}})},t.prototype.renderOne=function(e){var t;return t=new ppu.LawyerView({model:e}),$(this.el).append(t.render().el)},t.prototype.render=function(){return $(this.el).html(""),this.collection.each(function(e){return this.renderOne(e)},this)},t}(Backbone.View),ppu.LawyersFilters=function(e){function t(){return t.__super__.constructor.apply(this,arguments)}return __extends(t,e),t.prototype.el=$("#top-bar"),t.prototype.template=$("#lawyers-filter"),t.prototype.offset=20,t.prototype.events={"change .position":"byPosition","change .country":"byCountry","change .category":"byCategory","keyup .query":"byQuery","submit .search":"bySearch"},t.prototype.initialize=function(){return this.render(),this.filtersAplied={lang:app.lang},this.order_by(),this.$el.data("filtersAplied",this.filtersAplied),app.pubsub.on("general:scroll",this.paginate,this),app.pubsub.trigger("filters:showPosition")},t.prototype.order_by=function(){return"en"===app.lang?_.extend(this.filtersAplied,{order_by_english:!0}):_.extend(this.filtersAplied,{order_by_spanish:!0})},t.prototype.render=function(){var e;return e=app.compile(this.template),this.$el.html(e),ppu.appendSelect(this.el)},t.prototype.paginate=function(){var e;return e=_.extend(this.filtersAplied,{paginate:this.offset}),ppu.lawyers.fetch({data:e}),this.offset=this.offset+20},t.prototype.byPosition=function(e){var t,r;return r=$(e.currentTarget).find("select").val(),t=_.extend(this.filtersAplied,{paginate:0,position:r}),ppu.lawyers.fetch({reset:!0,data:t})},t.prototype.byCountry=function(e){var t,r,o,n;return r=$(e.currentTarget),2===$(".countries").find('input[type="checkbox"]:checked').length?(t=_.extend(this.filtersAplied,{paginate:0,country:""}),ppu.lawyers.fetch({reset:!0,data:t})):(r.find(":not(:checked)")&&(n=r.val()),o="Colombia"===n?"Chile":"Colombia",$(".countries").find("input[value='"+o+"']").prop("checked",!0),t=_.extend(this.filtersAplied,{paginate:0,country:o}),ppu.lawyers.fetch({reset:!0,data:t}))},t.prototype.byCategory=function(e){var t,r;return r=$(e.currentTarget).find("select").val(),t=_.extend(this.filtersAplied,{paginate:0,category:r}),ppu.lawyers.fetch({reset:!0,data:t})},t.prototype.byQuery=function(e){var t,r;return r=$(e.currentTarget).val(),r.length>=1?(t=_.extend(this.filtersAplied,{paginate:0,search:r}),ppu.lawyers.fetch({reset:!0,data:t})):void 0},t.prototype.bySearch=function(e){var t,r;return e.preventDefault(),r=$(e.currentTarget).find(".query").val(),t=_.extend(this.filtersAplied,{paginate:0,search:r}),ppu.lawyers.fetch({reset:!0,data:t})},t}(Backbone.View),ppu.LawyerDetailView=function(e){function t(){return t.__super__.constructor.apply(this,arguments)}return __extends(t,e),t.prototype.el=$("#lawyer"),t.prototype.template=$("#lawyer-template"),t.prototype.events={"click .share":"openShare"},t.prototype.initialize=function(){return this.listenTo(this.model,"change",this.render),this.getTitle(),this.model.fetch()},t.prototype.getTitle=function(){return $("#top-bar").html($("#lawyer-detail-title").html())},t.prototype.render=function(){var e;return e=app.compile(this.template),$(this.el).html(e(this.model.toJSON()))},t}(Backbone.View),ppu.lawyersRelatedCategory=function(e){function t(){return t.__super__.constructor.apply(this,arguments)}return __extends(t,e),t.prototype.el=$("#lawyers-related"),t.prototype.template=$("#lawyer-related-template"),t.prototype.initialize=function(){return this.listenTo(this.collection,"reset",this.render),app.pubsub.bind("lawyers:related",this.getRelated,this)},t.prototype.getRelated=function(e){var t;return t="en"===app.lang?"Partner":"Socio",this.collection.fetch({reset:!0,data:{lang:app.lang,category:e,position:t}})},t.prototype.render=function(){var e;return e=app.compile(this.template),$("#lawyers-related").html(e(this.collection.toJSON()))},t}(Backbone.View)});var __hasProp={}.hasOwnProperty,__extends=function(e,t){function r(){this.constructor=e}for(var o in t)__hasProp.call(t,o)&&(e[o]=t[o]);return r.prototype=t.prototype,e.prototype=new r,e.__super__=t.prototype,e};$(function(){return ppu.Post=function(e){function t(){return t.__super__.constructor.apply(this,arguments)}return __extends(t,e),t.prototype.urlRoot="/api/posts",t}(Backbone.Model),ppu.Posts=function(e){function t(){return t.__super__.constructor.apply(this,arguments)}return __extends(t,e),t.prototype.url="/api/posts",t.prototype.model=ppu.Post,t}(Backbone.Collection),ppu.PostView=function(e){function t(){return t.__super__.constructor.apply(this,arguments)}return __extends(t,e),t.prototype.template=$("#post-template"),t.prototype.className="col-md-6 col-sm-6 col-xs-12 post-item",t.prototype.render=function(){var e;return e=app.compile(this.template),$(this.el).html(e(this.model.toJSON())),this},t}(Backbone.View),ppu.PostFeaturedView=function(e){function t(){return t.__super__.constructor.apply(this,arguments)}return __extends(t,e),t.prototype.template=$("#post-template"),t.prototype.className="col-md-6 col-sm-6 col-xs-12 post-featured-item",t.prototype.render=function(){var e;return e=app.compile(this.template),$(this.el).html(e(this.model.toJSON())),this},t}(Backbone.View),ppu.PostsView=function(e){function t(){return t.__super__.constructor.apply(this,arguments)}return __extends(t,e),t.prototype.el=$("#posts"),t.prototype.initialize=function(){return this.listenTo(this.collection,"reset",this.render),app.pubsub.on("posts:filter",this.filterCollection,this),app.pubsub.on("apply:filters",this.filterCollection,this)},t.prototype.filterCollection=function(e){return e=_.extend({lang:app.lang},e),this.collection.fetch({reset:!0,data:e})},t.prototype.renderOne=function(e){return ppu.postView=new ppu.PostView({model:e}),this.$el.append(ppu.postView.render().el)},t.prototype.render=function(){return this.$el.empty(),this.collection.each(function(e){return this.renderOne(e)},this)},t}(Backbone.View),ppu.PostMainFeaturedView=function(e){function t(){return t.__super__.constructor.apply(this,arguments)}return __extends(t,e),t.prototype.template=$("#post-main-featured-template"),t.prototype.className="col-md-6 col-sm-6 col-xs-12 post-main-featured-item",t.prototype.render=function(){var e;return e=app.compile(this.template),$(this.el).html(e(this.model.toJSON())),this},t}(Backbone.View),ppu.PostsFeaturedView=function(e){function t(){return t.__super__.constructor.apply(this,arguments)}return __extends(t,e),t.prototype.el=$("#posts-featured"),t.prototype.initialize=function(){return this.listenTo(this.collection,"reset",this.render),app.pubsub.bind("posts:rendered",this.getFeatured,this),app.pubsub.on("posts:filter",this.remove,this)},t.prototype.getFeatured=function(){return this.collection.fetch({reset:!0,data:{featured:!0}})},t.prototype.renderMain=function(e){return ppu.postMainFeaturedView=new ppu.PostMainFeaturedView({model:e}),this.$el.prepend(ppu.postMainFeaturedView.render().el)},t.prototype.renderOne=function(e){return ppu.postView=new ppu.PostFeaturedView({model:e}),this.$el.append(ppu.postView.render().el)},t.prototype.render=function(){return this.collection.each(function(e){return 1===e.get("featured")?this.renderMain(e):this.renderOne(e)},this)},t}(Backbone.View),ppu.PostsFilters=function(e){function t(){return t.__super__.constructor.apply(this,arguments)}return __extends(t,e),t.prototype.el=$("#top-bar"),t.prototype.template=$("#posts-filter"),t.prototype.events={"change .country":"byCountry","change .category":"byCategory","keydown .query":"byKeyword","submit .search":"bySearch"},t.prototype.initialize=function(){return this.filtersAplied={lang:app.lang,not_featured:!0}},t.prototype.render=function(){var e;return e=app.compile(this.template),this.$el.html(e),ppu.appendSelect(this.el)},t.prototype.filterBy=function(e){return e=_.extend(this.filtersAplied,e),app.pubsub.trigger("posts:filter",e)},t.prototype.byCountry=function(e){var t,r;return t=$(e.currentTarget),2===$(".countries").find('input[type="checkbox"]:checked').length?this.filterBy({country:""}):t.find(":not(:checked)")?(r=this.CountryNotChecked(t),this.filterBy({country:r})):void 0},t.prototype.CountryNotChecked=function(e){var t;return t="Colombia"===e.val()?"Chile":"Colombia",$(".countries").find("input[value='"+t+"']").prop("checked",!0),t},t.prototype.byCategory=function(e){var t;return t=$(e.currentTarget).find("select").val(),this.filterBy({category:t})},t.prototype.byKeyword=function(e){var t;return t=$(e.currentTarget).val(),t.length>=1?this.filterBy({keyword:t}):void 0},t.prototype.bySearch=function(e){var t;return e.preventDefault(),t=$(e.currentTarget).find(".query").val(),this.filterBy({keyword:t})},t}(Backbone.View),ppu.PostDetailView=function(e){function t(){return t.__super__.constructor.apply(this,arguments)}return __extends(t,e),t.prototype.el=$("#post-detail"),t.prototype.template=$("#post-detail-template"),t.prototype.initialize=function(){return this.listenTo(this.model,"change",this.render),this.getTitle()},t.prototype.getTitle=function(){return $("#top-bar").html($("#post-detail-title").html())},t.prototype.render=function(){var e;return e=app.compile(this.template),this.$el.html(e(this.model.toJSON())),this.setUrlTranslation(this.model)},t}(Backbone.View)});var __hasProp={}.hasOwnProperty,__extends=function(e,t){function r(){this.constructor=e}for(var o in t)__hasProp.call(t,o)&&(e[o]=t[o]);return r.prototype=t.prototype,e.prototype=new r,e.__super__=t.prototype,e};$(function(){return ppu.Experience=function(e){function t(){return t.__super__.constructor.apply(this,arguments)}return __extends(t,e),t.prototype.urlRoot="/api/experiences",t}(Backbone.Model),ppu.Experiences=function(e){function t(){return t.__super__.constructor.apply(this,arguments)}return __extends(t,e),t.prototype.url="/api/experiences",t.prototype.model=ppu.Experience,t}(Backbone.Collection),ppu.ExperienceView=function(e){function t(){return t.__super__.constructor.apply(this,arguments)}return __extends(t,e),t.prototype.template=$("#experience-template"),t.prototype.className="col-md-6 col-sm-6 col-xs-12 experience-item",t.prototype.render=function(){var e;return e=app.compile(this.template),$(this.el).html(e(this.model.toJSON())),this},t}(Backbone.View),ppu.ExperiencesView=function(e){function t(){return t.__super__.constructor.apply(this,arguments)}return __extends(t,e),t.prototype.el=$("#experiences"),t.prototype.initialize=function(){return this.listenTo(this.collection,"reset",this.render),app.pubsub.bind("experiences:filter",this.filterCollection,this),app.pubsub.on("apply:filters",this.filterCollection,this)},t.prototype.filterCollection=function(e){return this.collection.fetch({reset:!0,lang:app.lang,data:e})},t.prototype.renderOne=function(e){return ppu.experienceView=new ppu.ExperienceView({model:e}),this.$el.append(ppu.experienceView.render().el)},t.prototype.render=function(){return $(this.el).html(""),this.collection.each(function(e){return ppu.experienceView=new ppu.ExperienceView({model:e}),this.$el.append(ppu.experienceView.render().el)},this)},t}(Backbone.View),ppu.ExperiencesFilters=function(e){function t(){return t.__super__.constructor.apply(this,arguments)}return __extends(t,e),t.prototype.el=$("#top-bar"),t.prototype.template=$("#experiences-filter"),t.prototype.events={"change .position":"byPosition","change .country":"byCountry","change .category":"byCategory","keydown .query":"byQuery","submit .search":"bySearch"},t.prototype.initialize=function(){return this.filtersAplied={lang:app.lang}},t.prototype.render=function(){var e;return e=app.compile(this.template),this.$el.html(e),ppu.appendSelect(this.el)},t.prototype.filterBy=function(e){return e=_.extend(this.filtersAplied,e),app.pubsub.trigger("experiences:filter",e)},t.prototype.byPosition=function(e){var t;return t=$(e.currentTarget).find("select").val(),this.filterBy({position:t})},t.prototype.byCountry=function(e){var t,r;return t=$(e.currentTarget),2===$(".countries").find('input[type="checkbox"]:checked').length?this.filterBy({country:""}):t.find(":not(:checked)")?(r=this.CountryNotChecked(t),this.filterBy({country:r})):void 0},t.prototype.CountryNotChecked=function(e){var t;return t="Colombia"===e.val()?"Chile":"Colombia",$(".countries").find("input[value='"+t+"']").prop("checked",!0),t},t.prototype.byCategory=function(e){var t;return t=$(e.currentTarget).find("select").val(),this.filterBy({category:t})},t.prototype.byQuery=function(e){var t;return t=$(e.currentTarget).val(),this.filterBy(t.length>=1?{keyword:t}:{keyword:""})},t.prototype.bySearch=function(e){var t;return e.preventDefault(),t=$(e.currentTarget).find(".query").val(),this.filterBy({keyword:t})},t}(Backbone.View),ppu.ExperienceDetailView=function(e){function t(){return t.__super__.constructor.apply(this,arguments)}return __extends(t,e),t.prototype.el=$("#experience"),t.prototype.template=$("#experience-detail-template"),t.prototype.initialize=function(){return this.listenTo(this.model,"change",this.render),this.getTitle()},t.prototype.getTitle=function(){return $("#top-bar").html($("#experience-detail-title").html())},t.prototype.render=function(){var e;return e=app.compile(this.template),this.$el.html(e(this.model.toJSON())),this.setUrlTranslation(this.model)},t}(Backbone.View)});var __hasProp={}.hasOwnProperty,__extends=function(e,t){function r(){this.constructor=e}for(var o in t)__hasProp.call(t,o)&&(e[o]=t[o]);return r.prototype=t.prototype,e.prototype=new r,e.__super__=t.prototype,e};$(function(){return ppu.Contact=function(e){function t(){return t.__super__.constructor.apply(this,arguments)}return __extends(t,e),t.prototype.urlRoot="/api/contacts",t}(Backbone.Model),ppu.Contacts=function(e){function t(){return t.__super__.constructor.apply(this,arguments)}return __extends(t,e),t.prototype.url="/api/contacts",t.prototype.model=ppu.Contact,t}(Backbone.Collection),ppu.FooterContactCreate=function(e){function t(){return t.__super__.constructor.apply(this,arguments)}return __extends(t,e),t.prototype.el=$("#footer"),t.prototype.events={"click .contact-save":"store","keydown .form-control":"removeError"},t.prototype.initialize=function(){return this.listenTo(this.model,"sync",this.stored),this.listenTo(this.model,"error",this.renderErrors,this),ppu.appendSelect(this.el)},t.prototype.store=function(e){var t,r,o;return e.preventDefault(),t=$(this.el).find("form"),r=new FormData(t[0]),o=ppu.ajaxOptions("POST",r),this.model.save(r,$.extend({},o))},t.prototype.stored=function(e){return e?($(this.el).find("form").fadeOut("fast"),$(this.el).find(".social").css("margin",0),$(this.el).find(".form_thanks").removeClass("hidden")):void 0},t}(Backbone.View)});var __hasProp={}.hasOwnProperty,__extends=function(e,t){function r(){this.constructor=e}for(var o in t)__hasProp.call(t,o)&&(e[o]=t[o]);return r.prototype=t.prototype,e.prototype=new r,e.__super__=t.prototype,e};$(function(){return ppu.Seo=function(e){function t(){return t.__super__.constructor.apply(this,arguments)}return __extends(t,e),t.prototype.el=$("#ppu"),t.prototype.template=$("#seo-template"),t.prototype.initialize=function(){return app.pubsub.bind("seo:render",this.render,this)},t.prototype.render=function(e){return console.log(e)},t}(Backbone.View)});var __hasProp={}.hasOwnProperty,__extends=function(e,t){function r(){this.constructor=e}for(var o in t)__hasProp.call(t,o)&&(e[o]=t[o]);return r.prototype=t.prototype,e.prototype=new r,e.__super__=t.prototype,e};$(function(){return ppu.Workspace=function(e){function t(){return t.__super__.constructor.apply(this,arguments)}return __extends(t,e),t.prototype.routes={abogados:"lawyers","abogados/:slug":"lawyer",experiencias:"experiences","experiencias/:slug":"experience",posts:"posts","":"posts","posts/:slug":"post",areas:"areas","areas/:slug":"area","trabaje-con-nosotros":"curriculum",nosotros:"us",probono:"probono"},t.prototype.initialize=function(){return new ppu.AppView,new ppu.Seo,window.urlTranslation="",ppu.contact=new ppu.Contact,ppu.FooterContactCreate=new ppu.FooterContactCreate({model:ppu.contact})},t.prototype.lawyers=function(){return ppu.lawyers=new ppu.Lawyers,ppu.lawyersView=new ppu.LawyersView({collection:ppu.lawyers}),ppu.lawyersFilters=new ppu.LawyersFilters,ppu.filtersMobile=new ppu.FiltersMobile},t.prototype.lawyer=function(e){return ppu.lawyer=new ppu.Lawyer({id:e}),ppu.LawyerDetailView=new ppu.LawyerDetailView({model:ppu.lawyer})},t.prototype.posts=function(){return ppu.posts=new ppu.Posts,ppu.posts.fetch({reset:!0,data:{published:!0,not_featured:!0}}),ppu.postsView=new ppu.PostsView({collection:ppu.posts}),ppu.postsFeatured=new ppu.Posts,ppu.postsFeaturedView=new ppu.PostsFeaturedView({collection:ppu.postsFeatured}),ppu.postsFeatured.fetch({reset:!0,data:{featured:!0}}),ppu.postsFilters=new ppu.PostsFilters,ppu.postsFilters.render(),ppu.filtersMobile=new ppu.FiltersMobile},t.prototype.post=function(e){return ppu.post=new ppu.Post({id:e}),ppu.post.fetch(),ppu.postDetailView=new ppu.PostDetailView({model:ppu.post})},t.prototype.areas=function(){return ppu.categories=new ppu.Categories,ppu.categories.fetch({reset:!0}),ppu.categoriesView=new ppu.CategoriesView({collection:ppu.categories})},t.prototype.area=function(e){return ppu.category=new ppu.Category({id:e}),ppu.category.fetch(),ppu.categoryDetail=new ppu.CategoryDetail({model:ppu.category}),ppu.categories=new ppu.Categories,ppu.categoriesList=new ppu.CategoriesList({collection:ppu.categories}),ppu.lawyers=new ppu.Lawyers,ppu.lawyersRelated=new ppu.lawyersRelatedCategory({collection:ppu.lawyers})},t.prototype.experience=function(e){return ppu.experience=new ppu.Experience({id:e}),ppu.experience.fetch(),ppu.experienceDetailView=new ppu.ExperienceDetailView({model:ppu.experience})},t.prototype.experiences=function(){return ppu.experiencesFilters=new ppu.ExperiencesFilters,ppu.experiencesFilters.render(),ppu.experiences=new ppu.Experiences,ppu.experiences.fetch({reset:!0,data:{published:!0,not_featured:!0}}),ppu.experiencesView=new ppu.ExperiencesView({collection:ppu.experiences}),ppu.filtersMobile=new ppu.FiltersMobile},t.prototype.curriculum=function(){var e;return ppu.curriculum=new ppu.Curriculum,ppu.curriculumCreate=new ppu.CurriculumCreate({model:ppu.curriculum}),e=$("#work-with-title-template").html(),$("#top-bar").html(e)},t.prototype.us=function(){var e;return e=$("#us-title-template").html(),$("#top-bar").html(e)},t.prototype.probono=function(){var e;return e=$("#probono-title-template").html(),$("#top-bar").html(e)},t}(Backbone.Router),new ppu.Workspace,Backbone.history.start({pushState:!0})});