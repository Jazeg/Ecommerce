# cifrar.py
from cryptography.fernet import Fernet
from PIL import Image
import io

def cifrar_imagen(nombre_archivo, clave):
    # Abrir la imagen
    with Image.open(nombre_archivo) as img:
        # Convertir la imagen a bytes
        buffer = io.BytesIO()
        img.save(buffer, format="PNG")
        imagen_bytes = buffer.getvalue()

    # Crear un objeto Fernet con la clave
    fernet = Fernet(clave)

    # Cifrar los bytes de la imagen
    imagen_cifrada = fernet.encrypt(imagen_bytes)

    # Guardar la imagen cifrada
    with open(f"{nombre_archivo}.ez", "wb") as archivo:
        archivo.write(imagen_cifrada)

    print(f"Imagen cifrada guardada como {nombre_archivo}.ez")

# Generar una clave de cifrado
clave = Fernet.generate_key()

# Nombre del archivo de imagen
nombre_archivo = "gh2.png"

# Cifrar la imagen
cifrar_imagen(nombre_archivo, clave)

# Imprimir la clave (guárdala de forma segura)
print("Clave:", clave.decode())