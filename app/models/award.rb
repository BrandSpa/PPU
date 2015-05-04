class Award < ActiveRecord::Base

  # Concerns
  include Lawyerable

  # Carrierwave upload config
  mount_uploader :img_name, AwardUploader

  # Validations
  validates :img_name, presence: true, unless: :title?

end
