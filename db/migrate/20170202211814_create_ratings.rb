class CreateRatings < ActiveRecord::Migration[5.0]
  def change
    create_table :ratings do |t|
      t.belongs_to :user
      t.belongs_to :beer
      t.float :score, null: false
      t.text :review
    end
  end
end
