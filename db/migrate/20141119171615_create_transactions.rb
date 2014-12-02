class CreateTransactions < ActiveRecord::Migration
  def change
    create_table :trades do |t|
      t.string :lang, default: "es"
      t.string :country, default: "Colombia"
      t.string :company
      t.string :company_link
      t.string :title
      t.date :date
      t.text :description
      t.string :img_name
      t.text :keywords
      t.timestamps
    end
  end
end
