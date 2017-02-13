require "rails_helper"

feature "user signs in" do
  scenario "successfully" do
    user = FactoryGirl.create(:user)
    visit "/"
    click_on "Login"
    fill_in "Email", with: user.email
    fill_in "Password", with: user.password
    click_on "Log in"

    expect(page).to have_content("Welcome, first!")
  end

  scenario "unsuccessfully" do
    visit "/"
    click_on "Login"
    click_on "Log in"

    expect(page).to have_current_path(new_user_session_path)
  end
end
