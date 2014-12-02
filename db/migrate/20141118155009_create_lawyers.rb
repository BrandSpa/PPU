class CreateLawyers < ActiveRecord::Migration
  def change
    create_table :lawyers do |t|
      t.string :lang, default: "es"
      t.string :country, default: "Colombia"
      t.string :name
      t.string :lastname
      t.string :position
      t.string :phone
      t.string :email
      t.text :description
      t.text :keywords
      t.string :img_name
      t.timestamps
    end
  end
end
