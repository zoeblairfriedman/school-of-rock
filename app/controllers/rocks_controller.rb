class RocksController < ApplicationController

    def index
        render json: Rock.all, key_transform: :camel_lower
    end


    def create
        # binding.pry
        rock = Rock.create(rock_params)
        if rock.save 
            render json: rock
        else
            errors = rock.errors.messages.keys.map {|key| key.to_s}
            message = "Try again! A rock must have:"
            errors.each do |error|
                message += ("\n#{error}")
            end
            render json: {message: message}
        end
    end

    def destroy
        rock = Rock.find_by(id: params[:id])
        rock.destroy
        render json: {message: "#{rock.name} graduated from the School of Rock!"}
    end

    private 
    
    def rock_params
        params.require(:rock).permit(:name, :body, :eyes, :mouth)
    end



end


