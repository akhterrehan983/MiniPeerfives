from django.db import models


class User(models.Model):
    name = models.CharField(max_length=255)
    p5_balance = models.IntegerField(default=100)
    rewards_balance = models.IntegerField(default=0)
    
    def __str__(self):
        return self.name

class RewardHistory(models.Model):
    datetime_stamp = models.DateTimeField(auto_now_add=True)
    points = models.IntegerField()
    given_by = models.ForeignKey(User, related_name="giver", on_delete=models.CASCADE)
    given_to = models.ForeignKey(
        User, related_name="receiver", on_delete=models.CASCADE
    )

    def formatted_datetime(self):
        return self.datetime_stamp.strftime(
            "%Y-%m-%d %I:%M:%S %p"
        )  # 12-hour format with AM/PM

    def __str__(self):
        return f"Reward of {self.points} points from {self.given_by} to {self.given_to} at {self.formatted_datetime()}"
