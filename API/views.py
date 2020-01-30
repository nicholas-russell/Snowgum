from django.shortcuts import render
from django.http import HttpResponse
from API.models import Incidental
from django.shortcuts import render

# Create your views here.


def index(request):
    i = Incidental.objects.create(date_obs="2020-01-22")
    i.save()
    return HttpResponse("This is the index for the API!")

