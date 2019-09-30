# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

ananari = User.create(username: "ananari", email: "ana@ana.com")
hemesh = User.create(username: "hemesh", email: "hemesh@hemesh.com")

polish = Deck.create(name: "Polish", user_id: ananari.id)
finnish = Deck.create(name: "Finnish", user_id: ananari.id)
cars = Deck.create(name: "Cars", user_id: hemesh.id)
planes = Deck.create(name: "Planes", user_id: hemesh.id)

card1 = Card.create(front: "woman", back: "kobieta", deck_id: polish.id)
card2 = Card.create(front: "zeszyt", back: "notebook", deck_id: polish.id)
card3 = Card.create(front: "water", back: "vesi", deck_id: finnish.id)
card4 = Card.create(front: "bridge", back: "silta", deck_id: finnish.id)
card5 = Card.create(front: "subaru", back: "impreza", deck_id: cars.id)
card6 = Card.create(front: "lambo", back: "huracan", deck_id: cars.id)
card7 = Card.create(front: "boeing", back: "777", deck_id: planes.id)
card8 = Card.create(front: "airbus", back: "320", deck_id: planes.id)