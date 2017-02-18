require "rails_helper"

feature "user creates a list" do
  scenario "successfully" do
    user = FactoryGirl.create(:user)
    login_as_user(user)
    click_on "New List"

    within("#myModal") do
      fill_in "Name", with: "This is a new list"
      click_on "Submit"
    end

    expect(page).to have_content("This is a new list")
    expect(page).to have_content("Find new beers!")
  end

  scenario "no name" do
    user = FactoryGirl.create(:user)
    login_as_user(user)
    click_on "New List"

    within("#myModal") do
      click_on "Submit"
    end

    expect(page).to have_content("Name can't be blank")
  end
end
