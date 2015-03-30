class PostsController < ApplicationController
  def index
  end

  def show
    id = params[:id]
    @post = Post.find_by(slug: id)
  end

  def the_actual
  end

  def the_actual_detail
    id = params[:id]
    @post = Post.find_by(slug: id)
  end

end
