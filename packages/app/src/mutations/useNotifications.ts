import { useCallback, useState } from "react"
import type { AlertColor } from "@mui/material"

export interface Notification {
  id: string
  message: string
  type: AlertColor
}

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([])

  const addNotification = useCallback(
    (notification: Notification) => {
      setNotifications((notifications) => [...notifications, notification])
    },
    [setNotifications],
  )

  const removeNotification = useCallback(
    (id: string) => {
      setNotifications((notifications) =>
        notifications.filter((notification) => notification.id !== id),
      )
    },
    [setNotifications],
  )

  return {
    notifications,
    addNotification,
    removeNotification,
  }
}
