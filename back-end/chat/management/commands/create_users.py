from django.core.management import BaseCommand
from django.core.management.base import CommandParser
from django.contrib.auth.hashers import make_password
from chat.models import User, Room


class Command(BaseCommand):

    def add_arguments(self, parser: CommandParser) -> None:
        parser.add_argument("--og", action="store_true")

    def handle(self, *args, **kwargs):

        if not User.objects.filter(username="Baknamy").first():
            usernames = ["Basch", "Vaan", "Fran", "Ashe", "Penelo", "Balthier", "Baknamy"]
            password = make_password("fkUser10@!")
            for username in usernames:
                if username == "Baknamy":
                    new_user = User.objects.create(
                    username=username,
                    password=password,
                    is_superuser=True
                )
                else:
                    new_user = User.objects.create(
                        username=username,
                        password=password
                    )
                new_user.save()

            user = User.objects.get(username="Baknamy")
            main_room = Room.objects.create(
                admin=user,
                name="Lobby"
            )
            main_room.save()
            self.stdout.write(self.style.SUCCESS("Dados criados!"))


