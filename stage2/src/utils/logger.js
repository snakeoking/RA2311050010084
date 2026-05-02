export const logger = {
  info: (message, meta = {}) => {
    // In a real app, this would send to an external service or save to localStorage
    // since console.log is prohibited in the assessment.
    const logData = { level: 'info', message, meta, timestamp: new Date().toISOString() };
    storeLog(logData);
  },
  error: (message, meta = {}) => {
    const logData = { level: 'error', message, meta, timestamp: new Date().toISOString() };
    storeLog(logData);
  },
  warn: (message, meta = {}) => {
    const logData = { level: 'warn', message, meta, timestamp: new Date().toISOString() };
    storeLog(logData);
  }
};

function storeLog(logData) {
  try {
    const existing = JSON.parse(localStorage.getItem('app_logs') || '[]');
    existing.push(logData);
    if (existing.length > 100) existing.shift(); // Keep last 100 logs
    localStorage.setItem('app_logs', JSON.stringify(existing));
  } catch (e) {
    // Fail silently to not break app execution if localStorage is full or disabled
  }
}
