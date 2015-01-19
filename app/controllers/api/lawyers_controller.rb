class Api::LawyersController < ApplicationController
  
  def index
    lang = params[:lang] || I18n.locale
    filters = params.slice(:position, :country, :category, :search)
    paginate = params[:paginate] || 0
    slug = params[:slug]

    if lang.equal?(:en)
      collection = entity.where(nil).lang(lang).includes(:translations, :translation).order_by_partner.paginate(paginate)
    else
      collection = entity.where(nil).lang(lang).includes(:translations, :translation).order_by_lastname.paginate(paginate)
    end
    
    filters.each do |key, val|
      collection = collection.public_send(key, val) if val.present?
    end

    if slug.present?
      model = entity.lang(lang).relationships.where(slug: slug)
      render json: model.to_json(:include => [:translations, :translation, :academics, :articles, :awards, :educations, :institutions, :jobs, :languages, :phrases, :recognitions, :categories])
    else
      render json: collection.to_json(:include => [:translations, :translation])
    end
  end

  def imp_slug
    collection = entity.all
    collection.each do |model|
      model.slug = I18n.transliterate(model.email.split('@')[0].downcase.gsub('.', '-')).parameterize
      model.save
    end
  end

  def update_description
    collection = entity.all.relationships
    collection.each do |model|
      
      if model.lang == "es" && model.translations
        des = model.translations.description
        model.update(description_en: des)
      end
    end
  end

  def update_locale
    slug = params[:slug]
    collection = entity.all.relationships
    collection.each do |model|
      p = model.translation_id
      update_relationship(model.educations, p)
      update_relationship(model.jobs, p)
      update_relationship(model.recognitions, p)
      update_relationship(model.academics, p)
      update_relationship(model.institutions, p)
      update_relationship(model.phrases, p)
      update_relationship(model.recognitions, p)
      update_relationship(model.articles, p)
      update_relationship(model.awards, p)
      update_relationship(model.languages, p)
    end
    render json: slug
  end

   def update_relationship(collection_relationship, param)
    collection_relationship.each do |model|
      if param.present?
        model.update(lawyer_id: param)
      end
    end
  end

  def update_relationship_lawyer_id(collection, id)
    collection.each do |model|
      model.update(lawyer_id: id)
    end
  end

 

  def show
    id = params[:id]
    lang = params[:lang] || I18n.locale
    model = entity.find_by(id: id)
    render json: model.to_json(:include => [:translations,:categories, :translation])
  end

  def create
    model = entity.create(lawyer_params)
    if model.valid?
      render json: model, status: 200
    else
      render_errors(model)
    end
  end

  def update
    dupl = params[:duplicate]
    model = entity.find(params[:id])
    if dupl.present?
      new_model = entity.duplicate(model)
      render json: new_model
    else
      model.update(lawyer_params)
      if model.valid?
        render json: model.to_json(:include => [:categories])
      else
        render_errors(model)
      end
    end
    
  end

  def render_errors(model)
    render json: model.errors.messages, status: 400
  end

  def is_a_number?(s)
    s.to_s.match(/\A[+-]?\d+?(\.\d+)?\Z/) == nil ? false : true 
  end

  private

    def entity
      Lawyer
    end

    def lawyer_params
      params.require(:fields).permit(:lang, :country, :img_name, :name , :lastname, :phone, :position, :level, :email, :description, :keywords, :slug, :category_ids => []) 
    end

    
end