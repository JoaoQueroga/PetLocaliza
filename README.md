# PetLocaliza

- Projeto de TCC, Desenvolvimento Web Full Stack PUCRS 2025
- Aluno: João da Silva Queroga

## Requisitos

- Node >= 16
- Python >= 3.8

# Iniciar o Backend

## Instalar pacotes de dev

```
sudo apt update

sudo apt install -y python3-venv build-essential python3-dev
```
## Configurando ambiente virtual

- Entre na pasta backend

```
cd backend
```

```
python3 -m venv env
source ./env/bin/activate
```

## Instalando dependência
```
pip install -r requirements.txt
```

## Migração de Banco de Dados
- Criando as migrações

Execute os comandos no ambiente do projeto

```
python manage.py makemigrations api

```
- Aplicando as migrações
```
python manage.py migrate
```

- Criando usuario admin
```
python manage.py createsuperuser
```

## Iniciar a aplicação de backend

```
python manage.py runserver 8080
```

# Iniciar o Frontend

- Em um segundo terminal entre na pasta frontend

```
cd frontend
```

- criar o arquivo .env

```
GENERATE_SOURCEMAP=false
FAST_REFRESH=true

VITE_API_URL="http://localhost:8080/api/v1"
```

- instalar as dependencias
```
npm i
```

- iniciar a aplicação
```
npm run dev
```