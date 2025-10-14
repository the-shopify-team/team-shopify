from django.shortcuts import render, get_object_or_404
from rest_framework.views import Response, APIView, status
from admin_reservation.models import ReservationModel
from admin_reservation.serializers import ReservationSerializer
from rest_framework.permissions import IsAuthenticated
from django.utils import timezone
from datetime import timedelta
from carproduct.models import CarModel

# Create your views here.


class UserReservation(APIView):
    permission_classes=[IsAuthenticated]
    def get(self, request):
        user = request.user
        data = ReservationModel.objects.filter(user=user.id)
        serializer = ReservationSerializer(data, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)
    

class UserDetailReservation(APIView):
    permission_classes=[IsAuthenticated]
    def get(self, request, pk):
        user = request.user
        data = get_object_or_404(ReservationModel, user=user.id, id=pk)

        serializer = ReservationSerializer(data)

        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def post(self, request, pk):
        user = request.user
        car = get_object_or_404(CarModel, id=pk)
        availability = car.available
        

        if not availability:
            return Response({"message":"Car already reserved"}, status=status.HTTP_306_RESERVED)

        data = {
            "user":user.id,
            "car":pk,
            "email":user.email,
            "phone":user.phone
        }   

        if 'guest' in user.username:
            data["status"] = "soft"
            data["expiry_date"] = (timezone.now() + timedelta(hours=1)).date()
        else:
            data["status"] = "firm"
            car.available = False
            car.save()

            try:
                res = ReservationModel.objects.get(car=car.id)
                if res.status == "soft":
                    res.status = "deleted"
                    res.save()
            except:
                pass

        serializer = ReservationSerializer(data=data)

        if serializer.is_valid():
            serializer.save()

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk):
        user = request.user
        data = get_object_or_404(ReservationModel, id=pk, user=user.id)
        data.car.available = True
        data.car.save()

        data.status = 'deleted'
        data.save()

        return Response({"message":"Reservation deleted successfully"}, status=status.HTTP_200_OK)