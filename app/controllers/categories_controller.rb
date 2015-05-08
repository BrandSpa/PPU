class CategoriesController < ApplicationController
  def index
  end

  def show
    @category = Category.find_by(slug: params[:name])
  end

end
