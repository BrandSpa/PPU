class Admin::LawyersController < ApplicationController
  before_action :authenticate_user!
  layout "admin"

  def index
  end

  def new
  end

  def edit
  end
end
