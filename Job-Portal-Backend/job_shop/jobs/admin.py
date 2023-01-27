from django.contrib import admin
from jobs.models import UserAuth, PersonalInfo

# Register your models here.
admin.site.register(UserAuth)
admin.site.register(PersonalInfo)
