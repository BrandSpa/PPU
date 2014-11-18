class CreateArticles < ActiveRecord::Migration
  def change
    create_table :articles do |t|
      t.belongs_to :lawyer
      t.string :file_name
      t.string :title

      t.timestamps
    end
  end
end
