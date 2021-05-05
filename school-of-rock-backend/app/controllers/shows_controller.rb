class ShowsController < ApplicationController

    def index
        render json: Show.all, key_transform: :camel_lower
    end

    def show
        #add error handling
        show = Show.find_by(id: params[:id])
        render json: show
    end

    def create
        # add error handling also please oh god kill me
        show = Rock.create(show_params)
        render json: show
    end

    def destroy
        show = Show.find_by(id: params[:id])
        show.destroy
        render json: show
    end

    def rock_params
        params.require(:show).permit(:name, :rock_id)
    end

end
