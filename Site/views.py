from API.models import Incidental
from django.views.decorators.http import require_http_methods
from django.shortcuts import render, get_object_or_404
from django.template import RequestContext

@require_http_methods(['GET'])
def index(request):
    return render(request, 'site/index.html')


@require_http_methods(['GET'])
def about(request):
    return render(request, 'site/about.html')


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
        inc = Incidental.objects.all()
        return render(request, 'site/inc/index.html', {'data': inc})

    @require_http_methods(['GET'])
    def detail(request, inc_id):
        inc = get_object_or_404(Incidental, pk=inc_id)
        return render(request, 'site/inc/detail.html', {'data': inc})
