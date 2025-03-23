# Image Aspect Ratio Analyzer

A simple web application to analyze and display the aspect ratio of uploaded images.

## Features

- Drag and drop image upload
- Displays image dimensions and aspect ratio
- Identifies common aspect ratio names (16:9, 4:3, etc.)
- Client-side processing (no server uploads)
- Responsive design

## Technology Stack

- React.js
- CSS3
- HTML5 File API

## Project Structure

```
/
├── public/            # Static files
├── src/
│   ├── components/    # UI components
│   │   ├── DropZone.js     # File drop area component
│   │   ├── ImageResult.js  # Results display component
│   │   └── Loader.js       # Loading indicator component
│   ├── constants/     # Application constants
│   │   └── messages.js     # UI text and error messages
│   ├── utils/         # Utility functions
│   │   └── aspectRatio.js  # Aspect ratio calculation utilities
│   ├── App.js         # Main application component
│   ├── App.css        # Main styles
│   └── index.js       # Entry point
└── package.json       # Dependencies and scripts
```

## Setup and Running

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm start
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Deployment

The application is configured for easy deployment to Cloudflare Pages:

```
npm run build
npm run pages:deploy
```

## Available Scripts

### `npm start`

Runs the app in the development mode.

### `npm test`

Launches the test runner in the interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.

### `npm run pages:dev`

Runs the Cloudflare Pages development server.

### `npm run pages:deploy`

Deploys the application to Cloudflare Pages.

## License

MIT