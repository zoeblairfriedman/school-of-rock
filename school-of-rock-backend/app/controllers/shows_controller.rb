class ShowsController < ApplicationController

    def index
        render json: Show.all, key_transform: :camel_lower
    end

    def show
        #add error handling
        show = Show.find_by(id: params[:id])
        render json: show, key_transform: :camel_lower
    end

    def create
        # add error handling also please oh god kill me
        show = Show.create(show_params)
        render json: show
    end

    def destroy
        show = Show.find_by(id: params[:id])
        show.destroy
        render json: show
    end

    def show_params
        # which version or rock ID do i need? 
        params.require(:show).permit(:name, :rock_id, :rockId)
    end

end
