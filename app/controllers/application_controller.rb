class ApplicationController < ActionController::Base
  before_filter :allow_page_caching
  before_action :set_locale
  layout :layout_by_resource

  # set locale by subdomain or params
  def set_locale
    if  request.subdomain == 'en'
      I18n.locale = request.subdomain
    else
      I18n.locale = params[:locale] || I18n.default_locale
    end
  end

  def allow_page_caching
    expires_in(5.minutes) unless Rails.env.development?
  end

  protect_from_forgery with: :exception

  # change layout depending if user are on admin or app
  def layout_by_resource
    if devise_controller?
      'admin'
    else
      'application'
    end
  end
end
