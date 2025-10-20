from django.shortcuts import render, get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from admin_reservation.models import ReservationModel
from admin_reservation.serializers import ReservationSerializer
from rest_framework.permissions import IsAuthenticated
from django.utils import timezone
from datetime import timedelta
from carproduct.models import CarModel
from drf_spectacular.utils import extend_schema, OpenApiExample
from drf_spectacular.openapi import OpenApiParameter, OpenApiResponse

# Create your views here.


class UserReservation(APIView):
    permission_classes = [IsAuthenticated]

    @extend_schema(
        responses=ReservationSerializer(many=True),
        summary="List user's reservations",
        description="Return all reservations that belong to the authenticated user.",
        examples=[
            OpenApiExample(
                'example-list',
                value=[
                    {
                        'id': 1,
                        'user': 2,
                        'car': 5,
                        'username': 'johndoe',
                        'car_name': 'Toyota Corolla',
                        'price': 50,
                        'status': 'firm',
                        'email': 'john@example.com',
                        'phone': '1234567890',
                        'date_reserved': '2025-10-19T12:34:56Z',
                        'expiry_date': None,
                        'start_date': '2025-10-20',
                        'end_date': None
                    }
                ],
            )
        ]
    )
    def get(self, request):
        user = request.user
        data = ReservationModel.objects.filter(user=user.id)
        serializer = ReservationSerializer(data, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)
    

class UserDetailReservation(APIView):
    permission_classes = [IsAuthenticated]

    @extend_schema(
        parameters=[
            OpenApiParameter(name='pk', location=OpenApiParameter.PATH, type=int, description='Reservation id', required=True)
        ],
        responses=ReservationSerializer,
        summary='Get reservation detail',
        description='Return a single reservation for the authenticated user by id.'
    )
    def get(self, request, pk):
        user = request.user
        data = get_object_or_404(ReservationModel, user=user.id, id=pk)

        serializer = ReservationSerializer(data)

        return Response(serializer.data, status=status.HTTP_200_OK)

    @extend_schema(
        parameters=[
            OpenApiParameter(name='pk', location=OpenApiParameter.PATH, type=int, description='Car id to reserve', required=True)
        ],
        request=None,
        responses={
            201: ReservationSerializer,
            306: OpenApiResponse(description='Car already reserved'),
            400: OpenApiResponse(description='Bad request')
        },
        examples=[
            OpenApiExample(
                'created-example',
                value={
                    'id': 10,
                    'user': 2,
                    'car': 7,
                    'username': 'janedoe',
                    'car_name': 'Honda Civic',
                    'price': 45,
                    'status': 'firm',
                    'email': 'jane@example.com',
                    'phone': '0987654321',
                    'date_reserved': '2025-10-20T09:00:00Z',
                    'expiry_date': None,
                    'start_date': '2025-10-21',
                    'end_date': None
                }
            )
        ],
        summary='Create a reservation for the authenticated user',
        description='Creates a reservation for the authenticated user for the car identified by the path `pk`. Guests receive a temporary (soft) reservation.'
    )
    def post(self, request, pk):
        user = request.user
        car = get_object_or_404(CarModel, id=pk)
        availability = car.available


        if not availability:
            return Response({"message": "Car already reserved"}, status=status.HTTP_306_RESERVED)

        data = {
            "user": user.id,
            "car": pk,
            "email": user.email,
            "phone": user.phone
        }

        if 'guest' in user.username:
            data["status"] = "soft"
            data["expiry_date"] = (timezone.now() + timedelta(hours=24)).date()
        else:
            data["status"] = "firm"
            car.available = False
            car.save()

            try:
                res = ReservationModel.objects.get(car=car.id)
                if res.status == "soft":
                    res.status = "deleted"
                    res.save()
            except ReservationModel.DoesNotExist:
                pass

        serializer = ReservationSerializer(data=data)

        if serializer.is_valid():
            serializer.save()

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @extend_schema(
        parameters=[
            OpenApiParameter(name='pk', location=OpenApiParameter.PATH, type=int, description='Reservation id to delete', required=True)
        ],
        responses={200: OpenApiResponse(description='Reservation deleted successfully')},
        summary='Delete reservation',
        description='Marks the reservation as deleted and makes the car available.'
    )
    def delete(self, request, pk):
        user = request.user
        data = get_object_or_404(ReservationModel, id=pk, user=user.id)
        data.car.available = True
        data.car.save()

        data.status = 'deleted'
        data.save()

        return Response({"message": "Reservation deleted successfully"}, status=status.HTTP_200_OK)