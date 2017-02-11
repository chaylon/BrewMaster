require "rails_helper"

RSpec.describe Rating, type: :model do
  describe "associations" do
    it { should belong_to(:beer) }
    it { should belong_to(:user) }
  end

  describe "validations" do
    it { should validate_presence_of(:score) }
  end
end
