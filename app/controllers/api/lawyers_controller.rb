class Api::LawyersController < ApplicationController
  before_action :authenticate_user!, except: [:index, :show]

  def entity
    Lawyer
  end

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
    has_translation = params[:has_translation]
    offset = params[:offset]
    
    collection = Lawyer.all.relationships_for_list.lang(lang).order_list.paginate(offset)
    collection = entity.by_category(category) if category.present?
    collection = collection.by_position(position) if position.present?
    collection = collection.by_trade(trade) if trade.present?
    collection = collection.by_country(country) if country.present?
    collection = collection.search(keyword) if keyword.present? 
    collection = collection.by_name(name) if name.present?
    collection = entity.has_translation(has_translation) if has_translation.present?

    if slug.present?
      collection = entity.relationships.by_slug(slug).lang(I18n.locale).first
      render json: collection.to_json(:include => [:academics, :articles, :awards, :educations, :institutions, :jobs, :languages, :phrases, :recognitions, :categories])
    else
      render json: collection.to_json(:include => [:categories, :translations])
    end

  end

  def show
    id = params[:id]
    slug = params[:slug]
    lang = I18n.locale
    model = entity.includes(:translations, :educations, :categories).find(id) if id.present?
    model = entity.by_slug(slug).lang(lang) if slug.present?
    render json: model.to_json(:include => [:translations, :categories, :educations])
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

  private
    def lawyer_params
      params.require(:fields).permit(:lang, :country, :img_name, :name , :lastname, :phone, :position, :level, :email, :description, :keywords, :slug, :category_ids => []) 
    end

    
end