from django.contrib.auth import get_user_model
from django.contrib.auth.backends import ModelBackend

class EmailBackend(ModelBackend):
    def authenticate(self, request, email=None, password=None, **kwargs):
        UserModel = get_user_model()
        email_field = UserModel.EMAIL_FIELD  # Dynamically fetch email field name
        try:
            user = UserModel.objects.get(**{email_field: email.lower()})  # Normalize email
        except UserModel.DoesNotExist:
            return None
        else:
            if user.check_password(password):
                return user
        return None
