class Beer < ApplicationRecord
  validates :name, presence: true, uniqueness: true
  has_many :selections
  has_many :lists, through: :selections
end
