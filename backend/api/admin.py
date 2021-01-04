from django.contrib import admin
from .models import Post

class PostAdmin(admin.ModelAdmin):
    list_display = ('title', 'body', 'date', 'author')

admin.site.register(Post, PostAdmin)
