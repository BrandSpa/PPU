class Api::LawyersController < ApplicationController
  include Filterable

  def index
    lang = params[:lang] || I18n.locale
    paginate = params[:paginate] || 0
    slug = params[:slug]

    collection = entity.where(nil).lang(lang).get_translations.paginate(paginate)
    collection = filters_without_params(set_filters_without_params(params), collection)
    collection = filters_with_params(set_filters(params), collection)

    render json: collection.to_json(:include => [:translations, :translation])
  end

  def show
    id = params[:id]
    lang = params[:lang] || I18n.locale
    
    if is_a_number?(id)
      model = entity.find_by(id: id)
      render json: model.to_json(:include => [:translations,:categories, :translation])
    else
      model = entity.lang(lang).relationships.find_by(slug: id)
      render json: model.to_json(:include => [:translations, :translation, :academics, :articles, :awards, :educations, :institutions, :jobs, :languages, :phrases, :recognitions, :categories])
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

  def set_filters(params)
    params.slice(:position, :country, :category, :search)
  end

  def set_filters_without_params(params)
    params.slice(:order_by_spanish, :order_by_english)
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