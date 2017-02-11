FactoryGirl.define do
  sequence :email do |n|
    "email#{n}@email.com"
  end

  factory :user do
    first_name "first"
    last_name "last"
    email
    password "password"
    password_confirmation "password"
  end
end
