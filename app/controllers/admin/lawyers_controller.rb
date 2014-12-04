class Admin::LawyersController < ApplicationController
  before_action :authenticate_user!
  layout "admin"

  def index
  end

   def dashboard
  	
  end
end