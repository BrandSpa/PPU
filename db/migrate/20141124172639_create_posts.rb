class CreatePosts < ActiveRecord::Migration
  def change
    create_table :posts do |t|
      t.string :lang, default: 'es'
      t.string :country, default: 'Colombia'
      t.timestamp :date
      t.string :title
      t.string :topic
      t.string :author
      t.string :content
      t.string :slug
      t.text :keywords
      t.integer :featured
      t.timestamps
    end
  end
end
