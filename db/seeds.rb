# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
# require 'httparty'
# require 'pry'
# url = "http://api.brewerydb.com/v2/beers?withBreweries=Y&key=#{ENV['API_KEY']}"
# response = HTTParty.get(url)
# response["data"].each do |beer|
#   name = beer["name"].tr('"\"','')
#   description = beer["description"]
#   brewery = nil
#   abv = nil
#   ibu = nil
#
#   if beer["breweries"][0]["name"]
#     brewery = beer["breweries"][0]["name"]
#   end
#
#   if beer["abv"]
#     abv = beer["abv"].to_f
#   end
#
#   if beer["ibu"]
#     ibu = beer["ibu"].to_i
#   end
#
#   Beer.create(name: name, description: description, brewery: brewery, abv: abv, ibu: ibu)
# end
