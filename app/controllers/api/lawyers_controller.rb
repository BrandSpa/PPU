class Api::LawyersController < ApplicationController

  def index
    lang = params[:lang] || "es"
    position = params[:position]
    keyword = params[:keyword]
    category = params[:category]
    category_id = params[:category_id]
    trade = params[:trade]
    trade_id = params[:trade_id]
    country = params[:country]

    collection = Lawyer.select(:id, :lang, :name, :lastname, :position, :phone, :email, :img_name).where(nil).lang(lang)
    collection = collection.by_position(position) if position.present?
    collection = collection.by_category(category) if category.present?
    collection = collection.by_trade(trade) if trade.present?
    collection = collection.by_category_id(category_id) if category.present?
    collection = collection.by_country(country) if country.present?
    collection = collection.search(keyword) if keyword.present?

    render json: collection
  end

  def show
    id = params[:id]
    lang = params[:lang] || "es"

    if id.present?
      model = Lawyer.lang(lang).find(id)
      render json: model.to_json(:include => 
          [ {:categories => { :only => :name }}, :educations, :jobs , {:languages=> { :only => :name }}, :awards, :articles, :phrases, :recognitions, :institutions, :trades])
    else
      render json: "id don't finded", status: 400
    end
  end

  def create
    model = Lawyer.create(lawer_params)
    if model.valid?
      Lawyer.attach_categories(model, params[:categories])
      Lawyer.attach_collection(model.educations, params[:educations])
      Lawyer.attach_collection(model.jobs, params[:jobs])
      Lawyer.attach_collection(model.recognitions, params[:recognitions])
      Lawyer.attach_collection(model.institutions, params[:institutions])
      Lawyer.attach_collection(model.languages, params[:languages]) 
      Lawyer.attach_collection(model.phrases, params[:phrases]) 
      render json: model
    else
      render json:  model.errors.messages, status: 400
    end
    
  end

  def update
    id = params[:id]
    model = Lawyer.find(id)
    if model.valid?
      Lawyer.attach_categories(model, params[:categories])
      Lawyer.attach_collection(model.educations, params[:educations])
      Lawyer.attach_collection(model.jobs, params[:jobs])
      Lawyer.attach_collection(model.recognitions, params[:recognitions])
      Lawyer.attach_collection(model.institutions, params[:institutions])
      Lawyer.attach_collection(model.languages, params[:languages]) 
      render json: model
    else
      render json:  model.errors.messages, status: 400
    end
    
  end

  def attach_img
    id = params[:lawyer_id]
    model = Lawyer.find(id)
    model.img_name = params[:img_name]
  end

  private
    def lawer_params
      params.permit(
        :lang, 
        :country,
        :name ,
        :lastname, 
        :phone, 
        :position, 
        :email, 
        :description
      )
    end

end