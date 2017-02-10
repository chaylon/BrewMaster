class UpdateBeersWithImages < ActiveRecord::Migration[5.0]
  def change
    add_column :beers, :img, :string
  end
end
