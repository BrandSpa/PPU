class PostsController < ApplicationController
  def index
  end

  def show
    id = params[:id]
    @post = Post.find_by(slug: id)
  end

  def the_current
  end

end
