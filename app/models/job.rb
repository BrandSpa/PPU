class Job < ActiveRecord::Base
  include Lawyerable
  validates :title, presence: true, unless: :company?
  validates :title, uniqueness: { :scope => :lawyer_id }
end
