class UpdateBeers < ActiveRecord::Migration[5.0]
  def change
    add_column :beers, :style, :string
  end
end
