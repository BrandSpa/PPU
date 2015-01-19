require "spec_helper"

RSpec.describe "Posts", :type => :api do

  describe "GET index" do
    it  "return success" do
      get 'localhost:3000/api/posts', :format => :json
      
      expect_status(200)
    end

    it "return array with objexts" do
      get 'localhost:3000/api/posts', :format => :json
      expect_json_types(:array_of_objects)
    end
    
    it 'should index into array and test against specific element' do
      expect_json_types("0", {
        id: :array,
        lang: :string, 
        country: :string, 
        date: :date, 
        author: :string, 
        title: :string, 
        content: :text, 
        content_plain: :text, 
        img_name: :string, 
        gallery_id: :int, 
        published: :bool, 
        featured: :bool, 
        lawyer_ids: :array
      })
    end

  end
end