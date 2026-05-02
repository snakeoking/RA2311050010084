import { useState } from 'react'
import {
  Container, Box, Typography, Select, MenuItem,
  FormControl, InputLabel, Pagination, Stack,
  Alert, Skeleton,
} from '@mui/material'
import NotificationCard from '../components/NotificationCard'
import { useNotifications } from '../hooks/useNotifications'

const NOTIFICATION_TYPES = ['Event', 'Result', 'Placement']
const LIMIT_OPTIONS = [5, 10, 20, 50]

export default function AllNotifications() {
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [notificationType, setNotificationType] = useState('')

  const { notifications, loading, error, total, viewedIds } = useNotifications({
    page,
    limit,
    notification_type: notificationType,
  })

  const totalPages = Math.ceil(total / limit) || 1

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" fontWeight={800} gutterBottom>
          All Notifications
        </Typography>
        {!loading && (
          <Typography variant="body2" color="text.secondary">
            Showing {notifications.length} of {total} notifications
          </Typography>
        )}
      </Box>

      <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
        <FormControl size="small" sx={{ minWidth: 160 }}>
          <InputLabel>Type</InputLabel>
          <Select
            value={notificationType}
            label="Type"
            onChange={(e) => { setNotificationType(e.target.value); setPage(1) }}
          >
            <MenuItem value="">All Types</MenuItem>
            {NOTIFICATION_TYPES.map((t) => (
              <MenuItem key={t} value={t}>{t}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Per Page</InputLabel>
          <Select
            value={limit}
            label="Per Page"
            onChange={(e) => { setLimit(e.target.value); setPage(1) }}
          >
            {LIMIT_OPTIONS.map((l) => (
              <MenuItem key={l} value={l}>{l}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }}>Failed to load: {error}</Alert>}

      <Stack spacing={2}>
        {loading
          ? Array.from({ length: limit }).map((_, i) => (
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
          <Typography variant="h6" color="text.secondary">No notifications found.</Typography>
        </Box>
      )}

      {totalPages > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(_, val) => setPage(val)}
            color="primary"
            showFirstButton
            showLastButton
          />
        </Box>
      )}
    </Container>
  )
}
