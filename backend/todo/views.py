from django.shortcuts import render
from rest_framework import viewsets
# Create your views here.
from . import serializers
from . import models


class TodoViewset(viewsets.ModelViewSet):
    queryset = models.Todo.objects.all()
    serializer_class = serializers.TodoSerializer
