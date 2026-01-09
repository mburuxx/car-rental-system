from django.db import models

class Vehicle(models.Model):
    CATEGORY_CHOICES = (
        ("SEDAN", "Sedan"),
        ("SUV", "SUV"),
        ("HATCHBACK", "Hatchback"),
        ("TRUCK", "Truck"),
    )

    name = models.CharField(max_length=100)
    brand = models.CharField(max_length=100)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    price_per_day = models.DecimalField(max_digits=10, decimal_places=2)
    is_available = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.brand} {self.name}"
