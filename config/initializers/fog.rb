CarrierWave.configure do |config|
  config.fog_credentials = {
    :provider               => 'AWS',                        # required
    :aws_access_key_id      => 'AKIAID52Z6OWT74EGTWA',                        # required
    :aws_secret_access_key  => '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',                        # required
    :region                 => 'us-east-1',                  # optional, defaults to 'us-east-1'
  }
  config.fog_directory  = 'ppu-web'
  config.fog_attributes = {
    'Cache-Control' => "max-age=#{365.day.to_i}",
    'Expires' => "#{365.day.to_i}"
  }
end
