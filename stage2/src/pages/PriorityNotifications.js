import { useState } from 'react'
import {
  Container, Box, Typography, TextField,
  Stack, Alert, Skeleton, Tabs, Tab, Badge,
} from '@mui/material'
import NotificationCard from '../components/NotificationCard'
import { useNotifications } from '../hooks/useNotifications'

const NOTIFICATION_TYPES = ['Event', 'Result', 'Placement']

export default function PriorityNotifications() {
  const [activeTab, setActiveTab] = useState(0)
  const [topN, setTopN] = useState(5)

  const notificationType = NOTIFICATION_TYPES[activeTab]

  const { notifications, loading, error, viewedIds } = useNotifications({
    page: 1,
    limit: topN,
    notification_type: notificationType,
  })

  const newCount = notifications.filter((n) => !viewedIds.has(n.ID || n.id || n._id)).length

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" fontWeight={800} gutterBottom>
          Priority Notifications
        </Typography>
        <Typography variant="body2" color="text.secondary">
          View top N notifications filtered by type
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', gap: 2, mb: 3, alignItems: 'center', flexWrap: 'wrap' }}>
        <Tabs
          value={activeTab}
          onChange={(_, val) => setActiveTab(val)}
          sx={{ flex: 1 }}
          variant="scrollable"
          scrollButtons="auto"
        >
          {NOTIFICATION_TYPES.map((type, i) => (
            <Tab
              key={type}
              label={
                i === activeTab
                  ? <Badge badgeContent={newCount} color="secondary">{type}</Badge>
                  : type
              }
            />
          ))}
        </Tabs>

        <TextField
          label="Top N"
          type="number"
          size="small"
          value={topN}
          onChange={(e) => setTopN(Math.max(1, parseInt(e.target.value) || 1))}
          inputProps={{ min: 1, max: 100 }}
          sx={{ width: 100 }}
        />
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }}>Failed to load: {error}</Alert>}

      <Stack spacing={2}>
        {loading
          ? Array.from({ length: topN }).map((_, i) => (
              <Skeleton key={i} variant="rounded" height={100} />
            ))
          : notifications.map((notification) => {
              const id = notification.ID || notification.id || notification._id
              return (
                <NotificationCard
                  key={id || Math.random()}
                  notification={notification}
                  isNew={!viewedIds.has(id)}
                />
              )
            })}
      </Stack>

      {!loading && notifications.length === 0 && !error && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary">
            No {notificationType} notifications found.
          </Typography>
        </Box>
      )}
    </Container>
  )
}