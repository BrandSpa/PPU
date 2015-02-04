class AddPositionToPhrase < ActiveRecord::Migration
  def change
    add_column :phrases, :position, :integer
  end
end
