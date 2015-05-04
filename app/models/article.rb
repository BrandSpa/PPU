class Article < ActiveRecord::Base
  
  # Concerns
  include Lawyerable

  # Carrierwave config upload
	mount_uploader :file_name, LawyerArticlesUploader

  # Validations
  validates :file_name, presence: true, unless: :title?
end
