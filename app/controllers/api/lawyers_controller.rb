class Api::LawyersController < ApplicationController

  def index
    lang = params[:lang] || "es"
    position = params[:position]
    keyword = params[:keyword]
    category = params[:category]

    collection = Lawyer.includes(:categories, :educations, :jobs, :languages, :awards).where(nil).lang(lang)
    collection = collection.by_position(position) if position.present?
    collection = collection.by_category(category) if category.present?
    collection = collection.search(keyword) if keyword.present?

    render json: collection.to_json(:include => 
      [ {:categories => { :only => :name }}, :educations, :jobs , :languages, :awards])
  end

end