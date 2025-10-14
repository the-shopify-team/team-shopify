from djoser.serializers import UserCreateSerializer, UserSerializer, TokenCreateSerializer
from django.contrib.auth import authenticate
from .models import CustomUserModel
from rest_framework import serializers

class CustomUserCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = CustomUserModel
        fields = ('id','username', 'email', 'phone', 'password')


    def create(self, validated_data):
        email = validated_data.get('email')
        email = email.strip() if email else None
        phone = validated_data.get('phone')
        phone = phone.strip() if phone else None

        if not email and not phone:
            raise serializers.ValidationError("You must provide either an email or phone number")
        
        

        user = CustomUserModel(
            email=email,
            phone=phone,
            username=validated_data.get('username')
            
        )
        user.set_password(validated_data['password'])
        user.save()
        return user


class CustomUserSerializer(UserSerializer):
    class Meta(UserSerializer.Meta):
        model = CustomUserModel
        fields = ('id','username', 'email', 'phone')


class CustomTokenCreateSerializer(TokenCreateSerializer):
    username = serializers.CharField(write_only=True)

    def validate(self, attrs):
        login= attrs.get('email')
        password = attrs.get('password')

        user = authenticate(email=login, password=password)

        if user is None:
            try:
                user_obj = CustomUserModel.objects.get(phone=login)
                user = authenticate(email=user_obj.email, password=password)
            except CustomUserModel.DoesNotExist:
                pass

        if user is None:
            raise serializers.ValidationError("Invalid login credentials")
        
        attrs['user'] = user
        return attrs