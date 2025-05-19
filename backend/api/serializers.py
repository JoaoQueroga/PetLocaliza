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
    criado_em = serializers.DateTimeField(format="%d/%m/%Y %H:%M", required=False)
    tipo = serializers.CharField(source='get_tipo_display', read_only=True)
    qtd_comentarios = serializers.SerializerMethodField()
    class Meta:
        model = models.Post
        fields = ['id', 'usuario', 'titulo', 'criado_em', 'texto', 'imagem', 'resolvido', 'tipo', 'qtd_comentarios']

    def get_qtd_comentarios(self, obj):
        return  models.Comentario.objects.select_related('post', 'usuario').filter(ativo=True, post=obj).count()

class ComentarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Comentario
        fields = '__all__'

class ComentarioListSerializer(serializers.ModelSerializer):
    usuario = serializers.CharField(source='usuario.nome', read_only=True)
    criado_em = serializers.DateTimeField(format="%d/%m/%Y %H:%M", required=False)
    class Meta:
        model = models.Comentario
        fields = ['id', 'usuario', 'texto', 'criado_em']