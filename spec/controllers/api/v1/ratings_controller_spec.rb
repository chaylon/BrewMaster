require "rails_helper"
require "database_cleaner"

describe Api::V1::RatingsController, type: :controller do
  include Devise::Test::ControllerHelpers
  DatabaseCleaner.start

  describe "GET #index" do
    let!(:user) {FactoryGirl.create(:user)}
    let!(:beer) {FactoryGirl.create(:beer)}
    let!(:rating) {FactoryGirl.create(:rating, user: user, beer: beer)}

    it "gets the rating information" do
      sign_in(user)
      get :index, params: {beer_id: beer.id}
      json = JSON.parse(response.body)

      expect(json["ratings"][0]["score"]).to eq(rating.score)
      expect(json["ratings"][0]["user_id"]).to eq(user.id)
      expect(json["ratings"][0]["beer_id"]).to eq(beer.id)
    end

    it "calculates the score correctly from multiple ratings" do
      user2 = FactoryGirl.create(:user)
      rating2 = FactoryGirl.create(:rating, user: user2, beer: beer, score: 1)
      sign_in(user)
      get :index, params: {beer_id: beer.id}
      json = JSON.parse(response.body)

      expect(json["score"]).to eq(2)
    end
  end

  describe "POST #create" do
    let!(:user) {FactoryGirl.create(:user)}
    let!(:beer) {FactoryGirl.create(:beer)}

    it "creates a rating" do
      sign_in(user)

      expect(Rating.all.length).to eq(0)

      post :create, params: {beer_id: beer.id, user_id: user.id, rating: {beer_id: beer.id, user_id: user.id, score: 3}}

      expect(Rating.all.length).to eq(1)

      rating = Rating.first
      expect(rating.beer_id).to eq(beer.id)
      expect(rating.user_id).to eq(user.id)
      expect(rating.score).to eq(3)
    end

    it "updates a rating" do
      FactoryGirl.create(:rating, user: user, beer: beer)
      sign_in(user)

      expect(Rating.all.length).to eq(1)
      expect(Rating.first.score).to eq(3)

      post :create, params: {beer_id: beer.id, user_id: user.id, rating: {beer_id: beer.id, user_id: user.id, score: 2}}

      expect(Rating.first.score).to eq(2)
    end
  end

  describe "DELETE #destroy" do
    let!(:user) {FactoryGirl.create(:user)}
    let!(:beer) {FactoryGirl.create(:beer)}
    let!(:rating) {FactoryGirl.create(:rating, user: user, beer: beer)}

    it "deletes a rating" do
      sign_in(user)

      expect(Rating.all.length).to eq(1)

      delete :destroy, params: {beer_id: beer.id, id: rating.id}

      expect(Rating.all.length).to eq(0)
    end
  end
  DatabaseCleaner.clean
end
