require "rails_helper"

feature "user deletes list" do
  scenario "successfully" do
    user = FactoryGirl.create(:user)
    list = FactoryGirl.create(:list, user: user)
    login_as_user(user)
    click_on("This is a list")

    within(".page-content") do
      click_on("Delete")
    end

    expect(page).to_not have_content("This is a list")
  end

  scenario "user can only delete their own lists" do
    user = FactoryGirl.create(:user)
    user2 = FactoryGirl.create(:user)
    list = FactoryGirl.create(:list, user: user2)
    login_as_user(user)
    visit("/lists/#{list.id}")

    within(".page-content") do
      expect(page).to_not have_content("Delete")
    end
  end
end
