require "rails_helper"
require "database_cleaner"

feature "users show page" do
  DatabaseCleaner.start
  let!(:user) {FactoryGirl.create(:user)}
  let!(:beer1) {FactoryGirl.create(:beer, style: "IPA")}
  let!(:beer2) {FactoryGirl.create(:beer, style: "Stout")}
  let!(:rating1) {FactoryGirl.create(:rating, user: user, beer: beer1, score: 5)}
  let!(:rating2) {FactoryGirl.create(:rating, user: user, beer: beer2, score: 2)}

  scenario "favorite beers appear" do
    login_as_user(user)
    expect(page).to have_content(beer1.name)
  end

  scenario "beers with low rating don't appear" do
    login_as_user(user)
    expect(page).to_not have_content(beer2.name)
  end
  DatabaseCleaner.clean
end
