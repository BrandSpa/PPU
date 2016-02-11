class Api::PostsController < ApplicationController

  # concerns
  include Filterable

  ## get collection of posts with filters
  def index
    lang = params[:lang] || I18n.locale

    paginate = params[:paginate] || 0

    collection = entity
      .get_relationships()
      .lang(lang)
      .order(featured: :desc)
      .order(date: :desc)
      .paginate(paginate)

    collection = filters( params, collection )

    render json: collection.to_json(
      :except => [
        :keywords,
        :content,
        :updated_at
      ],
      :include => [
        {:translations => {
          :only => [:id, :slug] }
          },
        :translation,
        :lawyers,
        {:gallery => {:only => :img_name }}
    ])
  end

  # get model by id or slug
  def show
    id = params[:id]

    lang = params[:lang] || I18n.locale

    if is_a_number?(id)
      model = entity.get_relationships().find_by(id: id)
    else
      model = entity.get_relationships().find_by(slug: id)
    end

    render json: model.to_json(:include => [
      :translations,
      :translation,
      :categories,
      :lawyers,
      :gallery
    ])
  end

  # store new model to db
  def create
    model = entity.create(model_params)

    if model.valid?
      render json: model, status: 201
    else
      render json: model.errors, status: 400
    end
  end

  #Update a model
  def update
    id = params[:id]


    model = entity.get_relationships().find_by(id: id)

    if params[:remove_img_name]
      model.remove_img_name!
    end

    model.update(model_params)

    if model.valid?
        render json: model.to_json(:include => [:translations, :gallery]), status: 200
    else
        render json: model.errors, status: 400
    end
  end

  # duplicate model
  def duplicate
    id = params[:id]

    model = entity.get_relationships().find_by(id: id)

    new_model = entity.duplicate(model)

    render json: new_model, status: 200
  end

  # featured a model
  def featured
    id = params[:id]

    unfeatured()

    model = Post.find(id)

    translation = model.translations

    model.update(featured: 3)

    if translation
      translation.update(featured: 3)
    end

    render json: model

  end

  # unfeatured all posts
  def unfeatured
    collection = Post.where(featured: 3, the_actual_ch: 0, the_actual_co: 0 )

    collection.each do |model|
      model.update(featured: '')

      translation = model.translations

      if translation
        translation.update(featured: '')
      end
    end

  end

  # Validate if the param is a number
  def is_a_number?(s)
    s.to_s.match(/\A[+-]?\d+?(\.\d+)?\Z/) == nil ? false : true
  end

  private

    # model
    def entity
      Post
    end

    # params accepted
    def model_params
      params.require(:fields).permit(
        :lang,
        :country,
        :date,
        :author,
        :title,
        :content,
        :content_plain,
        :img_name,
        :remove_img_name,
        :remove_gallery,
        :slug,
        :keywords,
        :gallery_id,
        :published,
        :social_published,
        :featured,
        :unfeatured,
        :the_actual,
        :the_actual_ch,
        :the_actual_co,
        :lawyer_ids => [],
        :category_ids => []
      )
    end
end
