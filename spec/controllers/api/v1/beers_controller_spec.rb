require "rails_helper"
require "database_cleaner"

describe Api::V1::BeersController, type: :controller do
  include Devise::Test::ControllerHelpers

  describe "GET #filter" do
    DatabaseCleaner.start
    before(:all) do
      @user = FactoryGirl.create(:user)
      20.times do |n|
        FactoryGirl.create(:beer, brewery: "#{n}", style: "#{n}")
      end
    end

    it "should return only 16 beers" do
      sign_in(@user)
      get :filter, params: {name_search: "", brew_search: "", style_search: "", page: "1"}
      json = JSON.parse(response.body)

      expect(json["beers"].length).to eq(16)
      expect(json["numBeers"]).to eq(20)
    end

    it "returns the correct amount based on the search params" do
      sign_in(@user)
      get :filter, params: {name_search: "beer1", brew_search: "", style_search: "", page: "1"}
      json = JSON.parse(response.body)

      expect(json["beers"].length).to eq(11)
    end

    it "returns the correct amount based on multiple search params" do
      sign_in(@user)
      get :filter, params: {name_search: "beer2", brew_search: "1", style_search: "", page: "1"}
      json = JSON.parse(response.body)

      expect(json["beers"].length).to eq(2)
    end
  end
  DatabaseCleaner.clean
end
