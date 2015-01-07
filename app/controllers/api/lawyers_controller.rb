class Api::LawyersController < ApplicationController
  
  def index
    lang = I18n.locale
    filters = params.slice(:position, :country, :category, :search)
    paginate = params[:paginate] || 0
    slug = params[:slug]
    collection = entity.where(nil).lang(lang).includes(:translations, :translation).order("FIELD(position,'Partner') DESC ", lastname: :asc).paginate(paginate)

    filters.each do |key, val|
      collection = collection.public_send(key, val) if val.present?
    end

    if slug.present?
      model = entity.lang(lang).relationships.find_by(slug: slug)
      render json: model.to_json(:include => [:academics, :articles, :awards, :educations, :institutions, :jobs, :languages, :phrases, :recognitions, :categories])
    else
      render json: collection.to_json(:include => [:translations, :translation])
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