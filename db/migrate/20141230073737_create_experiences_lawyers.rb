class CreateExperiencesLawyers < ActiveRecord::Migration
  def change
    create_table :experiences_lawyers do |t|
      t.references :experience, index: true
      t.references :lawyer, index: true
    end
  end
end
