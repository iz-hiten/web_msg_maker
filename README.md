# AI Business Messenger

![AI Business Messenger Screenshot](https://storage.googleapis.com/aistudio-public/gallery/96b8c71b-7a35-4d04-9a4d-f2a8a8167f40/96b8c71b-7a35-4d04-9a4d-f2a8a8167f40.png)

An AI-powered web application designed to generate personalized, professional, and effective messages for business outreach. This tool helps users craft tailored communications for collaborations, sales, networking, and more, ensuring each message is niche, personal, and to the point.

## ✨ Features

- **Dynamic Message Generation**: Leverages the Gemini API to create unique messages based on user inputs.
- **Contact Discovery**: Uses Google Search grounding to suggest the most relevant job roles to contact within a target company and provides the sources for its suggestions.
- **Deep Customization**: Tailor messages by specifying:
    - Target Company
    - Your Role/Title
    - Motive (Collaboration, Sales, Job Inquiry, etc.)
    - Tone (Formal, Enthusiastic, Casual, etc.)
    - Key points to include
- **Multi-Platform Support**: Generates formatted messages suitable for different platforms like Email, LinkedIn, and Twitter, automatically creating subject lines for emails.
- **Sleek & Responsive UI**: A modern, dark-themed, and fully responsive interface built with React and Tailwind CSS for a seamless user experience on any device.
- **Easy to Use**: A simple, intuitive form allows you to get from idea to ready-to-send message in seconds.
- **Copy to Clipboard**: Easily copy the generated messages with a single click.

## 🚀 How It Works

1.  **Provide Context**: Fill in the form with details about who you are, which company you want to contact, and your objective.
2.  **Select Options**: Choose your motive, desired tone, and the platforms you want to send messages on.
3.  **Generate**: Click the "Generate Messages" button.
4.  **Review & Use**: The application first identifies key roles to contact within the company using Google Search. Then, it uses that context to generate tailored messages for each platform you selected. You can review the suggestions and copy your favorite messages directly.

## 🛠️ Tech Stack

- **Frontend**: [React](https://reactjs.org/) with [TypeScript](https://www.typescriptlang.org/)
- **AI Model**: [Google Gemini API](https://ai.google.dev/) (`@google/genai`)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Hosting**: Served statically, dependencies loaded via import maps.

## ⚙️ Getting Started

To run this project, you need a Google Gemini API key.

1.  **API Key**:
    - Obtain an API key from [Google AI Studio](https://aistudio.google.com/).
    - The application is configured to read this key from a `process.env.API_KEY` variable, which should be available in the deployment environment.

2.  **Running Locally**:
    - As this is a static project with no build step, you can serve the files using any simple local web server.
    - Make sure to set up the `API_KEY` environment variable in the context where your server is running.

## 📁 File Structure

```
.
├── components/          # Reusable React components
│   ├── icons/           # SVG icon components
│   ├── Header.tsx
│   ├── InputForm.tsx
│   ├── LoadingSpinner.tsx
│   ├── OptionSelector.tsx
│   └── ResultsDisplay.tsx
├── services/            # Modules for external services
│   └── geminiService.ts # Logic for interacting with the Gemini API
├── App.tsx              # Main application component
├── constants.ts         # Shared constant values for the app
├── index.html           # Main HTML entry point
├── index.tsx            # React application entry point
├── metadata.json        # Application metadata
├── README.md            # This file
└── types.ts             # TypeScript type definitions
```
