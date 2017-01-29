class FixUsers < ActiveRecord::Migration[5.0]
  def change
    remove_column :users, :firist_name, :string, null: false
    add_column :users, :first_name, :string, null: false
  end
end
