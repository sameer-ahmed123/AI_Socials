import cloudinary.uploader
from media_app.services.storage import StorageProvider


class CloudinaryStorage(StorageProvider):
    def upload(self, file):
        result = cloudinary.uploader.upload(file)
        return {
            "public_id": result["public_id"],
            "image_url": result["secure_url"],
            "width": result["width"],
            "height": result["height"],
        }

    def delete(self, public_id):
        return cloudinary.uploader.destroy(public_id)
