from django.db import models
from django.contrib.postgres.fields import ArrayField # Imported to have an array of string 

# Create your models here.
class Rider(models.Model):
    id = models.AutoField(primary_key=True)
    email = models.EmailField(max_length=50, unique = True)
    first_name = models.CharField(max_length = 30)
    last_name = models.CharField(max_length=30)
    phone = models.CharField(max_length=10)
    total_rides = models.IntegerField(default=0)
    miles = models.FloatField(default=0.0)
    amount_spent = models.FloatField(default=0.0)
    
class Rides(models.Model):
    ride_id = models.CharField(max_length=5, unique=True, blank=True,null=True)
    rider = models.ForeignKey(Rider,on_delete=models.CASCADE,related_name='ride_history')
    pickup = models.CharField(max_length=100)
    dropoff = models.CharField(max_length=100)
    inter_stops = ArrayField(models.CharField(null=True, blank=True),size = 5)   # Used here where we have array of strings for multi stops
    # if above does not work try ----> Make another model that holds a string with an optional order, give it a ForeignKey back to myClass, and store your array in there.
    cost = models.FloatField()
    miles = models.FloatField()
    driver_name = models.CharField(max_length=30)
    car_model = models.CharField()
    status = models.CharField(max_length=20,default="in_progress")
    
    def assign_ride_id(self):
        if self.ride_id is None and self.status == "completed":
            last_ride = Rides.objects.filter(ride_id__isnull=False).order_by('-ride_id').first()
            self.ride_id = (last_ride.ride_id + 1) if last_ride else 10000
            self.save()
            
#             # Example of marking a ride as completed
# ride = Rides.objects.get(id=1)  # Replace with the actual ride instance
# ride.status = "completed"
# ride.assign_ride_id()

    

class Driver(models.Model):
    id = models.AutoField(primary_key=True)
    email = models.EmailField(max_length=20, unique = True)
    first_name = models.CharField(max_length = 30)
    last_name = models.CharField(max_length=30)
    phone = models.CharField(max_length=10)
    rides = models.IntegerField(default=0)
    miles = models.FloatField(default=0.0)
    amount_earned = models.FloatField(default=0.0)
    car_model = models.CharField()
    rating = models.FloatField(default=0.0)
    
class Rating(models.Model):
    driver = models.ForeignKey(Driver, on_delete=models.CASCADE, related_name='ratings')
    ride = models.ForeignKey(Rides, on_delete=models.CASCADE, related_name='ratings')  # Links rating to ride
    score = models.FloatField()  # Out of 5
  

    
    

    