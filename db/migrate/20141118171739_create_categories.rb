class CreateCategories < ActiveRecord::Migration
  def change
    create_table :categories do |t|
      t.string :lang, default: "es"
      t.string :name
      t.string :img_name
      t.string :description
      t.timestamps
    end
  end
end
