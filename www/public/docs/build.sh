yum install ruby24.x86_64 ruby23-devel.x86_64

gem install jekyll -v 3.8.6

gem install bundler --no-ri --no-rdoc --version=2.0.1

bundle install

jekyll build
