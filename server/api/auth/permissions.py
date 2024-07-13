from rest_framework import permissions


class isStaffOrReadOnly(permissions.BasePermission):
    message = "User isn't staff!"

    def has_permission(self, request, view):
        if request.user and request.user.is_staff:
            return True

        return request.method in permissions.SAFE_METHODS
