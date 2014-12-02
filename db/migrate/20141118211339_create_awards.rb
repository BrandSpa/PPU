class CreateAwards < ActiveRecord::Migration
  def change
    create_table :awards do |t|
      t.string :title
      t.string :img_name
      t.timestamps
    end
  end
end
