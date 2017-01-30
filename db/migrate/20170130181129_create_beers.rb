class CreateBeers < ActiveRecord::Migration[5.0]
  def change
    create_table :beers do |t|
      t.string :name, null: false
      t.string :brewery, default: ""
      t.text :description, default: ""
      t.float :abv
      t.float :ibu
      t.string :image, default: ""
    end
  end
end
