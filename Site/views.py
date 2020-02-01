from django.shortcuts import render
from django.http import HttpResponse
from API.models import Incidental
from django.core import serializers
from django.views.decorators.http import require_http_methods
from django.shortcuts import render
from django.conf import settings


@require_http_methods(['GET'])
def index(request):
    return render(request, 'site/index.html')


@require_http_methods(['GET'])
def about(request):
    return render(request, 'site/about.html')


@require_http_methods(['GET'])
def data(request):
    return render(request, 'site/data.html')


@require_http_methods(['GET'])
def gallery(request):
    return render(request, 'site/gallery.html')


@require_http_methods(['GET'])
def contact(request):
    return render(request, 'site/contact.html')


@require_http_methods(['GET'])
def report(request):
    return render(request, 'site/report.html')
