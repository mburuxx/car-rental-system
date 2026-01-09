from django.contrib import admin
from .models import Vehicle

@admin.register(Vehicle)
class VehicleAdmin(admin.ModelAdmin):
    list_display = ("brand", "name", "category", "price_per_day", "is_available")
    list_filter = ("category", "is_available")
    search_fields = ("brand", "name")