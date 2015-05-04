class Gallery < ActiveRecord::Base
  
  # Carrierwave upload config
  mount_uploader :img_name, GalleryUploader

  # Scopes
  scope :by_name, -> (name){ where(name: name) }
end
