from datetime import (
    datetime,
    timedelta,
)

from django.db import models
from django.template.defaultfilters import slugify
from django.contrib.auth.models import User
from django.utils.text import Truncator


# django imagekit
# https://pypi.org/project/django-imagekit/

from imagekit.models import ImageSpecField
from imagekit.processors import ResizeToFill


# post status
status = (
    ('D', 'Draft'),
    ('P', 'Public'),
)


class PostCommentModelManager(models.Manager):
    # overwriting default all so that we don't get replies we made separate function to get all the comments
    def get_queryset(self):
        return super().get_queryset().filter(parent=None)


class Post(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='posted_by')

    title = models.CharField(max_length=225)
    content = models.TextField(max_length=2400)

    image = models.ImageField(upload_to="post_image")

    posted_on = models.DateTimeField(auto_now_add=True)
    likes = models.ManyToManyField(User, blank=True)

    slug = models.SlugField(blank=True, null=True, unique=True)

    class Meta:
        ordering = ("-id",)

    class get_best_post(models.Manager):
        def get_queryset(self):
            date_from = datetime.now() - timedelta(days=1)
            queryset = super().get_queryset().filter(
                posted_on__gte=date_from
            ).order_by("-likes")
            return queryset

    class get_month_best(models.Manager):
        def get_queryset(self):
            today = datetime.today()
            month = today.month
            year = today.year
            queryset = super().get_queryset().filter(
                posted_on__month__gte=month,
                posted_on__month__lte=month,
                posted_on__year__gte=year,
                posted_on__year__lte=year,
            ).order_by("-likes")
            return queryset

    class get_year_best(models.Manager):
        def get_queryset(self):
            today = datetime.today()
            year = today.year
            queryset = super().get_queryset().filter(
                posted_on__year__gte=year,
                posted_on__year__lte=year,
            ).order_by("-likes")
            return queryset

    class get_all_time_best(models.Manager):
        def get_queryset(self):
            queryset = super().get_queryset().all().order_by("-likes")
            return queryset

    objects = models.Manager()
    get_best_post = get_best_post()
    get_month_best = get_month_best()
    get_year_best = get_year_best()
    get_all_time_best = get_all_time_best()

    def save(self, *args, **kwargs):
        if not self.slug or self.slug == '':
            current_time = datetime.now()
            self.slug = slugify(self.title) + '-' + \
                str(current_time.strftime("%d-%m-%Y-%H-%M-%S"))
        super(Post, self).save(*args, **kwargs)

    def count_likes(self):
        return self.likes.count()

    def get_content_truncated(self):
        return Truncator(self.content).chars(520)

    def count_comment(self):
        return self.commented_on.count()

    def __str__(self):
        return self.title


class PostComment(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='commented_by')
    post = models.ForeignKey(
        'Post', on_delete=models.CASCADE, related_name='commented_on')

    parent = models.ForeignKey(
        'self', on_delete=models.CASCADE, null=True, blank=True)

    content = models.TextField(max_length=1200)

    likes = models.ManyToManyField(User, blank=True)

    date = models.DateField(auto_now_add=True)

    objects = models.Manager()
    parent_objects = PostCommentModelManager()

    def get_comment_replies(self):
        qs = PostComment.objects.filter(parent=self)
        return qs

    def count_likes(self):
        return int(self.likes.count())

    def __str__(self):
        return f"{self.user} commented on {self.post.title}"
