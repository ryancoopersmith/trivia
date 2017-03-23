class CreateFavoriteCategories < ActiveRecord::Migration[5.0]
  def change
    create_table :favorite_categories do |t|
      t.string :category, null: false
      t.integer :user_id, null: false
    end
  end
end
