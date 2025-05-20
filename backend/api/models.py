from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.models import User

class Teste(models.Model):
    nome = models.CharField(max_length=100)
    descricao = models.TextField(blank=True)
    criado_em = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.nome

class Regiao(models.Model):
    nome = models.CharField(max_length=100)
    def __str__(self):
        return self.nome
    class Meta:
        verbose_name = "Região"
        verbose_name_plural = "Regiões"

class Usuario(models.Model):
    nome = models.CharField(max_length=200, null=True, blank=True)
    regiao = models.ForeignKey(Regiao, null=True, blank=True, on_delete=models.PROTECT)
    ativo = models.BooleanField(default=True)
    criado_em = models.DateTimeField(auto_now_add=True, null=True)

    user = models.OneToOneField(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.nome

    def delete(self, *args, **kwargs):
        self.ativo = False
        self.save()

class Post(models.Model):
    tipos = (
        (1, "Desaparecido"),
        (2, "Encontrado"),
        (3, "Doação"),
        (4, "Adoção"),
        (5, "Servirços")
    )
    tipo = models.PositiveSmallIntegerField(choices=tipos)
    usuario = models.ForeignKey(Usuario, on_delete=models.PROTECT)
    titulo = models.CharField(max_length=200, null=True, blank=True)
    texto = models.TextField(null=True, blank=True)
    imagem = models.ImageField(upload_to='posts/', null=True, blank=True)
    resolvido = models.BooleanField(default=False)

    curtidas = models.PositiveSmallIntegerField(default=0)
    denuncias = models.PositiveSmallIntegerField(default=0)
    
    criado_em = models.DateTimeField(auto_now_add=True, null=True)
    ativo = models.BooleanField(default=True)

    def __str__(self):
        return f'{str(self.criado_em)} Post {str(self.id)}'

    def delete(self, *args, **kwargs):
        self.ativo = False
        self.save()

class Comentario(models.Model):
    post = models.ForeignKey(Post, on_delete=models.PROTECT)
    usuario = models.ForeignKey(Usuario, on_delete=models.PROTECT, null=True, blank=True)
    texto = models.TextField(null=True, blank=True)
    imagem = models.ImageField(upload_to='posts/', null=True, blank=True)

    curtidas = models.PositiveSmallIntegerField(default=0)
    denuncias = models.PositiveSmallIntegerField(default=0)
    
    criado_em = models.DateTimeField(auto_now_add=True, null=True)
    ativo = models.BooleanField(default=True)

    def __str__(self):
        return f'{str(self.criado_em)} Comentario {str(self.id)}'

    def delete(self, *args, **kwargs):
        self.ativo = False
        self.save()

class MensagemSistema(models.Model):
    texto = models.TextField()
    ativo = models.BooleanField(default=True)
    def __str__(self):
        return self.texto
    class Meta:
        verbose_name = "Mensagem do Sistema"
        verbose_name_plural = "Mensagens do Sistema"
    def delete(self, *args, **kwargs):
        self.ativo = False
        self.save()