from django.urls import path, include

app_name = 'posts'

urlpatterns = [
    path('api/',include("post.api.urls"),name="posts-api"),
]