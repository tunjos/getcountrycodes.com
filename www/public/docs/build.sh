yum install ruby24.x86_64 ruby23-devel.x86_64

gem uninstall ffi

gem install ffi --platform=ruby

gem install jekyll

gem install bundler --version=2.0.1

bundle install

bundle exec jekyll build
