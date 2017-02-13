require "rails_helper"

feature "users can edit their account" do
  scenario "successfully" do
    user = FactoryGirl.create(:user)
    login_as_user(user)

    expect(page).to have_content("Welcome, first!")

    click_on "Edit"

    expect(page).to have_content("Edit User")

    fill_in "First name", with: "Name"
    fill_in "Current password", with: user.password
    click_on "Update"

    expect(page).to have_content("Welcome, Name!")
  end

  scenario "no password" do
    user = FactoryGirl.create(:user)
    login_as_user(user)
    click_on "Edit"
    fill_in "First name", with: "Name"
    click_on "Update"

    expect(page).to have_content("Current password can't be blank")
  end

  scenario "wrong password" do
    user = FactoryGirl.create(:user)
    login_as_user(user)
    click_on "Edit"
    fill_in "First name", with: "Name"
    fill_in "Current password", with: "wrong"
    click_on "Update"

    expect(page).to have_content("Current password is invalid")
  end
end
