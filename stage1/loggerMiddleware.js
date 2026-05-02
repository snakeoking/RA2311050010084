// Logging Middleware as requested in Pre-Test Setup constraints
function loggingMiddleware(req, res, next) {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${req.method} ${req.url} - IP: ${req.ip}`;
  
  // Storing logs in an array instead of console.log to adhere to restrictions
  if (!global.appLogs) {
    global.appLogs = [];
  }
  global.appLogs.push(logMessage);
  
  // Add a helper to response to allow structured logging throughout
  res.locals.logger = {
    info: (msg) => global.appLogs.push(`[${new Date().toISOString()}] INFO: ${msg}`),
    error: (msg) => global.appLogs.push(`[${new Date().toISOString()}] ERROR: ${msg}`)
  };

  next();
}

module.exports = loggingMiddleware;
