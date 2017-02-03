class Rating < ApplicationRecord
  validates :score, presence: true

  belongs_to :beer
  belongs_to :user
end
