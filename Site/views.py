from django.shortcuts import render
from django.http import HttpResponse
from API.models import Incidental

# Create your views here.


def index(request):
    return HttpResponse(Incidental.objects.get())

