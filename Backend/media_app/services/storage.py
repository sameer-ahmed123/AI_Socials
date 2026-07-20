
from abc import ABC, abstractmethod


class StorageProvider(ABC):
    @abstractmethod
    def upload(self, file):
        pass

    @abstractmethod
    def delete(self, public_id):
        pass


def get_storage_provider():
    from media_app.services.cloudinary import CloudinaryStorage
    return CloudinaryStorage()


storage = get_storage_provider()
