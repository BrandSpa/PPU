class Article < ActiveRecord::Base
  include Lawyerable
	mount_uploader :file_name, LawyerArticlesUploader
   validates :file_name, presence: true, unless: :title?
end
