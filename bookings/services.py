from .models import Booking

def is_vehicle_available(vehicle, start_date, end_date):
    overlapping_bookings = Booking.objects.filter(
        vehicle=vehicle,
        status_in=["PENDING", "APPROVED"],
        start_date__lt=end_date,
        end_date__gt=start_date,
    )
    return not overlapping_bookings.exists()