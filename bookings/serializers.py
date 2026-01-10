from rest_framework import serializers
from .models import Booking
from .services import is_vehicle_available
from .pricing import calculate_price

class BookingSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = Booking
        fields = "__all__"
        read_only_fields = ("status", "total_price", "created_at")

    def validate(self, attrs):
        vehicle = attrs["vehicle"]
        start = attrs["start_date"]
        end = attrs["end_date"]

        if start >= end:
            raise serializers.ValidationError("End date must be after start date")
        
        if not is_vehicle_available(vehicle, start, end):
            raise serializers.ValidationError("Vehicle is not available for these dates")
        
        return attrs
    
    def create(self, validated_data):
        vehicle = validated_data["vehicle"]
        start = validated_data["start_date"]
        end = validated_data["end_date"]
                                
        validated_data["total_price"] = calculate_price(vehicle, start, end)
        return super().create(validated_data)