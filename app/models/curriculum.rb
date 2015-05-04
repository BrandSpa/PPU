class Curriculum < ActiveRecord::Base

	# Carrierwave upload config
	mount_uploader :file_name, CurriculumUploader

	# Validations
	validates :country, presence: true
	validates :name, presence: true
end
