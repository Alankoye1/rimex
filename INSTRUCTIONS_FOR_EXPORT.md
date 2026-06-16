# Flutter Export Instructions

To use this app in VS Code or Android Studio as a Flutter app:

1. **Install Flutter**: Make sure you have the Flutter SDK installed.
2. **Project Structure**: Use the files provided in the `/lib` folder.
3. **Dependencies**: Add these to your `pubspec.yaml`:
   ```yaml
   dependencies:
     flutter:
       sdk: flutter
     google_generative_ai: ^0.4.0
     lucide_icons: ^0.7.0
     flutter_markdown: ^0.7.0
     flutter_animate: ^4.5.0
     provider: ^6.1.2
     google_fonts: ^6.2.1
   ```
4. **API Key**: When running the app, pass your Gemini API key from AI Studio:
   ```bash
   flutter run --dart-define=GEMINI_API_KEY=YOUR_ACTUAL_API_KEY
   ```

# Web (React) Export Instructions

To use the Web app in VS Code:

1. **Install Node.js**.
2. **Setup Environment**:
   - Copy `.env.example` to `.env`.
   - Paste your Gemini API key: `GEMINI_API_KEY=your_key_here`.
3. **Install Dependencies**: `npm install`.
4. **Run**: `npm run dev`.
   - The app now uses a secure backend proxy (`server.ts`) to hide your API key.
