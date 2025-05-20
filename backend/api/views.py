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

class MensagemSistemaViewSet(viewsets.ModelViewSet):
    queryset = models.MensagemSistema.objects.filter(ativo=True).order_by('?')[:4]
    serializer_class = serializers.MensagemSistemaSerializer

def get_token_acesso(usuario):
    refresh = RefreshToken.for_user(usuario.user)
    access_token = refresh.access_token
    access_token['id'] = usuario.id
    access_token['nome'] = usuario.nome
    access_token['regiao'] = usuario.regiao.id
    access_token['regiao_nome'] = usuario.regiao.nome
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
    def get_serializer_class(self):
        if self.action == 'list':
            return serializers.PostListSerializer
        elif self.action == 'retrieve':
            return serializers.PostListSerializer
        return serializers.PostSerializer
    
    def get_queryset(self):
        p_user = self.request.query_params.get('user', None)
        
        user = self.request.user
        usuario = None
        if hasattr(user, 'usuario'):
            usuario = user.usuario
        
        if p_user == 'true':
            ## retorna os posts do usuario
            if usuario:
                queryset = models.Post.objects.select_related('usuario').filter(ativo=True, usuario=usuario).order_by('-criado_em')
            else:
                queryset = []
        else:
            ## se tiver logado só retorna os da sua região
            if usuario:
                print(usuario.regiao)
                queryset = models.Post.objects.select_related('usuario').filter(ativo=True, usuario__regiao=usuario.regiao).order_by('-criado_em')
            else:
                queryset = models.Post.objects.select_related('usuario').filter(ativo=True).order_by('-criado_em')
        return queryset
    
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.delete()
        return Response({"message": "Objeto excluído"}, status=status.HTTP_204_NO_CONTENT)

class ComentarioViewSet(viewsets.ModelViewSet):
    def get_serializer_class(self):
        if self.action == 'list':
            return serializers.ComentarioListSerializer
        return serializers.ComentarioSerializer

    def get_queryset(self):
        post = self.request.query_params.get('post', None)
        if post:
            queryset = models.Comentario.objects.select_related('post', 'usuario').filter(ativo=True, post=int(post)).order_by('-criado_em')
        else:
            queryset = models.Comentario.objects.select_related('post', 'usuario').filter(ativo=True, post=int(post)).order_by('-criado_em')
        return queryset

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.delete()
        return Response({"message": "Objeto excluído"}, status=status.HTTP_204_NO_CONTENT)