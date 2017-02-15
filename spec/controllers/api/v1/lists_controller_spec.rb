require "rails_helper"
require "database_cleaner"

DatabaseCleaner.strategy = :truncation

describe Api::V1::ListsController, type: :controller do
  include Devise::Test::ControllerHelpers
  DatabaseCleaner.start

  describe "GET #index" do
    let!(:user) {FactoryGirl.create(:user)}
    let!(:list1) {FactoryGirl.create(:list, user: user, name: "List one")}
    let!(:list2) {FactoryGirl.create(:list, user: user, name: "List two")}
    let!(:list3) {FactoryGirl.create(:list, user: user, name: "List three")}

    it "should return all of the lists and the current user" do
      sign_in(user)
      get :index
      json = JSON.parse(response.body)

      expect(json["lists"].length).to eq(3)

      expect(json["lists"][0]["name"]).to eq("List one")
      expect(json["lists"][1]["name"]).to eq("List two")
      expect(json["lists"][2]["name"]).to eq("List three")

      expect(json["user"]["first_name"]).to eq("first")
    end
  end

  describe "GET #show" do
    let!(:user) {FactoryGirl.create(:user)}
    let!(:list1) {FactoryGirl.create(:list, user: user, name: "List one")}
    let!(:list2) {FactoryGirl.create(:list, user: user, name: "List two")}
    let!(:beer1) {FactoryGirl.create(:beer)}
    let!(:beer2) {FactoryGirl.create(:beer)}
    let!(:beer3) {FactoryGirl.create(:beer)}
    let!(:selection1) {FactoryGirl.create(:selection, beer: beer1, list: list1)}
    let!(:selection2) {FactoryGirl.create(:selection, beer: beer2, list: list1)}
    let!(:selection3) {FactoryGirl.create(:selection, beer: beer3, list: list2)}

    it "should show the list and the beers associated with it" do
      sign_in(user)
      get :show, params: {id: list1.id}
      json = JSON.parse(response.body)

      expect(json["list"]["name"]).to eq(list1.name)

      expect(json["beers"].length).to eq(2)
      expect(json["beers"][0]["name"]).to eq(beer1["name"])
      expect(json["beers"][1]["name"]).to eq(beer2["name"])

      expect(json["beers"]).not_to include(beer3)
    end
  end

  describe "DELETE #destroy" do
    let!(:user) {FactoryGirl.create(:user)}
    let!(:list1) {FactoryGirl.create(:list, user: user, name: "List one")}

    it "deletes a list" do
      sign_in(user)
      delete :destroy, params: {id: list1.id}
      expect(response.status).to eq(204)
      expect(user.lists).to eq([])
    end
  end
  DatabaseCleaner.clean
end
