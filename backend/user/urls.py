from django.urls import path, include
from .views import (
    UserViewSet,
    RewardHistoryViewSet,
    give_p5,
    p5_history,
    reward_history,
)

urlpatterns = [
    path("", include("rest_framework.urls")),
    path("users/", UserViewSet.as_view({"get": "list", "post": "create"})),
    path(
        "users/<int:pk>/",
        UserViewSet.as_view({"get": "retrieve", "put": "update", "delete": "destroy"}),
    ),
    path(
        "rewards/",
        RewardHistoryViewSet.as_view({"get": "list", "post": "create_reward"}),
    ),  # Allow POST for creating rewards
    path(
        "rewards/<int:pk>/delete/",
        RewardHistoryViewSet.as_view({"delete": "delete_reward"}),
    ),  # New delete endpoint
    path("users/<int:pk>/rewards/", RewardHistoryViewSet.as_view({"get": "list"})),
    path("give_p5/<int:giver_id>/<int:receiver_id>/<int:amount>/", give_p5),
    path("p5_history/", p5_history),  # Define the endpoint
    path(
        "reward_history/", reward_history
    ),  # Define the endpoint
]
