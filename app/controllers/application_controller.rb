class ApplicationController < ActionController::Base
  before_action :set_locale
  layout :layout_by_resource
  def set_locale
    if  request.subdomain = 'en'
      I18n.locale = request.subdomain
    end

    I18n.locale = I18n.default_locale   
  end

  protect_from_forgery with: :exception

  def layout_by_resource
    if devise_controller?
      'admin'
    else
      'application'
    end
  end
end
