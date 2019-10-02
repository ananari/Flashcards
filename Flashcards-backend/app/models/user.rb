class User < ApplicationRecord
    has_many :decks
    has_many :cards, through: :decks
    validates :username, presence: true
    validates :username, uniqueness: true
    validates :email, presence: true
    validates :email, uniqueness: true
    validate :email_is_valid

    def email_is_valid
        errors.add(:email, 'is not a valid e-mail address') unless /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.match(email)
    end
end
