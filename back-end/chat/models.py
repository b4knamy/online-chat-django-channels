from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.


class User(AbstractUser):
    has_room = models.BooleanField(default=False)


class Room(models.Model):
    admin = models.ForeignKey(
        User, related_name="user_room", on_delete=models.CASCADE)
    name = models.CharField(max_length=10, unique=True)

    def __str__(self):
        return f"Room {self.name} owned by {self.admin.username}"

    def delete(self, *args, **kwargs):
        self.admin.has_room = False
        self.admin.save()
        return super().delete(*args, **kwargs)
