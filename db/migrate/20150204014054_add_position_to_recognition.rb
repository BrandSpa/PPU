class AddPositionToRecognition < ActiveRecord::Migration
  def change
    add_column :recognitions, :position, :integer
  end
end
