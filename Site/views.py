from API.models import Incidental
from django.views.decorators.http import require_http_methods
from django.shortcuts import render


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


class IncView:
    @require_http_methods(['GET'])
    def index(request):
        return render(request, 'site/inc/index.html')

    @require_http_methods(['GET'])
    def detail(request, inc_id):
        return render(request, 'site/inc/detail.html')