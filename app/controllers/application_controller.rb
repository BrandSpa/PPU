class ApplicationController < ActionController::Base
  before_action :set_locale
  layout :layout_by_resource

  def set_locale
    if  request.subdomain == 'en'
      I18n.locale = request.subdomain
    else
      I18n.locale = params[:locale] || I18n.default_locale
    end
  end

  #protect_from_forgery with: :exception

  def layout_by_resource
    if devise_controller?
      'admin'
    else
      'application'
    end
  end
end
