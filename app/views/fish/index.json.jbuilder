json.array!(@fish) do |fish|
  json.extract! fish, :id
  json.url fish_url(fish, format: :json)
end
