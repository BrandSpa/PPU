class AddPositionToLanguage < ActiveRecord::Migration
  def change
    add_column :languages, :position, :integer
  end
end
