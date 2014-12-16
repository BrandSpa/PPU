# encoding: utf-8

class PostImagesUploader < CarrierWave::Uploader::Base

  # include CarrierWave::MiniMagick
  def filename
    "#{secure_token}.#{file.extension}" if original_filename.present?
  end

  protected
    def secure_token
      var = :"@#{mounted_as}_secure_token"
      model.instance_variable_get(var) or model.instance_variable_set(var, SecureRandom.uuid)
    end

  storage :file

  def store_dir
    "uploads/#{model.class.to_s.underscore}/#{mounted_as}/#{model.id}"
  end


end
