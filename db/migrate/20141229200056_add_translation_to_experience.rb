class AddTranslationToExperience < ActiveRecord::Migration
  def change
    add_reference :experiences, :translation, index: true
  end
end
