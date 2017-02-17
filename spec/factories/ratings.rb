FactoryGirl.define do
  factory :rating do
    user
    beer
    score 3
  end
end
