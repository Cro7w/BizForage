// Web Speech API for speech input
const speakBtn = document.getElementById('speakBtn');
const inputText = document.getElementById('inputText');
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = 'en-US';
recognition.interimResults = false;

speakBtn.addEventListener('click', () => {
    recognition.start();
});

recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    inputText.value = transcript;
};

recognition.onerror = (event) => {
    console.error('Speech error:', event.error);
    alert('Speech recognition failed. Please try again or type manually.');
};

// Get Started button
document.getElementById('getStartedBtn').addEventListener('click', () => {
    const inputSection = document.getElementById('inputSection');
    inputSection.style.display = 'block';
    inputSection.scrollIntoView({ behavior: 'smooth' });
});

// Generate button
document.getElementById('generateBtn').addEventListener('click', async () => {
    const prompt = inputText.value.trim();
    if (prompt.length < 5) {
        alert('Please enter a description of at least 5 characters.');
        return;
    }

    const selectedFeatures = {
        names: document.getElementById('namesCheck').checked,
        designSystem: document.getElementById('designCheck').checked,
        content: document.getElementById('contentCheck').checked,
        brandchat: document.getElementById('brandchatCheck').checked,
        logoSvg: document.getElementById('logoCheck').checked
    };

    if (!Object.values(selectedFeatures).some(v => v)) {
        alert('Please select at least one feature to generate.');
        return;
    }

    // Show loading
    const loading = document.getElementById('loading');
    loading.style.display = 'block';
    document.getElementById('generateBtn').disabled = true;

    try {
        const response = await fetch('http://localhost:3002/generate-brand', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt })
        });

        if (!response.ok) throw new Error('Server error. Please try again.');

        const data = await response.json();
        if (data.error) throw new Error(data.error);

        // Hide loading
        loading.style.display = 'none';
        document.getElementById('generateBtn').disabled = false;

        const outputSection = document.getElementById('outputSection');
        outputSection.style.display = 'block';
        outputSection.scrollIntoView({ behavior: 'smooth' });

        const blocks = {
            names: 'namesBlock',
            designSystem: 'designBlock',
            content: 'contentBlock',
            brandchat: 'brandchatBlock',
            logoSvg: 'logoBlock'
        };

        Object.keys(selectedFeatures).forEach(feature => {
            const block = document.getElementById(blocks[feature]);
            if (selectedFeatures[feature]) {
                block.style.display = 'block';
                if (feature === 'names') document.getElementById('names').textContent = data.names;
                else if (feature === 'designSystem') document.getElementById('designSystem').textContent = data.designSystem;
                else if (feature === 'content') document.getElementById('content').textContent = data.content;
                else if (feature === 'brandchat') {
                    // For brandchat, just show the block; chat is interactive
                    // Optionally, you can set an initial message if needed
                }
                else if (feature === 'logoSvg') {
                    document.getElementById('logo').innerHTML = data.logoSvg;
                    document.getElementById('svgCode').value = data.logoSvg;
                }
            } else {
                block.style.display = 'none';
            }
        });

    } catch (error) {
        console.error('Error:', error);
        loading.style.display = 'none';
        document.getElementById('generateBtn').disabled = false;
        alert('Generation failed: ' + error.message + '. Check your connection and try again.');
    }
});

// Download SVG
document.getElementById('downloadBtn').addEventListener('click', () => {
    const svgCode = document.getElementById('svgCode').value;
    if (!svgCode) {
        alert('No SVG to download. Generate a logo first.');
        return;
    }
    const blob = new Blob([svgCode], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'brand-logo.svg';
    a.click();
    URL.revokeObjectURL(url);
});

// Send chat message (new functionality for interactive brandchat)
document.getElementById('sendChatBtn').addEventListener('click', async () => {
    const chatInput = document.getElementById('chatInput');
    const message = chatInput.value.trim();
    if (!message) return;

    const prompt = inputText.value.trim(); // Use the original prompt for context
    const chatContainer = document.getElementById('chatContainer');

    // Add user message
    const userDiv = document.createElement('div');
    userDiv.className = 'chat-message user-message';
    userDiv.textContent = `You: ${message}`;
    chatContainer.appendChild(userDiv);

    chatInput.value = '';

    // Get bot response
    try {
        const response = await fetch('http://localhost:3002/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt, message })
        });
        const data = await response.json();
        const botDiv = document.createElement('div');
        botDiv.className = 'chat-message bot-message';
        botDiv.textContent = `Bot: ${data.response}`;
        chatContainer.appendChild(botDiv);
        chatContainer.scrollTop = chatContainer.scrollHeight; // Auto-scroll to bottom
    } catch (error) {
        console.error('Chat error:', error);
        const errorDiv = document.createElement('div');
        errorDiv.className = 'chat-message bot-message';
        errorDiv.textContent = 'Bot: Sorry, something went wrong. Try again.';
        chatContainer.appendChild(errorDiv);
    }
});