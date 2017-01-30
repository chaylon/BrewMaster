class CraeteLists < ActiveRecord::Migration[5.0]
  def change
    create_table :lists do |t|
      t.string :name, null: false
      t.string :description
      t.belongs_to :user
    end
  end
end
