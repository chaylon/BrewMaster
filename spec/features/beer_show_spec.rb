require "rails_helper"

feature "beer show page" do
  scenario "user sees beer information" do
    user = FactoryGirl.create(:user)
    beer = FactoryGirl.create(:beer, description: "This is a beer", brewery: "A brewery")
    login_as_user(user)
    visit beer_path(beer)

    expect(page).to have_content(beer.name)
    expect(page).to have_content(beer.description)
    expect(page).to have_content(beer.brewery)
  end
end
