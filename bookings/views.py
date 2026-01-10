from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated

from users.permissions import IsAdminUser
from .models import Booking
from .serializers import BookingSerializer

class BookingViewSet(ModelViewSet):
    serializer_class = BookingSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.role == "ADMIN":
            return Booking.objects.all()
        return Booking.objects.filter(user=user)

    def perform_create(self, serializer):
        if self.request.user.role != "USER":
            raise PermissionError("Only logged in user can create bookings")
        serializer.save(user=self.request.user)