from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse, Http404
from django.db.models import Q
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.contrib.auth.mixins import LoginRequiredMixin, UserPassesTestMixin
from django.views.generic import (
    ListView,
    DetailView,
    CreateView,
    UpdateView,
    DeleteView,
)
from .models import Post
from taggit.models import Tag
from datetime import date
from django.views.decorators.http import require_GET


class Feed(ListView):
    model = Post
    template_name = "website/feed.html"
    context_object_name = 'posts'
    ordering = ['-date']
