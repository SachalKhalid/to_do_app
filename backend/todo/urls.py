
from . import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register('todo', views.TodoViewset, basename='todo')

urlpatterns = [

]

urlpatterns += router.urls
