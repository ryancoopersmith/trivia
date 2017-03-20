class AddWorstCategoryToUsers < ActiveRecord::Migration[5.0]
  def up
    add_column :users, :worst_category, :string, default: ''
  end

  def down
    remove_column :users, :worst_category
  end
end
