# django imports
from django.shortcuts import get_object_or_404, reverse

# rest_framework imports
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.filters import (
    SearchFilter,
    OrderingFilter,
)

# local imports
from post.models import (
    Post,
    PostComment,
)

from .permissions import IsAuthorOrReadOnly

from .pagination import PostPageNumberPagination

from .serializers import (
    PostListSerializers,
    PostDetailSerializers,
    CommentDetailSerializers,
)


class PostListAPI(generics.ListCreateAPIView):
    serializer_class = PostListSerializers
    pagination_class = PostPageNumberPagination
    filter_backends = [SearchFilter]
    search_fields = [
        'title',
        # 'content',
    ]

    def get_queryset(self):
        q = self.request.GET.get("ordering")
        if q:
            if q == "best":
                return Post.get_best_post.all()
            if q == "month-best":
                return Post.get_month_best.all()
            if q == "year-best":
                return Post.get_year_best.all()
            if q == "all-time-best":
                return Post.get_all_time_best.all()
            if q == "my-post":
                return Post.objects.filter(user=self.request.user)

        return Post.objects.all()

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class PostDetailAPI(generics.RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostDetailSerializers
    permission_classes = [IsAuthorOrReadOnly]
    lookup_field = 'slug'


class PostToggleLike(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, slug=None, format=None):
        post_qs = get_object_or_404(Post, slug=slug)
        user = self.request.user
        if user in post_qs.likes.all():
            post_qs.likes.remove(user)
            liked = False
            count = post_qs.likes.count()
        else:
            post_qs.likes.add(user)
            liked = True
            count = post_qs.likes.count()

        data = {
            "liked": liked,
            "count": count,
        }

        return Response(data)


class CommentAPI(generics.ListCreateAPIView):
    queryset = PostComment.objects.all()
    serializer_class = CommentDetailSerializers
    permission_classes = [IsAuthorOrReadOnly, ]

    def perform_create(self, serializer):
        slug = self.kwargs.get('slug', None)
        post_qs = Post.objects.get(slug=slug)
        serializer.save(
            user=self.request.user,
            post=post_qs,
        )

    def get_queryset(self):
        slug = self.kwargs.get('slug', None)
        post = Post.objects.get(slug=slug)
        return PostComment.parent_objects.filter(post=post).all()
