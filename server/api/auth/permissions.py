from rest_framework import permissions
from rest_framework.request import HttpRequest


class isStaffOrAuthenticated(permissions.BasePermission):
    message = "User isn't staff!"

    def has_permission(self, request: HttpRequest, view):
        if request.user and request.user.is_staff:
            return True
        elif (
            request.user.is_authenticated and request.method in permissions.SAFE_METHODS
        ):
            return True
        return False


class isStaffOrReadonly(permissions.BasePermission):
    def has_permission(self, request: HttpRequest, view):
        if request.user and request.user.is_staff:
            return True
        elif request.method in permissions.SAFE_METHODS:
            return True
        return False
