# from django.db.models.signals import post_save
# from django.contrib.auth.models import User


# from .models import UserProfile

# def make_user_profile(sender, instance, created, *args, **kwargs):
#     if created:
#         obj = UserProfile.objects.create(
#             user=instance,
#         )

# post_save.connect(make_user_profile, sender=User)