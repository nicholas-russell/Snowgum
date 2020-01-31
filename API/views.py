from django.http import HttpResponse, JsonResponse, HttpResponseBadRequest, HttpResponseServerError
from API.models import Incidental
from django.views.generic import View
from ipware import get_client_ip
from django.core.exceptions import ValidationError


class IndexView(View):
    model = Incidental

    def get(self, request):
        """Get all incidentals"""
        qs = self.model.objects.values("pk",
                                       "date_obs",
                                       "description",
                                       "loc_name",
                                       "loc_lat",
                                       "loc_long",
                                       "verified",
                                       "ts_entered",
                                       "ts_updated")
        return JsonResponse({'data': list(qs)})

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
            return HttpResponseBadRequest(err)

        if data.get('description') is not None:
            new.description = data.get('description')
        if data.get('loc_name') is not None:
            new.loc_name = data.get('loc_name')
        if data.get('loc_lat') is not None:
            new.loc_lat = data.get('loc_lat')
        if data.get('loc_long') is not None:
            new.loc_long = data.get('loc_long')
        if data.get('email') is not None:
            new.email = data.get('email')
        ip, is_routable = get_client_ip(request)
        if ip is not None:
            new.entered_IP = ip

        try:
            new.save()
        except RuntimeError:
            return HttpResponseServerError()
        finally:
            return HttpResponse("Success")
