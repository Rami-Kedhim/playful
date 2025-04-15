
import { useEffect, useState } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { toast } from '@/hooks/use-toast'

interface VerificationNotification {
  id: string
  title: string
  message: string
  status: string
  read: boolean
  created_at: string
}

export const useVerificationNotifications = () => {
  const [notifications, setNotifications] = useState<VerificationNotification[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const { data, error } = await supabase
          .from('verification_notifications')
          .select('*')
          .order('created_at', { ascending: false })

        if (error) throw error
        setNotifications(data)
      } catch (error: any) {
        console.error('Error fetching notifications:', error)
        toast({
          title: "Error",
          description: "Failed to load notifications",
          variant: "destructive"
        })
      } finally {
        setLoading(false)
      }
    }

    fetchNotifications()

    // Subscribe to real-time notifications
    const subscription = supabase
      .channel('verification-notifications')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'verification_notifications'
        },
        (payload) => {
          setNotifications(prev => [payload.new as VerificationNotification, ...prev])
          toast({
            title: payload.new.title,
            description: payload.new.message,
          })
        }
      )
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const markAsRead = async (notificationId: string) => {
    try {
      const { error } = await supabase
        .from('verification_notifications')
        .update({ read: true })
        .eq('id', notificationId)

      if (error) throw error

      setNotifications(prev =>
        prev.map(n =>
          n.id === notificationId ? { ...n, read: true } : n
        )
      )
    } catch (error) {
      console.error('Error marking notification as read:', error)
    }
  }

  return {
    notifications,
    loading,
    markAsRead
  }
}
