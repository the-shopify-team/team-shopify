from django.shortcuts import render
from .permission import IsSuperUser
from rest_framework.views import APIView, Response, status
from .models import *
from .serializers import *
from .supabase_config import supabase
from drf_spectacular.utils import extend_schema, OpenApiRequest, OpenApiExample, OpenApiResponse

#send email when a user adds to cart
# Create your views here.

class AllCarView(APIView):
    @extend_schema(
    summary="Display all cars",
    description="Endpoint to Display all cars.",
    responses={
        200: OpenApiResponse(
            response=dict,
            description="Example token response",
            examples=[
                OpenApiExample(
                    "Success Example",
                    value=[
                        {
                            "make": "Porsche",
                            "model": "911 Carrera Cabriolet",
                            "price": "135000.00",
                            "images_url": "https://dfansamuqoojcgujsyxd.supabase.co/storage/v1/object/public/TEAM-SHOPIFY/car_images/63e3d16b4d7e965ac8856be429ca8153.webp?",
                            "available": True
                        },
                        {
                            "make": "Tesla",
                            "model": "Model S Plaid",
                            "price": "129990.00",
                            "images_url": "h",
                            "available": True
                        }
                    ]

                )
            ],
        )
    },
)
    
    def get(self, request):
        data = CarModel.objects.all()
        serializer = CarSerializer(data, many=True)
        # info = []

        # for res in serializer.data:
        #     body = {
        #         "make": res["make"],
        #         "model": res["model"],
        #         "price": res["price"],
        #         "images_url": res["images_url"][0],
        #         "available": res["available"]
        #     }
            
        #     info.append(body)

        return Response(serializer.data, status=status.HTTP_200_OK)
    

class DetailsCarViews(APIView):
    @extend_schema(
    summary="Display car details",
    description="Endpoint to Display car details.",
    responses={
        200: OpenApiResponse(
            response=dict,
            description="Example response",
            examples=[
                OpenApiExample(
                    "Success Example",
                    value={
                        "id": 1,
                        "make": "Tesla",
                        "model": "Model S Plaid",
                        "year": 2024,
                        "color": "Red",
                        "price": "129990.00",
                        "transmission": "automatic",
                        "fuel_type": "electric",
                        "license_plate": "TES-PLAID-001",
                        "category": "Sedan",
                        "description": "High-performance electric sedan with cutting-edge technology.",
                        "images_url": ["https://dfansamuqoojcgujsyxd.supabase.co/storage/v1/object/public/TEAM-SHOPIFY/car_images/Tesla Model S Plaid new.jpg?", "https://dfansamuqoojcgujsyxd.supabase.co/storage/v1/object/public/TEAM-SHOPIFY/car_images/Tesla Model S Plaid new.jpg?"],
                        "added_at": "2025-10-08",
                        "available": True
                        }
                ),
            ],
        ),
        404: OpenApiResponse(
            response=dict,
            description="Example error response",
            examples=[
                OpenApiExample(
                    "Not Found",
                    value={"message":"Car not found"}
                )
            ]
        )
    },
)

    def get(self, request, pk):
        try:
            data = CarModel.objects.get(id=pk)
        except CarModel.DoesNotExist:
            return Response({"message":"Car not found"}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = CarSerializer(data)

        return Response(serializer.data, status=status.HTTP_200_OK)


class AddCarView(APIView):
    permission_classes=[IsSuperUser]
    @extend_schema(
        summary="Add new car (SuperUser only)",
        description="Endpoint to add a new car (SuperUser only)",
        request={
        "application/json": {
            "example": {
                "make": "Tesla",
                "model": "Model S Plaid",
                "year": 2024,
                "color": "Black",
                "price": 129990.00,
                "transmission": "automatic",
                "fuel_type": "electric",
                "license_plate": "TES-PLAID-001",
                "category": "Sedan",
                "description": "High-performance electric sedan with cutting-edge technology.",
                "images_url": [
                    "https://example.com/images/tesla_model_s_front.jpg",
                    "https://example.com/images/tesla_model_s_rear.jpg"
                ],
                "available": True
                },
            },
        },
        responses={
        200: OpenApiResponse(
            response=dict,
            description="Example response",
            examples=[
                OpenApiExample(
                    "Success Example",
                    value={
                        "id": 1,
                        "make": "Tesla",
                        "model": "Model S Plaid",
                        "year": 2024,
                        "color": "Black",
                        "price": "129990.00",
                        "transmission": "automatic",
                        "fuel_type": "electric",
                        "license_plate": "TES-PLAID-001",
                        "category": "Sedan",
                        "description": "High-performance electric sedan with cutting-edge technology.",
                        "images_url": [
                            "https://example.com/images/tesla_model_s_front.jpg",
                            "https://example.com/images/tesla_model_s_rear.jpg"
                        ],
                        "available": True,
                        "added_at": "2025-10-08"
                        }
                ),
            ],
        )
        }
    )

    def post(self, request):
        data = request.data

        images = request.FILES.getlist("images_url")
        image_url = []


        for image in images:
            res = supabase.storage.from_("TEAM-SHOPIFY").upload(
                f"car_images/{image.path}",
                image.read(),
                {"content-type":image.content_type}
            )

            url = supabase.storage.from_("TEAM-SHOPIFY").get_public_url(f"car_images/{image.path}")
            image_url.append(url)
        
        data["images_url"] = image_url
        clean_data = {}
        for key, value in data.lists():
            if len(value) == 1:
                clean_data[key] = value[0]
            else:
                clean_data[key] = value

        # ✅ Convert string types properly
        clean_data["available"] = str(clean_data.get("available", "")).lower() in ["true", "1", "yes"]
        if "year" in clean_data:
            clean_data["year"] = int(clean_data["year"])
        if "price" in clean_data:
            clean_data["price"] = float(clean_data["price"])

        serializer = CarSerializer(data=clean_data)


        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class UpdateCarViews(APIView):
    permission_classes=[IsSuperUser]

    @extend_schema(
        summary="Update a car (SuperUser only)",
        description="Endpoint to update a car (Partial is true) (SuperUser only)",
        request={
        "application/json": {
            "example": {
                "price": 125000.00,
                "available": False
                }
            },
        },
        responses={
        200: OpenApiResponse(
            response=dict,
            description="Example response",
            examples=[
                OpenApiExample(
                    "Success Example",
                    value={
                        "id": 1,
                        "make": "Tesla",
                        "model": "Model S Plaid",
                        "year": 2024,
                        "color": "Black",
                        "price": "125000.00",
                        "transmission": "automatic",
                        "fuel_type": "electric",
                        "license_plate": "TES-PLAID-001",
                        "category": "Sedan",
                        "description": "High-performance electric sedan with cutting-edge technology.",
                        "images_url": [
                            "https://example.com/images/tesla_model_s_front.jpg",
                            "https://example.com/images/tesla_model_s_rear.jpg"
                        ],
                        "available": False,
                        "added_at": "2025-10-08"
                        }
                ),
            ],
        ),404: OpenApiResponse(
            response=dict,
            description="Example error response",
            examples=[
                OpenApiExample(
                    "Not Found",
                    value={"message":"Car not found"}
                )
            ]
        )
        }
    )

    def put(self, request, pk):

        try:
            user_data = CarModel.objects.get(id=pk)
        except CarModel.DoesNotExist:
            return Response({"message":"Car not found"}, status=status.HTTP_404_NOT_FOUND)
        data = request.data
        print(data)
        try:
            image = request.FILES["images_url"]
            res = supabase.storage.from_("TEAM-SHOPIFY").upload(
                f"car_images/{image.name}",
                image.read(),
                {"content-type":image.content_type}
            )

            image_url = supabase.storage.from_("TEAM-SHOPIFY").get_public_url(f"car_images/{image.name}")

            data["images_url"] = image_url
        except:
            pass


        clean_data = {}
        try:
            for key, value in data.lists():
                if len(value) == 1:
                    clean_data[key] = value[0]
                else:
                    clean_data[key]= value
            clean_data["available"] = str(clean_data.get("available", "")).lower() in ["true", "1", "yes"]
            if "year" in clean_data:
                clean_data["year"] = int(clean_data["year"])
            if "price" in clean_data:
                clean_data["price"] = float(clean_data["price"])
        except AttributeError:
            pass

        clean_data = data
            
        print(clean_data)

        serializer = CarSerializer(user_data, data=clean_data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        


    @extend_schema(
    summary="Delete a Car (SuperUser only)",
    description="Endpoint to delete a car. (SuperUser only)",
    responses={
        200: OpenApiResponse(
            response=dict,
            description="Example token response",
            examples=[
                OpenApiExample(
                    "Success Example",
                    value={"message":"Car removed successfully"}
                )
                ],
            ),
        404: OpenApiResponse(
            response=dict,
            description="Example erro response",
            examples=[
                OpenApiExample(
                    "Not Found",
                    value={"message":"Car not found"}
                )
            ]
        )
        },
)
    def delete(self, request, pk):
        try:
            data = CarModel.objects.get(id=pk)
        except CarModel.DoesNotExist:
            return Response({"message":"Car not found"}, status=status.HTTP_404_NOT_FOUND)

        data.delete()
        return Response({"message":"Car removed successfully"}, status=status.HTTP_200_OK)

