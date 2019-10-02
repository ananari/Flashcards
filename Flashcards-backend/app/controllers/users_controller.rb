class UsersController < ApplicationController
    def index
        users = User.all
        render json: users
    end

    def show
        user = set_user
        render json: user
    end
    
    def new
    end

    def create
        user = User.new(user_params)
        if user.save
            render json: user
        else
            render json: {errors: user.errors}.to_json
        end
    end

    def edit
    end

    def update
    end

    def set_user
        user = User.find(params[:id])
    end

    def user_params
        params.require(:user).permit(:username, :email)
    end
end
