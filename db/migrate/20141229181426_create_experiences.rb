class CreateExperiences < ActiveRecord::Migration
  def change
    create_table :experiences do |t|
    	t.integer :gallery_id
    	t.string :company_name
    	t.string :company_web
    	t.date :date
    	t.text :title
    	t.text :content
      t.timestamps
    end
  end
end
