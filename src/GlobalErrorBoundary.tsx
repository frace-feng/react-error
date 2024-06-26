import React from "react";
 class ErrorBoundary extends React.Component {
  state = { error: false };
  static getDerivedStateFromError(error) {
    return { error };
  }
  componentDidCatch(error, errorInfo) {
    if (this.props.onError) {
      //上报日志通过父组件注入的函数进行执行
      this.props.onError(error, errorInfo.componentStack);
    }
  }
  render() {
    const { fallback, FallbackComponent, fallbackRender  } = this.props;
    const { error } = this.state;
    if (error) {
      const fallbackProps = { 
          error,
          resetErrorBoundary: this.resetErrorBoundary,
       };
      //判断是否为React Element
      if (React.isValidElement(fallback)) {
        return fallback;
      }
      if (typeof fallbackRender === "function"){
        return fallbackRender(fallbackProps);
      }
      //组件方式传入
      if (FallbackComponent) {
        return <FallbackComponent {...fallbackProps} />;
      }
      throw new Error("ErrorBoundary 组件需要传入兜底UI");
    }
    return this.props.children;
  }
  resetErrorBoundary =() =>{
      if (this.props.onReset) this.props.onReset();
      this.setState({ error: false });
  }

}

export default ErrorBoundary;