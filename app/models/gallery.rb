class Gallery < ActiveRecord::Base
  mount_uploader :img_name, GalleryUploader
  scope :by_name, -> (name){ where(name: name) }
end
