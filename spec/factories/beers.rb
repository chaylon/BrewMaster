FactoryGirl.define do
  sequence :name do |n|
    "beer#{n}"
  end
  
  factory :beer do
    name
  end
end
