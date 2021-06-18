from django.contrib import admin

# Register your models here.
from .models import user
from .models import major
from .models import department
from .models import student
from .models import teacher
from .models import course
from .models import setupcourse
from .models import selectcourse
from .models import rap

admin.site.register(user)
admin.site.register(major)
admin.site.register(department)
admin.site.register(student)
admin.site.register(teacher)
admin.site.register(course)
admin.site.register(setupcourse)
admin.site.register(selectcourse)
admin.site.register(rap)