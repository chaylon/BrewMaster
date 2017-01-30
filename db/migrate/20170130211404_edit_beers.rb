class EditBeers < ActiveRecord::Migration[5.0]
  def change
    remove_column :beers, :ibu
    remove_column :beers, :image
    add_column :beers, :ibu, :integer
  end
end
