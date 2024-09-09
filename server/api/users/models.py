from django.db import models
from django.contrib.auth.models import User, Group
from django.core.validators import RegexValidator
from ..branch.models import Branch


class ExtendedUser(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE,
                                primary_key=True)
    phone_regex = RegexValidator(
        regex=r'^\+?\d{9,15}$',
        message="Phone number must be entered as normal for"
                + " Australian numbers, or in the format:"
                + " '+999999999'. Up to 15 digits allowed."
    )
    phone = models.CharField(validators=[phone_regex], max_length=15,
                             blank=True)

    # add a field branch, which references a branch model
    branch = models.ForeignKey(Branch, on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return self.user.username

    @property
    def role(self):
        if self.user.groups.exists():
            return self.user.groups.first().name
        else:
            return None

    def set_role(self, role_name):
        self.user.groups.clear()
        group = Group.objects.get(name=role_name)
        self.user.groups.add(group)

    def is_admin(self):
        return self.user.groups.filter(name='Admin').exists()

    def is_poster(self):
        return self.user.groups.filter(name='Poster').exists()

    def is_attendee(self):
        return self.user.groups.filter(name='Attendee').exists()

    @property
    def last_login(self):
        return self.user.last_login
