class Api::LawyersController < ApplicationController

  # concerns
  include Filterable

  # get lawyers by some filters
  def index
    lang = params[:lang] || I18n.locale
    paginate = params[:paginate] || 0
    slug = params[:slug]

    collection = entity.where(nil).lang(lang).get_translations.paginate(paginate)
    collection = filters(params, collection)

    render json: collection.to_json(:include => [:translations, :translation])
  end

  # get lawyer by id or slug
  def show
    id = params[:id]
    lang = params[:lang] || I18n.locale

    if is_a_number?(id)
      model = entity.find_by(id: id)
      render json: model.to_json(:include => [:translations,:categories, :translation])
    else

      model = entity.lang(lang).relationships.find_by(slug: id)

      render json: model.to_json(
        :include => [
          { :translations => {:only => [:id, :slug]} } ,
          :translation,
          { :academics => {
            :except => [:created_at, :updated_at]
          }},
          { :articles => {
            :except => [:created_at, :updated_at]
          }},
          { :awards => {
            :except => [:created_at, :updated_at]
          }},
          { :educations => {
            :except => [:created_at, :updated_at]
          }},
          { :institutions => {
            :except => [:created_at, :updated_at]
          }},
          { :jobs => {
            :except => [:created_at, :updated_at]
          }},
          { :languages => {
            :except => [:created_at, :updated_at]
          }},
          { :phrases => {
            :except => [:created_at, :updated_at]
          }},
          { :recognitions => {
            :except => [:created_at, :updated_at]
          }},
          :categories,
          :posts
        ])
    end
  end

  # store model
  def create
    model = entity.create(lawyer_params)
    if model.valid?
      render json: model, status: 200
    else
      render json: model.errors.messages, status: 400
    end
  end

  # update model
  def update
    id = params[:id]
    model = entity.find(id)

    model.update(lawyer_params)
    if model.valid?
      render json: model.to_json(:include => [:categories])
    else
      render json: model.errors.messages, status: 400
    end
  end

  # get model and duplicate it
  def duplicate
    id = params[:id]
    model = entity.find(id)

    new_model = entity.duplicate(model)
    render json: new_model

  end

  # check if param is a number
  def is_a_number?(s)
    s.to_s.match(/\A[+-]?\d+?(\.\d+)?\Z/) == nil ? false : true
  end

  private

    def entity
      Lawyer
    end

    def lawyer_params
      params.require(:fields).permit(
      :lang,
      :country,
      :img_name,
      :name ,
      :lastname,
      :phone,
      :position,
      :level,
      :email,
      :description,
      :keywords,
      :slug,
      :published,
      :category_ids => [])
    end
end
