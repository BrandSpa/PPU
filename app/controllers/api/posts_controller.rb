class Api::PostsController < ApplicationController
  include Filterable

  def index
    lang = params[:lang] || I18n.locale
    paginate = params[:paginate] || 0
    
    collection = entity.get_relationships().lang(lang).order(featured: :desc).order(date: :desc).paginate(paginate)
    collection = filters_without_params(set_filters_without_params(params), collection)
    collection = filters_with_params(set_filters(params), collection)

    render json: collection.to_json(:include => [:translations, :translation, :gallery])
  end

  def show
    id = params[:id]
    lang = params[:lang] || I18n.locale

    if is_a_number?(id)
      model = entity.get_relationships().find_by(id: id)
    else
      model = entity.get_relationships().find_by(slug: id)
    end

    render json: model.to_json(:include => [:translations, :translation, :categories, :lawyers, :gallery])  
  end

  def create
    model = entity.create(post_params)
    if model.valid?
      render json: model, status: 200
    else
      render json: model.errors, status: 400
    end
  end

  def update
    id = params[:id]
    duplicate = params[:duplicate]
    featured = params[:fields][:featured]

    model = entity.get_relationships().find_by(id: id)

    if duplicate.present?
      new_model = entity.duplicate(model)
      render json: new_model, status: 200

    elsif featured.present?
      unfeatured_all(id)
    else

      model.update(post_params)

      if model.valid?
        render json: model.to_json(:include => [:translations, :gallery]), status: 200
      else
        render json: model.errors, status: 400
      end
    end
    
  end

  def unfeatured_all(id)
    featured = Post.where(featured: 3)

    featured.each do |f|
      f.update(featured: '')
    end

    new = Post.find(id)
    trans = new.translations
    new.update(featured: 3)

    if trans
      trans.update(featured: 3)
    end
    render json: new
  end

  def set_filters(params)
    params.slice(:is_featured, :category, :country, :keyword, :without)
  end

  def set_filters_without_params(params)
    params.slice(:featured, :published, :not_featured, :not_published, :with_featured)
  end

  def is_a_number?(s)
    s.to_s.match(/\A[+-]?\d+?(\.\d+)?\Z/) == nil ? false : true 
  end

  private 
    def entity
      Post
    end

    def post_params
      params.require(:fields).permit(:lang, :country, :date, :author, :title, :content, :content_plain, :img_name, :gallery_id, :published, :social_published, :featured, :unfeatured, :lawyer_ids => [], :category_ids => [])
    end
    
end
