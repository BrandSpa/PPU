class SessionsController < ApplicationController

  def oauth_fb
    app_secret = 'af5048cdc485774bb09d1df5d5506f6a'
    app_id = '594890600612824'
    redirect_url = 'http://0.0.0.0:3000/save-token'
    app = FbGraph::Application.new(app_id, :secret => app_secret)
    app.get_access_token
  end

  def get_token_fb
    app_secret = 'af5048cdc485774bb09d1df5d5506f6a'
    app_id = '594890600612824'
    app = FbGraph::Application.new(app_id, :secret => app_secret)
    at = app.get_access_token
    me = FbGraph::User.me(at)
    render plain: me.feed
  end

  def save_user_token
    oauth_fb.get_access_token(params[:code])
    redirect_to('admin/posts/new')
  end

  def see_token
    render plain: session['fb_token']
  end

end
