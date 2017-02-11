require 'rails_helper'

RSpec.describe User, type: :model do
  describe "associations" do
    it { should have_many(:lists) }
    it { should have_many(:ratings) }
    it { should have_many(:beers) }
  end

  describe "validations" do
    it { should validate_presence_of(:email) }
    it { should validate_presence_of(:password) }
    it { should validate_presence_of(:first_name) }
    it { should validate_presence_of(:last_name) }

    subject {FactoryGirl.build(:user)}
    it { should validate_uniqueness_of(:email) }
  end
end
