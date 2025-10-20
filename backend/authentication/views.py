from rest_framework.views import APIView, status, Response
from django.contrib.auth import get_user_model
import uuid
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from carproduct.permission import IsSuperUser
from drf_spectacular.utils import extend_schema, OpenApiResponse, OpenApiExample, OpenApiRequest
from .serializers import CustomUserSerializer
from django.shortcuts import get_object_or_404
User = get_user_model()



class GuestLoginViews(APIView):
    @extend_schema(
    summary="Register a guest user",
    description="Endpoint to create a guest user.",
    responses={
        201: OpenApiResponse(
            response=dict,
            description="Example token response",
            examples=[
                OpenApiExample(
                    "Success Example",
                    value={
                        "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc2MDYwMDQ4MSwiaWF0IjoxNzYwMTY4NDgxLCJqdGkiOiIwZTMzN2E0NTkwMDI0ZDkzOGMwNzJlMzE4YTA4NTFiMiIsInVzZXJfaWQiOiI2In0.AJUwJaXwaIaECYUpykpXO_yoyWCKV_J8LrN8_gwnUUE",
                        "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzYwNDI3NjgxLCJpYXQiOjE3NjAxNjg0ODEsImp0aSI6IjA2NDA1YmIxMjdmZTRlMWM5ZmMwODFmMWY4ZDdlZmRlIiwidXNlcl9pZCI6IjYifQ.3qX4AuY-uaxKRq62PtBGXDpd3BVYFeDZBum2hJCuKw8"
                    }


                )
            ],
        )
    },
)


    def post(self, request):
        guest_id = str(uuid.uuid4())[:8]

        user = User.objects.create_user(username=f"guest_{guest_id}")
        user.email = None
        user.set_unusable_password()
        user.save()

        refresh = RefreshToken.for_user(user)
        tokens = {
            "refresh":str(refresh),
            "access":str(refresh.access_token)
        }

        return Response(tokens, status=status.HTTP_201_CREATED)
    


class UpdateGuestUser(APIView):
    permission_classes = [IsAuthenticated]

    # --- GET endpoint --- 
    @extend_schema(
    summary="Get users username for profile update",
    description="Endpoint to get username",
    responses={
        200: OpenApiResponse(
            response=dict,
            description="Example response",
            examples=[
                OpenApiExample(
                    "Success Example",
                    value={
                        "username":"guest_1234"
                    }
                )
            ],
        ), 
        401: OpenApiResponse(
            response=dict,
            description="Example response",
            examples=[
                 OpenApiExample(
                    "No authorization",
                    value={
                        "detail": "Authentication credentials were not provided."
                    }
                )
            ]
        )
    },
)


    def get(self, request):
        user = request.user

        data = {
            'id': user.id,
            "username":user.username,
            "email": user.email,
            "phone": user.phone,
            "admin": user.is_superuser
        }

        return Response(data, status=status.HTTP_200_OK)
    

    # --- PUT endpoint --- 
    @extend_schema(
    summary="Update user profile",
    description="Endpoint to update user profile",
    request={
        "application/json": {
            "example": {
                "username": "new_username",
                "email": "guest@example.com",
                "phone": "+2341234567890",
                "password": "12345678",
            },
        }
    },
    responses={
        201: OpenApiResponse(
            response=dict,
            description="Example response",
            examples=[
                OpenApiExample(
                    "Success Example",
                    value={
                        "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc2MDYwMDQ4MSwiaWF0IjoxNzYwMTY4NDgxLCJqdGkiOiIwZTMzN2E0NTkwMDI0ZDkzOGMwNzJlMzE4YTA4NTFiMiIsInVzZXJfaWQiOiI2In0.AJUwJaXwaIaECYUpykpXO_yoyWCKV_J8LrN8_gwnUUE",
                        "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzYwNDI3NjgxLCJpYXQiOjE3NjAxNjg0ODEsImp0aSI6IjA2NDA1YmIxMjdmZTRlMWM5ZmMwODFmMWY4ZDdlZmRlIiwidXNlcl9pZCI6IjYifQ.3qX4AuY-uaxKRq62PtBGXDpd3BVYFeDZBum2hJCuKw8"
                    }
                )
            ],
        )
    },
)
    
    def put(self, request):
        user = request.user
        data = request.data

        username = data['username']
        email = None
        phone = None
        password = data['password']

        try:
            email = data['email']
        except:
            pass

        try:
            phone = data['phone']
        except:
            pass
        
        userdata = User.objects.get(id=user.id)
        userdata.username = username
        userdata.email = email
        userdata.phone = phone
        userdata.set_password(password)
        userdata.save()

        refresh = RefreshToken.for_user(userdata)

        response = {
            'refresh':str(refresh),
            'access':str(refresh.access_token)
        }

        return Response(response, status=status.HTTP_200_OK)



class UserView(APIView):
    permission_classes = [IsSuperUser]
    def get(self, request):
        data = User.objects.all().order_by('id')
        serializer = CustomUserSerializer(data, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class UserDetailsView(APIView):
    def get(self, request, pk):
        data = get_object_or_404(User, id=pk)
        serializer = CustomUserSerializer(data)

        return Response(serializer.data, status=status.HTTP_200_OK)