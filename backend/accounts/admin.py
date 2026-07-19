from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User


@admin.register(User)
class CustomUserAdmin(UserAdmin):

    fieldsets = (
        (None, {
            'fields': (
                'username',
                'password',
            )
        }),

        ('Personal Information', {
            'fields': (
                'first_name',
                'last_name',
                'email',
            )
        }),

        ('Permissions', {
            'fields': (
                'role',
                'is_active',
                'is_staff',
                'is_superuser',
            )
        }),
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': (
                'username',
                'password1',
                'password2',
                'email',
                'role',
            ),
        }),
    )

    list_display = (
        'username',
        'email',
        'role',
        'is_staff',
    )

    list_filter = (
        'role',
        'is_staff',
    )