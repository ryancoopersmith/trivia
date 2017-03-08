class Api::QuestionsController < ApiController
  def index
    respond_to do |json|
      render json: { question: questions.sample }
    end
  end
end
