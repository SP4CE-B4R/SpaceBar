from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User
from django.core.validators import MinValueValidator


class Post(models.Model):
    title = models.CharField(max_length=64, help_text="Enter the title of your post")
    body = models.CharField(max_length=500, help_text="Enter the body of your post")
    date = models.DateTimeField(default=timezone.now)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    stars = models.IntegerField(default=0, validators=[MinValueValidator(0)])

    def __str__(self):
    	return f'{self.title} by {self.author}, uploaded on {self.date} with currently {self.stars} stars'