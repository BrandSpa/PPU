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

    collection = entity.select(:id, :lang, :name, :lastname, :country, :position, :phone, :email, :img_name).all.order('name ASC')
    collection = collection.lang(lang) if lang.present?
    collection = collection.by_position(position) if position.present?
    collection = collection.by_category(category) if category.present?
    collection = collection.by_trade(trade) if trade.present?
    collection = collection.by_category_id(category_id) if category.present?
    collection = collection.by_country(country) if country.present?
    collection = collection.search(keyword) if keyword.present? 
    collection = collection.by_name(name) if name.present?
    render json: collection.to_json(:include => [:categories])
  end

  def show
    id = params[:id]
    lang = params[:lang] || "es"

    if id.present?
      model = entity.find(id)
      render json: model.to_json(:include => [:categories])
    else
      render json: "id don't finded", status: 400
    end
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
      render json: model
    else
      render_errors(model)
    end
  end

  def render_errors(model)
    render json: model.errors.messages, status: 400
  end

  private
    def lawyer_params
      params.require(:fields).permit(:lang, :country, :img_name, :name , :lastname, :phone, :position, :level, :email, :description, :category_ids => []) 
    end

    def entity
      Lawyer
    end
end