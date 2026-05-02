const express = require('express');
const cors = require('cors');
const loggingMiddleware = require('./loggerMiddleware');

const app = express();
app.use(cors());
app.use(express.json());
app.use(loggingMiddleware);

// Mock unread notifications stream
const notificationsDB = [
  { ID: "d146095a", Type: "Result", Message: "mid-sem results", Timestamp: "2026-04-22 17:51:30" },
  { ID: "b283218f", Type: "Placement", Message: "CSX Corporation hiring", Timestamp: "2026-04-22 17:51:18" },
  { ID: "81589ada", Type: "Event", Message: "farewell party", Timestamp: "2026-04-22 17:51:06" },
  { ID: "0005513a", Type: "Result", Message: "final results", Timestamp: "2026-04-22 17:50:54" },
  { ID: "ea836726", Type: "Result", Message: "project-review", Timestamp: "2026-04-22 17:50:42" },
  { ID: "003cb427", Type: "Event", Message: "external seminar", Timestamp: "2026-04-22 17:50:30" },
  { ID: "e5c4ff20", Type: "Result", Message: "project-review", Timestamp: "2026-04-22 17:50:18" },
  { ID: "1cfce5ee", Type: "Event", Message: "tech-fest", Timestamp: "2026-04-22 17:50:06" },
  { ID: "cf2885a6", Type: "Result", Message: "project-review", Timestamp: "2026-04-22 17:49:54" },
  { ID: "8a7412bd", Type: "Placement", Message: "Advanced Micro Devices Inc. hiring", Timestamp: "2026-04-22 17:49:42" },
  { ID: "xyz12345", Type: "Placement", Message: "Google hiring", Timestamp: "2026-04-22 17:52:00" },
  { ID: "abc98765", Type: "Event", Message: "Orientation", Timestamp: "2026-04-22 17:48:00" }
];

// Helper to determine weight
function getWeight(type) {
  if (type === 'Placement') return 3;
  if (type === 'Result') return 2;
  if (type === 'Event') return 1;
  return 0;
}

// Stage 1 core logic to find top 10 notifications
function getTopPriorityNotifications(notifications, limit = 10) {
  return notifications.sort((a, b) => {
    const weightA = getWeight(a.Type);
    const weightB = getWeight(b.Type);

    // 1. Sort by weight descending
    if (weightA !== weightB) {
      return weightB - weightA;
    }

    // 2. Sort by recency descending (newer timestamp first)
    const timeA = new Date(a.Timestamp).getTime();
    const timeB = new Date(b.Timestamp).getTime();
    return timeB - timeA;
  }).slice(0, limit);
}

app.get('/api/priority-inbox', (req, res) => {
  res.locals.logger.info("Fetching priority inbox");
  
  const limit = parseInt(req.query.n) || 10;
  const topNotifications = getTopPriorityNotifications([...notificationsDB], limit);
  
  res.status(200).json({ notifications: topNotifications });
});

const PORT = 8080;
app.listen(PORT, () => {
  // Using global log instead of console.log
  if (!global.appLogs) global.appLogs = [];
  global.appLogs.push(`Server running on port ${PORT}`);
});
