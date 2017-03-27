require "rails_helper"

RSpec.describe Api::V1::InterestsController, type: :controller do
  describe "GET #index" do

    let(:user) { FactoryGirl.create(:user) }

    it "should return all of the user's interests" do
      Interest.create(user: user, interest: "Movies")
      Interest.create(user: user, interest: "Music")

      get :index
      json = JSON.parse(response.body)

      expect(json["interests"].length).to eq(2)
      expect(json["interests"][0]["interest"]).to eq("Movies")
      expect(json["interests"][1]["interest"]).to eq("Music")
    end
  end
end
