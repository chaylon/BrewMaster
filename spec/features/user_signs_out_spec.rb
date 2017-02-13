require "rails_helper"

feature "user can sign out" do
  scenario "successfully" do
    user = FactoryGirl.create(:user)
    login_as_user(user)

    expect(page).to have_content("Logout")
    click_on "Logout"

    expect(page).to have_content("Welcome to BrewMaster")
    expect(page).to have_current_path("/")
  end
end
