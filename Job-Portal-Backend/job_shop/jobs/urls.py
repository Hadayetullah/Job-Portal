from django.urls import path

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from rest_framework.urlpatterns import format_suffix_patterns
from rest_framework.routers import DefaultRouter
from jobs.views import (
    UserAuthViewSet,
    PersonalInfoViewSet,
    )

router = DefaultRouter()
# router.register(r"user", UserAuthViewSet)
router.register(r"userinfo", PersonalInfoViewSet, basename="userinfo")


urlpatterns = [
    path('user/', UserAuthViewSet.as_view(), name='user'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]

urlpatterns = format_suffix_patterns(urlpatterns)
urlpatterns = urlpatterns + router.urls
