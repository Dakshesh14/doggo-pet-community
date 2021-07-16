from django.contrib import admin

# local imports
from .models import Post, PostComment

class PostAdmin(admin.ModelAdmin):
    list_display = ('id','title',)
    list_display_links = ('id','title',)
    
    readonly_fields = ('posted_on','slug',)


admin.site.register(Post, PostAdmin)
admin.site.register(PostComment)