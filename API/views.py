from django import http
from API.models import Incidental
from django.views import generic
from ipware import get_client_ip
from django.core.exceptions import ValidationError
from django.contrib.auth import authenticate, login
from django.urls import reverse


class IndexView(generic.View):
    def get(self, request):
        """Get all incidentals"""
        qs = Incidental.objects.values("pk",
                                       "date_obs",
                                       "description",
                                       "loc_lat",
                                       "loc_lng",
                                       "verified",
                                       "ts_entered",
                                       "ts_updated",
                                       "image")
        return http.JsonResponse({'data': list(qs)})

    def post(self, request):
        """Creates a new incidental"""
        new = Incidental()
        data = request.POST
        try:
            if data.get('date_obs') is None:
                raise ValidationError("date_obs is not set")
            else:
                new.date_obs = data.get('date_obs')
        except ValidationError as err:
            return http.HttpResponseBadRequest(err)

        if data.get('description') is not None:
            new.description = data.get('description')
        if data.get('loc_lat') is not None:
            new.loc_lat = data.get('loc_lat')
        if data.get('loc_lng') is not None:
            new.loc_lng = data.get('loc_lng')
        if data.get('email') is not None:
            new.email = data.get('email')
        if data.get('contact') is not None:
            if data.get('contact') == 'true':
                new.contact = True
        ip, is_routable = get_client_ip(request)
        if ip is not None:
            new.entered_IP = ip

        if request.FILES.get('image') is not None:
            new.image = request.FILES.get('image')

        try:
            new.save()
        except RuntimeError:
            return http.HttpResponseServerError()
        finally:
            return http.JsonResponse({'redirect': reverse('api:inc_det', args=(new.id,))})



class DetailView(generic.View):
    def get(self, request, inc_id):
        """Get detail of individual incidental"""
        try:
            obj = Incidental.objects.values("pk",
                                            "date_obs",
                                            "description",
                                            "loc_lat",
                                            "loc_lng",
                                            "verified",
                                            "ts_entered",
                                            "ts_updated",
                                            "image").get(pk=inc_id)
        except Incidental.DoesNotExist:
            return http.HttpResponseNotFound()
        return http.JsonResponse({'data': obj})

    # def put(self, request, inc_id):
    #    """Update incidental"""
    #    try:
    #        obj = Incidental.objects.get(pk=inc_id)
    #    except Incidental.DoesNotExist:
    #        return http.HttpResponseNotFound()
    #    print(obj)
    #    return http.HttpResponse("Test")

    # def delete(self, request, inc_id):
    #    """Delete incidental"""


class AuthView(generic.View):
    def get(self, request):
        """Gets user authentication status"""
        if request.user.is_authenticated:
            return http.HttpResponse("True")
        else:
            return http.HttpResponseForbidden("False")

    def post(self, request):
        """Logs user in """
        username = request.POST.get('username')
        password = request.POST.get('password')
        if username is None or password is None:
            return http.HttpResponseBadRequest("Username or password is missing.")
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return http.HttpResponse("Success")
        else:
            return http.HttpResponseBadRequest("Not success")
