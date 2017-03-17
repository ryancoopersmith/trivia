class AddFavoriteCategoryToUsers < ActiveRecord::Migration[5.0]
  def up
    add_column :users, :favorite_category, :string
  end

  def down
    remove_column :users, :favorite_category
  end
end
