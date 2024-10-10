# Aizen

# Aizen

Aizen is a simple web application that allows users to securely upload and manage images. The application also provides AI-powered image analysis using the ChatGPT API. Users can register, log in, and manage their images through an intuitive interface.

## Features

1. **User Authentication**: Sign up, log in, and log out securely.
2. **Image Upload**: Users can upload images to the server.
3. **Image Management**: Users can view, delete, and manage their uploaded images.
4. **AI Image Analysis**: Optionally analyze images using the ChatGPT API to generate AI-generated descriptions for images.
5. **Protected Routes**: Ensures routes are protected for authenticated users.

## Technology Stack

-   **Frontend**: React (with TypeScript) and Vite.
-   **Styling**: TailwindCSS.
-   **State Management**: Redux Toolkit.
-   **Backend API (Mocked)**: The backend interactions, including authentication and image management, are mocked using setTimeout and mock data.

## Project Structure

-   **src/components**: Reusable UI components.
-   **src/pages**: Different pages of the application (Dashboard, Login, Signup, etc.).
-   **src/redux**: Redux state management files (authSlice, store).

## Installation

1. **Clone the repository:**

    ```bash
    git clone github.com/f0rzaX/aizen-frontend
    cd aizen-frontend
    ```

2. **Set up environment variables:**

    - Create a `.env` file in the root directory.
    - Add the following line to the `.env` file:
        ```env
        VITE_REACT_APP_BASE_URL=<BACKEND_API_URL>
        ```
    - This variable is used to configure the base URL for your API requests.

3. **Install dependencies:**

    ```bash
    npm install
    ```

4. **Start the development server:**

    ```bash
    npm run dev
    ```

5. **Open the application in your browser:**
    - Navigate to http://localhost:3000 in your web browser.

## Scripts

-   `npm run dev`: Starts the development server.
-   `npm run build`: Builds the application for production.
-   `npm run lint`: Lints the codebase using ESLint.
-   `npm run preview`: Preview the built application.

## Usage

1. **Authentication**

    - Signup: Create an account via the signup page.
    - Login: Log in with valid credentials.

2. **Image Management**
    - Upload Image: Upload images through the upload page.
    - View Images: View uploaded images on the dashboard.
    - Delete Image: Delete unwanted images directly from the dashboard.
    - AI Analysis: Click "AI Analysis" to generate AI-powered descriptions for the uploaded images.

## Folder Structure

The project follows a simple, component-based folder structure. The key folders are:

-   **src/components**: Reusable UI components.
-   **src/pages**: Different pages of the application (Dashboard, Login, Signup, etc.).
-   **src/redux**: Redux state management files (authSlice, store).
