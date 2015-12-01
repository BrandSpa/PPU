class Slider < ActiveRecord::Base

  # Carrierwave upload config
  mount_uploader :slider_image, SliderUploader

end
