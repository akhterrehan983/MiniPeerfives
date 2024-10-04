from rest_framework import viewsets
from rest_framework.decorators import api_view, action

from .models import User, RewardHistory
from .serializers import UserSerializer, RewardHistorySerializer
from rest_framework.response import Response
from rest_framework import status


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class RewardHistoryViewSet(viewsets.ModelViewSet):
    queryset = RewardHistory.objects.all()
    serializer_class = RewardHistorySerializer

    @action(detail=False, methods=["post"])
    def create_reward(self, request):
        giver_id = request.data.get("given_by")
        receiver_id = request.data.get("given_to")
        amount = request.data.get("points")

        try:
            giver = User.objects.get(id=giver_id)
            receiver = User.objects.get(id=receiver_id)
        except User.DoesNotExist:
            return Response(
                {"error": "User not found"}, status=status.HTTP_404_NOT_FOUND
            )

        if giver.p5_balance >= amount and amount <= 100:
            giver.p5_balance -= amount
            receiver.rewards_balance += amount
            giver.save()
            receiver.save()
            RewardHistory.objects.create(
                given_by=giver, given_to=receiver, points=amount
            )
            return Response(status=status.HTTP_201_CREATED)

        return Response(
            {"error": "Insufficient balance or exceeds limit"},
            status=status.HTTP_400_BAD_REQUEST,
        )

    @action(detail=False, methods=['delete'])
    def delete_reward(self, request, pk=None):
        try:
            reward = RewardHistory.objects.get(pk=pk)
            giver = reward.given_by
            receiver = reward.given_to

            # Reverse the transaction
            giver.p5_balance += reward.points
            receiver.rewards_balance -= reward.points
            giver.save()
            receiver.save()

            reward.delete()  # Delete the reward entry
            return Response(status=status.HTTP_204_NO_CONTENT)
        except RewardHistory.DoesNotExist:
            return Response({'error': 'Reward not found'}, status=status.HTTP_404_NOT_FOUND)

    def get_queryset(self):
        user_id = self.kwargs.get("user_id", None)
        print(user_id )
        if user_id:
            return self.queryset.filter(given_to_id=user_id)  # Filter based on user ID
        return self.queryset  # Return all if no user ID is provided


@api_view(["POST"])
def give_p5(request, giver_id, receiver_id, amount):
    try:
        giver = User.objects.get(id=giver_id)
        receiver = User.objects.get(id=receiver_id)
    except User.DoesNotExist:
        return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

    if giver.p5_balance >= amount and amount <= 100:
        giver.p5_balance -= amount
        receiver.p5_balance += amount
        giver.save()
        receiver.save()
        RewardHistory.objects.create(given_by=giver, given_to=receiver, points=amount)
        return Response(status=status.HTTP_201_CREATED)

    return Response(
        {"error": "Insufficient balance or exceeds limit"},
        status=status.HTTP_400_BAD_REQUEST,
    )


@api_view(["POST"])
def p5_history(request):
    user_id = request.data.get("user_id", None)  # Use request.data for POST data
    print(user_id)
    if user_id:
        # Fetch the P5 history for the user based on given_by relationship
        p5_history = RewardHistory.objects.filter(
            given_by_id=user_id
        )  # Adjust if needed
        serializer = RewardHistorySerializer(
            p5_history, many=True
        )  # Serialize the data
        return Response({"p5_history": serializer.data})  # Return serialized data
    return Response({"error": "User ID not provided"}, status=400)


@api_view(["POST"])
def reward_history(request):
    user_id = request.data.get("user_id", None)  # Use request.data for POST data
    print(user_id)
    if user_id:
        # Fetch the P5 history for the user based on given_by relationship
        p5_history = RewardHistory.objects.filter(
            given_to_id=user_id
        )  # Adjust if needed
        serializer = RewardHistorySerializer(
            p5_history, many=True
        )  # Serialize the data
        return Response({"reward_history": serializer.data})  # Return serialized data

    return Response({"error": "User ID not provided"}, status=400)
