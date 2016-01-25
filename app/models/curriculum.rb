class Curriculum < ActiveRecord::Base

	# Carrierwave upload config
  mount_uploader :file_name, CurriculumUploader
  mount_uploader :gathering_notes, GatheringNotesUploader
	mount_uploader :certification_ranking, CertificationRankingUploader


end
