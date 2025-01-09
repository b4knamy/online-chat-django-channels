from rest_framework import serializers

from chat.models import Room, User


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ("id", "username", "has_room",)


class RoomSerializer(serializers.ModelSerializer):

    admin = UserSerializer()

    class Meta:
        model = Room
        fields = ("id", "admin", "name", )
