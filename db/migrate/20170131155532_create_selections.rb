class CreateSelections < ActiveRecord::Migration[5.0]
  def change
    create_table :selections do |t|
      t.belongs_to :beer
      t.belongs_to :list
    end
  end
end
