require "rails_helper"

feature "users can edit their account" do
  scenario "successfully" do
    user = FactoryGirl.create(:user)
    login_as_user(user)

    visit edit_user_registration_path
    
  end
end
