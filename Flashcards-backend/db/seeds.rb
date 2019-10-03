# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
ananari = User.create(username: "ananari", email: "ana@ana.com")
hemesh = User.create(username: "hemesh", email: "hemesh@hemesh.com")

# ananari's decks
polish = Deck.create(name: "Polish", user_id: ananari.id)
finnish = Deck.create(name: "Finnish", user_id: ananari.id)
georgian = Deck.create(name: "Georgian", user_id: ananari.id)
yucatec = Deck.create(name: "Yucatec Maya", user_id: ananari.id)
russian = Deck.create(name: "Russian", user_id: ananari.id)
korean = Deck.create(name: "Korean", user_id: ananari.id)
#hemesh's decks
polish2 = Deck.create(name: "Polish", user_id: hemesh.id)
finnish2 = Deck.create(name: "Finnish", user_id: hemesh.id)
georgian2 = Deck.create(name: "Georgian", user_id: hemesh.id)
yucatec2 = Deck.create(name: "Yucatec Maya", user_id: hemesh.id)
russian2 = Deck.create(name: "Russian", user_id: hemesh.id)
korean2 = Deck.create(name: "Korean", user_id: hemesh.id)

#polish cards
card1 = Card.create(front: "woman", back: "kobieta", deck_id: polish.id)
card2 = Card.create(front: "notebook", back: "zeszyt", deck_id: polish.id)
card3 = Card.create(front: "flower", back: "kwiat", deck_id: polish.id)
card4 = Card.create(front: "pencil", back: "ołówek", deck_id: polish.id)
card5 = Card.create(front: "survey", back: "ankieta", deck_id: polish.id)
card6 = Card.create(front: "question", back: "pytanie", deck_id: polish.id)
card7 = Card.create(front: "woman", back: "kobieta", deck_id: polish2.id)
card8 = Card.create(front: "notebook", back: "zeszyt", deck_id: polish2.id)
card9 = Card.create(front: "flower", back: "kwiat", deck_id: polish2.id)
card10 = Card.create(front: "pencil", back: "ołówek", deck_id: polish2.id)
card11 = Card.create(front: "survey", back: "ankieta", deck_id: polish2.id)
card12 = Card.create(front: "question", back: "pytanie", deck_id: polish2.id)

#finnish cards
card13 = Card.create(front: "woman", back: "nainen", deck_id: finnish.id)
card14 = Card.create(front: "notebook", back: "vikho", deck_id: finnish.id)
card15 = Card.create(front: "flower", back: "kukka", deck_id: finnish.id)
card16 = Card.create(front: "pencil", back: "lyijykynä", deck_id: finnish.id)
card17 = Card.create(front: "ice", back: "jää", deck_id: finnish.id)
card18 = Card.create(front: "salmon", back: "lohi", deck_id: finnish.id)
card19 = Card.create(front: "woman", back: "nainen", deck_id: finnish2.id)
card20 = Card.create(front: "notebook", back: "vikho", deck_id: finnish2.id)
card21 = Card.create(front: "flower", back: "kukka", deck_id: finnish2.id)
card22 = Card.create(front: "pencil", back: "lyijykynä", deck_id: finnish2.id)
card23 = Card.create(front: "ice", back: "jää", deck_id: finnish2.id)
card24 = Card.create(front: "salmon", back: "lohi", deck_id: finnish2.id)

#georgian cards
card25 = Card.create(front: "woman", back: "ქალი", deck_id: georgian.id)
card26 = Card.create(front: "violet", back: "ია", deck_id: georgian.id)
card27 = Card.create(front: "star", back: "ვარსკვლავი", deck_id: georgian.id)
card28 = Card.create(front: "water", back: "წყალი", deck_id: georgian.id)
card29 = Card.create(front: "spring", back: "გაზაფხული", deck_id: georgian.id)
card30 = Card.create(front: "build", back: "ააშენებს", deck_id: georgian.id)
card31 = Card.create(front: "woman", back: "ქალი", deck_id: georgian2.id)
card32 = Card.create(front: "violet", back: "ია", deck_id: georgian2.id)
card33 = Card.create(front: "star", back: "ვარსკვლავი", deck_id: georgian2.id)
card34 = Card.create(front: "water", back: "წყალი", deck_id: georgian2.id)
card35 = Card.create(front: "spring", back: "გაზაფხული", deck_id: georgian2.id)
card36 = Card.create(front: "build", back: "ააშენებს", deck_id: georgian2.id)


#yucatec cards
card37 = Card.create(front: "girl", back: "xchúupal", deck_id: yucatec.id)
card38 = Card.create(front: "corn", back: "ixim", deck_id: yucatec.id)
card39 = Card.create(front: "flower", back: "lol", deck_id: yucatec.id)
card40 = Card.create(front: "avocado", back: "oon", deck_id: yucatec.id)
card41 = Card.create(front: "see", back: "ilik", deck_id: yucatec.id)
card42 = Card.create(front: "sleep", back: "wéenek", deck_id: yucatec.id)
card43 = Card.create(front: "girl", back: "xchúupal", deck_id: yucatec2.id)
card44 = Card.create(front: "corn", back: "ixim", deck_id: yucatec2.id)
card45 = Card.create(front: "flower", back: "lol", deck_id: yucatec2.id)
card46 = Card.create(front: "avocado", back: "oon", deck_id: yucatec2.id)
card47 = Card.create(front: "see", back: "ilik", deck_id: yucatec2.id)
card48 = Card.create(front: "sleep", back: "wéenek", deck_id: yucatec2.id)

#russian cards
card49 = Card.create(front: "water", back: "вода", deck_id: russian.id)
card50 = Card.create(front: "flower", back: "цвет", deck_id: russian.id)
card51 = Card.create(front: "sleep", back: "спать",deck_id: russian.id)
card52 = Card.create(front: "tree", back: "дерево", deck_id: russian.id)
card53 = Card.create(front: "herring", back: "селедка", deck_id: russian.id)
card54 = Card.create(front: "fire", back: "огонь", deck_id: russian.id)
card55 = Card.create(front: "water", back: "вода", deck_id: russian2.id)
card56 = Card.create(front: "flower", back: "цвет", deck_id: russian2.id)
card57 = Card.create(front: "sleep", back: "спать",deck_id: russian2.id)
card68 = Card.create(front: "tree", back: "дерево", deck_id: russian2.id)
card59 = Card.create(front: "herring", back: "селедка", deck_id: russian2.id)
card60 = Card.create(front: "fire", back: "огонь", deck_id: russian2.id)

#korean cards
card61 = Card.create(front: "water", back: "물", deck_id: korean.id)
card62 = Card.create(front: "flower", back: "꽃", deck_id: korean.id)
card63 = Card.create(front: "song", back: "노래", deck_id: korean.id)
card64 = Card.create(front: "cat", back: "고양이", deck_id: korean.id)
card65 = Card.create(front: "house", back: "집", deck_id: korean.id)
card66 = Card.create(front: "sleep", back: "자다", deck_id: korean.id)
card67 = Card.create(front: "water", back: "물", deck_id: korean2.id)
card68 = Card.create(front: "flower", back: "꽃", deck_id: korean2.id)
card69 = Card.create(front: "song", back: "노래", deck_id: korean2.id)
card70 = Card.create(front: "cat", back: "고양이", deck_id: korean2.id)
card71 = Card.create(front: "house", back: "집", deck_id: korean2.id)
card72 = Card.create(front: "sleep", back: "자다", deck_id: korean2.id)



