from rest_framework import serializers
from .models import Post, Attachment, Comment
from django.contrib.auth.models import User


class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ("id", "username")
        model = User


class CommentSerializer(serializers.ModelSerializer):
    author = AuthorSerializer(required=False, read_only=True)

    class Meta:
        fields = "__all__"
        model = Comment


class AttachmentSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ("id", "url")
        model = Attachment


class PostSerializer(serializers.ModelSerializer):
    author = AuthorSerializer(required=False, read_only=True)
    attachments = AttachmentSerializer(many=True)
    comments = CommentSerializer(many=True, read_only=True)

    class Meta:
        model = Post
        fields = ("id", "body", "attachments", "creation_date", "author", "comments")

    def create(self, validated_data):
        attachment_validated_data = validated_data.pop("attachments")
        post = Post.objects.create(**validated_data)
        attachment_serializer = self.fields["attachments"]

        for each in attachment_validated_data:
            each["post"] = post

        attachment_serializer.create(attachment_validated_data)

        return post
