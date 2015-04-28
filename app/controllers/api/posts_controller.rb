class Api::PostsController < ApplicationController

  # concerns
  include Filterable

  ## get collection of posts with filters
  def index

    # get lang by params or by I18n default
    lang = params[:lang] || I18n.locale

    # get paginate offset by params or zero by default
    paginate = params[:paginate] || 0

    # get collection with relations, by lang, order by featured, date and paginate
    collection = entity
      .get_relationships()
      .lang(lang)
      .order(featured: :desc)
      .order(date: :desc)
      .paginate(paginate)

    # filter collection by filters without params
    collection = filters_without_params( set_filters_without_params(params), collection )

    # filter collection by filters with params
    collection = filters_with_params(set_filters(params), collection)

    # Response json with relationships
    render json: collection.to_json(:include => [:translations, :translation, :gallery])
  end

  # filters with params to add
  def set_filters(params)

    params.slice(
      :is_featured,
      :category,
      :country,
      :keyword,
      :without
    )

  end

  # filters without params to add
  def set_filters_without_params(params)

    params.slice(
      :featured,
      :published,
      :not_featured,
      :not_published,
      :with_featured,
      :the_actual,
      :without_the_actual,
      :the_actual_colombia,
      :without_the_actual_colombia
    )

  end

  def show
    id = params[:id]

    # get lang by params or by I18n default
    lang = params[:lang] || I18n.locale

    # if id is a number find by id
    # if not find by slug
    if is_a_number?(id)
      model = entity.get_relationships().find_by(id: id)
    else
      model = entity.get_relationships().find_by(slug: id)
    end

    # Response json with relationships
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

    model = entity.create(post_params)

    #if model passes validation return json with the model
    #if not passes return json with the validation errors
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
    the_actual = params[:fields][:the_actual]

    model = entity.get_relationships().find_by(id: id)

    if duplicate.present?
      new_model = entity.duplicate(model)
      # render json: new_model, status: 200

    elsif featured.present?
      unfeatured_all(id, the_actual)

    else

      model.update(post_params)

      if model.valid?
        render json: model.to_json(:include => [:translations, :gallery]), status: 200
      else
        render json: model.errors, status: 400
      end
    end
  end

  def unfeatured_all(id, the_actual)

    if the_actual
      featured = Post.where(featured: 3, the_actual: true)
    else
      featured = Post.where(featured: 3, the_actual: false, the_actual: nil)
    end

    featured.each do |f|
      f.update(featured: '')
      trans = f.translations

      if trans
        trans.update(featured: '')
      end

    end

    new = Post.find(id)
    trans = new.translations
    new.update(featured: 3)

    if trans
      trans.update(featured: 3)
    end

  end

  def is_a_number?(s)
    s.to_s.match(/\A[+-]?\d+?(\.\d+)?\Z/) == nil ? false : true
  end

  private

    # model
    def entity
      Post
    end

    # params accepted
    def post_params
      params.require(:fields).permit(
        :lang,
        :country,
        :date,
        :author,
        :title,
        :content,
        :content_plain,
        :img_name,
        :gallery_id,
        :published,
        :social_published,
        :featured,
        :unfeatured,
        :the_actual,
        :lawyer_ids => [],
        :category_ids => []
      )
    end

end
