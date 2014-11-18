class CreateAwards < ActiveRecord::Migration
  def change
    create_table :awards do |t|
      t.belongs_to :lawyer
      t.string :title
      t.string :description
      t.string :img_name

      t.timestamps
    end
  end
end
