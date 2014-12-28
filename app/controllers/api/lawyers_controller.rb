class Api::LawyersController < ApplicationController
  before_action :authenticate_user!, except: [:index, :show]

  def index
    lang = I18n.locale
    name = params[:name]
    position = params[:position]
    keyword = params[:keyword]
    category = params[:category]
    category_id = params[:category_id]
    trade = params[:trade]
    trade_id = params[:trade_id]
    country = params[:country]
    offset = params[:offset]
    update = params[:update]
    slug = params[:slug]

    collection = entity.includes(:categories).where(nil).lang(lang).order(position: :desc, name: :asc)
    collection = collection.by_position(position) if position.present?
    collection = entity.by_category(category) if category.present?
    collection = collection.by_trade(trade) if trade.present?
    collection = collection.by_country(country) if country.present?
    collection = collection.search(keyword) if keyword.present? 
    collection = collection.by_name(name) if name.present?

    if update.present?
      collection.each do |m|
        slug = m.email.split('@')[0]
        m.update({slug: slug})
      end
    end

    if slug.present?
      collection = entity.relationships.by_slug(slug).lang(I18n.locale).first 
      render json: collection.to_json(:include => [:academics, :articles, :awards, :educations, :institutions, :jobs, :languages, :phrases, :recognitions, :categories])

      if collection.nil?
        
        model = entity.includes(:categories).by_slug(slug).lang(:es).first
        collection = duplicate(model)

      end

    else
      render json: collection.to_json(:include => [:categories])
    end

  end

  def show
    id = params[:id]
    slug = params[:slug]
    lang = I18n.locale
    model = entity.includes(:educations).find(id) if id.present?
    model = entity.by_slug(slug).lang(lang) if slug.present?
    render json: model.to_json(:include => [:categories, :educations])
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
    model = entity.find(params[:id])
    model.update(lawyer_params)
    model.save
    if model.valid?
      render json: model.to_json(:include => [:categories])
    else
      render_errors(model)
    end
  end

  def duplicate(model)
    model_new = model.dup
    model_new.position = translate_position(model.position)
    model_new.lang = "en"
    model_new.save
    id = model_new.id
    duplicate_relationship(model.educations, id)
    duplicate_relationship(model.jobs, id)
    duplicate_relationship(model.recognitions, id)
    duplicate_relationship(model.academics, id)
    duplicate_relationship(model.institutions, id)
    duplicate_relationship(model.phrases, id)
    duplicate_with_image(model.awards, id)
    duplicate_with_file(model.articles, id)
    model_new
  end

  def duplicate_relationship(collection, id)
    collection.each do |model|
      model_new = model.dup
      model_new.lawyer_id = id
      model_new.save
    end
  end

  def duplicate_with_image(collection, id)
    collection.each do |model|
      model_new = model.dup
      model_new.lawyer_id = id
      model_new.img_name = File.open(model.img_name.path) if model.img_name.path
      model_new.save
    end
  end

  def duplicate_with_file(collection, id)
    collection.each do |model|
      model_new = model.dup
      model_new.lawyer_id = id
      model_new.file_name = File.open(model.file_name.path) if model.file_name.path
      model_new.save
    end
  end

  def translate_position(position)
    if position == "Abogado"
      "Lawyer" 
    elsif position == "Socio" 
      "Partner"
    elsif position == "Especialista"
      "Specialist"
    else
      "Senior Counsel"
    end
  end

  def render_errors(model)
    render json: model.errors.messages, status: 400
  end

  private
    def lawyer_params
      params.require(:fields).permit(:lang, :country, :img_name, :name , :lastname, :phone, :position, :level, :email, :description, :keywords, :slug, :category_ids => []) 
    end

    def entity
      Lawyer
    end
end