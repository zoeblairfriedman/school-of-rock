class RocksController < ApplicationController

    def index
        render json: Rock.all, key_transform: :camel_lower
    end

    def show
        #add error handling
        rock = Rock.find_by(id: params[:id])
        render json: rock
    end

    def create
        # add error handling
        rock = Rock.create(rock_params)
        render json: rock
    end

    def destroy
        rock = Rock.find_by(id: params[:id])
        rock.destroy
        render json: {message: "#{rock.name} graduated from the School of Rock!"}
    end

    def rock_params
        params.require(:rock).permit(:name, :body, :eyes, :mouth)
    end



end


