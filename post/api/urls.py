from django.urls import path

from .api import (
    PostListAPI,
    PostDetailAPI,
    PostToggleLike,
    CommentAPI,
)

app_name = 'api'

urlpatterns = [
    path('post-list',PostListAPI.as_view(), name='post-list'),
    path('post/<slug>',PostDetailAPI.as_view(), name='post-detail'),
    path('post/<slug>/like',PostToggleLike.as_view(), name='like-post'),

    # for getting comments
    path('comment/<slug>',CommentAPI.as_view(), name='comment'),
]
