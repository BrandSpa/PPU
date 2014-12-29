class Education < ActiveRecord::Base
  include Lawyerable
  validates :title, presence: true, unless: :institution?
  validates :title, uniqueness: { :scope => :lawyer_id }
end
