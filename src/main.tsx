import React from 'react';
import { createRoot } from "react-dom/client";
import { DatabaseAuthProvider } from "@database-dev/auth/react";
import { DatabaseReactClient } from "database/react";
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

const databaseUrl = import.meta.env.VITE_DATABASE_URL as string | undefined;
let AppWithProviders = <App />;

if (databaseUrl) {
  try {
    const databaseClient = new DatabaseReactClient(databaseUrl);
    AppWithProviders = (
      <DatabaseAuthProvider client={databaseClient}>
        <App />
      </DatabaseAuthProvider>
    );
  } catch (error) {
    console.error('Failed to initialize Database:', error);
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
