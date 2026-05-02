import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material'
import NotificationsIcon from '@mui/icons-material/Notifications'
import StarIcon from '@mui/icons-material/Star'
import { useNavigate, useLocation } from 'react-router-dom'

export default function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <AppBar position="sticky" color="primary" elevation={2}>
      <Toolbar sx={{ gap: 2 }}>
        <NotificationsIcon />
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700, letterSpacing: 1 }}>
          NotifyHub
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            color="inherit"
            variant={location.pathname === '/' ? 'outlined' : 'text'}
            startIcon={<NotificationsIcon />}
            onClick={() => navigate('/')}
            sx={{ borderColor: 'rgba(255,255,255,0.6)' }}
          >
            All
          </Button>
          <Button
            color="inherit"
            variant={location.pathname === '/priority' ? 'outlined' : 'text'}
            startIcon={<StarIcon />}
            onClick={() => navigate('/priority')}
            sx={{ borderColor: 'rgba(255,255,255,0.6)' }}
          >
            Priority
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  )
}