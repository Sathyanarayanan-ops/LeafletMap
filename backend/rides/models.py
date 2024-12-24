from django.db import models

# Create your models here.
class Rider(models.Model):
    email = models.EmailField(max_length=20, primary_key=True)
    first_name = models.CharField(max_length = 30)
    last_name = models.CharField(max_length=30)
    phone = models.IntegerField(max_length=10)
    rides = models.IntegerField()
    miles = models.FloatField()
    amount_spent = models.FloatField()
    
class User(models.Model):
    email = models.ForeignKey(Rider,primary_key=True)