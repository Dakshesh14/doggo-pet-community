from rest_framework.permissions import BasePermission 


class IsAuthorOrReadOnly(BasePermission):
    message = 'Only the creator of this content can go further.'

    def has_object_permission(self, request, view, obj):
        if request.method == 'GET':
            return True
        elif request.method == 'POST' or 'PUT' or 'PATCH':
            return obj.user == request.user