class Academic < ActiveRecord::Base
  include Lawyerable
  belongs_to :lawyer
  validates :title, presence: true, unless: :institution?
end
