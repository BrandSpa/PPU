# encoding: utf-8

class GalleryUploader < CarrierWave::Uploader::Base
  include CarrierWave::MiniMagick

  storage :fog
  process :quality => 85

  def filename
    "#{secure_token}.#{file.extension}" if original_filename.present?
  end
 
  def store_dir
    "uploads/#{model.class.to_s.underscore}/#{mounted_as}/#{model.id}"
  end

  def extension_white_list
    %w(jpg jpeg gif png)
  end

  protected
    def secure_token
      var = :"@#{mounted_as}_secure_token"
      model.instance_variable_get(var) or model.instance_variable_set(var, SecureRandom.uuid)
    end

end
