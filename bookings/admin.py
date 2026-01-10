from django.contrib import admin
from .models import Booking

@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = ("user", "vehicle", "start_date", "end_date", "status")
    list_filter = ("status",)