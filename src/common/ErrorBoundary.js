class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error on the console.
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Incase of getting error, show this UI.
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}
