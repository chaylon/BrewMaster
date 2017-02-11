require "rails_helper"

RSpec.describe List, type: :model do
  describe "associations" do
    it { should have_many(:selections) }
    it { should have_many(:beers) }
    it { should belong_to(:user) }
  end

  describe "validations" do
    it { should validate_presence_of(:name) }
  end
end
