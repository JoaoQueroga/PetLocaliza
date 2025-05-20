from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'regiao', views.RegiaoViewSet, basename="Regiões")
router.register(r'post', views.PostViewSet, basename="Posts")
router.register(r'comentario', views.ComentarioViewSet, basename="Comentários")
router.register(r'mensagem-sistema', views.MensagemSistemaViewSet, basename="Mensagens do Sistema")

urlpatterns = [
    path('', include(router.urls)),

    path('criar-usuario/', views.CriarUsuario.as_view(), name='Cadastrar novo usuário'),
    path('login/', views.Login.as_view(), name='Login no sistema'),
]