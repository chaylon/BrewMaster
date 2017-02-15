require "rails_helper"
require "database_cleaner"

describe Api::V1::BeersController, type: :controller do
  include Devise::Test::ControllerHelpers
  describe "GET #filter" do

    let!(:user) {FactoryGirl.create(:user)}
    20.times do |n|
      FactoryGirl.create(:beer, brewery: "#{n}", style: "#{n}")
    end

    it "should return only 16 beers" do
      sign_in(user)
      get :filter, params: {name_search: "", brew_search: "", style_search: "", page: "1"}
      json = JSON.parse(response.body)

      expect(json["beers"].length).to eq(16)
      expect(json["numBeers"].length).to eq(20)
    end

  end
end
