require "rails_helper"

RSpec.describe Selection, type: :model do
  describe "associations" do
    it { should belong_to(:beer) }
    it { should belong_to(:list) }
  end
end
