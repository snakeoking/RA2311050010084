import { Card, CardContent, Typography, Chip, Box, Tooltip } from '@mui/material'
import FiberNewIcon from '@mui/icons-material/FiberNew'
import EventIcon from '@mui/icons-material/Event'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import WorkIcon from '@mui/icons-material/Work'

const typeConfig = {
  Event: { color: 'info', icon: <EventIcon fontSize="small" /> },
  Result: { color: 'success', icon: <EmojiEventsIcon fontSize="small" /> },
  Placement: { color: 'warning', icon: <WorkIcon fontSize="small" /> },
}

export default function NotificationCard({ notification, isNew }) {
  const config = typeConfig[notification.Type] || { color: 'default', icon: null }

  return (
    <Card
      elevation={isNew ? 4 : 1}
      sx={{
        borderLeft: '4px solid',
        borderColor: isNew ? 'secondary.main' : 'transparent',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': { transform: 'translateY(-2px)', boxShadow: 6 },
        opacity: isNew ? 1 : 0.75,
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', flexWrap: 'wrap' }}>
            <Chip
              icon={config.icon}
              label={notification.Type}
              color={config.color}
              size="small"
            />
            {isNew && (
              <Tooltip title="New notification">
                <Chip icon={<FiberNewIcon />} label="New" color="secondary" size="small" />
              </Tooltip>
            )}
          </Box>
          <Typography variant="caption" color="text.secondary" sx={{ ml: 1, whiteSpace: 'nowrap' }}>
            {notification.Timestamp ? new Date(notification.Timestamp).toLocaleString() : ''}
          </Typography>
        </Box>

        <Typography variant="subtitle1" fontWeight={isNew ? 700 : 500} gutterBottom>
          {notification.Type || 'Notification'}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          {notification.Message || ''}
        </Typography>
      </CardContent>
    </Card>
  )
}