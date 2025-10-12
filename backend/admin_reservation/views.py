from django.shortcuts import render, get_object_or_404
from rest_framework.views import Response, APIView, status
from carproduct.permission import IsSuperUser
from .models import ReservationModel
from .serializers import ReservationSerializer


# Create your views here.

class AdminReservationView(APIView):
    permission_classes=[IsSuperUser]

    def get(self, request):
        data = ReservationModel.objects.all()
        serializer = ReservationSerializer(data, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def post(self, request):
        data = request.data
        
        if 'guest' in data["username"]:
            data["status"] = "soft"
        else:
            data["status"] = "firm"

        serializer = ReservationSerializer(data=data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class AdminReservationDetailView(APIView):
    permission_classes = [IsSuperUser]
    def get(self, request, pk):
        data = get_object_or_404(ReservationModel, id=pk)
        serializer = ReservationSerializer(data)

        return Response(serializer.data, status=status.HTTP_200_OK)
    

    def put(self, request, pk):
        data = get_object_or_404(ReservationModel, id=pk)
        
        serializer = ReservationSerializer(data, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

    def delete(self, request, pk):
        data = get_object_or_404(ReservationModel, id=pk)
        data.car.available = True
        data.status = 'deleted'
        return Response({"message":"Reservation deleted successfully"})