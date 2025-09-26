import os

# Limpa o terminal antes de iniciar
os.system('cls' if os.name == 'nt' else 'clear')

# Banner estilizado
print("""
╔══════════════════════════════════════════════╗
║   🕵️‍♂️  SEGREDOS EM EMOJIS, DESCOBERTOS!       ║
╚══════════════════════════════════════════════╝
 Exemplo: cole um emoji como "🎩​" que contenha
 caracteres invisíveis escondidos na mensagem.
""")

# Entrada do usuário
mensagem_oculta = input("\n Qual emoji você deseja decodificar? (cole aqui): ")

# Define os mapeamentos dos caracteres invisíveis (zero-width)
caracteres_invisiveis = {
    '\u200b': '0',  # Espaço de largura zero (Zero Width Space)
    '\u200c': '1',  # Não separador de largura zero (Zero Width Non-Joiner)
    '\u200d': '',   # Conector de largura zero (usado como separador, ignorar)
    '\ufeff': '',   # Espaço sem quebra de largura zero (ignorar)
}

# Extrai e converte os caracteres invisíveis em uma string binária
string_binaria = ''.join(caracteres_invisiveis.get(char, '') for char in mensagem_oculta if char in caracteres_invisiveis)

# Verifica se há algo para decodificar
if not string_binaria:
    print("\n Nada foi encontrado 😕...")
else:
    # Divide a string binária em blocos de 8 bits
    blocos_bytes = [string_binaria[i:i+8] for i in range(0, len(string_binaria), 8)]

    # Converte cada byte em um caractere
    caracteres_decodificados = [chr(int(byte, 2)) for byte in blocos_bytes if len(byte) == 8]

    # Junta os caracteres para formar a mensagem final
    mensagem_decodificada = ''.join(caracteres_decodificados)

    # Resultado final
    print("\n 💬 Mensagem decodificada:", mensagem_decodificada or "Nada foi encontrado 😕...")
