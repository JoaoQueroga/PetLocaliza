from rest_framework import serializers
from . import models

class RegiaoSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Regiao
        fields = '__all__'

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Post
        fields = '__all__'

class PostListSerializer(serializers.ModelSerializer):
    usuario = serializers.CharField(source='usuario.nome', read_only=True)
    criado_em = serializers.DateTimeField(format="%d/%m/%Y %H:%M:%S", required=False)
    tipo = serializers.CharField(source='get_tipo_display', read_only=True)
    class Meta:
        model = models.Post
        fields = ['id', 'usuario', 'titulo', 'criado_em', 'texto', 'imagem', 'resolvido', 'tipo']

class ComentarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Comentario
        fields = '__all__'