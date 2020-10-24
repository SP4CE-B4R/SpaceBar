from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User
from django.core.validators import MinValueValidator


class Post(models.Model):
    """
    Post model for posts having a 'body' containing the image/text and a User object as the author.
    """
    body = models.CharField(max_length=500, help_text="Enter the body of your post")
    date = models.DateTimeField(default=timezone.now)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    # lets start small
    # stars = models.IntegerField(default=0, validators=[MinValueValidator(0)])

    def __str__(self):
        return f'{self.title} by {self.author}, uploaded on {self.date}'  # with currently {self.stars} stars'