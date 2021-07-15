# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


Rock.create(name: "Po", body: "one", eyes: "white", mouth: "arr")
Rock.create(name: "Kermit", body: "two", eyes: "blue", mouth: "vrr")
Rock.create(name: "Big Bird", body: "three", eyes: "pink", mouth: "goldtooth")
Rock.create(name: "Marzipan", body: "two", eyes: "white", mouth: "hmm")
Rock.create(name: "Grimaldi", body: "one", eyes: "squint", mouth: "ooh")


Show.create(name: "Stuffy Giraffe", rock_id: 1)
Show.create(name: "Goldfish", rock_id: 1)
Show.create(name: "Flying V Guitar", rock_id: 1)
Show.create(name: "Stuffy Elephant", rock_id: 2)
Show.create(name: "Invisible Friend", rock_id: 3)
Show.create(name: "a pretty stick", rock_id: 4)