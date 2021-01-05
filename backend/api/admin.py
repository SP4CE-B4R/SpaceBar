from django.contrib import admin
from .models import Post, Attachments, Comment


admin.site.register(Post)
admin.site.register(Attachments)
admin.site.register(Comment)
