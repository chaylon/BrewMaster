require "rails_helper"
require "database_cleaner"

describe Api::V1::SelectionsController, type: :controller do
  include Devise::Test::ControllerHelpers
  DatabaseCleaner.start

  describe "GET #index" do
    let!(:user) {FactoryGirl.create(:user)}
    let!(:list) {FactoryGirl.create(:list, user: user)}
    let!(:beer) {FactoryGirl.create(:beer)}
    let!(:selection) {FactoryGirl.create(:selection, list: list, beer: beer)}

    it "returns the selection" do
      sign_in(user)
      get :index, params: {list_id: list.id, beer_id: beer.id}
      json = JSON.parse(response.body)

      expect(json["selection"]["beer_id"]).to eq(beer.id)
      expect(json["selection"]["list_id"]).to eq(list.id)
    end
  end

end
