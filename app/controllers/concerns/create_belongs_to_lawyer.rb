module CreateBelongsToLawyer
	extend ActiveSupport::Concern
	
	included  do
		before_action :authenticate_user!, except: [:index, :show]
	end

	def create
		model = entity.create(model_params)
    	render json: model, status: 200
	end

	def update
		model = entity.find(params[:id])
		model.update(model_params)
    render json: model, status: 200
	end

	private
	    def model_params
	      params.require(:fields).permit!
	    end
end