from rest_framework import parsers, viewsets, generics
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated


from jobs.models import UserAuth, PersonalInfo
from jobs.serializers import UserAuthSerializer, PersonalInfoSerializer

# Create your views here.
class UserAuthViewSet(generics.ListCreateAPIView):
    queryset = UserAuth.objects.all()
    serializer_class = UserAuthSerializer
    # permission_classes = [IsAuthenticated]



# class CsrfExemptSessionAuthentication(SessionAuthentication): 
#     def enforce_csrf(self, request):
#         return  # To not perform the csrf check previously happening


class PersonalInfoViewSet(viewsets.ModelViewSet):
    # authentication_classes = [CsrfExemptSessionAuthentication, BasicAuthentication]
    queryset = PersonalInfo.objects.all()
    serializer_class = PersonalInfoSerializer
    permission_classes = [IsAuthenticated]
    # lookup_field = "id"
    parser_classes = [parsers.FormParser, parsers.MultiPartParser]

