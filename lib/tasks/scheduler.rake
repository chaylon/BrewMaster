desc "update DB"
task :update => :environment do
  require "httparty"
  images = ["beer_icon.jpg","beer-icon2.jpg","beer_icon3.png","beer_icon4.ico"]
  key = ENV['API_KEY']
  page = 1
  10.times do
    url = "http://api.brewerydb.com/v2/beers?p=#{page}&withBreweries=Y&key=#{key}"
    response = HTTParty.get(url)
    page += 1

    response["data"].each do |beer|
      name = nil
      description = ""
      brewery = ""
      abv = nil
      ibu = nil
      style = ""
      img = images.sample

      if beer["name"]
        name = beer["name"].tr('"\"','')
      end

      if beer["description"]
        description = beer["description"]
      end

      if beer["style"]
        style = beer["style"]["shortName"]
      end

      if beer["breweries"]
        brewery = beer["breweries"][0]["name"]
      end

      if beer["abv"]
        abv = beer["abv"].to_f
      end

      if beer["ibu"]
        ibu = beer["ibu"].to_i
      end

      Beer.create(name: name, description: description, brewery: brewery, style: style, abv: abv, ibu: ibu, img: img)
    end
  end
end
