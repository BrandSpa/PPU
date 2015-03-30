class Admin::PostsController < ApplicationController
  before_action :authenticate_user!
  layout "admin"

  def dashboard  
  end

  def the_actual
  end

  def the_actual_new
  end

  def the_actual_edit
  end
  
end