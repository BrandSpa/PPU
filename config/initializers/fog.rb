CarrierWave.configure do |config|
  config.fog_credentials = {
    :provider               => 'AWS',                        # required
    :aws_access_key_id      => 'AKIAJV36UALEFERXNMMA',                        # required
    :aws_secret_access_key  => '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',                        # required
    :region                 => 'us-east-1',                  # optional, defaults to 'us-east-1'
  }
  config.fog_directory  = 'ppu-web'
  config.fog_attributes = {
    'Cache-Control' => "max-age=#{365.day.to_i}",
    'Expires' => "#{365.day.to_i}"
  }
end