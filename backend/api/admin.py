from django.contrib import admin
from .models import Post, Attachment, Comment


class AttachmentInLine(admin.StackedInline):
    model = Attachment


class CommentInLine(admin.StackedInline):
    model = Comment


class PostAdmin(admin.ModelAdmin):
    inlines = [
        AttachmentInLine,
        CommentInLine,
    ]


admin.site.register(Post, PostAdmin)
admin.site.register(Comment)
