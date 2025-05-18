from rest_framework import viewsets, permissions, status
from . import models, serializers
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate, login

class RegiaoViewSet(viewsets.ModelViewSet):
    queryset = models.Regiao.objects.all()
    serializer_class = serializers.RegiaoSerializer

def get_token_acesso(usuario):
    refresh = RefreshToken.for_user(usuario.user)
    access_token = refresh.access_token
    access_token['id'] = usuario.id
    access_token['nome'] = usuario.nome
    access_token['regiao'] = usuario.regiao.id
    access_token['email'] = usuario.user.username
                
    return str(access_token)

class CriarUsuario(APIView):
    # permission_classes = [permissions.IsAuthenticated]
    def post(self, request, format=None):
        try:
            p_email = request.data.get("email")
            p_senha = request.data.get("senha")
            p_nome = request.data.get("nome")
            p_regiao = request.data.get("regiao")

            if User.objects.filter(username=p_email).exists():
                return Response({"message": "Já existe um usuário com este e-mail"}, status=status.HTTP_400_BAD_REQUEST)

            regiao = models.Regiao.objects.get(id=int(p_regiao))

            user = User.objects.create_user(username=p_email, password=p_senha)
            usuario = models.Usuario.objects.create(user=user, nome=p_nome, regiao=regiao)

            token = get_token_acesso(usuario=usuario)
            return Response( {"message": usuario.nome, "token": token} , status=status.HTTP_200_OK)
        except Exception as erro:
            return Response({"message": str(erro)}, status=status.HTTP_400_BAD_REQUEST)

class Login(APIView):
    def post(self, request, format=None):
        try:
            username = request.data.get("email")
            password = request.data.get("senha")
            user = authenticate(username=username, password=password)
            
            if user is not None:
                usuario = models.Usuario.objects.get(user=user)
                token = get_token_acesso(usuario=usuario)
                return Response( {"message": usuario.nome, "token": token} , status=status.HTTP_200_OK)
            else:
                return Response({"message": "Credenciais inválidas"}, status=400)
        except Exception as erro:
            return Response({"message": str(erro)}, status=status.HTTP_400_BAD_REQUEST)

class PostViewSet(viewsets.ModelViewSet):
    queryset = models.Post.objects.select_related('usuario').filter(ativo=True).order_by('-criado_em')
    def get_serializer_class(self):
        if self.action == 'list':
            return serializers.PostListSerializer
        return serializers.PostSerializer

class ComentarioViewSet(viewsets.ModelViewSet):
    queryset = models.Comentario.objects.filter(ativo=True).order_by('-criado_em')
    serializer_class = serializers.ComentarioSerializer