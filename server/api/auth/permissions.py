from rest_framework import permissions
from rest_framework.request import HttpRequest


class isStaffOrAuthenticated(permissions.BasePermission):
    message = "User isn't staff! or isn't authenticated"

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


# Allows any authenticated user to view. Only posters can modify
class isPosterOrReadonly(permissions.BasePermission):
    def has_permission(self, request: HttpRequest, view):
        if request.user and (request.user.groups.filter(name='Poster').exists() or request.user.is_staff):
            return True
        elif request.method in permissions.SAFE_METHODS:
            return True
