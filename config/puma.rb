workers 4
threads 1, 6
preload_app!

rackup      DefaultRackup
port       4000


bundle exec puma -d -b unix:///var/run/ppu.sock -S /var/run/my_app.state --control 'unix:///var/run/ppu_ctl.sock'
