class AddPositionToAcademic < ActiveRecord::Migration
  def change
    add_column :academics, :position, :integer
  end
end
