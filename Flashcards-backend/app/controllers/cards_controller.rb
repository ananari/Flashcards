class CardsController < ApplicationController
    # skip_before_action :verify_authenticity_token

    def index
        cards = Card.all
        render json: cards
    end

    def show
        card = set_card
        render json: card
    end

    def new
    end

    def create
        newcard = Card.new(card_params)
        if newcard.save
            render json: newcard
        else
            render json: "no".to_json
        end
            
    end

    def edit
        card = set_card
    end

    def update
        card = set_card
        if card.update(card_params)
            render json: card
        else
            render json: "no".to_json
        end
    end

    def destroy
        Card.destroy(params[:id])
    end

    def set_card
        card = Card.find(params[:id])
    end

    def card_params
        params.require(:card).permit(:front, :back, :deck_id)
    end

end
