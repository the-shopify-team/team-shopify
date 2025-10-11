from django.shortcuts import render
from .permission import IsSuperUser
from rest_framework.views import APIView, Response, status
from .models import *
from .serializers import *
from .supabase_config import supabase

#send email when a user adds to cart
# Create your views here.

class CarView(APIView):
    # permission_classes=[IsSuperUser]

    def get(self, request):
        data = CarModel.objects.all()
        serializer = CarSerializer(data, many=True)
        info = []

        for res in serializer.data:
            body = {
                "make": res["make"],
                "model": res["model"],
                "price": res["price"],
                "images_url": res["images_url"][0],
                "available": res["available"]
            }
            
            info.append(body)

        return Response(info, status=status.HTTP_200_OK)
    
    def post(self, request):
        data = request.data

        images = request.FILES.getlist("images_url")
        image_url = []


        for image in images:
            res = supabase.storage.from_("TEAM-SHOPIFY").upload(
                f"car_images/{image.name}",
                image.read(),
                {"content-type":image.content_type}
            )

            url = supabase.storage.from_("TEAM-SHOPIFY").get_public_url(f"car_images/{image.name}")
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
    

class CarDetials(APIView):
    # permission_classes=[IsSuperUser]

    def get(self, request, pk):
        try:
            data = CarModel.objects.get(id=pk)
        except CarModel.DoesNotExist:
            return Response({"message":"Car not found"}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = CarSerializer(data)

        return Response(serializer.data, status=status.HTTP_200_OK)
    
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
        

    def delete(self, request, pk):
        try:
            data = CarModel.objects.get(id=pk)
        except CarModel.DoesNotExist:
            return Response({"message":"Car not found"}, status=status.HTTP_404_NOT_FOUND)

        data.delete()
        return Response({"message":"Car removed successfully"}, status=status.HTTP_200_OK)

