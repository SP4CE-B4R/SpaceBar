from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone


class Post(models.Model):
    body = models.TextField()
    creation_date = models.DateTimeField(default=timezone.now)
    author = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return (
            f"'{self.body[:30]} . . .' written by {self.author} on {self.creation_date}"
        )


class Attachments(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name="attachments")
    url = models.URLField()

    def __str__(self):
        return f"Image at {self.url} attached to {post}"


class Comment(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name="comments")
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    text = models.TextField()
    creation_date = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return (
            f"'{self.text[:30]} . . .' written by {self.author} on {self.creation_date}"
        )
