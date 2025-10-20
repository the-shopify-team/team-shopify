from django.shortcuts import render
from rest_framework.views import APIView, Response, status
from carproduct.models import CarModel
from admin_reservation.models import ReservationModel
from carproduct.permission import IsSuperUser
from django.db.models import Q


# Create your views here.


class ReportView(APIView):
    permission_classes = [IsSuperUser]
    def get(self, request):
        total_car = CarModel.objects.all().count()
        reservation = ReservationModel.objects.filter(Q(status='firm') | Q(status='soft')).count()
        soft_reservation = ReservationModel.objects.filter(status='soft').count()
        firm_reservation = ReservationModel.objects.filter(status='firm').count()
        gain = ReservationModel.objects.filter(status='completed')
        amount = 0

        for i in gain:
            amount += i.car.price

        response = {
            'total_car':total_car,
            'reservation':reservation,
            'soft_reservation':soft_reservation,
            'firm_reservation':firm_reservation,
            'total_revenue': f'₦{amount}'
        }

        return Response(response, status=status.HTTP_200_OK)