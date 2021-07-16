from django.contrib.humanize.templatetags import humanize

from rest_framework import serializers

from post.models import (
    Post,
    PostComment,
)


class PostListSerializers(serializers.ModelSerializer):
    liked = serializers.SerializerMethodField()
    likes = serializers.IntegerField(source='count_likes', read_only=True)
    comments = serializers.IntegerField(source='count_comment', read_only=True)
    posted_on = serializers.SerializerMethodField()
    user = serializers.SerializerMethodField()
    tur_content = serializers.CharField(
        source="get_content_truncated", read_only=True)
    is_creator = serializers.SerializerMethodField()

    post_details = serializers.HyperlinkedIdentityField(
        view_name='posts:api:post-detail',
        lookup_field='slug',
    )

    class Meta:
        model = Post
        fields = ('id', 'user', 'title', 'content', 'tur_content',
                  'posted_on', 'likes', 'comments', 'liked', 'slug', 'post_details', 'image', 'is_creator',)
        read_only_fields = ('likes', 'slug', 'tur_content', 'is_creator',)
        extra_kwargs = {
            'content': {'write_only': True},
        }

    def get_is_creator(self, obj):
        user = self.context.get('request').user
        if user.is_authenticated:
            if obj.user == user:
                return True
        return False

    def get_liked(self, obj):
        user = self.context.get('request').user
        if not user.is_authenticated:
            return False
        if user in obj.likes.all():
            return True
        return False

    def get_posted_on(self, obj):
        return humanize.naturaltime(obj.posted_on)

    def get_user(self, obj):
        return obj.user.username


class PostDetailSerializers(serializers.ModelSerializer):
    liked = serializers.SerializerMethodField()
    likes = serializers.IntegerField(source='count_likes', read_only=True)
    posted_on = serializers.SerializerMethodField()
    user = serializers.SerializerMethodField()

    post_comments = serializers.HyperlinkedIdentityField(
        view_name='posts:api:comment',
        lookup_field='slug',
    )
    class Meta:
        model = Post
        fields = (
            'user', 'title', 'content', 'posted_on', 'likes', 'liked', 'post_comments',
        )
        read_only_fields = ('likes',)

    def get_liked(self, obj):
        user = self.context.get('request').user
        if not user.is_authenticated:
            return False
        if user in obj.likes.all():
            return True
        return False

    def get_posted_on(self, obj):
        return humanize.naturaltime(obj.posted_on)

    def get_user(self, obj):
        return obj.user.username


class CommentDetailSerializers(serializers.ModelSerializer):
    username = serializers.CharField(source="user.username", read_only=True)
    likes = serializers.IntegerField(source="count_likes", read_only=True)
    liked = serializers.SerializerMethodField(read_only=True)
    replies = serializers.SerializerMethodField()  # to get all the replies
    reply_count = serializers.SerializerMethodField()

    class Meta:
        model = PostComment
        fields = ('id', 'username', 'content', 'likes',
                  'liked', 'date', 'reply_count', 'replies',)

    def get_liked(self, obj):
        user = self.context.get('request').user
        if user in obj.likes.all():
            return True
        return False

    def get_replies(self, obj):
        if obj.parent:
            return None
        serializer_context = {'request': self.context.get('request')}
        children = obj.get_comment_replies()
        serializered_children = CommentDetailSerializers(
            children,
            many=True,
            context=serializer_context
        )
        return serializered_children.data

    def get_reply_count(self, obj):
        return int(obj.get_comment_replies().count())
