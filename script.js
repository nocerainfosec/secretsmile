// Zero-width characters for binary encoding
const ZERO_WIDTH = {
    '0': '\u200B', // zero-width space
    '1': '\u200C'  // zero-width non-joiner
};

// DOM elements
const emojiInput = document.getElementById('emojiInput');
const emojiList = document.getElementById('emojiList');
const inputText = document.getElementById('inputText');
const outputText = document.getElementById('outputText');
const logDiv = document.getElementById('log');
const encodeBtn = document.getElementById('encodeBtn');
const decodeBtn = document.getElementById('decodeBtn');
const copyBtn = document.getElementById('copyBtn');
const loader = document.getElementById('loader');
const historyList = document.getElementById('historyList');

// Message history
let history = [];

// Emoji validation regex
const emojiRegex = /\p{Emoji_Presentation}|\p{Emoji}\uFE0F/u;

function validateEmoji(emoji) {
    return emojiRegex.test(emoji) && Array.from(emoji).length === 1;
}

// Emoji picker toggle
emojiInput.addEventListener('click', () => {
    emojiList.classList.toggle('show');
});

// Close picker when clicking outside
document.addEventListener('click', (e) => {
    const emojiPicker = document.querySelector('.emoji-picker');
    if (!emojiPicker.contains(e.target) && !emojiList.contains(e.target)) {
        emojiList.classList.remove('show');
    }
});

function selectEmoji(emoji) {
    emojiInput.value = emoji;
    emojiList.classList.remove('show');
}

function updateHistory(type, text) {
    history.push({ type, text, timestamp: new Date().toLocaleString('pt-BR') });
    if (history.length > 5) history.shift();
    historyList.innerHTML = history.map(item => `<li><strong>${item.type}</strong> (${item.timestamp}): ${item.text}</li>`).join('');
}

function showLoader(show) {
    loader.style.display = show ? 'block' : 'none';
    encodeBtn.disabled = show;
    decodeBtn.disabled = show;
}

function encodeText() {
    logDiv.innerHTML = '';
    const text = inputText.value.trim();
    const emoji = emojiInput.value.trim();

    if (!text) {
        logDiv.textContent = 'Erro: Digite um texto para codificar.';
        return;
    }

    if (!emoji || !validateEmoji(emoji)) {
        logDiv.textContent = 'Erro: Selecione um único emoji válido.';
        return;
    }

    showLoader(true);
    setTimeout(() => {
        try {
            const encoder = new TextEncoder();
            const data = encoder.encode(text);
            let binaryString = '';
            for (let byte of data) {
                binaryString += byte.toString(2).padStart(8, '0');
            }

            let hiddenSequence = '';
            for (let bit of binaryString) {
                hiddenSequence += ZERO_WIDTH[bit];
            }

            const result = emoji + hiddenSequence;
            outputText.value = result;
            outputText.focus();
            outputText.select();
            logDiv.textContent = 'Texto codificado com sucesso! Resultado selecionado.';
            logDiv.classList.add('success');
            updateHistory('Codificado', text);
        } catch (error) {
            logDiv.textContent = `Erro durante a codificação: ${error.message}`;
            logDiv.classList.remove('success');
        } finally {
            showLoader(false);
        }
    }, 500);
}

function decodeText() {
    logDiv.innerHTML = '';
    const emojiString = outputText.value.trim();

    if (!emojiString) {
        logDiv.textContent = 'Erro: Cole um emoji com dados ocultos para decodificar.';
        return;
    }

    showLoader(true);
    setTimeout(() => {
        try {
            const codePoints = Array.from(emojiString);
            if (codePoints.length < 1) {
                logDiv.textContent = 'Erro: String de emoji inválida.';
                return;
            }

            const emoji = codePoints[0];
            if (!validateEmoji(emoji)) {
                logDiv.textContent = 'Erro: O primeiro caractere deve ser um emoji válido.';
                return;
            }

            const hiddenSequence = codePoints.slice(1).join('');
            if (!hiddenSequence.includes('\u200B') && !hiddenSequence.includes('\u200C')) {
                logDiv.textContent = 'Erro: Nenhum dado oculto encontrado no emoji.';
                return;
            }

            let binaryString = '';
            for (let char of hiddenSequence) {
                if (char === ZERO_WIDTH['0']) {
                    binaryString += '0';
                } else if (char === ZERO_WIDTH['1']) {
                    binaryString += '1';
                }
            }

            // Ensure binary string length is a multiple of 8
            while (binaryString.length % 8 !== 0) {
                binaryString += '0';
            }

            const byteArray = [];
            for (let i = 0; i < binaryString.length; i += 8) {
                const byteString = binaryString.substring(i, i + 8);
                byteArray.push(parseInt(byteString, 2));
            }

            const decoder = new TextDecoder('utf-8', { fatal: true });
            const result = decoder.decode(new Uint8Array(byteArray));
            inputText.value = result;
            inputText.focus();
            inputText.select();
            logDiv.textContent = 'Texto decodificado com sucesso!';
            logDiv.classList.add('success');
            updateHistory('Decodificado', result);
        } catch (error) {
            logDiv.textContent = `Erro durante a decodificação: ${error.message}`;
            logDiv.classList.remove('success');
        } finally {
            showLoader(false);
        }
    }, 500);
}

function copyToClipboard() {
    const text = outputText.value;
    if (!text) {
        logDiv.textContent = 'Erro: Nada para copiar.';
        return;
    }

    // Modern clipboard API
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text)
            .then(() => {
                copyBtn.textContent = 'Copiado!';
                copyBtn.classList.add('copied');
                setTimeout(() => {
                    copyBtn.textContent = 'Copiar Resultado';
                    copyBtn.classList.remove('copied');
                }, 2000);
                logDiv.textContent = 'Resultado copiado para a área de transferência!';
                logDiv.classList.add('success');
            })
            .catch(err => {
                logDiv.textContent = `Erro ao copiar: ${err.message}`;
                logDiv.classList.remove('success');
            });
    } else {
        // Fallback for older browsers
        outputText.select();
        try {
            const successful = document.execCommand('copy');
            if (successful) {
                copyBtn.textContent = 'Copiado!';
                copyBtn.classList.add('copied');
                setTimeout(() => {
                    copyBtn.textContent = 'Copiar Resultado';
                    copyBtn.classList.remove('copied');
                }, 2000);
                logDiv.textContent = 'Resultado copiado para a área de transferência!';
                logDiv.classList.add('success');
            } else {
                logDiv.textContent = 'Erro: Falha ao copiar. Por favor, copie manualmente.';
                logDiv.classList.remove('success');
            }
        } catch (err) {
            logDiv.textContent = `Erro ao copiar: ${err.message}`;
            logDiv.classList.remove('success');
        }
    }
}

