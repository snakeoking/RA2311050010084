import { useState, useEffect, useCallback } from 'react'
import { logger } from '../utils/logger'

const API_BASE = '/evaluation-service/notifications'
const VIEWED_KEY = 'viewed_notification_ids'

function getViewedIds() {
  try {
    return new Set(JSON.parse(localStorage.getItem(VIEWED_KEY) || '[]'))
  } catch {
    return new Set()
  }
}

function markViewed(ids) {
  try {
    const existing = getViewedIds()
    ids.forEach((id) => existing.add(id))
    localStorage.setItem(VIEWED_KEY, JSON.stringify([...existing]))
  } catch {}
}

export function useNotifications({ page, limit, notification_type }) {
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [total, setTotal] = useState(0)
  const [viewedIds, setViewedIds] = useState(new Set())

  const fetchNotifications = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const query = new URLSearchParams()
      if (page) query.set('page', page)
      if (limit) query.set('limit', limit)
      if (notification_type) query.set('notification_type', notification_type)

      const res = await fetch(`${API_BASE}?${query.toString()}`)
      if (!res.ok) throw new Error(`API error: ${res.status}`)
      const data = await res.json()

      const items = Array.isArray(data) ? data : data.notifications || data.data || []
      const count = data.total || data.count || items.length

      const viewed = getViewedIds()
      setViewedIds(new Set(viewed))
      setNotifications(items)
      setTotal(count)

      logger.info('Fetched notifications successfully', { page, limit, notification_type, count });

      const ids = items.map((n) => n.ID || n.id || n._id).filter(Boolean)
      markViewed(ids)
    } catch (err) {
      setError(err.message)
      logger.error('Failed to fetch notifications', { error: err.message, page, limit, notification_type });
    } finally {
      setLoading(false)
    }
  }, [page, limit, notification_type])

  useEffect(() => {
    fetchNotifications()
  }, [fetchNotifications])

  return { notifications, loading, error, total, viewedIds }
}

const AUTH_TOKEN = ''