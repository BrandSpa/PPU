class PostImage < ActiveRecord::Base
  belongs_to :post
  mount_uploader :img_name, PostImagesUploader
end
