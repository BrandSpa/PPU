class Academic < ActiveRecord::Base
  include Lawyerable
  belongs_to :lawyer
end
