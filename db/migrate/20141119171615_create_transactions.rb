class CreateTransactions < ActiveRecord::Migration
  def change
    create_table :transactions do |t|
      t.string :lang, default: "es"
      t.string :country, default: "Colombia"
      t.string :company
      t.string :company_link
      t.string :title
      t.date :date
      t.text :description
      t.string :logo_img
      t.text :keywords
      t.timestamps
    end
  end
end
