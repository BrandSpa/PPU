class AddPositionToInstitution < ActiveRecord::Migration
  def change
    add_column :institutions, :position, :integer
  end
end
