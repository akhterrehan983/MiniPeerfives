from rest_framework import serializers
from .models import User, RewardHistory


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"


class RewardHistorySerializer(serializers.ModelSerializer):
    given_to_name = serializers.CharField(source='given_to.name', read_only=True)  # Add this line
    given_by_name = serializers.CharField(source='given_by.name', read_only=True)  # Include giver's name

    class Meta:
        model = RewardHistory
        fields = "__all__"
