class AddBestCategoryToUsers < ActiveRecord::Migration[5.0]
  def up
    add_column :users, :best_category, :string, default: ''
  end

  def down
    remove_column :users, :best_category
  end
end
