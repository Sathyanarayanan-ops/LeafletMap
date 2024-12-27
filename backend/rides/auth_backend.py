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


'''
In essence all of the auth was tried out 
Django's custom authenticate function , which uses username, so we built this which uses email

Then we used Django Sessions which makes a call to the db everytime and also is a hassle when dealing 
with API's , also not very scalable 

Thus DRF token was explored , which is not as good and also is stored in local, biggest problem 
was its expiry thing which does not expire by default 

Thus at the end JWT was deemed to be the best case for us 

Now JWT is also expected to be stored in local so instead of we store is as http only cookie 

This was it does have JS based attacks

It is also protected from cross site attack cuz of django's csrf protection 


JWT also has a very wide support and used , very highly scalable and stateless
'''