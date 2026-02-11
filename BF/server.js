const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
const port = 3002;

app.use(express.json());

// 5 Expanded mock data sets with more names, different logos, varied design systems, and expanded content
const mockDataSets = [
    {
        names: 'EcoTech, GreenStart, PlanetApp, SustainaBrand, EarthPulse, PurePlanet Ventures, EcoWave, GreenHorizon, PlanetGuard, EcoNest',
        designSystem: 'Font: Arial; Colors: Green (#4CAF50) and Blue (#2196F3); Style: Modern and Clean; Icons: Leaf motifs; Layout: Minimalist grid',
        content: 'A startup focused on eco-friendly tech solutions for sustainable living. We offer innovative products like solar panels, biodegradable bags, and renewable energy tools to help reduce carbon footprints and promote environmental awareness. Join us in making the planet greener one step at a time.',
        logoSvg: '<svg width="100" height="100" viewBox="0 0 100 100"><defs><linearGradient id="ecoGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#4CAF50;stop-opacity:1" /><stop offset="100%" style="stop-color:#81C784;stop-opacity:1" /></linearGradient></defs><circle cx="50" cy="50" r="40" fill="url(#ecoGrad)"/><text x="50" y="55" text-anchor="middle" fill="white" font-family="Arial" font-size="14" font-weight="bold">Eco</text></svg>'
    },
    {
        names: 'TechNova, InnoWave, FutureLink, CodeSphere, ByteBoost, InnovateHub, TechPulse, FutureForge, CodeCrest, ByteBridge',
        designSystem: 'Font: Helvetica; Colors: Blue (#2196F3) and Silver (#B0BEC5); Style: Sleek and Futuristic; Icons: Circuit patterns; Layout: Asymmetrical with bold accents',
        content: 'An innovative tech company building the next generation of digital tools. Our AI-powered apps automate tasks, predict trends, and enhance business efficiency. From retail analytics to finance automation, we tailor solutions for enterprises of all sizes to drive growth and innovation.',
        logoSvg: '<svg width="100" height="100" viewBox="0 0 100 100"><defs><linearGradient id="techGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#2196F3;stop-opacity:1" /><stop offset="100%" style="stop-color:#90CAF9;stop-opacity:1" /></linearGradient></defs><rect x="10" y="10" width="80" height="80" rx="10" fill="url(#techGrad)"/><text x="50" y="60" text-anchor="middle" fill="white" font-family="Helvetica" font-size="14" font-weight="bold">Tech</text></svg>'
    },
    {
        names: 'FitLife, HealthHub, VitalBoost, WellnessWave, FitForge, HealthPulse, VitalVista, FitNest, WellnessBridge, VitalCore',
        designSystem: 'Font: Roboto; Colors: Orange (#FF9800) and White (#FFFFFF); Style: Energetic and Friendly; Icons: Heart and dumbbell motifs; Layout: Rounded corners with vibrant highlights',
        content: 'A health and fitness app promoting wellness through personalized plans. Track workouts, monitor nutrition, and achieve goals with our community-driven platform. From beginner routines to advanced challenges, we provide virtual coaches, healthy recipes, and daily motivation to boost your vitality.',
        logoSvg: '<svg width="100" height="100" viewBox="0 0 100 100"><defs><linearGradient id="fitGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#FF9800;stop-opacity:1" /><stop offset="100%" style="stop-color:#FFB74D;stop-opacity:1" /></linearGradient></defs><ellipse cx="50" cy="50" rx="40" ry="30" fill="url(#fitGrad)"/><text x="50" y="55" text-anchor="middle" fill="white" font-family="Roboto" font-size="14" font-weight="bold">Fit</text></svg>'
    },
    {
        names: 'FoodieDelight, TasteQuest, YumHub, FlavorForge, RecipeRealm, YumVista, TasteNest, FlavorPulse, RecipeHub, YumCore',
        designSystem: 'Font: Comic Sans; Colors: Red (#F44336) and Yellow (#FFEB3B); Style: Fun and Playful; Icons: Utensil and food motifs; Layout: Whimsical with curved elements',
        content: 'A culinary app connecting food lovers with recipes and restaurants. Discover thousands of recipes from simple meals to gourmet dishes, filter by diet, and find nearby eateries with reviews. Share creations, bookmark favorites, and explore international cuisines for an unforgettable taste adventure.',
        logoSvg: '<svg width="100" height="100" viewBox="0 0 100 100"><defs><linearGradient id="foodGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#F44336;stop-opacity:1" /><stop offset="100%" style="stop-color:#EF5350;stop-opacity:1" /></linearGradient></defs><polygon points="50,10 85,85 15,85" fill="url(#foodGrad)"/><text x="50" y="75" text-anchor="middle" fill="#FFEB3B" font-family="Comic Sans MS" font-size="14" font-weight="bold">Yum</text></svg>'
    },
    {
        names: 'TravelEase, Wanderlust, GlobeTrek, JourneyForge, WanderVista, GlobeNest, JourneyPulse, WanderCore, GlobeHub, JourneyRealm',
        designSystem: 'Font: Georgia; Colors: Purple (#9C27B0) and Gold (#FFD700); Style: Adventurous and Elegant; Icons: Compass and map motifs; Layout: Ornate with layered textures',
        content: 'Your ultimate travel companion for planning dream vacations. Customize itineraries, book flights and hotels, and get insider tips on destinations. From budget adventures to luxury escapes, explore hidden gems, cultural experiences, and real-time alerts for safe, unforgettable journeys.',
        logoSvg: '<svg width="100" height="100" viewBox="0 0 100 100"><defs><linearGradient id="travelGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#9C27B0;stop-opacity:1" /><stop offset="100%" style="stop-color:#BA68C8;stop-opacity:1" /></linearGradient></defs><circle cx="50" cy="50" r="40" fill="url(#travelGrad)"/><text x="50" y="55" text-anchor="middle" fill="#FFD700" font-family="Georgia" font-size="14" font-weight="bold">Wander</text></svg>'
    }
];

// Function to select mock data based on prompt
function getMockData(prompt) {
    const lowerPrompt = prompt.toLowerCase();
    if (lowerPrompt.includes('eco') || lowerPrompt.includes('green')) return mockDataSets[0];
    if (lowerPrompt.includes('tech') || lowerPrompt.includes('ai')) return mockDataSets[1];
    if (lowerPrompt.includes('health') || lowerPrompt.includes('fit')) return mockDataSets[2];
    if (lowerPrompt.includes('food') || lowerPrompt.includes('recipe')) return mockDataSets[3];
    if (lowerPrompt.includes('travel') || lowerPrompt.includes('wander')) return mockDataSets[4];
    // Fallback: Use prompt length to rotate
    return mockDataSets[prompt.length % 5];
}

app.post('/generate-brand', async (req, res) => {
    const { prompt } = req.body;
    console.log('Received prompt:', prompt);
    if (!prompt) return res.status(400).json({ error: 'Prompt is required' });

    try {
        console.log('Calling Hugging Face API...');  // API call for demonstration
        const response = await fetch('https://router.huggingface.co/hf-inference/models/gpt2', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer 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`,  // Replace with your key (optional for fallback)
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                inputs: `Generate brand names, design system, content, and SVG logo for: ${prompt}`,
                parameters: { max_new_tokens: 500, temperature: 0.7 }
            })
        });
        const data = await response.json();
        console.log('Hugging Face response:', data);

        if (data.error || !data[0]?.generated_text) {
            throw new Error(data.error || 'No valid response from API');
        }

        const generatedText = data[0].generated_text;
        // Parse the response into sections
        const sections = generatedText.split('\n\n');
        res.json({
            names: sections[0] || 'No names generated.',
            designSystem: sections[1] || 'No design system.',
            content: sections[2] || 'No content.',
            logoSvg: sections[3] || '<svg><text x="10" y="20">Logo</text></svg>'
        });
    } catch (error) {
        console.error('Hugging Face API failed, falling back to mock data:', error.message);
        // Always fall back to mock data if API fails
        const selectedData = getMockData(prompt);
        res.json(selectedData);
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});