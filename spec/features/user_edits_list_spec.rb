require "rails_helper"

feature "user edits a list" do
  scenario "successfully" do
    user = FactoryGirl.create(:user)
    list = FactoryGirl.create(:list, user: user)
    login_as_user(user)

    expect(page).to have_content("This is a list")

    click_on("This is a list")
    within(".page-content") do
      expect(page).to have_content("Edit")
      click_on("Edit")
    end
    within(".page-content") do
      fill_in "Name", with: "This is a list with a new name"
      click_on "Submit"
    end

    expect(page).to have_content("This is a list with a new name")
  end

  scenario "empty name" do
    user = FactoryGirl.create(:user)
    list = FactoryGirl.create(:list, user: user)
    login_as_user(user)

    expect(page).to have_content("This is a list")

    click_on("This is a list")
    within(".page-content") do
      expect(page).to have_content("Edit")
      click_on("Edit")
    end
    within(".page-content") do
      fill_in "Name", with: ""
      click_on "Submit"
    end

    expect(page).to have_content("Invalid entry")
  end

  scenario "user can only edit their own lists" do
    user = FactoryGirl.create(:user)
    user2 = FactoryGirl.create(:user)
    list = FactoryGirl.create(:list, user: user2)
    login_as_user(user)
    visit("/lists/#{list.id}")

    within(".page-content") do
      expect(page).to_not have_content("Edit")
    end
  end
end
