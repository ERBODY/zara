import React from 'react';
import { createRoot } from "react-dom/client";
import { ConvexAuthProvider } from "@convex-dev/auth/react";
import { ConvexReactClient } from "convex/react";
import { StrictMode } from "react";
import "./index.css";
import App from "./App";

class ErrorBoundary extends React.Component<{children: React.ReactNode}, {hasError: boolean}> {
  constructor(props: {children: React.ReactNode}) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    console.error('Error caught by boundary:', error);
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error('Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '2rem', color: 'white', textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>
          <h1>Something went wrong</h1>
          <p>Please try refreshing the page or contact support if the issue persists.</p>
        </div>
      );
    }

    return this.props.children;
  }
}

const convexUrl = import.meta.env.VITE_CONVEX_URL as string | undefined;
let AppWithProviders = <App />;

if (convexUrl) {
  try {
    const convexClient = new ConvexReactClient(convexUrl);
    AppWithProviders = (
      <ConvexAuthProvider client={convexClient}>
        <App />
      </ConvexAuthProvider>
    );
  } catch (error) {
    console.error('Failed to initialize Convex:', error);
    AppWithProviders = <App />;
  }
}

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

const root = createRoot(rootElement);
root.render(
  <StrictMode>
    <ErrorBoundary>
      {AppWithProviders}
    </ErrorBoundary>
  </StrictMode>
);
