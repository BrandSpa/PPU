class Article < ActiveRecord::Base
  include Lawyerable
	mount_uploader :file_name, LawyerArticlesUploader
  validates :file_name, presence: true, unless: :title?
  validates :title, uniqueness: { :scope => :lawyer_id }
end
