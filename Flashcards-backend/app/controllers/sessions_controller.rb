class SessionsController < ApplicationController
    def index
        puts session
        render json: session
    end

    def new
    end

    def create
        user = User.find_by(username: session_parameters[:username])
        if user
            render json: user
        else
            no_user_found = {errors: "User not found"}
            render json: no_user_found.to_json
        end
    end

    def destroy
        session.delete :username
    end

    def session_parameters
        params.require(:session).permit(:username)
    end
end