# SecretSmile

![Captura de Tela do SecretSmile](demo.png)

**SecretSmile** é um aplicativo web que permite ocultar mensagens secretas dentro de emojis usando caracteres de largura zero. Codifique seu texto em um emoji, copie para a área de transferência e compartilhe discretamente. Decodifique o emoji para revelar a mensagem oculta. Com uma interface escura e elegante inspirada em chatbots e um seletor de emojis estilo WhatsApp, é divertido e funcional, otimizado para dispositivos móveis e desktop.

## Funcionalidades

- **Codificar Texto em Emojis**: Oculte mensagens de texto dentro de um emoji escolhido usando caracteres de largura zero (`\u200B`, `\u200C`).
- **Seletor de Emojis Estilo WhatsApp**: Escolha entre 15 emojis (ex.: 🎩, 😎, 🌟) para codificação, com um design de grade responsivo.
- **Detecção Automática de Emoji para Decodificação**: Cole uma string de emoji, e o aplicativo usa o primeiro caractere como emoji portador — sem necessidade de seleção manual.
- **Suporte à Área de Transferência**: Copie a string de emoji codificada com um clique, com feedback visual (botão fica verde).
- **Compatibilidade entre Navegadores**: Funciona perfeitamente em Chrome, Firefox, Safari e Edge.
- **Sem Dependências Externas**: Totalmente independente (exceto pela fonte Open Sans opcional do Google Fonts).

## Demonstração

Baixe e Hospede localhost!

## Instalação

### Pré-requisitos
- Um servidor web (ex.: `http-server` do Node.js, servidor HTTP do Python ou qualquer serviço de hospedagem).
- Um navegador web moderno (Chrome, Firefox, Safari, Edge).

### Passos
1. **Clonar o Repositório**:
   ```bash
   git clone https://github.com/seu-usuario/secretsmile.git
   cd secretsmile
   ```

2. **Estrutura do Projeto**:
   ```
   secretsmile/
   ├── index.html
   ├── styles.css
   ├── script.js
   ```

3. **Executar Localmente**:
   - Use um servidor web local para funcionalidade de área de transferência (requer contexto seguro: `http://localhost` ou `https://`).
   - **Opção 1: Node.js com `http-server`**:
     ```bash
     npm install -g http-server
     http-server
     ```
     Acesse em `http://localhost:8080`.
   - **Opção 2: Servidor HTTP do Python**:
     ```bash
     python -m http.server 8000
     ```
     Acesse em `http://localhost:8000`.

4. **Hospedar em um Servidor Web**:
   - Faça upload da pasta `secretsmile` para o diretório público do seu servidor (ex.: `/public_html`).
   - Acesse via a URL do seu servidor (ex.: `https://seu-dominio.com/secretsmile`).

## Uso

1. **Codificação**:
   - Clique no campo “Escolha seu emoji” para selecionar um emoji (ex.: 🎩) no seletor.
   - Insira sua mensagem secreta no campo “Digite sua mensagem”.
   - Clique em “Codificar para Emoji” para gerar a string de emoji com o texto oculto.
   - O campo de resultado será focado e selecionado. Clique em “Copiar Resultado” para copiar para a área de transferência (o botão fica verde).

2. **Decodificação**:
   - Cole a string de emoji no campo “Resultado”.
   - Clique em “Decodificar do Emoji” para extrair a mensagem oculta, que aparecerá no campo de entrada, focado e selecionado.
   - O aplicativo usa automaticamente o primeiro caractere como o emoji portador.

## Detalhes Técnicos

- **Codificação**: Converte texto em binário usando `TextEncoder`, incorpora em caracteres de largura zero (`\u200B` para 0, `\u200C` para 1).
- **Decodificação**: Extrai binário de caracteres de largura zero e decodifica usando `TextDecoder`.
- **Área de Transferência**: Usa `navigator.clipboard` com fallback para `document.execCommand('copy')` em navegadores mais antigos.

## Contribuição

Contribuições são bem-vindas! Para contribuir:
1. Faça um fork do repositório.
2. Crie uma branch de recurso (`git checkout -b feature/seu-recurso`).
3. Faça commit das alterações (`git commit -m 'Adiciona seu recurso'`).
4. Envie para a branch (`git push origin feature/seu-recurso`).
5. Abra um Pull Request.

## Licença

Este projeto está licenciado sob a Licença MIT. Veja o arquivo [LICENSE](LICENSE) para detalhes.

## Agradecimentos

- Inspirado em esteganografia e interfaces modernas de chatbots.

---

Sinta-se à vontade para dar uma estrela no repositório se achá-lo útil!
