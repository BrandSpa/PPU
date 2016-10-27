FROM ruby:2.2.0
RUN apt-get update -qq && apt-get install -y build-essential mysql-client libmysqlclient-dev nodejs
RUN mkdir /myapp
WORKDIR /myapp
ADD Gemfile /myapp
ADD Gemfile.lock /myapp
RUN bundle install --without= development test
ADD . /myapp
