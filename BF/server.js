const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
const port = 3002;

app.use(express.json());

// 5 Mock data sets for fallback (rotates based on prompt) with improved SVG logos
const mockDataSets = [
    {
        names: 'EcoTech, GreenStart, PlanetApp',
        designSystem: 'Font: Arial; Colors: Green and Blue; Style: Modern and Clean',
        content: 'A startup focused on eco-friendly tech solutions for sustainable living.',
        brandchat: 'Hello! How can I help with your sustainability needs? Sample: "We offer green apps for daily use."',
        logoSvg: '<svg width="100" height="100" viewBox="0 0 100 100"><defs><linearGradient id="ecoGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#4CAF50;stop-opacity:1" /><stop offset="100%" style="stop-color:#81C784;stop-opacity:1" /></linearGradient></defs><circle cx="50" cy="50" r="40" fill="url(#ecoGrad)"/><text x="50" y="55" text-anchor="middle" fill="white" font-family="Arial" font-size="14" font-weight="bold">Eco</text></svg>'
    },
    {
        names: 'TechNova, InnoWave, FutureLink',
        designSystem: 'Font: Helvetica; Colors: Blue and Silver; Style: Sleek and Futuristic',
        content: 'An innovative tech company building the next generation of digital tools.',
        brandchat: 'Hi! What tech solutions are you looking for? Sample: "Explore our AI-powered apps."',
        logoSvg: '<svg width="100" height="100" viewBox="0 0 100 100"><defs><linearGradient id="techGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#2196F3;stop-opacity:1" /><stop offset="100%" style="stop-color:#90CAF9;stop-opacity:1" /></linearGradient></defs><rect x="10" y="10" width="80" height="80" rx="10" fill="url(#techGrad)"/><text x="50" y="60" text-anchor="middle" fill="white" font-family="Helvetica" font-size="14" font-weight="bold">Tech</text></svg>'
    },
    {
        names: 'FitLife, HealthHub, VitalBoost',
        designSystem: 'Font: Roboto; Colors: Orange and White; Style: Energetic and Friendly',
        content: 'A health and fitness app promoting wellness through personalized plans.',
        brandchat: 'Welcome! Ready to boost your health? Sample: "Track your fitness goals with us."',
        logoSvg: '<svg width="100" height="100" viewBox="0 0 100 100"><defs><linearGradient id="fitGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#FF9800;stop-opacity:1" /><stop offset="100%" style="stop-color:#FFB74D;stop-opacity:1" /></linearGradient></defs><ellipse cx="50" cy="50" rx="40" ry="30" fill="url(#fitGrad)"/><text x="50" y="55" text-anchor="middle" fill="white" font-family="Roboto" font-size="14" font-weight="bold">Fit</text></svg>'
    },
    {
        names: 'FoodieDelight, TasteQuest, YumHub',
        designSystem: 'Font: Comic Sans; Colors: Red and Yellow; Style: Fun and Playful',
        content: 'A culinary app connecting food lovers with recipes and restaurants.',
        brandchat: 'Hey there! Craving something delicious? Sample: "Find recipes for every taste."',
        logoSvg: '<svg width="100" height="100" viewBox="0 0 100 100"><defs><linearGradient id="foodGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#F44336;stop-opacity:1" /><stop offset="100%" style="stop-color:#EF5350;stop-opacity:1" /></linearGradient></defs><polygon points="50,10 85,85 15,85" fill="url(#foodGrad)"/><text x="50" y="75" text-anchor="middle" fill="#FFEB3B" font-family="Comic Sans MS" font-size="14" font-weight="bold">Yum</text></svg>'
    },
    {
        names: 'TravelEase, Wanderlust, GlobeTrek',
        designSystem: 'Font: Georgia; Colors: Purple and Gold; Style: Adventurous and Elegant',
        content: 'Your ultimate travel companion for planning dream vacations.',
        brandchat: 'Hello adventurer! Where to next? Sample: "Discover hidden gems worldwide."',
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

// Q&A arrays for each theme (at least 20 per theme)
const ecoQA = [
    { keywords: ['product', 'offer', 'what'], answer: 'We offer solar panels and biodegradable bags to help the planet!' },
    { keywords: ['discount', 'deal'], answer: 'Yes, 10% off for first-time buyers. Sign up for our newsletter!' },
    { keywords: ['support', 'contact'], answer: 'Email us at support@ecotech.com or chat here anytime.' },
    { keywords: ['thanks'], answer: 'You\'re welcome! Let\'s make the world greener together.' },
    { keywords: ['sustainability', 'green'], answer: 'We focus on sustainable tech to reduce carbon footprints.' },
    { keywords: ['environment', 'planet'], answer: 'Our products are designed to protect the environment.' },
    { keywords: ['solar', 'panels'], answer: 'Our solar panels are efficient and eco-friendly.' },
    { keywords: ['bags', 'biodegradable'], answer: 'Our bags decompose naturally, no plastic harm.' },
    { keywords: ['recycle', 'reuse'], answer: 'We promote recycling and reusable products.' },
    { keywords: ['energy', 'renewable'], answer: 'We use renewable energy in our operations.' },
    { keywords: ['carbon', 'footprint'], answer: 'Our goal is to minimize carbon footprints globally.' },
    { keywords: ['eco-friendly', 'sustainable'], answer: 'All our products are 100% eco-friendly.' },
    { keywords: ['help', 'planet'], answer: 'Join us in helping the planet with every purchase.' },
    { keywords: ['mission', 'goal'], answer: 'Our mission is a greener future for all.' },
    { keywords: ['impact', 'change'], answer: 'We aim to make a positive environmental impact.' },
    { keywords: ['buy', 'purchase'], answer: 'Buy now and contribute to sustainability!' },
    { keywords: ['features', 'benefits'], answer: 'Benefits include durability and eco-friendliness.' },
    { keywords: ['pricing', 'cost'], answer: 'Affordable prices with eco-benefits.' },
    { keywords: ['shipping', 'delivery'], answer: 'Eco-friendly shipping options available.' },
    { keywords: ['warranty', 'guarantee'], answer: '1-year warranty on all products.' }
];

const techQA = [
    { keywords: ['solution', 'what'], answer: 'We build AI-powered apps and digital tools for businesses.' },
    { keywords: ['start', 'demo'], answer: 'Sign up for a free trial or schedule a demo on our site.' },
    { keywords: ['industry'], answer: 'We serve retail, finance, and more. What industry are you in?' },
    { keywords: ['thanks'], answer: 'Anytime! Innovate with us.' },
    { keywords: ['ai', 'artificial'], answer: 'Our AI automates tasks and predicts trends.' },
    { keywords: ['apps', 'tools'], answer: 'Digital tools for efficiency and growth.' },
    { keywords: ['business', 'enterprise'], answer: 'Tailored for businesses of all sizes.' },
    { keywords: ['automation', 'task'], answer: 'Automate repetitive tasks with our AI.' },
    { keywords: ['predict', 'trend'], answer: 'Predict market trends with data insights.' },
    { keywords: ['free', 'trial'], answer: 'Free trial available for 30 days.' },
    { keywords: ['demo', 'schedule'], answer: 'Schedule a demo to see it in action.' },
    { keywords: ['retail', 'finance'], answer: 'Optimized for retail and finance sectors.' },
    { keywords: ['innovate', 'future'], answer: 'Innovate your business with our tech.' },
    { keywords: ['support', 'help'], answer: '24/7 support for all users.' },
    { keywords: ['pricing', 'cost'], answer: 'Flexible pricing plans available.' },
    { keywords: ['features', 'benefits'], answer: 'Features include AI chatbots and analytics.' },
    { keywords: ['security', 'safe'], answer: 'Enterprise-grade security for your data.' },
    { keywords: ['integration', 'connect'], answer: 'Easy integration with existing systems.' },
    { keywords: ['custom', 'tailor'], answer: 'Custom solutions for your needs.' },
    { keywords: ['update', 'new'], answer: 'Regular updates with new features.' }
];

const healthQA = [
    { keywords: ['plan', 'help'], answer: 'We offer personalized workout plans and nutrition tracking.' },
    { keywords: ['free'], answer: 'Try our free tier with basic features. Upgrade for premium!' },
    { keywords: ['track', 'nutrition'], answer: 'Log meals and get calorie counts. We suggest healthy recipes too!' },
    { keywords: ['fun'], answer: 'It is! Invite friends for group challenges.' },
    { keywords: ['workout', 'exercise'], answer: 'Personalized workouts for all levels.' },
    { keywords: ['health', 'wellness'], answer: 'Promote wellness with our app.' },
    { keywords: ['diet', 'food'], answer: 'Nutrition tracking for better diets.' },
    { keywords: ['goal', 'achieve'], answer: 'Set and achieve your fitness goals.' },
    { keywords: ['challenge', 'group'], answer: 'Join group challenges for motivation.' },
    { keywords: ['premium', 'upgrade'], answer: 'Premium features include advanced tracking.' },
    { keywords: ['recipe', 'healthy'], answer: 'Healthy recipes to complement your plan.' },
    { keywords: ['progress', 'monitor'], answer: 'Monitor your progress daily.' },
    { keywords: ['coach', 'trainer'], answer: 'Virtual coaches for guidance.' },
    { keywords: ['community', 'social'], answer: 'Connect with a fitness community.' },
    { keywords: ['app', 'mobile'], answer: 'Mobile app for on-the-go tracking.' },
    { keywords: ['weight', 'loss'], answer: 'Tools for weight loss and gain.' },
    { keywords: ['strength', 'build'], answer: 'Build strength with our plans.' },
    { keywords: ['yoga', 'meditation'], answer: 'Yoga and meditation sessions included.' },
    { keywords: ['calorie', 'count'], answer: 'Accurate calorie counting.' },
    { keywords: ['motivation', 'inspire'], answer: 'Stay motivated with daily tips.' }
];

const foodQA = [
    { keywords: ['recipe', 'what'], answer: 'We have thousands of recipes from simple to gourmet. What cuisine?' },
    { keywords: ['italian'], answer: 'Try our pasta primavera—fresh veggies and herbs!' },
    { keywords: ['restaurant', 'find'], answer: 'Search for nearby spots with reviews. Bon appétit!' },
    { keywords: ['vegetarian'], answer: 'Tons! Filter by diet in the app.' },
    { keywords: ['cuisine', 'type'], answer: 'From Italian to Asian, we have it all.' },
    { keywords: ['gourmet', 'fancy'], answer: 'Gourmet recipes for special occasions.' },
    { keywords: ['simple', 'easy'], answer: 'Simple recipes for busy days.' },
    { keywords: ['review', 'rating'], answer: 'User reviews for restaurants.' },
    { keywords: ['diet', 'filter'], answer: 'Filter by vegetarian, vegan, etc.' },
    { keywords: ['ingredient', 'list'], answer: 'Detailed ingredient lists provided.' },
    { keywords: ['cooking', 'time'], answer: 'Cooking times and difficulty levels.' },
    { keywords: ['share', 'friend'], answer: 'Share recipes with friends.' },
    { keywords: ['bookmark', 'save'], answer: 'Bookmark your favorites.' },
    { keywords: ['video', 'tutorial'], answer: 'Video tutorials for each recipe.' },
    { keywords: ['nutrition', 'info'], answer: 'Nutritional info per recipe.' },
    { keywords: ['seasonal', 'fresh'], answer: 'Seasonal recipes with fresh ingredients.' },
    { keywords: ['bake', 'dessert'], answer: 'Baking and dessert recipes.' },
    { keywords: ['grill', 'bbq'], answer: 'Grilling recipes for summer.' },
    { keywords: ['international', 'world'], answer: 'Recipes from around the world.' },
    { keywords: ['custom', 'create'], answer: 'Create and share your own recipes.' }
];

const travelQA = [
    { keywords: ['plan', 'what'], answer: 'We help plan trips with itineraries, bookings, and tips.' },
    { keywords: ['europe'], answer: 'Check our Paris guide—Eiffel Tower, Louvre, and hidden cafes.' },
    { keywords: ['deal', 'discount'], answer: '15% off group bookings. Explore the world!' },
    { keywords: ['tip', 'safety'], answer: 'We provide travel alerts and health info.' },
    { keywords: ['itinerary', 'schedule'], answer: 'Custom itineraries for your trip.' },
    { keywords: ['booking', 'reserve'], answer: 'Book flights, hotels, and tours.' },
    { keywords: ['hidden', 'gem'], answer: 'Discover hidden gems worldwide.' },
    { keywords: ['group', 'family'], answer: 'Group discounts for families.' },
    { keywords: ['alert', 'update'], answer: 'Real-time travel alerts.' },
    { keywords: ['health', 'info'], answer: 'Health and safety tips.' },
    { keywords: ['destination', 'place'], answer: 'Guides for popular destinations.' },
    { keywords: ['budget', 'cheap'], answer: 'Budget-friendly travel options.' },
    { keywords: ['luxury', 'premium'], answer: 'Luxury travel packages.' },
    { keywords: ['adventure', 'explore'], answer: 'Adventure trips and activities.' },
    { keywords: ['culture', 'local'], answer: 'Learn about local cultures.' },
    { keywords: ['photo', 'guide'], answer: 'Photography guides for travelers.' },
    { keywords: ['weather', 'forecast'], answer: 'Weather forecasts for planning.' },
    { keywords: ['visa', 'requirement'], answer: 'Visa and entry requirements.' },
    { keywords: ['transport', 'get'], answer: 'Transportation options and tips.' },
    { keywords: ['experience', 'unique'], answer: 'Unique experiences to try.' }
];

// Function to generate chat response based on prompt keywords and user message
function generateChatResponse(prompt, message) {
    const lowerPrompt = prompt.toLowerCase();
    const lowerMessage = message.toLowerCase();
    let qaArray = [];

    if (lowerPrompt.includes('eco') || lowerPrompt.includes('green')) qaArray = ecoQA;
    else if (lowerPrompt.includes('tech') || lowerPrompt.includes('ai')) qaArray = techQA;
    else if (lowerPrompt.includes('health') || lowerPrompt.includes('fit')) qaArray = healthQA;
    else if (lowerPrompt.includes('food') || lowerPrompt.includes('recipe')) qaArray = foodQA;
    else if (lowerPrompt.includes('travel') || lowerPrompt.includes('wander')) qaArray = travelQA;

    for (const qa of qaArray) {
        if (qa.keywords.some(keyword => lowerMessage.includes(keyword))) {
            return qa.answer;
        }
    }

    return 'Sorry, I didn\'t understand that. Can you ask about our products or services?';
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
                inputs: `Generate brand names, design system, content, brandchat script, and SVG logo for: ${prompt}`,
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
            brandchat: sections[3] || 'No brandchat.',
            logoSvg: sections[4] || '<svg><text x="10" y="20">Logo</text></svg>'
        });
    } catch (error) {
        console.error('Hugging Face API failed, falling back to mock data:', error.message);
        // Always fall back to mock data if API fails
        const selectedData = getMockData(prompt);
        res.json(selectedData);
    }
});