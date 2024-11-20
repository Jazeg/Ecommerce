
import sherlock

# Lista de posibles combinaciones de nombre de usuario
usernames = ["jessica_vasquez", "jessicavr02", "jessicavasquezrios"]
# Buscar cada nombre de usuario
for username in usernames:
    print(f"Buscando '{username}'...")
    sherlock(username, output=None)  # Se puede personalizar la salida
