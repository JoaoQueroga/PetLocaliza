from django.contrib import admin
from . import models

admin.site.register(models.Usuario)
admin.site.register(models.Regiao)
admin.site.register(models.Post)
admin.site.register(models.Comentario)