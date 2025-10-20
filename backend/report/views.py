from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, serializers
from carproduct.models import CarModel
from admin_reservation.models import ReservationModel
from carproduct.permission import IsSuperUser
from django.db.models import Q
from drf_spectacular.utils import extend_schema, OpenApiExample


# Create your views here.


class ReportSerializer(serializers.Serializer):
    total_car = serializers.IntegerField()
    reservation = serializers.IntegerField()
    soft_reservation = serializers.IntegerField()
    firm_reservation = serializers.IntegerField()
    total_revenue = serializers.CharField()


class ReportView(APIView):
    permission_classes = [IsSuperUser]

    @extend_schema(
        responses=ReportSerializer,
        summary='System report',
        description='Return statistics for cars and reservations (counts and total revenue).',
        examples=[
            OpenApiExample(
                'report-example',
                value={
                    'total_car': 42,
                    'reservation': 10,
                    'soft_reservation': 3,
                    'firm_reservation': 7,
                    'total_revenue': '₦12000'
                },
                response_only=True
            )
        ]
    )
    def get(self, request):
        total_car = CarModel.objects.all().count()
        reservation = ReservationModel.objects.filter(Q(status='firm') | Q(status='soft')).count()
        soft_reservation = ReservationModel.objects.filter(status='soft').count()
        firm_reservation = ReservationModel.objects.filter(status='firm').count()
        gain = ReservationModel.objects.filter(status='completed')
        amount = 0

        for i in gain:
            # ensure car price is present and numeric
            try:
                amount += i.car.price or 0
            except Exception:
                pass

        response = {
            'total_car': total_car,
            'reservation': reservation,
            'soft_reservation': soft_reservation,
            'firm_reservation': firm_reservation,
            'total_revenue': f'₦{amount}'
        }

        return Response(response, status=status.HTTP_200_OK)