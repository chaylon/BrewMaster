require "rails_helper"

RSpec.describe Beer, type: :model do
  describe "associations" do
    it { should have_many(:selections) }
    it { should have_many(:lists) }
    it { should have_many(:ratings) }
  end

  describe "validations" do
    it { should validate_presence_of(:name) }
    it { should validate_uniqueness_of(:name) }
  end
end
