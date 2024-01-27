# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

events = [
  "2x2",
  "3x3",
  "4x4",
  "5x5",
  "6x6",
  "7x7",
  "megaminx",
  "pyraminx",
  "square-1"
]

events.each do |event|
  Event.create(name: event)
end
puts "[seed] created #{events.count} events"

User.create!(
  name: "Default user",
  username: "default_user",
  email: "admin@example.com",
  password: "password",
  password_confirmation: "password"
)

puts "[seed] created default user"
