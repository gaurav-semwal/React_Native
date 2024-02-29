class Logger {
    devMode = __DEV__;
  
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    log(...args:any[]) {
      if (this.devMode) {
        // eslint-disable-next-line no-console
        console.log(...args);
      }
    }
  
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    warn(...args: any[]) {
      if (this.devMode) {
        // eslint-disable-next-line no-console
        console.warn(...args);
      }
    }
  }
  
  export default new Logger();
  