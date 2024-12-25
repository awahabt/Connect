// import PageFourOFour from "@/assets/PageFourOFour";
import React from "react";

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    // Update state to show the fallback UI
    console.debug(error); // can be used for logging
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log the error to an error reporting service
    console.error("Error caught by Error Boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Render any custom fallback UI
      return (
        <div className=" rounded-lg  flex flex-col items-center justify-center text-center">
          {/* <PageFourOFour /> */}
          <h1 className="text-5xl font-bold text-red-600">500</h1>
          <h2 className="mt-4 text-3xl font-semibold">
            Unexpected Error Occurred
          </h2>
          <p className="mt-3 text-gray-600 text-sm">
            Something went wrong. Please try again later.
          </p>
          <p className="mt-2 text-gray-600 text-sm">
            If the problem persists, contact support for assistance.
          </p>
          <a
            href="/"
            className="mt-6 inline-block px-6 py-3 text-base font-medium text-white bg-primary rounded transition duration-300"
          >
            Go to Home
          </a>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
