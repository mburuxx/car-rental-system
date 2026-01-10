from datetime import timedelta

def calculate_price(vehicle, start_date, end_date):
    days = (end_date - start_date).days
    return days * vehicle.price_per_day