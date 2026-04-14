export interface Rule {
  patterns: string[];
  responses: string[];
}

export const chatbotRules: Record<string, Rule> = {
  // ============ BASIC INTERACTIONS ============
  greetings: {
    patterns: [
      "hi",
      "hello",
      "hey",
      "good morning",
      "good afternoon",
      "good evening",
      "vanakkam",
      "namaste",
      "hola",
      "greetings",
      "what's up",
      "howdy",
      "sup",
      "yo",
    ],
    responses: [
      "Hello! How can I help you today?",
      "Hi there! What brings you here?",
      "Hey! Nice to see you. How can I assist?",
      "Greetings! How may I help you today?",
      "Welcome! I'm here to assist you. What would you like to know?",
    ],
  },

  farewell: {
    patterns: [
      "bye",
      "goodbye",
      "see you",
      "take care",
      "see ya",
      "bye bye",
      "later",
      "catch you later",
    ],
    responses: [
      "Goodbye! Have a great day!",
      "See you later! Come back anytime.",
      "Take care! Bye!",
      "It was nice talking to you. Goodbye!",
      "Until next time! Feel free to reach out whenever you need assistance.",
    ],
  },

  thanks: {
    patterns: [
      "thanks",
      "thank you",
      "thx",
      "appreciate it",
      "much appreciated",
      "grateful",
    ],
    responses: [
      "You're welcome!",
      "Happy to help!",
      "Anytime! Let me know if you need anything else.",
      "My pleasure! That's what I'm here for.",
      "Glad I could assist you!",
    ],
  },

  // ============ HELP & SUPPORT ============
  help: {
    patterns: [
      "help",
      "what can you do",
      "commands",
      "how to use",
      "help me",
      "capabilities",
      "features",
      "functionality",
      "guide",
      "tutorial",
    ],
    responses: [
      "I can help you with:\n• Answering your questions\n• Providing information about this app\n• Guiding you through features\n• And more! Just ask me anything.",

      "Here's what I can do for you:\n Answer your questions\n Help you navigate the app\n Explain features and permissions\n Guide you through profile settings\n Chat with you! Just type anything.",

      "Need help? I got you covered! \n Answer questions about the app\n Assist with account management\n Explain user roles & permissions\n Help you use the chatbot\n Have friendly conversations",

      "I'm your virtual assistant! Try asking me:\n• 'What is this app?'\n• 'How to edit my profile?'\n• 'What are my roles?'\n• 'Tell me about permissions'",
    ],
  },

  // ============ APP INFORMATION ============
  about: {
    patterns: [
      "about",
      "what is this",
      "features",
      "tell me about yourself",
      "who are you",
      "what can you do",
      "application info",
      "platform",
      "about this app",
      "tell me about this app",
    ],
    responses: [
      "I'm a chatbot built with React and Node.js! I can answer questions, help you navigate the app, and have conversations with you. Feel free to ask me anything!",

      "I'm your AI assistant powered by React & Node.js! My job is to help you:\n• Navigate through this application\n• Answer your questions\n• Explain features & permissions\n• Manage your account\n• And chat with you! Just say hi!",

      "Hi! I'm ConvoCore Assistant \nI'm built with modern tech stack (React + Node.js, MySQL, Redis). You can ask me about:\n App features & navigation\n User roles & permissions\n Profile management\n General questions\n Or just have a friendly chat!",

      "This is a full-stack Role-Based Access Control (RBAC) application. I'm here to help you understand and navigate the system efficiently.",
    ],
  },

  // ============ USER ACCOUNT & PROFILE ============
  userInfo: {
    patterns: [
      "who am i",
      "my profile",
      "my roles",
      "my email",
      "my name",
      "my account",
      "my details",
      "account info",
      "profile info",
      "what is my role",
      "show my profile",
    ],
    responses: [
      "You can view and edit your profile by clicking on your avatar in the top right corner. There you'll find your name, email, and roles.",

      "To access your profile:\n1. Click on your avatar in the top-right corner\n2. Select 'Profile' from the dropdown\n3. View your name, email, roles, and account info\n4. Click 'Edit Profile' to update your details",

      "Your profile info is just a click away! \nLook at the top-right corner → Click your avatar → Choose 'Profile'\nThere you can see:\n Your name\n Your email address\n Your assigned roles\n And edit your information!",

      "You are currently logged in. Your profile contains your personal information and role assignments. Only admins can modify roles.",
    ],
  },

  // ============ ADMIN & PERMISSIONS ============
  permissions: {
    patterns: [
      "permissions",
      "what permissions",
      "my permissions",
      "access rights",
      "what can i access",
      "role permissions",
      "admin access",
    ],
    responses: [
      "Permissions control what actions you can perform. Different roles have different permissions. Admins can manage users, roles, and permissions.",

      "Your permissions depend on your assigned roles:\n• Admin: Full system access\n• Manager: User management access\n• User: Basic access to profile and chat\nContact your admin to modify permissions.",

      "Permissions follow the pattern 'action:resource' (e.g., 'create:user', 'view:role'). You inherit permissions from all your assigned roles.",
    ],
  },

  // ============ TECHNICAL QUESTIONS ============
  technology: {
    patterns: [
      "tech stack",
      "technology",
      "built with",
      "framework",
      "database",
      "backend",
      "frontend",
      "how it works",
      "architecture",
    ],
    responses: [
      "This app is built with:\n Frontend: React 19 + Redux Toolkit + TailwindCSS\n Backend: Node.js + Express + TypeScript\n Database: MySQL + Sequelize ORM\n Cache: Redis\n Auth: JWT with refresh tokens",

      "We use modern web technologies! React for UI, Node.js for API, MySQL for data persistence, and Redis for caching. The architecture follows MVC pattern.",

      "The tech stack includes React for the frontend, Node.js/Express for the backend, MySQL for database, and Redis for caching permissions. All secured with JWT authentication.",
    ],
  },

  // ============ SECURITY & BEST PRACTICES ============
  security: {
    patterns: [
      "security",
      "is it secure",
      "safe",
      "protected",
      "authentication",
      "authorization",
      "jwt",
      "token",
      "login security",
    ],
    responses: [
      "Security is a priority! We use:\n• JWT tokens for authentication\n• HTTP-only cookies for refresh tokens\n• Role-Based Access Control (RBAC)\n• Password hashing with bcrypt\n• Input validation with Zod",

      "Your data is protected! We implement industry-standard security practices including token-based auth, password encryption, and role-based permissions.",

      "The app uses secure authentication with refresh token rotation. Passwords are never stored in plain text - they're hashed using bcrypt.",
    ],
  },

  // ============ ERROR HANDLING ============
  error: {
    patterns: [
      "error",
      "bug",
      "not working",
      "issue",
      "problem",
      "something wrong",
      "failed",
      "crash",
      "not responding",
    ],
    responses: [
      "I'm sorry you're experiencing an issue. Could you please provide more details? I'll do my best to help or connect you with support.",

      "If something isn't working as expected, try refreshing the page. If the problem persists, please contact your system administrator.",

      "Errors can happen. Make sure you're logged in properly and have the necessary permissions. Check your network connection and try again.",
    ],
  },

  // ============ FEATURE REQUESTS ============
  featureRequest: {
    patterns: [
      "feature request",
      "suggestion",
      "improvement",
      "add feature",
      "would be nice",
      "missing feature",
    ],
    responses: [
      "Great suggestion! Feature requests are valuable for improving the platform. Please share your idea with your administrator.",

      "I appreciate your feedback! What feature would you like to see? I'll note it down for future improvements.",

      "Thank you for your suggestion! User feedback helps us make the platform better. Feel free to share more details.",
    ],
  },

  // ============ COMPLIMENT ============
  compliment: {
    patterns: [
      "good bot",
      "nice",
      "awesome",
      "great",
      "amazing",
      "fantastic",
      "you're good",
      "well done",
      "excellent",
    ],
    responses: [
      "Thank you! I'm glad I could help!",
      "You're too kind! I'm here to assist you anytime.",
      "Thanks for the compliment! Let me know if you need anything else.",
      "I appreciate that! It makes my job worthwhile.",
    ],
  },

  // ============ JOKES & FUN ============
  joke: {
    patterns: ["joke", "tell me a joke", "funny", "make me laugh", "humor"],
    responses: [
      "Why do programmers prefer dark mode? Because light attracts bugs!",
      "What's a computer's favorite beat? An algorithm! 🎵",
      "Why was the JavaScript developer sad? Because he didn't Node how to Express himself!",
      "What do you call a fake noodle? An impasta!",
    ],
  },

  // ============ DAILY GREETINGS ============
  timeBased: {
    patterns: ["good morning", "good afternoon", "good evening", "good night"],
    responses: [
      "Good morning! Ready to tackle the day?",
      "Good afternoon! How's your day going?",
      "Good evening! Hope you had a productive day!",
      "Good night! Rest well and see you tomorrow!",
    ],
  },

  // ============ WEATHER (Generic) ============
  weather: {
    patterns: ["weather", "temperature", "rain", "sunny", "cloudy", "forecast"],
    responses: [
      "I wish I could check the weather for you! Currently, I'm focused on app-related questions. Try checking a weather service!",

      "Weather updates aren't in my capabilities yet. I specialize in helping you with this application. Is there something app-related I can help with?",
    ],
  },

  // ============ SMALL TALK ============
  smallTalk: {
    patterns: [
      "what's up",
      "how's it going",
      "what's happening",
      "how are things",
    ],
    responses: [
      "Not much! Just here waiting to help you. What's up with you?",
      "All systems operational and ready to assist! How can I help?",
      "Everything's running smoothly! What brings you here today?",
    ],
  },

  // ============ HOW ARE YOU ============
  howAreYou: {
    patterns: ["how are you", "how do you do", "you doing", "how's it going"],
    responses: [
      "I'm doing great, thanks for asking! How can I help you today?",
      "I'm functioning perfectly! What can I do for you?",
      "All systems operational! Ready to assist you. What do you need?",
      "I'm excellent! Thanks for checking in. How can I help?",
    ],
  },

  // ============ NAME ============
  whatIsYourName: {
    patterns: ["what is your name", "your name", "who are you", "called"],
    responses: [
      "I'm your friendly AI assistant! You can call me ConvoCore Assistant ",
      "I'm the ConvoCore ChatBot, here to help you navigate and use this platform!",
      "You can call me CC Assistant! I'm your virtual guide for this application.",
    ],
  },

  // ============ CAPABILITIES ============
  capabilities: {
    patterns: ["can you", "are you able", "possible", "capable"],
    responses: [
      "I can help with app navigation, answer questions about features, explain permissions, and guide you through profile management. What do you need?",

      "I'm capable of answering questions about this application, helping with user account issues, and providing information about roles and permissions.",

      "Ask me anything about the app! I can explain features, help with profile settings, or just have a friendly chat.",
    ],
  },
};

export const defaultResponses: string[] = [
  "I'm not sure I understand. Can you rephrase that?",
  "Interesting question! I'm still learning. Ask me something else?",
  "I didn't get that. Try asking about help, greetings, or about this app.",
  "Hmm, I'm not sure about that. Could you ask in a different way?",
  "I'm here to help with app-related questions. Try asking about features, permissions, or profile settings!",
  "That's a great question! Let me think... Could you rephrase it for me?",
];
