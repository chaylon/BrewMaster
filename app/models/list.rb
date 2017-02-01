class List < ApplicationRecord
  validates :name, presence: true
  belongs_to :user
  has_many :selections
  has_many :beers, through: :selections
end
