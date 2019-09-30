class CardsController < ApplicationController
    def index
        cards = Card.all
        render json: cards
    end

    def show
        card = set_card
        render json: card
    end

    def set_card
        card = Card.find(params[:id])
    end

end
