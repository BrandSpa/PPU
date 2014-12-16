class CreatePostImages < ActiveRecord::Migration
  def change
    create_table :post_images do |t|
      t.belongs_to :post
      t.string :img_name

      t.timestamps
    end
  end
end
