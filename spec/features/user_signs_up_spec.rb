require "rails_helper"

feature "user signs up" do
  scenario "successfully" do
    visit "/"
    expect(page).to have_content("Sign Up")
    click_on "Sign Up"
    fill_in "First name", with: "Tom"
    fill_in "Last name", with: "Brady"
    fill_in "Email", with: "tom@brady.com"
    fill_in "Password", with: "password"
    fill_in "Password confirmation", with: "password"
    click_on "Sign up"

    expect(page).to have_content("Welcome, Tom!")
    expect(page).to have_content("Favorite Beers")
    expect(page).to have_content("Recommendations")
  end

  scenario "unsuccessfully" do
    visit "/"
    click_on "Sign Up"
    fill_in "First name", with: "Tom"
    fill_in "Last name", with: "Brady"
    click_on "Sign up"

    expect(page).to have_content("Email can't be blank")
    expect(page).to have_content("Password can't be blank")
  end
end
