from rest_framework import permissions


class isAdminOrReadOnly(permissions.BasePermission):
    message = "User isn't admin!"

    def has_permission(self, request, view):
        if request.user and request.user.is_staff:
            return True

        return request.method in permissions.SAFE_METHODS
