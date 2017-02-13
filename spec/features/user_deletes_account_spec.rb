require "rails_helper"

feature "user deletes account" do
  xscenario "successfully" do
    user = FactoryGirl.create(:user)
    login_as_user(user)
    click_on "Edit"

    expect(page).to have_button("Cancel my account")
    cancel_window = window_opened_by do
      click_on "Cancel my account"
    end
    within_window cancel_window do
      click_on "OK"
    end

    expect(page).to have_current_path("/")
  end
end
