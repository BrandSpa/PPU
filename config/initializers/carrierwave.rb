CarrierWave.configure do |config|

  config.fog_credentials = {
    :provider               => 'AWS',
    :aws_access_key_id      => 'AKIAJV36UALEFERXNMMA',
    :aws_secret_access_key  => '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',
    :region                 => 'us-east-1',
  }

  config.fog_directory  = 'ppu-web'
  
  config.fog_public     = true
end

module CarrierWave
  module MiniMagick
    def quality(percentage)
      manipulate! do |img|
        img.quality(percentage.to_s)
        img = yield(img) if block_given?
        img
      end
    end
  end
end
