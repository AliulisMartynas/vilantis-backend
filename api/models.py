from django.db import models


class Url(models.Model):
    value = models.TextField(null=True, blank=True)
    shortened_value = models.TextField(null=True, blank=True)
    active = models.BooleanField()
    number_of_clicks = models.IntegerField()
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.value
