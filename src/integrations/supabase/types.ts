export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      active_boosts: {
        Row: {
          boost_data: Json | null
          created_at: string | null
          end_time: string
          id: string
          package_id: string | null
          start_time: string | null
          status: string | null
          user_id: string | null
        }
        Insert: {
          boost_data?: Json | null
          created_at?: string | null
          end_time: string
          id?: string
          package_id?: string | null
          start_time?: string | null
          status?: string | null
          user_id?: string | null
        }
        Update: {
          boost_data?: Json | null
          created_at?: string | null
          end_time?: string
          id?: string
          package_id?: string | null
          start_time?: string | null
          status?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "active_boosts_package_id_fkey"
            columns: ["package_id"]
            isOneToOne: false
            referencedRelation: "boost_packages"
            referencedColumns: ["id"]
          },
        ]
      }
      ad_campaigns: {
        Row: {
          advertiser_id: string | null
          budget: number
          campaign_type: string
          created_at: string | null
          description: string | null
          end_date: string | null
          id: string
          spent: number
          start_date: string | null
          status: string
          target_audience: Json | null
          title: string
          updated_at: string | null
        }
        Insert: {
          advertiser_id?: string | null
          budget: number
          campaign_type: string
          created_at?: string | null
          description?: string | null
          end_date?: string | null
          id?: string
          spent?: number
          start_date?: string | null
          status?: string
          target_audience?: Json | null
          title: string
          updated_at?: string | null
        }
        Update: {
          advertiser_id?: string | null
          budget?: number
          campaign_type?: string
          created_at?: string | null
          description?: string | null
          end_date?: string | null
          id?: string
          spent?: number
          start_date?: string | null
          status?: string
          target_audience?: Json | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      ad_creatives: {
        Row: {
          call_to_action: string | null
          campaign_id: string | null
          created_at: string | null
          description: string | null
          id: string
          media_type: string
          media_url: string
          title: string | null
        }
        Insert: {
          call_to_action?: string | null
          campaign_id?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          media_type: string
          media_url: string
          title?: string | null
        }
        Update: {
          call_to_action?: string | null
          campaign_id?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          media_type?: string
          media_url?: string
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ad_creatives_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "ad_campaigns"
            referencedColumns: ["id"]
          },
        ]
      }
      ad_metrics: {
        Row: {
          ad_id: string | null
          clicks: number | null
          created_at: string | null
          date: string
          id: string
          impressions: number | null
        }
        Insert: {
          ad_id?: string | null
          clicks?: number | null
          created_at?: string | null
          date: string
          id?: string
          impressions?: number | null
        }
        Update: {
          ad_id?: string | null
          clicks?: number | null
          created_at?: string | null
          date?: string
          id?: string
          impressions?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "ad_metrics_ad_id_fkey"
            columns: ["ad_id"]
            isOneToOne: false
            referencedRelation: "business_ads"
            referencedColumns: ["id"]
          },
        ]
      }
      ad_placements: {
        Row: {
          bid_amount: number
          campaign_id: string | null
          clicks: number | null
          created_at: string | null
          id: string
          impressions: number | null
          placement_type: string
          position: Json | null
          updated_at: string | null
        }
        Insert: {
          bid_amount: number
          campaign_id?: string | null
          clicks?: number | null
          created_at?: string | null
          id?: string
          impressions?: number | null
          placement_type: string
          position?: Json | null
          updated_at?: string | null
        }
        Update: {
          bid_amount?: number
          campaign_id?: string | null
          clicks?: number | null
          created_at?: string | null
          id?: string
          impressions?: number | null
          placement_type?: string
          position?: Json | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ad_placements_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "ad_campaigns"
            referencedColumns: ["id"]
          },
        ]
      }
      admin_actions: {
        Row: {
          action_type: string
          admin_id: string | null
          created_at: string | null
          details: Json | null
          id: string
          target_id: string | null
          target_type: string
        }
        Insert: {
          action_type: string
          admin_id?: string | null
          created_at?: string | null
          details?: Json | null
          id?: string
          target_id?: string | null
          target_type: string
        }
        Update: {
          action_type?: string
          admin_id?: string | null
          created_at?: string | null
          details?: Json | null
          id?: string
          target_id?: string | null
          target_type?: string
        }
        Relationships: []
      }
      admin_activity_logs: {
        Row: {
          action_type: string
          admin_id: string | null
          created_at: string | null
          details: Json | null
          id: string
          ip_address: string | null
          target_id: string | null
          target_type: string | null
        }
        Insert: {
          action_type: string
          admin_id?: string | null
          created_at?: string | null
          details?: Json | null
          id?: string
          ip_address?: string | null
          target_id?: string | null
          target_type?: string | null
        }
        Update: {
          action_type?: string
          admin_id?: string | null
          created_at?: string | null
          details?: Json | null
          id?: string
          ip_address?: string | null
          target_id?: string | null
          target_type?: string | null
        }
        Relationships: []
      }
      admin_analytics: {
        Row: {
          created_at: string | null
          event_data: Json | null
          event_type: string
          id: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          event_data?: Json | null
          event_type: string
          id?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          event_data?: Json | null
          event_type?: string
          id?: string
          user_id?: string | null
        }
        Relationships: []
      }
      admin_audit_log: {
        Row: {
          action: string
          admin_id: string | null
          created_at: string | null
          details: Json | null
          id: string
        }
        Insert: {
          action: string
          admin_id?: string | null
          created_at?: string | null
          details?: Json | null
          id?: string
        }
        Update: {
          action?: string
          admin_id?: string | null
          created_at?: string | null
          details?: Json | null
          id?: string
        }
        Relationships: []
      }
      admin_audit_logs: {
        Row: {
          action_type: string
          admin_id: string | null
          created_at: string | null
          details: Json | null
          id: string
          ip_address: string | null
        }
        Insert: {
          action_type: string
          admin_id?: string | null
          created_at?: string | null
          details?: Json | null
          id?: string
          ip_address?: string | null
        }
        Update: {
          action_type?: string
          admin_id?: string | null
          created_at?: string | null
          details?: Json | null
          id?: string
          ip_address?: string | null
        }
        Relationships: []
      }
      admin_configurations: {
        Row: {
          category: string
          created_at: string | null
          created_by: string | null
          description: string | null
          id: string
          is_enabled: boolean | null
          key: string
          updated_at: string | null
          value: Json
        }
        Insert: {
          category: string
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          is_enabled?: boolean | null
          key: string
          updated_at?: string | null
          value?: Json
        }
        Update: {
          category?: string
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          is_enabled?: boolean | null
          key?: string
          updated_at?: string | null
          value?: Json
        }
        Relationships: []
      }
      admin_settings: {
        Row: {
          category: string
          description: string | null
          id: string
          key: string
          updated_at: string | null
          updated_by: string | null
          value: Json
        }
        Insert: {
          category: string
          description?: string | null
          id?: string
          key: string
          updated_at?: string | null
          updated_by?: string | null
          value: Json
        }
        Update: {
          category?: string
          description?: string | null
          id?: string
          key?: string
          updated_at?: string | null
          updated_by?: string | null
          value?: Json
        }
        Relationships: []
      }
      admin_statistics: {
        Row: {
          active_users: number | null
          created_at: string | null
          date: string
          id: string
          resolved_reports: number | null
          total_reports: number | null
          total_users: number | null
        }
        Insert: {
          active_users?: number | null
          created_at?: string | null
          date?: string
          id?: string
          resolved_reports?: number | null
          total_reports?: number | null
          total_users?: number | null
        }
        Update: {
          active_users?: number | null
          created_at?: string | null
          date?: string
          id?: string
          resolved_reports?: number | null
          total_reports?: number | null
          total_users?: number | null
        }
        Relationships: []
      }
      api_keys: {
        Row: {
          created_at: string | null
          expires_at: string | null
          id: string
          key_hash: string
          last_used_at: string | null
          name: string
          permissions: Json | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          expires_at?: string | null
          id?: string
          key_hash: string
          last_used_at?: string | null
          name: string
          permissions?: Json | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          expires_at?: string | null
          id?: string
          key_hash?: string
          last_used_at?: string | null
          name?: string
          permissions?: Json | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      appointments: {
        Row: {
          client_id: string | null
          created_at: string | null
          creator_id: string | null
          end_time: string
          id: string
          location: Json | null
          price: number
          start_time: string
          status: string | null
          updated_at: string | null
        }
        Insert: {
          client_id?: string | null
          created_at?: string | null
          creator_id?: string | null
          end_time: string
          id?: string
          location?: Json | null
          price: number
          start_time: string
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          client_id?: string | null
          created_at?: string | null
          creator_id?: string | null
          end_time?: string
          id?: string
          location?: Json | null
          price?: number
          start_time?: string
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "appointments_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "appointments_creator_id_fkey"
            columns: ["creator_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_logs: {
        Row: {
          changes: Json | null
          created_at: string | null
          event_type: string
          id: string
          ip_address: string | null
          resource_id: string | null
          resource_type: string
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          changes?: Json | null
          created_at?: string | null
          event_type: string
          id?: string
          ip_address?: string | null
          resource_id?: string | null
          resource_type: string
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          changes?: Json | null
          created_at?: string | null
          event_type?: string
          id?: string
          ip_address?: string | null
          resource_id?: string | null
          resource_type?: string
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      automated_moderation_results: {
        Row: {
          check_type: string
          content_id: string
          created_at: string | null
          id: string
          result: Json
          severity: string | null
        }
        Insert: {
          check_type: string
          content_id: string
          created_at?: string | null
          id?: string
          result: Json
          severity?: string | null
        }
        Update: {
          check_type?: string
          content_id?: string
          created_at?: string | null
          id?: string
          result?: Json
          severity?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "automated_moderation_results_content_id_fkey"
            columns: ["content_id"]
            isOneToOne: false
            referencedRelation: "content_monetization"
            referencedColumns: ["id"]
          },
        ]
      }
      avatar_animations: {
        Row: {
          animation_url: string
          created_at: string | null
          id: string
          metadata: Json | null
          name: string
          preview_url: string | null
          type: string
        }
        Insert: {
          animation_url: string
          created_at?: string | null
          id?: string
          metadata?: Json | null
          name: string
          preview_url?: string | null
          type: string
        }
        Update: {
          animation_url?: string
          created_at?: string | null
          id?: string
          metadata?: Json | null
          name?: string
          preview_url?: string | null
          type?: string
        }
        Relationships: []
      }
      avatar_assets: {
        Row: {
          created_at: string | null
          file_url: string
          id: string
          metadata: Json | null
          name: string
          thumbnail_url: string | null
          type: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          file_url: string
          id?: string
          metadata?: Json | null
          name: string
          thumbnail_url?: string | null
          type: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          file_url?: string
          id?: string
          metadata?: Json | null
          name?: string
          thumbnail_url?: string | null
          type?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      avatar_customizations: {
        Row: {
          accessories: Json | null
          animation_state: string | null
          created_at: string | null
          current_position: Json | null
          current_rotation: Json | null
          equipped_items: Json | null
          eye_color: string
          hair_color: string
          hair_style: string
          id: string
          outfit: string
          skin_color: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          accessories?: Json | null
          animation_state?: string | null
          created_at?: string | null
          current_position?: Json | null
          current_rotation?: Json | null
          equipped_items?: Json | null
          eye_color?: string
          hair_color?: string
          hair_style?: string
          id?: string
          outfit?: string
          skin_color?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          accessories?: Json | null
          animation_state?: string | null
          created_at?: string | null
          current_position?: Json | null
          current_rotation?: Json | null
          equipped_items?: Json | null
          eye_color?: string
          hair_color?: string
          hair_style?: string
          id?: string
          outfit?: string
          skin_color?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      avatar_features: {
        Row: {
          created_at: string | null
          feature_type: Database["public"]["Enums"]["avatar_feature_type"]
          id: string
          is_premium: boolean | null
          model_url: string
          name: string
          price: number | null
          thumbnail_url: string | null
        }
        Insert: {
          created_at?: string | null
          feature_type: Database["public"]["Enums"]["avatar_feature_type"]
          id?: string
          is_premium?: boolean | null
          model_url: string
          name: string
          price?: number | null
          thumbnail_url?: string | null
        }
        Update: {
          created_at?: string | null
          feature_type?: Database["public"]["Enums"]["avatar_feature_type"]
          id?: string
          is_premium?: boolean | null
          model_url?: string
          name?: string
          price?: number | null
          thumbnail_url?: string | null
        }
        Relationships: []
      }
      avatar_models: {
        Row: {
          category: string
          created_at: string | null
          description: string | null
          id: string
          is_premium: boolean | null
          model_type: string
          model_url: string
          name: string
          price: number | null
          tags: string[] | null
          thumbnail_url: string | null
          updated_at: string | null
        }
        Insert: {
          category: string
          created_at?: string | null
          description?: string | null
          id?: string
          is_premium?: boolean | null
          model_type: string
          model_url: string
          name: string
          price?: number | null
          tags?: string[] | null
          thumbnail_url?: string | null
          updated_at?: string | null
        }
        Update: {
          category?: string
          created_at?: string | null
          description?: string | null
          id?: string
          is_premium?: boolean | null
          model_type?: string
          model_url?: string
          name?: string
          price?: number | null
          tags?: string[] | null
          thumbnail_url?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      banner_campaigns: {
        Row: {
          active: boolean | null
          banner_url: string
          created_at: string
          description: string | null
          id: string
          position: string
          target_url: string
          title: string
        }
        Insert: {
          active?: boolean | null
          banner_url: string
          created_at?: string
          description?: string | null
          id?: string
          position: string
          target_url: string
          title: string
        }
        Update: {
          active?: boolean | null
          banner_url?: string
          created_at?: string
          description?: string | null
          id?: string
          position?: string
          target_url?: string
          title?: string
        }
        Relationships: []
      }
      booking_slots: {
        Row: {
          created_at: string | null
          end_time: string
          escort_id: string | null
          id: string
          is_virtual: boolean | null
          location: Json | null
          price: number
          start_time: string
          status: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          end_time: string
          escort_id?: string | null
          id?: string
          is_virtual?: boolean | null
          location?: Json | null
          price: number
          start_time: string
          status?: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          end_time?: string
          escort_id?: string | null
          id?: string
          is_virtual?: boolean | null
          location?: Json | null
          price?: number
          start_time?: string
          status?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "booking_slots_escort_id_fkey"
            columns: ["escort_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      bookings: {
        Row: {
          booking_type: string | null
          cancellation_reason: string | null
          cancelled_by: string | null
          client_id: string | null
          commission_amount: number | null
          created_at: string | null
          end_time: string
          escort_id: string | null
          id: string
          is_reviewed: boolean | null
          location: Json | null
          notes: string | null
          price: number
          service_type: string | null
          slot_id: string | null
          special_requests: string | null
          start_time: string
          status: Database["public"]["Enums"]["booking_status"] | null
          updated_at: string | null
        }
        Insert: {
          booking_type?: string | null
          cancellation_reason?: string | null
          cancelled_by?: string | null
          client_id?: string | null
          commission_amount?: number | null
          created_at?: string | null
          end_time: string
          escort_id?: string | null
          id?: string
          is_reviewed?: boolean | null
          location?: Json | null
          notes?: string | null
          price: number
          service_type?: string | null
          slot_id?: string | null
          special_requests?: string | null
          start_time: string
          status?: Database["public"]["Enums"]["booking_status"] | null
          updated_at?: string | null
        }
        Update: {
          booking_type?: string | null
          cancellation_reason?: string | null
          cancelled_by?: string | null
          client_id?: string | null
          commission_amount?: number | null
          created_at?: string | null
          end_time?: string
          escort_id?: string | null
          id?: string
          is_reviewed?: boolean | null
          location?: Json | null
          notes?: string | null
          price?: number
          service_type?: string | null
          slot_id?: string | null
          special_requests?: string | null
          start_time?: string
          status?: Database["public"]["Enums"]["booking_status"] | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bookings_cancelled_by_fkey"
            columns: ["cancelled_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_escort_id_fkey"
            columns: ["escort_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_slot_id_fkey"
            columns: ["slot_id"]
            isOneToOne: false
            referencedRelation: "booking_slots"
            referencedColumns: ["id"]
          },
        ]
      }
      boost_history: {
        Row: {
          boost_type: string
          created_at: string | null
          credits_spent: number
          escort_id: string | null
          expires_at: string
          id: string
        }
        Insert: {
          boost_type: string
          created_at?: string | null
          credits_spent: number
          escort_id?: string | null
          expires_at: string
          id?: string
        }
        Update: {
          boost_type?: string
          created_at?: string | null
          credits_spent?: number
          escort_id?: string | null
          expires_at?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "boost_history_escort_id_fkey"
            columns: ["escort_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      boost_packages: {
        Row: {
          boost_type: string
          created_at: string | null
          description: string | null
          duration: unknown
          features: Json | null
          id: string
          is_active: boolean | null
          name: string
          price: number
        }
        Insert: {
          boost_type: string
          created_at?: string | null
          description?: string | null
          duration: unknown
          features?: Json | null
          id?: string
          is_active?: boolean | null
          name: string
          price: number
        }
        Update: {
          boost_type?: string
          created_at?: string | null
          description?: string | null
          duration?: unknown
          features?: Json | null
          id?: string
          is_active?: boolean | null
          name?: string
          price?: number
        }
        Relationships: []
      }
      bot_chats: {
        Row: {
          bot_id: string | null
          created_at: string
          id: string
          is_bot_message: boolean
          message: string
          user_id: string | null
        }
        Insert: {
          bot_id?: string | null
          created_at?: string
          id?: string
          is_bot_message?: boolean
          message: string
          user_id?: string | null
        }
        Update: {
          bot_id?: string | null
          created_at?: string
          id?: string
          is_bot_message?: boolean
          message?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bot_chats_bot_id_fkey"
            columns: ["bot_id"]
            isOneToOne: false
            referencedRelation: "bot_configurations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bot_chats_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      bot_configurations: {
        Row: {
          created_at: string
          grammar_accuracy: number
          id: string
          language: string
          name: string
          persona: Database["public"]["Enums"]["bot_persona"]
          response_delay_ms: number
          typing_speed_ms: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          grammar_accuracy?: number
          id?: string
          language?: string
          name: string
          persona?: Database["public"]["Enums"]["bot_persona"]
          response_delay_ms?: number
          typing_speed_ms?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          grammar_accuracy?: number
          id?: string
          language?: string
          name?: string
          persona?: Database["public"]["Enums"]["bot_persona"]
          response_delay_ms?: number
          typing_speed_ms?: number
          updated_at?: string
        }
        Relationships: []
      }
      business_ads: {
        Row: {
          business_id: string | null
          clicks: number | null
          created_at: string | null
          description: string | null
          end_date: string | null
          id: string
          image_url: string | null
          impressions: number | null
          price: number
          pricing_model: string
          start_date: string | null
          status: string | null
          target_url: string | null
          title: string
          type: string
          updated_at: string | null
        }
        Insert: {
          business_id?: string | null
          clicks?: number | null
          created_at?: string | null
          description?: string | null
          end_date?: string | null
          id?: string
          image_url?: string | null
          impressions?: number | null
          price: number
          pricing_model: string
          start_date?: string | null
          status?: string | null
          target_url?: string | null
          title: string
          type: string
          updated_at?: string | null
        }
        Update: {
          business_id?: string | null
          clicks?: number | null
          created_at?: string | null
          description?: string | null
          end_date?: string | null
          id?: string
          image_url?: string | null
          impressions?: number | null
          price?: number
          pricing_model?: string
          start_date?: string | null
          status?: string | null
          target_url?: string | null
          title?: string
          type?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "business_ads_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_messages: {
        Row: {
          content: string
          created_at: string | null
          id: string
          read_at: string | null
          receiver_id: string | null
          sender_id: string | null
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          read_at?: string | null
          receiver_id?: string | null
          sender_id?: string | null
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          read_at?: string | null
          receiver_id?: string | null
          sender_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "chat_messages_receiver_id_fkey"
            columns: ["receiver_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chat_messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      client_settings: {
        Row: {
          created_at: string | null
          id: string
          notification_preferences: Json | null
          theme_preference: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          notification_preferences?: Json | null
          theme_preference?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          notification_preferences?: Json | null
          theme_preference?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      contacts: {
        Row: {
          contact_id: string
          contact_type: string
          created_at: string
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          contact_id: string
          contact_type?: string
          created_at?: string
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          contact_id?: string
          contact_type?: string
          created_at?: string
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      content: {
        Row: {
          created_at: string
          creator_id: string | null
          description: string | null
          id: string
          is_premium: boolean | null
          metadata: Json | null
          price: number | null
          title: string
          type: Database["public"]["Enums"]["content_type"]
          url: string
        }
        Insert: {
          created_at?: string
          creator_id?: string | null
          description?: string | null
          id?: string
          is_premium?: boolean | null
          metadata?: Json | null
          price?: number | null
          title: string
          type: Database["public"]["Enums"]["content_type"]
          url: string
        }
        Update: {
          created_at?: string
          creator_id?: string | null
          description?: string | null
          id?: string
          is_premium?: boolean | null
          metadata?: Json | null
          price?: number | null
          title?: string
          type?: Database["public"]["Enums"]["content_type"]
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "content_creator_id_fkey"
            columns: ["creator_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      content_access_records: {
        Row: {
          access_granted_at: string
          access_type: string
          content_id: string
          created_at: string
          expires_at: string | null
          id: string
          payment_status: string | null
          payment_transaction_id: string | null
          price: number | null
          user_id: string
        }
        Insert: {
          access_granted_at?: string
          access_type: string
          content_id: string
          created_at?: string
          expires_at?: string | null
          id?: string
          payment_status?: string | null
          payment_transaction_id?: string | null
          price?: number | null
          user_id: string
        }
        Update: {
          access_granted_at?: string
          access_type?: string
          content_id?: string
          created_at?: string
          expires_at?: string | null
          id?: string
          payment_status?: string | null
          payment_transaction_id?: string | null
          price?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "content_access_records_content_id_fkey"
            columns: ["content_id"]
            isOneToOne: false
            referencedRelation: "content_monetization"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "content_access_records_payment_transaction_id_fkey"
            columns: ["payment_transaction_id"]
            isOneToOne: false
            referencedRelation: "lucoin_transactions"
            referencedColumns: ["id"]
          },
        ]
      }
      content_categories: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      content_items: {
        Row: {
          category_id: string | null
          content_type: string
          created_at: string
          creator_id: string | null
          description: string | null
          id: string
          is_nft: boolean | null
          is_premium: boolean | null
          is_published: boolean | null
          likes_count: number | null
          metadata: Json | null
          metaverse_location: Json | null
          price: number | null
          published_at: string | null
          tags: string[] | null
          thumbnail_url: string | null
          title: string
          updated_at: string
          url: string
          views_count: number | null
          virtual_scene_data: Json | null
        }
        Insert: {
          category_id?: string | null
          content_type: string
          created_at?: string
          creator_id?: string | null
          description?: string | null
          id?: string
          is_nft?: boolean | null
          is_premium?: boolean | null
          is_published?: boolean | null
          likes_count?: number | null
          metadata?: Json | null
          metaverse_location?: Json | null
          price?: number | null
          published_at?: string | null
          tags?: string[] | null
          thumbnail_url?: string | null
          title: string
          updated_at?: string
          url: string
          views_count?: number | null
          virtual_scene_data?: Json | null
        }
        Update: {
          category_id?: string | null
          content_type?: string
          created_at?: string
          creator_id?: string | null
          description?: string | null
          id?: string
          is_nft?: boolean | null
          is_premium?: boolean | null
          is_published?: boolean | null
          likes_count?: number | null
          metadata?: Json | null
          metaverse_location?: Json | null
          price?: number | null
          published_at?: string | null
          tags?: string[] | null
          thumbnail_url?: string | null
          title?: string
          updated_at?: string
          url?: string
          views_count?: number | null
          virtual_scene_data?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "content_items_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "content_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "content_items_creator_id_fkey"
            columns: ["creator_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      content_moderation: {
        Row: {
          automated_flags: Json | null
          content_id: string | null
          created_at: string | null
          id: string
          moderator_id: string | null
          notes: string | null
          review_deadline: string | null
          review_priority: number | null
          reviewed_at: string | null
          status: Database["public"]["Enums"]["moderation_status"] | null
          updated_at: string | null
        }
        Insert: {
          automated_flags?: Json | null
          content_id?: string | null
          created_at?: string | null
          id?: string
          moderator_id?: string | null
          notes?: string | null
          review_deadline?: string | null
          review_priority?: number | null
          reviewed_at?: string | null
          status?: Database["public"]["Enums"]["moderation_status"] | null
          updated_at?: string | null
        }
        Update: {
          automated_flags?: Json | null
          content_id?: string | null
          created_at?: string | null
          id?: string
          moderator_id?: string | null
          notes?: string | null
          review_deadline?: string | null
          review_priority?: number | null
          reviewed_at?: string | null
          status?: Database["public"]["Enums"]["moderation_status"] | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "content_moderation_content_id_fkey"
            columns: ["content_id"]
            isOneToOne: false
            referencedRelation: "content_monetization"
            referencedColumns: ["id"]
          },
        ]
      }
      content_moderation_logs: {
        Row: {
          content_id: string
          content_type: string
          created_at: string
          details: Json | null
          id: string
          status: string
        }
        Insert: {
          content_id: string
          content_type: string
          created_at?: string
          details?: Json | null
          id?: string
          status: string
        }
        Update: {
          content_id?: string
          content_type?: string
          created_at?: string
          details?: Json | null
          id?: string
          status?: string
        }
        Relationships: []
      }
      content_moderation_queue: {
        Row: {
          content_id: string
          created_at: string
          id: string
          moderator_id: string | null
          notes: string | null
          reason: string | null
          reporter_id: string | null
          resolved_at: string | null
          status: string | null
          updated_at: string
        }
        Insert: {
          content_id: string
          created_at?: string
          id?: string
          moderator_id?: string | null
          notes?: string | null
          reason?: string | null
          reporter_id?: string | null
          resolved_at?: string | null
          status?: string | null
          updated_at?: string
        }
        Update: {
          content_id?: string
          created_at?: string
          id?: string
          moderator_id?: string | null
          notes?: string | null
          reason?: string | null
          reporter_id?: string | null
          resolved_at?: string | null
          status?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      content_monetization: {
        Row: {
          access: Database["public"]["Enums"]["content_access"]
          category_id: string | null
          content_type: string
          content_url: string
          created_at: string
          creator_id: string | null
          description: string | null
          encrypted_url: string | null
          id: string
          is_nft: boolean | null
          metadata: Json | null
          nft_metadata: Json | null
          price: number
          processing_status: string | null
          status: string | null
          tags: string[] | null
          thumbnail_url: string | null
          title: string
          updated_at: string
          view_count: number | null
        }
        Insert: {
          access?: Database["public"]["Enums"]["content_access"]
          category_id?: string | null
          content_type: string
          content_url: string
          created_at?: string
          creator_id?: string | null
          description?: string | null
          encrypted_url?: string | null
          id?: string
          is_nft?: boolean | null
          metadata?: Json | null
          nft_metadata?: Json | null
          price?: number
          processing_status?: string | null
          status?: string | null
          tags?: string[] | null
          thumbnail_url?: string | null
          title: string
          updated_at?: string
          view_count?: number | null
        }
        Update: {
          access?: Database["public"]["Enums"]["content_access"]
          category_id?: string | null
          content_type?: string
          content_url?: string
          created_at?: string
          creator_id?: string | null
          description?: string | null
          encrypted_url?: string | null
          id?: string
          is_nft?: boolean | null
          metadata?: Json | null
          nft_metadata?: Json | null
          price?: number
          processing_status?: string | null
          status?: string | null
          tags?: string[] | null
          thumbnail_url?: string | null
          title?: string
          updated_at?: string
          view_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "content_monetization_creator_id_fkey"
            columns: ["creator_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      content_purchases: {
        Row: {
          amount: number
          content_id: string | null
          created_at: string
          id: string
          payment_method: string
          purchased_at: string | null
          status: string
          transaction_id: string | null
          user_id: string | null
        }
        Insert: {
          amount: number
          content_id?: string | null
          created_at?: string
          id?: string
          payment_method: string
          purchased_at?: string | null
          status?: string
          transaction_id?: string | null
          user_id?: string | null
        }
        Update: {
          amount?: number
          content_id?: string | null
          created_at?: string
          id?: string
          payment_method?: string
          purchased_at?: string | null
          status?: string
          transaction_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "content_purchases_content_id_fkey"
            columns: ["content_id"]
            isOneToOne: false
            referencedRelation: "content_monetization"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "content_purchases_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      content_reports: {
        Row: {
          content_id: string | null
          created_at: string | null
          description: string | null
          id: string
          report_type: Database["public"]["Enums"]["report_type"]
          reporter_id: string | null
          status: Database["public"]["Enums"]["moderation_status"] | null
        }
        Insert: {
          content_id?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          report_type: Database["public"]["Enums"]["report_type"]
          reporter_id?: string | null
          status?: Database["public"]["Enums"]["moderation_status"] | null
        }
        Update: {
          content_id?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          report_type?: Database["public"]["Enums"]["report_type"]
          reporter_id?: string | null
          status?: Database["public"]["Enums"]["moderation_status"] | null
        }
        Relationships: [
          {
            foreignKeyName: "content_reports_content_id_fkey"
            columns: ["content_id"]
            isOneToOne: false
            referencedRelation: "content_monetization"
            referencedColumns: ["id"]
          },
        ]
      }
      content_views: {
        Row: {
          content_id: string
          id: string
          user_id: string
          viewed_at: string | null
        }
        Insert: {
          content_id: string
          id?: string
          user_id: string
          viewed_at?: string | null
        }
        Update: {
          content_id?: string
          id?: string
          user_id?: string
          viewed_at?: string | null
        }
        Relationships: []
      }
      conversation_participants: {
        Row: {
          conversation_id: string | null
          created_at: string
          id: string
          user_id: string | null
        }
        Insert: {
          conversation_id?: string | null
          created_at?: string
          id?: string
          user_id?: string | null
        }
        Update: {
          conversation_id?: string | null
          created_at?: string
          id?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "conversation_participants_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "conversation_participants_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_conversation"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_user"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      conversations: {
        Row: {
          created_at: string
          id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      creator_analytics: {
        Row: {
          created_at: string | null
          creator_id: string
          date: string
          earnings: number | null
          id: string
          likes: number | null
          shares: number | null
          views: number | null
        }
        Insert: {
          created_at?: string | null
          creator_id: string
          date: string
          earnings?: number | null
          id?: string
          likes?: number | null
          shares?: number | null
          views?: number | null
        }
        Update: {
          created_at?: string | null
          creator_id?: string
          date?: string
          earnings?: number | null
          id?: string
          likes?: number | null
          shares?: number | null
          views?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "creator_analytics_creator_id_fkey"
            columns: ["creator_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      creator_content: {
        Row: {
          content_type: string
          created_at: string | null
          creator_id: string
          description: string | null
          id: string
          is_premium: boolean | null
          likes_count: number | null
          price: number | null
          published_at: string | null
          status: string | null
          thumbnail_url: string | null
          title: string
          updated_at: string | null
          url: string
          views_count: number | null
        }
        Insert: {
          content_type: string
          created_at?: string | null
          creator_id: string
          description?: string | null
          id?: string
          is_premium?: boolean | null
          likes_count?: number | null
          price?: number | null
          published_at?: string | null
          status?: string | null
          thumbnail_url?: string | null
          title: string
          updated_at?: string | null
          url: string
          views_count?: number | null
        }
        Update: {
          content_type?: string
          created_at?: string | null
          creator_id?: string
          description?: string | null
          id?: string
          is_premium?: boolean | null
          likes_count?: number | null
          price?: number | null
          published_at?: string | null
          status?: string | null
          thumbnail_url?: string | null
          title?: string
          updated_at?: string | null
          url?: string
          views_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "creator_content_creator_id_fkey"
            columns: ["creator_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      creator_payouts: {
        Row: {
          amount: number
          created_at: string | null
          creator_id: string
          id: string
          notes: string | null
          payout_method: string
          processed_at: string | null
          requested_at: string | null
          status: string
        }
        Insert: {
          amount: number
          created_at?: string | null
          creator_id: string
          id?: string
          notes?: string | null
          payout_method: string
          processed_at?: string | null
          requested_at?: string | null
          status?: string
        }
        Update: {
          amount?: number
          created_at?: string | null
          creator_id?: string
          id?: string
          notes?: string | null
          payout_method?: string
          processed_at?: string | null
          requested_at?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "creator_payouts_creator_id_fkey"
            columns: ["creator_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      creator_reviews: {
        Row: {
          comment: string | null
          created_at: string | null
          creator_id: string
          id: string
          rating: number
          reviewer_id: string
          updated_at: string | null
        }
        Insert: {
          comment?: string | null
          created_at?: string | null
          creator_id: string
          id?: string
          rating: number
          reviewer_id: string
          updated_at?: string | null
        }
        Update: {
          comment?: string | null
          created_at?: string | null
          creator_id?: string
          id?: string
          rating?: number
          reviewer_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "creator_reviews_creator_id_fkey"
            columns: ["creator_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "creator_reviews_reviewer_id_fkey"
            columns: ["reviewer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      credit_packages: {
        Row: {
          created_at: string | null
          credits: number
          description: string | null
          id: string
          is_active: boolean | null
          name: string
          price: number
        }
        Insert: {
          created_at?: string | null
          credits: number
          description?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          price: number
        }
        Update: {
          created_at?: string | null
          credits?: number
          description?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          price?: number
        }
        Relationships: []
      }
      device_commands: {
        Row: {
          command: string
          created_at: string
          duration: number | null
          id: string
          intensity: number | null
          session_id: string
        }
        Insert: {
          command: string
          created_at?: string
          duration?: number | null
          id?: string
          intensity?: number | null
          session_id: string
        }
        Update: {
          command?: string
          created_at?: string
          duration?: number | null
          id?: string
          intensity?: number | null
          session_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "device_commands_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "device_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      device_connection_requests: {
        Row: {
          created_at: string
          device_id: string
          expires_at: string
          id: string
          message: string | null
          recipient_id: string
          sender_id: string
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          device_id: string
          expires_at: string
          id?: string
          message?: string | null
          recipient_id: string
          sender_id: string
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          device_id?: string
          expires_at?: string
          id?: string
          message?: string | null
          recipient_id?: string
          sender_id?: string
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      device_connections: {
        Row: {
          connection_status: string
          created_at: string | null
          device_id: string
          device_name: string | null
          device_type: string
          features_enabled: Json | null
          id: string
          last_connected: string | null
          settings: Json | null
          supported_actions: string[] | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          connection_status?: string
          created_at?: string | null
          device_id: string
          device_name?: string | null
          device_type: string
          features_enabled?: Json | null
          id?: string
          last_connected?: string | null
          settings?: Json | null
          supported_actions?: string[] | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          connection_status?: string
          created_at?: string | null
          device_id?: string
          device_name?: string | null
          device_type?: string
          features_enabled?: Json | null
          id?: string
          last_connected?: string | null
          settings?: Json | null
          supported_actions?: string[] | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      device_sessions: {
        Row: {
          created_at: string
          device_id: string
          device_type: string
          end_time: string | null
          id: string
          initiator_id: string
          receiver_id: string
          start_time: string | null
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          device_id: string
          device_type?: string
          end_time?: string | null
          id?: string
          initiator_id: string
          receiver_id: string
          start_time?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          device_id?: string
          device_type?: string
          end_time?: string | null
          id?: string
          initiator_id?: string
          receiver_id?: string
          start_time?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      digital_content: {
        Row: {
          content_type: string
          created_at: string
          creator_id: string | null
          description: string | null
          id: string
          is_nft: boolean | null
          metadata: Json | null
          price: number
          title: string
        }
        Insert: {
          content_type: string
          created_at?: string
          creator_id?: string | null
          description?: string | null
          id?: string
          is_nft?: boolean | null
          metadata?: Json | null
          price?: number
          title: string
        }
        Update: {
          content_type?: string
          created_at?: string
          creator_id?: string | null
          description?: string | null
          id?: string
          is_nft?: boolean | null
          metadata?: Json | null
          price?: number
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "digital_content_creator_id_fkey"
            columns: ["creator_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      email_templates: {
        Row: {
          content: string
          id: string
          name: string
          subject: string
          updated_at: string | null
          updated_by: string | null
          variables: Json | null
        }
        Insert: {
          content: string
          id?: string
          name: string
          subject: string
          updated_at?: string | null
          updated_by?: string | null
          variables?: Json | null
        }
        Update: {
          content?: string
          id?: string
          name?: string
          subject?: string
          updated_at?: string | null
          updated_by?: string | null
          variables?: Json | null
        }
        Relationships: []
      }
      environment_presets: {
        Row: {
          config: Json
          created_at: string | null
          description: string | null
          id: string
          is_public: boolean | null
          name: string
        }
        Insert: {
          config?: Json
          created_at?: string | null
          description?: string | null
          id?: string
          is_public?: boolean | null
          name: string
        }
        Update: {
          config?: Json
          created_at?: string | null
          description?: string | null
          id?: string
          is_public?: boolean | null
          name?: string
        }
        Relationships: []
      }
      favorites: {
        Row: {
          created_at: string | null
          id: string
          profile_id: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          profile_id?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          profile_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "favorites_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      instance_presence: {
        Row: {
          created_at: string | null
          id: string
          instance_id: string | null
          last_seen: string | null
          metadata: Json | null
          position: Json | null
          rotation: Json | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          instance_id?: string | null
          last_seen?: string | null
          metadata?: Json | null
          position?: Json | null
          rotation?: Json | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          instance_id?: string | null
          last_seen?: string | null
          metadata?: Json | null
          position?: Json | null
          rotation?: Json | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "instance_presence_instance_id_fkey"
            columns: ["instance_id"]
            isOneToOne: false
            referencedRelation: "world_instances"
            referencedColumns: ["id"]
          },
        ]
      }
      integration_configs: {
        Row: {
          config: Json
          created_at: string | null
          id: string
          is_active: boolean | null
          service_name: string
          updated_at: string | null
        }
        Insert: {
          config: Json
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          service_name: string
          updated_at?: string | null
        }
        Update: {
          config?: Json
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          service_name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      invitation_templates: {
        Row: {
          body: string
          created_at: string
          id: string
          language: string
          subject: string
          updated_at: string
        }
        Insert: {
          body: string
          created_at?: string
          id?: string
          language: string
          subject: string
          updated_at?: string
        }
        Update: {
          body?: string
          created_at?: string
          id?: string
          language?: string
          subject?: string
          updated_at?: string
        }
        Relationships: []
      }
      live_streams: {
        Row: {
          created_at: string
          description: string | null
          ended_at: string | null
          id: string
          is_premium: boolean | null
          scheduled_time: string | null
          started_at: string | null
          status: string
          stream_key: string
          stream_settings: Json | null
          streamer_id: string
          title: string
          viewer_count: number | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          ended_at?: string | null
          id?: string
          is_premium?: boolean | null
          scheduled_time?: string | null
          started_at?: string | null
          status?: string
          stream_key: string
          stream_settings?: Json | null
          streamer_id: string
          title: string
          viewer_count?: number | null
        }
        Update: {
          created_at?: string
          description?: string | null
          ended_at?: string | null
          id?: string
          is_premium?: boolean | null
          scheduled_time?: string | null
          started_at?: string | null
          status?: string
          stream_key?: string
          stream_settings?: Json | null
          streamer_id?: string
          title?: string
          viewer_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "live_streams_streamer_id_fkey"
            columns: ["streamer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      lucoin_package_options: {
        Row: {
          amount: number
          bonus_amount: number | null
          created_at: string | null
          id: string
          is_active: boolean | null
          is_featured: boolean | null
          name: string
          price_sol: number | null
          updated_at: string | null
        }
        Insert: {
          amount: number
          bonus_amount?: number | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          is_featured?: boolean | null
          name: string
          price_sol?: number | null
          updated_at?: string | null
        }
        Update: {
          amount?: number
          bonus_amount?: number | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          is_featured?: boolean | null
          name?: string
          price_sol?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      lucoin_packages: {
        Row: {
          amount: number
          bonus_amount: number | null
          created_at: string | null
          currency: string
          id: string
          is_active: boolean | null
          is_featured: boolean | null
          name: string
          price: number
          updated_at: string | null
        }
        Insert: {
          amount: number
          bonus_amount?: number | null
          created_at?: string | null
          currency?: string
          id?: string
          is_active?: boolean | null
          is_featured?: boolean | null
          name: string
          price: number
          updated_at?: string | null
        }
        Update: {
          amount?: number
          bonus_amount?: number | null
          created_at?: string | null
          currency?: string
          id?: string
          is_active?: boolean | null
          is_featured?: boolean | null
          name?: string
          price?: number
          updated_at?: string | null
        }
        Relationships: []
      }
      lucoin_stats: {
        Row: {
          created_at: string | null
          stat_date: string
          total_recharged: number | null
          total_retained: number | null
          total_spent: number | null
          total_users_active: number | null
        }
        Insert: {
          created_at?: string | null
          stat_date: string
          total_recharged?: number | null
          total_retained?: number | null
          total_spent?: number | null
          total_users_active?: number | null
        }
        Update: {
          created_at?: string | null
          stat_date?: string
          total_recharged?: number | null
          total_retained?: number | null
          total_spent?: number | null
          total_users_active?: number | null
        }
        Relationships: []
      }
      lucoin_transactions: {
        Row: {
          amount: number
          created_at: string
          description: string | null
          id: string
          metadata: Json | null
          status: string
          transaction_type: string
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          description?: string | null
          id?: string
          metadata?: Json | null
          status?: string
          transaction_type: string
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          description?: string | null
          id?: string
          metadata?: Json | null
          status?: string
          transaction_type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "lucoin_transactions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      lucoin_wallets: {
        Row: {
          address: string
          balance: number
          created_at: string | null
          id: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          address: string
          balance?: number
          created_at?: string | null
          id?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          address?: string
          balance?: number
          created_at?: string | null
          id?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      matches: {
        Row: {
          created_at: string
          id: string
          status: string | null
          updated_at: string
          user1_id: string | null
          user2_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          status?: string | null
          updated_at?: string
          user1_id?: string | null
          user2_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          status?: string | null
          updated_at?: string
          user1_id?: string | null
          user2_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "matches_user1_id_fkey"
            columns: ["user1_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "matches_user2_id_fkey"
            columns: ["user2_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      message_attachments: {
        Row: {
          created_at: string
          encryption_info: Json | null
          file_name: string
          file_type: string
          file_url: string
          id: string
          is_encrypted: boolean | null
          message_id: string
        }
        Insert: {
          created_at?: string
          encryption_info?: Json | null
          file_name: string
          file_type: string
          file_url: string
          id?: string
          is_encrypted?: boolean | null
          message_id: string
        }
        Update: {
          created_at?: string
          encryption_info?: Json | null
          file_name?: string
          file_type?: string
          file_url?: string
          id?: string
          is_encrypted?: boolean | null
          message_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "message_attachments_message_id_fkey"
            columns: ["message_id"]
            isOneToOne: false
            referencedRelation: "messages"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          content: string
          conversation_id: string
          created_at: string
          id: string
          metadata: Json | null
          read_at: string | null
          sender_id: string
          status: string
        }
        Insert: {
          content: string
          conversation_id: string
          created_at?: string
          id?: string
          metadata?: Json | null
          read_at?: string | null
          sender_id: string
          status?: string
        }
        Update: {
          content?: string
          conversation_id?: string
          created_at?: string
          id?: string
          metadata?: Json | null
          read_at?: string | null
          sender_id?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_conversation"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_sender"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      metaverse_access_logs: {
        Row: {
          access_type: Database["public"]["Enums"]["metaverse_access_level"]
          created_at: string | null
          entered_at: string | null
          exited_at: string | null
          id: string
          session_data: Json | null
          space_id: string | null
          user_id: string | null
        }
        Insert: {
          access_type: Database["public"]["Enums"]["metaverse_access_level"]
          created_at?: string | null
          entered_at?: string | null
          exited_at?: string | null
          id?: string
          session_data?: Json | null
          space_id?: string | null
          user_id?: string | null
        }
        Update: {
          access_type?: Database["public"]["Enums"]["metaverse_access_level"]
          created_at?: string | null
          entered_at?: string | null
          exited_at?: string | null
          id?: string
          session_data?: Json | null
          space_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "metaverse_access_logs_space_id_fkey"
            columns: ["space_id"]
            isOneToOne: false
            referencedRelation: "virtual_spaces"
            referencedColumns: ["id"]
          },
        ]
      }
      metaverse_assets: {
        Row: {
          created_at: string
          file_path: string
          format: string
          id: string
          metadata: Json | null
          name: string
          optimization_level: number | null
          preload: boolean | null
          size: number
          tags: string[] | null
          type: string
          updated_at: string
          version: number | null
        }
        Insert: {
          created_at?: string
          file_path: string
          format: string
          id?: string
          metadata?: Json | null
          name: string
          optimization_level?: number | null
          preload?: boolean | null
          size: number
          tags?: string[] | null
          type: string
          updated_at?: string
          version?: number | null
        }
        Update: {
          created_at?: string
          file_path?: string
          format?: string
          id?: string
          metadata?: Json | null
          name?: string
          optimization_level?: number | null
          preload?: boolean | null
          size?: number
          tags?: string[] | null
          type?: string
          updated_at?: string
          version?: number | null
        }
        Relationships: []
      }
      metaverse_users: {
        Row: {
          avatar_data: Json
          id: string
          is_online: boolean
          last_active: string
          lucoin_balance: number
          position: Json
          rotation: Json
          wallet_address: string | null
        }
        Insert: {
          avatar_data?: Json
          id: string
          is_online?: boolean
          last_active?: string
          lucoin_balance?: number
          position?: Json
          rotation?: Json
          wallet_address?: string | null
        }
        Update: {
          avatar_data?: Json
          id?: string
          is_online?: boolean
          last_active?: string
          lucoin_balance?: number
          position?: Json
          rotation?: Json
          wallet_address?: string | null
        }
        Relationships: []
      }
      mfa_settings: {
        Row: {
          backup_codes: string[] | null
          created_at: string
          id: string
          is_enabled: boolean | null
          preferred_method: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          backup_codes?: string[] | null
          created_at?: string
          id?: string
          is_enabled?: boolean | null
          preferred_method?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          backup_codes?: string[] | null
          created_at?: string
          id?: string
          is_enabled?: boolean | null
          preferred_method?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      moderation_queue: {
        Row: {
          content_id: string
          content_type: string
          created_at: string | null
          id: string
          reason: string
          reporter_id: string | null
          resolution_notes: string | null
          resolved_at: string | null
          resolved_by: string | null
          status: string
        }
        Insert: {
          content_id: string
          content_type: string
          created_at?: string | null
          id?: string
          reason: string
          reporter_id?: string | null
          resolution_notes?: string | null
          resolved_at?: string | null
          resolved_by?: string | null
          status?: string
        }
        Update: {
          content_id?: string
          content_type?: string
          created_at?: string | null
          id?: string
          reason?: string
          reporter_id?: string | null
          resolution_notes?: string | null
          resolved_at?: string | null
          resolved_by?: string | null
          status?: string
        }
        Relationships: []
      }
      moderation_rules: {
        Row: {
          actions: Json
          conditions: Json
          created_at: string | null
          created_by: string | null
          id: string
          is_active: boolean | null
          name: string
        }
        Insert: {
          actions: Json
          conditions: Json
          created_at?: string | null
          created_by?: string | null
          id?: string
          is_active?: boolean | null
          name: string
        }
        Update: {
          actions?: Json
          conditions?: Json
          created_at?: string | null
          created_by?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
        }
        Relationships: []
      }
      nft_content: {
        Row: {
          blockchain: string
          content_id: string | null
          contract_address: string
          created_at: string | null
          creator_id: string | null
          id: string
          metadata: Json | null
          owner_id: string | null
          price: number
          status: string
          token_id: string
          updated_at: string | null
        }
        Insert: {
          blockchain?: string
          content_id?: string | null
          contract_address: string
          created_at?: string | null
          creator_id?: string | null
          id?: string
          metadata?: Json | null
          owner_id?: string | null
          price?: number
          status?: string
          token_id: string
          updated_at?: string | null
        }
        Update: {
          blockchain?: string
          content_id?: string | null
          contract_address?: string
          created_at?: string | null
          creator_id?: string | null
          id?: string
          metadata?: Json | null
          owner_id?: string | null
          price?: number
          status?: string
          token_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "nft_content_content_id_fkey"
            columns: ["content_id"]
            isOneToOne: false
            referencedRelation: "content_monetization"
            referencedColumns: ["id"]
          },
        ]
      }
      nft_transactions: {
        Row: {
          buyer_id: string | null
          created_at: string | null
          id: string
          nft_id: string | null
          price: number
          seller_id: string | null
          status: string
          transaction_hash: string | null
        }
        Insert: {
          buyer_id?: string | null
          created_at?: string | null
          id?: string
          nft_id?: string | null
          price: number
          seller_id?: string | null
          status?: string
          transaction_hash?: string | null
        }
        Update: {
          buyer_id?: string | null
          created_at?: string | null
          id?: string
          nft_id?: string | null
          price?: number
          seller_id?: string | null
          status?: string
          transaction_hash?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "nft_transactions_nft_id_fkey"
            columns: ["nft_id"]
            isOneToOne: false
            referencedRelation: "nft_content"
            referencedColumns: ["id"]
          },
        ]
      }
      notification_categories: {
        Row: {
          created_at: string | null
          default_enabled: boolean | null
          description: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string | null
          default_enabled?: boolean | null
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string | null
          default_enabled?: boolean | null
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      notification_preferences: {
        Row: {
          created_at: string | null
          email_enabled: boolean | null
          id: string
          in_app_enabled: boolean | null
          push_enabled: boolean | null
          quiet_hours_end: string | null
          quiet_hours_start: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          email_enabled?: boolean | null
          id?: string
          in_app_enabled?: boolean | null
          push_enabled?: boolean | null
          quiet_hours_end?: string | null
          quiet_hours_start?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          email_enabled?: boolean | null
          id?: string
          in_app_enabled?: boolean | null
          push_enabled?: boolean | null
          quiet_hours_end?: string | null
          quiet_hours_start?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      notification_templates: {
        Row: {
          content: string
          created_at: string | null
          id: string
          name: string
          subject: string | null
          type: string
          updated_at: string | null
          variables: Json | null
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          name: string
          subject?: string | null
          type: string
          updated_at?: string | null
          variables?: Json | null
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          name?: string
          subject?: string | null
          type?: string
          updated_at?: string | null
          variables?: Json | null
        }
        Relationships: []
      }
      notifications: {
        Row: {
          action_text: string | null
          action_url: string | null
          created_at: string | null
          id: string
          message: string
          priority: string | null
          read: boolean | null
          receiver_id: string | null
          title: string
          type: string
          user_id: string | null
        }
        Insert: {
          action_text?: string | null
          action_url?: string | null
          created_at?: string | null
          id?: string
          message: string
          priority?: string | null
          read?: boolean | null
          receiver_id?: string | null
          title: string
          type: string
          user_id?: string | null
        }
        Update: {
          action_text?: string | null
          action_url?: string | null
          created_at?: string | null
          id?: string
          message?: string
          priority?: string | null
          read?: boolean | null
          receiver_id?: string | null
          title?: string
          type?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      panel_settings: {
        Row: {
          created_at: string
          customizations: Json | null
          features_enabled: string[] | null
          id: string
          layout_config: Json | null
          notification_settings: Json | null
          panel_type: string
          settings: Json | null
          theme_preference: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          customizations?: Json | null
          features_enabled?: string[] | null
          id?: string
          layout_config?: Json | null
          notification_settings?: Json | null
          panel_type: string
          settings?: Json | null
          theme_preference?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          customizations?: Json | null
          features_enabled?: string[] | null
          id?: string
          layout_config?: Json | null
          notification_settings?: Json | null
          panel_type?: string
          settings?: Json | null
          theme_preference?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "panel_settings_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      panic_alerts: {
        Row: {
          created_at: string
          id: string
          location: Json | null
          resolved_at: string | null
          status: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          location?: Json | null
          resolved_at?: string | null
          status?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          location?: Json | null
          resolved_at?: string | null
          status?: string | null
          user_id?: string
        }
        Relationships: []
      }
      payment_orders: {
        Row: {
          amount: number
          completed_at: string | null
          created_at: string | null
          currency: string
          external_order_id: string | null
          id: string
          payment_details: Json | null
          payment_method: string
          price_fiat: number
          status: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          amount: number
          completed_at?: string | null
          created_at?: string | null
          currency?: string
          external_order_id?: string | null
          id?: string
          payment_details?: Json | null
          payment_method?: string
          price_fiat: number
          status?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          amount?: number
          completed_at?: string | null
          created_at?: string | null
          currency?: string
          external_order_id?: string | null
          id?: string
          payment_details?: Json | null
          payment_method?: string
          price_fiat?: number
          status?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      payments: {
        Row: {
          amount: number
          booking_id: string | null
          commission_amount: number | null
          created_at: string | null
          id: string
          payer_id: string | null
          payment_method: string | null
          receiver_id: string | null
          status: Database["public"]["Enums"]["payment_status"] | null
          stripe_payment_intent_id: string | null
          updated_at: string | null
        }
        Insert: {
          amount: number
          booking_id?: string | null
          commission_amount?: number | null
          created_at?: string | null
          id?: string
          payer_id?: string | null
          payment_method?: string | null
          receiver_id?: string | null
          status?: Database["public"]["Enums"]["payment_status"] | null
          stripe_payment_intent_id?: string | null
          updated_at?: string | null
        }
        Update: {
          amount?: number
          booking_id?: string | null
          commission_amount?: number | null
          created_at?: string | null
          id?: string
          payer_id?: string | null
          payment_method?: string | null
          receiver_id?: string | null
          status?: Database["public"]["Enums"]["payment_status"] | null
          stripe_payment_intent_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payments_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_payer_id_fkey"
            columns: ["payer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_receiver_id_fkey"
            columns: ["receiver_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      phone_verification_codes: {
        Row: {
          attempts: number | null
          code: string
          created_at: string | null
          expires_at: string
          id: string
          phone_number: string
          type: string
          user_id: string
          verified_at: string | null
        }
        Insert: {
          attempts?: number | null
          code: string
          created_at?: string | null
          expires_at: string
          id?: string
          phone_number: string
          type?: string
          user_id: string
          verified_at?: string | null
        }
        Update: {
          attempts?: number | null
          code?: string
          created_at?: string | null
          expires_at?: string
          id?: string
          phone_number?: string
          type?: string
          user_id?: string
          verified_at?: string | null
        }
        Relationships: []
      }
      preferences: {
        Row: {
          created_at: string
          id: string
          max_age: number | null
          max_distance: number | null
          min_age: number | null
          preferred_gender: Database["public"]["Enums"]["gender"][] | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          max_age?: number | null
          max_distance?: number | null
          min_age?: number | null
          preferred_gender?: Database["public"]["Enums"]["gender"][] | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          max_age?: number | null
          max_distance?: number | null
          min_age?: number | null
          preferred_gender?: Database["public"]["Enums"]["gender"][] | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "preferences_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profile_blocks: {
        Row: {
          blocked_id: string | null
          blocker_id: string | null
          created_at: string | null
          id: string
          reason: string | null
        }
        Insert: {
          blocked_id?: string | null
          blocker_id?: string | null
          created_at?: string | null
          id?: string
          reason?: string | null
        }
        Update: {
          blocked_id?: string | null
          blocker_id?: string | null
          created_at?: string | null
          id?: string
          reason?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profile_blocks_blocked_id_fkey"
            columns: ["blocked_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profile_blocks_blocker_id_fkey"
            columns: ["blocker_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profile_views: {
        Row: {
          id: string
          profile_id: string | null
          viewed_at: string | null
          viewer_id: string | null
        }
        Insert: {
          id?: string
          profile_id?: string | null
          viewed_at?: string | null
          viewer_id?: string | null
        }
        Update: {
          id?: string
          profile_id?: string | null
          viewed_at?: string | null
          viewer_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profile_views_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profile_views_viewer_id_fkey"
            columns: ["viewer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          age_verified: boolean | null
          age_verified_at: string | null
          ai_settings: Json | null
          allowed_virtual_features: string[] | null
          availability: Json | null
          available: boolean | null
          avatar_url: string | null
          bio: string | null
          birth_date: string | null
          commission_rate: number | null
          commute_route: string | null
          content_categories: string[] | null
          created_at: string
          creator_level: string | null
          email: string | null
          email_verified: boolean | null
          engagement_score: number | null
          external_images: Json | null
          external_urls: Json | null
          external_videos: Json | null
          featured: boolean | null
          featured_until: string | null
          full_name: string | null
          gallery_images: string[] | null
          gender: Database["public"]["Enums"]["gender"] | null
          height: number | null
          hourly_rate: number | null
          id: string
          identity_verified: boolean | null
          imported_at: string | null
          interests: string[] | null
          invitation_status: string | null
          is_active: boolean | null
          is_ai_profile: boolean | null
          is_content_creator: boolean | null
          is_escort: boolean | null
          is_featured: boolean | null
          is_verified: boolean | null
          languages: string[] | null
          last_active: string | null
          last_activity: string | null
          last_boost: string | null
          last_invitation_sent: string | null
          last_online: string | null
          last_scraped_at: string | null
          last_verification_request: string | null
          location: string | null
          looking_for: string[] | null
          lucoin_balance: number
          max_stream_quality: string | null
          measurements: Json | null
          meta_description: string | null
          meta_keywords: string[] | null
          meta_title: string | null
          moderation_details: Json | null
          moderation_status: string | null
          nft_collection: Json | null
          notification_preferences: Json | null
          online_status: boolean | null
          payment_settings: Json | null
          phone_number: string | null
          phone_verified: boolean | null
          ppv_enabled: boolean | null
          preferred_language: string | null
          primary_photo: string | null
          privacy_settings: Json | null
          profile_completeness: number | null
          profile_completion_checklist: Json | null
          profile_views: number | null
          ranking_points: number | null
          rates: Json | null
          rating: number | null
          rating_avg: number | null
          region_id: string | null
          response_time: unknown | null
          review_count: number | null
          scrape_metadata: Json | null
          search_text: string | null
          security_settings: Json | null
          service_types: Database["public"]["Enums"]["service_type"][] | null
          services: string[] | null
          settings: Json | null
          sexual_orientation: string | null
          social_links: Json | null
          source_platform: string | null
          status: Database["public"]["Enums"]["user_status"] | null
          stream_settings: Json | null
          streaming_enabled: boolean | null
          stripe_account_id: string | null
          stripe_customer_id: string | null
          subscription_price: number | null
          subscription_tier:
            | Database["public"]["Enums"]["subscription_tier"]
            | null
          terms_accepted: boolean | null
          terms_accepted_at: string | null
          timezone: string | null
          total_earnings: number | null
          username: string | null
          verification_date: string | null
          verification_documents: Json | null
          verification_level:
            | Database["public"]["Enums"]["verification_level"]
            | null
          verification_required: boolean | null
          verification_status: Database["public"]["Enums"]["user_status"] | null
          verification_submitted: boolean | null
          verified_badges: string[] | null
          virtual_availability: Json | null
          virtual_room_access: Json | null
          virtual_room_settings: Json | null
          virtual_services: Json | null
          weight: number | null
        }
        Insert: {
          age_verified?: boolean | null
          age_verified_at?: string | null
          ai_settings?: Json | null
          allowed_virtual_features?: string[] | null
          availability?: Json | null
          available?: boolean | null
          avatar_url?: string | null
          bio?: string | null
          birth_date?: string | null
          commission_rate?: number | null
          commute_route?: string | null
          content_categories?: string[] | null
          created_at?: string
          creator_level?: string | null
          email?: string | null
          email_verified?: boolean | null
          engagement_score?: number | null
          external_images?: Json | null
          external_urls?: Json | null
          external_videos?: Json | null
          featured?: boolean | null
          featured_until?: string | null
          full_name?: string | null
          gallery_images?: string[] | null
          gender?: Database["public"]["Enums"]["gender"] | null
          height?: number | null
          hourly_rate?: number | null
          id: string
          identity_verified?: boolean | null
          imported_at?: string | null
          interests?: string[] | null
          invitation_status?: string | null
          is_active?: boolean | null
          is_ai_profile?: boolean | null
          is_content_creator?: boolean | null
          is_escort?: boolean | null
          is_featured?: boolean | null
          is_verified?: boolean | null
          languages?: string[] | null
          last_active?: string | null
          last_activity?: string | null
          last_boost?: string | null
          last_invitation_sent?: string | null
          last_online?: string | null
          last_scraped_at?: string | null
          last_verification_request?: string | null
          location?: string | null
          looking_for?: string[] | null
          lucoin_balance?: number
          max_stream_quality?: string | null
          measurements?: Json | null
          meta_description?: string | null
          meta_keywords?: string[] | null
          meta_title?: string | null
          moderation_details?: Json | null
          moderation_status?: string | null
          nft_collection?: Json | null
          notification_preferences?: Json | null
          online_status?: boolean | null
          payment_settings?: Json | null
          phone_number?: string | null
          phone_verified?: boolean | null
          ppv_enabled?: boolean | null
          preferred_language?: string | null
          primary_photo?: string | null
          privacy_settings?: Json | null
          profile_completeness?: number | null
          profile_completion_checklist?: Json | null
          profile_views?: number | null
          ranking_points?: number | null
          rates?: Json | null
          rating?: number | null
          rating_avg?: number | null
          region_id?: string | null
          response_time?: unknown | null
          review_count?: number | null
          scrape_metadata?: Json | null
          search_text?: string | null
          security_settings?: Json | null
          service_types?: Database["public"]["Enums"]["service_type"][] | null
          services?: string[] | null
          settings?: Json | null
          sexual_orientation?: string | null
          social_links?: Json | null
          source_platform?: string | null
          status?: Database["public"]["Enums"]["user_status"] | null
          stream_settings?: Json | null
          streaming_enabled?: boolean | null
          stripe_account_id?: string | null
          stripe_customer_id?: string | null
          subscription_price?: number | null
          subscription_tier?:
            | Database["public"]["Enums"]["subscription_tier"]
            | null
          terms_accepted?: boolean | null
          terms_accepted_at?: string | null
          timezone?: string | null
          total_earnings?: number | null
          username?: string | null
          verification_date?: string | null
          verification_documents?: Json | null
          verification_level?:
            | Database["public"]["Enums"]["verification_level"]
            | null
          verification_required?: boolean | null
          verification_status?:
            | Database["public"]["Enums"]["user_status"]
            | null
          verification_submitted?: boolean | null
          verified_badges?: string[] | null
          virtual_availability?: Json | null
          virtual_room_access?: Json | null
          virtual_room_settings?: Json | null
          virtual_services?: Json | null
          weight?: number | null
        }
        Update: {
          age_verified?: boolean | null
          age_verified_at?: string | null
          ai_settings?: Json | null
          allowed_virtual_features?: string[] | null
          availability?: Json | null
          available?: boolean | null
          avatar_url?: string | null
          bio?: string | null
          birth_date?: string | null
          commission_rate?: number | null
          commute_route?: string | null
          content_categories?: string[] | null
          created_at?: string
          creator_level?: string | null
          email?: string | null
          email_verified?: boolean | null
          engagement_score?: number | null
          external_images?: Json | null
          external_urls?: Json | null
          external_videos?: Json | null
          featured?: boolean | null
          featured_until?: string | null
          full_name?: string | null
          gallery_images?: string[] | null
          gender?: Database["public"]["Enums"]["gender"] | null
          height?: number | null
          hourly_rate?: number | null
          id?: string
          identity_verified?: boolean | null
          imported_at?: string | null
          interests?: string[] | null
          invitation_status?: string | null
          is_active?: boolean | null
          is_ai_profile?: boolean | null
          is_content_creator?: boolean | null
          is_escort?: boolean | null
          is_featured?: boolean | null
          is_verified?: boolean | null
          languages?: string[] | null
          last_active?: string | null
          last_activity?: string | null
          last_boost?: string | null
          last_invitation_sent?: string | null
          last_online?: string | null
          last_scraped_at?: string | null
          last_verification_request?: string | null
          location?: string | null
          looking_for?: string[] | null
          lucoin_balance?: number
          max_stream_quality?: string | null
          measurements?: Json | null
          meta_description?: string | null
          meta_keywords?: string[] | null
          meta_title?: string | null
          moderation_details?: Json | null
          moderation_status?: string | null
          nft_collection?: Json | null
          notification_preferences?: Json | null
          online_status?: boolean | null
          payment_settings?: Json | null
          phone_number?: string | null
          phone_verified?: boolean | null
          ppv_enabled?: boolean | null
          preferred_language?: string | null
          primary_photo?: string | null
          privacy_settings?: Json | null
          profile_completeness?: number | null
          profile_completion_checklist?: Json | null
          profile_views?: number | null
          ranking_points?: number | null
          rates?: Json | null
          rating?: number | null
          rating_avg?: number | null
          region_id?: string | null
          response_time?: unknown | null
          review_count?: number | null
          scrape_metadata?: Json | null
          search_text?: string | null
          security_settings?: Json | null
          service_types?: Database["public"]["Enums"]["service_type"][] | null
          services?: string[] | null
          settings?: Json | null
          sexual_orientation?: string | null
          social_links?: Json | null
          source_platform?: string | null
          status?: Database["public"]["Enums"]["user_status"] | null
          stream_settings?: Json | null
          streaming_enabled?: boolean | null
          stripe_account_id?: string | null
          stripe_customer_id?: string | null
          subscription_price?: number | null
          subscription_tier?:
            | Database["public"]["Enums"]["subscription_tier"]
            | null
          terms_accepted?: boolean | null
          terms_accepted_at?: string | null
          timezone?: string | null
          total_earnings?: number | null
          username?: string | null
          verification_date?: string | null
          verification_documents?: Json | null
          verification_level?:
            | Database["public"]["Enums"]["verification_level"]
            | null
          verification_required?: boolean | null
          verification_status?:
            | Database["public"]["Enums"]["user_status"]
            | null
          verification_submitted?: boolean | null
          verified_badges?: string[] | null
          virtual_availability?: Json | null
          virtual_room_access?: Json | null
          virtual_room_settings?: Json | null
          virtual_services?: Json | null
          weight?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_region_id_fkey"
            columns: ["region_id"]
            isOneToOne: false
            referencedRelation: "regions"
            referencedColumns: ["id"]
          },
        ]
      }
      regional_settings: {
        Row: {
          compliance_rules: Json | null
          created_at: string | null
          currency: string | null
          id: string
          language: string | null
          name: string
          region_code: string
          timezone: string
          updated_at: string | null
        }
        Insert: {
          compliance_rules?: Json | null
          created_at?: string | null
          currency?: string | null
          id?: string
          language?: string | null
          name: string
          region_code: string
          timezone: string
          updated_at?: string | null
        }
        Update: {
          compliance_rules?: Json | null
          created_at?: string | null
          currency?: string | null
          id?: string
          language?: string | null
          name?: string
          region_code?: string
          timezone?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      regions: {
        Row: {
          city_name: string | null
          country_code: string
          country_name: string
          created_at: string | null
          id: string
          is_active: boolean | null
          updated_at: string | null
        }
        Insert: {
          city_name?: string | null
          country_code: string
          country_name: string
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          updated_at?: string | null
        }
        Update: {
          city_name?: string | null
          country_code?: string
          country_name?: string
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          updated_at?: string | null
        }
        Relationships: []
      }
      reports: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          reason: string
          reported_id: string | null
          reporter_id: string | null
          resolved_at: string | null
          resolver_id: string | null
          status: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          reason: string
          reported_id?: string | null
          reporter_id?: string | null
          resolved_at?: string | null
          resolver_id?: string | null
          status?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          reason?: string
          reported_id?: string | null
          reporter_id?: string | null
          resolved_at?: string | null
          resolver_id?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reports_reported_id_fkey"
            columns: ["reported_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reports_reporter_id_fkey"
            columns: ["reporter_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reports_resolver_id_fkey"
            columns: ["resolver_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      reviews: {
        Row: {
          comment: string | null
          created_at: string | null
          escort_id: string | null
          id: string
          rating: number
          reviewer_id: string | null
          updated_at: string | null
        }
        Insert: {
          comment?: string | null
          created_at?: string | null
          escort_id?: string | null
          id?: string
          rating: number
          reviewer_id?: string | null
          updated_at?: string | null
        }
        Update: {
          comment?: string | null
          created_at?: string | null
          escort_id?: string | null
          id?: string
          rating?: number
          reviewer_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reviews_escort_id_fkey"
            columns: ["escort_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_reviewer_id_fkey"
            columns: ["reviewer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      role_audit_log: {
        Row: {
          action: string
          admin_id: string
          created_at: string | null
          id: string
          metadata: Json | null
          role: string
          user_id: string
        }
        Insert: {
          action: string
          admin_id: string
          created_at?: string | null
          id?: string
          metadata?: Json | null
          role: string
          user_id: string
        }
        Update: {
          action?: string
          admin_id?: string
          created_at?: string | null
          id?: string
          metadata?: Json | null
          role?: string
          user_id?: string
        }
        Relationships: []
      }
      route_shares: {
        Row: {
          created_at: string
          end_location: Json
          expires_at: string
          id: string
          metadata: Json | null
          shared_with: string[] | null
          start_location: Json
          status: string
          updated_at: string
          user_id: string
          waypoints: Json[] | null
        }
        Insert: {
          created_at?: string
          end_location: Json
          expires_at: string
          id?: string
          metadata?: Json | null
          shared_with?: string[] | null
          start_location: Json
          status?: string
          updated_at?: string
          user_id: string
          waypoints?: Json[] | null
        }
        Update: {
          created_at?: string
          end_location?: Json
          expires_at?: string
          id?: string
          metadata?: Json | null
          shared_with?: string[] | null
          start_location?: Json
          status?: string
          updated_at?: string
          user_id?: string
          waypoints?: Json[] | null
        }
        Relationships: []
      }
      routes: {
        Row: {
          created_at: string
          current_location: Json | null
          end_location: Json
          ended_at: string | null
          id: string
          scheduled_time: string | null
          start_location: Json
          started_at: string | null
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          current_location?: Json | null
          end_location: Json
          ended_at?: string | null
          id?: string
          scheduled_time?: string | null
          start_location: Json
          started_at?: string | null
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          current_location?: Json | null
          end_location?: Json
          ended_at?: string | null
          id?: string
          scheduled_time?: string | null
          start_location?: Json
          started_at?: string | null
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "routes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      scraping_errors: {
        Row: {
          attempted_at: string | null
          created_at: string | null
          error_details: Json | null
          error_message: string
          id: string
          platform: string | null
          region_id: string | null
          resolution_notes: string | null
          resolved_at: string | null
        }
        Insert: {
          attempted_at?: string | null
          created_at?: string | null
          error_details?: Json | null
          error_message: string
          id?: string
          platform?: string | null
          region_id?: string | null
          resolution_notes?: string | null
          resolved_at?: string | null
        }
        Update: {
          attempted_at?: string | null
          created_at?: string | null
          error_details?: Json | null
          error_message?: string
          id?: string
          platform?: string | null
          region_id?: string | null
          resolution_notes?: string | null
          resolved_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "scraping_errors_region_id_fkey"
            columns: ["region_id"]
            isOneToOne: false
            referencedRelation: "regions"
            referencedColumns: ["id"]
          },
        ]
      }
      scraping_schedules: {
        Row: {
          created_at: string | null
          created_by: string | null
          filters: Json | null
          frequency: string
          id: string
          last_run: string | null
          next_run: string | null
          platform: string
          region_id: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          filters?: Json | null
          frequency: string
          id?: string
          last_run?: string | null
          next_run?: string | null
          platform: string
          region_id?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          filters?: Json | null
          frequency?: string
          id?: string
          last_run?: string | null
          next_run?: string | null
          platform?: string
          region_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "scraping_schedules_region_id_fkey"
            columns: ["region_id"]
            isOneToOne: false
            referencedRelation: "regions"
            referencedColumns: ["id"]
          },
        ]
      }
      security_events: {
        Row: {
          created_at: string
          description: string | null
          event_type: string
          id: string
          ip_address: string | null
          metadata: Json | null
          user_agent: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          event_type: string
          id?: string
          ip_address?: string | null
          metadata?: Json | null
          user_agent?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string | null
          event_type?: string
          id?: string
          ip_address?: string | null
          metadata?: Json | null
          user_agent?: string | null
          user_id?: string
        }
        Relationships: []
      }
      security_logs: {
        Row: {
          created_at: string
          description: string | null
          event_type: string
          id: string
          ip_address: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          event_type: string
          id?: string
          ip_address?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          event_type?: string
          id?: string
          ip_address?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      security_preferences: {
        Row: {
          auto_logout_minutes: number | null
          created_at: string | null
          id: string
          location_privacy_radius: number | null
          mfa_enabled: boolean | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          auto_logout_minutes?: number | null
          created_at?: string | null
          id?: string
          location_privacy_radius?: number | null
          mfa_enabled?: boolean | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          auto_logout_minutes?: number | null
          created_at?: string | null
          id?: string
          location_privacy_radius?: number | null
          mfa_enabled?: boolean | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      solana_wallets: {
        Row: {
          created_at: string | null
          id: string
          is_primary: boolean | null
          last_used_at: string | null
          user_id: string
          wallet_address: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_primary?: boolean | null
          last_used_at?: string | null
          user_id: string
          wallet_address: string
        }
        Update: {
          created_at?: string | null
          id?: string
          is_primary?: boolean | null
          last_used_at?: string | null
          user_id?: string
          wallet_address?: string
        }
        Relationships: []
      }
      space_decorations: {
        Row: {
          created_at: string | null
          id: string
          model_url: string
          name: string
          position: Json | null
          rotation: Json | null
          scale: Json | null
          space_id: string
          thumbnail_url: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          model_url: string
          name: string
          position?: Json | null
          rotation?: Json | null
          scale?: Json | null
          space_id: string
          thumbnail_url?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          model_url?: string
          name?: string
          position?: Json | null
          rotation?: Json | null
          scale?: Json | null
          space_id?: string
          thumbnail_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "space_decorations_space_id_fkey"
            columns: ["space_id"]
            isOneToOne: false
            referencedRelation: "spaces"
            referencedColumns: ["id"]
          },
        ]
      }
      space_messages: {
        Row: {
          content: string
          created_at: string | null
          id: string
          instance_id: string
          message_type: string | null
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          instance_id: string
          message_type?: string | null
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          instance_id?: string
          message_type?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_instance"
            columns: ["instance_id"]
            isOneToOne: false
            referencedRelation: "virtual_spaces"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_space_messages_instance"
            columns: ["instance_id"]
            isOneToOne: false
            referencedRelation: "world_instances"
            referencedColumns: ["id"]
          },
        ]
      }
      space_presence: {
        Row: {
          id: string
          last_active: string | null
          position: Json | null
          rotation: Json | null
          space_id: string
          status: string | null
          user_id: string
        }
        Insert: {
          id?: string
          last_active?: string | null
          position?: Json | null
          rotation?: Json | null
          space_id: string
          status?: string | null
          user_id: string
        }
        Update: {
          id?: string
          last_active?: string | null
          position?: Json | null
          rotation?: Json | null
          space_id?: string
          status?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "space_presence_space_id_fkey"
            columns: ["space_id"]
            isOneToOne: false
            referencedRelation: "spaces"
            referencedColumns: ["id"]
          },
        ]
      }
      spaces: {
        Row: {
          created_at: string | null
          created_by: string | null
          description: string | null
          id: string
          name: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          name: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      subscriptions: {
        Row: {
          amount: number
          auto_renew: boolean | null
          creator_id: string | null
          ends_at: string | null
          id: string
          price_paid: number
          started_at: string
          status: string | null
          subscriber_id: string | null
          tier: Database["public"]["Enums"]["subscription_tier"]
        }
        Insert: {
          amount?: number
          auto_renew?: boolean | null
          creator_id?: string | null
          ends_at?: string | null
          id?: string
          price_paid: number
          started_at?: string
          status?: string | null
          subscriber_id?: string | null
          tier?: Database["public"]["Enums"]["subscription_tier"]
        }
        Update: {
          amount?: number
          auto_renew?: boolean | null
          creator_id?: string | null
          ends_at?: string | null
          id?: string
          price_paid?: number
          started_at?: string
          status?: string | null
          subscriber_id?: string | null
          tier?: Database["public"]["Enums"]["subscription_tier"]
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_creator_id_fkey"
            columns: ["creator_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subscriptions_subscriber_id_fkey"
            columns: ["subscriber_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      system_configurations: {
        Row: {
          category: string
          created_at: string | null
          description: string | null
          id: string
          key: string
          updated_at: string | null
          updated_by: string | null
          value: Json
        }
        Insert: {
          category: string
          created_at?: string | null
          description?: string | null
          id?: string
          key: string
          updated_at?: string | null
          updated_by?: string | null
          value: Json
        }
        Update: {
          category?: string
          created_at?: string | null
          description?: string | null
          id?: string
          key?: string
          updated_at?: string | null
          updated_by?: string | null
          value?: Json
        }
        Relationships: []
      }
      system_health_metrics: {
        Row: {
          details: Json | null
          id: string
          metric_name: string
          metric_value: number | null
          recorded_at: string | null
          status: string | null
        }
        Insert: {
          details?: Json | null
          id?: string
          metric_name: string
          metric_value?: number | null
          recorded_at?: string | null
          status?: string | null
        }
        Update: {
          details?: Json | null
          id?: string
          metric_name?: string
          metric_value?: number | null
          recorded_at?: string | null
          status?: string | null
        }
        Relationships: []
      }
      system_settings: {
        Row: {
          category: string
          id: string
          key: string
          updated_at: string | null
          updated_by: string | null
          value: Json | null
        }
        Insert: {
          category: string
          id?: string
          key: string
          updated_at?: string | null
          updated_by?: string | null
          value?: Json | null
        }
        Update: {
          category?: string
          id?: string
          key?: string
          updated_at?: string | null
          updated_by?: string | null
          value?: Json | null
        }
        Relationships: []
      }
      tips: {
        Row: {
          amount: number
          created_at: string
          id: string
          message: string | null
          receiver_id: string
          sender_id: string
          stream_id: string | null
        }
        Insert: {
          amount: number
          created_at?: string
          id?: string
          message?: string | null
          receiver_id: string
          sender_id: string
          stream_id?: string | null
        }
        Update: {
          amount?: number
          created_at?: string
          id?: string
          message?: string | null
          receiver_id?: string
          sender_id?: string
          stream_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tips_receiver_id_fkey"
            columns: ["receiver_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tips_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tips_stream_id_fkey"
            columns: ["stream_id"]
            isOneToOne: false
            referencedRelation: "live_streams"
            referencedColumns: ["id"]
          },
        ]
      }
      tracking_sessions: {
        Row: {
          appointment_id: string
          client_id: string
          created_at: string | null
          current_location: Json | null
          encryption_key: string | null
          end_time: string | null
          escort_id: string
          id: string
          is_active: boolean | null
          last_updated: string | null
          start_time: string | null
        }
        Insert: {
          appointment_id: string
          client_id: string
          created_at?: string | null
          current_location?: Json | null
          encryption_key?: string | null
          end_time?: string | null
          escort_id: string
          id?: string
          is_active?: boolean | null
          last_updated?: string | null
          start_time?: string | null
        }
        Update: {
          appointment_id?: string
          client_id?: string
          created_at?: string | null
          current_location?: Json | null
          encryption_key?: string | null
          end_time?: string | null
          escort_id?: string
          id?: string
          is_active?: boolean | null
          last_updated?: string | null
          start_time?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tracking_sessions_appointment_id_fkey"
            columns: ["appointment_id"]
            isOneToOne: false
            referencedRelation: "appointments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tracking_sessions_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tracking_sessions_escort_id_fkey"
            columns: ["escort_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      trades: {
        Row: {
          created_at: string
          description: string | null
          id: string
          price: number | null
          route_id: string | null
          status: string
          type: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          price?: number | null
          route_id?: string | null
          status?: string
          type: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          price?: number | null
          route_id?: string | null
          status?: string
          type?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "trades_route_id_fkey"
            columns: ["route_id"]
            isOneToOne: false
            referencedRelation: "routes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "trades_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      transactions: {
        Row: {
          amount: number
          created_at: string | null
          id: string
          metadata: Json | null
          status: string
          type: string
          wallet_id: string | null
        }
        Insert: {
          amount: number
          created_at?: string | null
          id?: string
          metadata?: Json | null
          status: string
          type: string
          wallet_id?: string | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          id?: string
          metadata?: Json | null
          status?: string
          type?: string
          wallet_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "transactions_wallet_id_fkey"
            columns: ["wallet_id"]
            isOneToOne: false
            referencedRelation: "wallets"
            referencedColumns: ["id"]
          },
        ]
      }
      user_avatars: {
        Row: {
          created_at: string | null
          current_world_id: string | null
          customization: Json | null
          id: string
          last_active: string | null
          position: Json | null
          rotation: Json | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          current_world_id?: string | null
          customization?: Json | null
          id?: string
          last_active?: string | null
          position?: Json | null
          rotation?: Json | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          current_world_id?: string | null
          customization?: Json | null
          id?: string
          last_active?: string | null
          position?: Json | null
          rotation?: Json | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_avatars_current_world_id_fkey"
            columns: ["current_world_id"]
            isOneToOne: false
            referencedRelation: "virtual_worlds"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_avatars_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_devices: {
        Row: {
          created_at: string | null
          device_name: string
          device_type: string
          id: string
          ip_address: string | null
          is_trusted: boolean | null
          last_login: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          device_name: string
          device_type: string
          id?: string
          ip_address?: string | null
          is_trusted?: boolean | null
          last_login?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          device_name?: string
          device_type?: string
          id?: string
          ip_address?: string | null
          is_trusted?: boolean | null
          last_login?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      user_notification_settings: {
        Row: {
          category_id: string | null
          created_at: string | null
          enabled: boolean | null
          id: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          category_id?: string | null
          created_at?: string | null
          enabled?: boolean | null
          id?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          category_id?: string | null
          created_at?: string | null
          enabled?: boolean | null
          id?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_notification_settings_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "notification_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      user_preferences: {
        Row: {
          created_at: string | null
          id: string
          max_age: number | null
          max_distance: number | null
          min_age: number | null
          preferred_gender: string[] | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          max_age?: number | null
          max_distance?: number | null
          min_age?: number | null
          preferred_gender?: string[] | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          max_age?: number | null
          max_distance?: number | null
          min_age?: number | null
          preferred_gender?: string[] | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          panel_type: Database["public"]["Enums"]["panel_type"] | null
          role: Database["public"]["Enums"]["user_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          panel_type?: Database["public"]["Enums"]["panel_type"] | null
          role: Database["public"]["Enums"]["user_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          panel_type?: Database["public"]["Enums"]["panel_type"] | null
          role?: Database["public"]["Enums"]["user_role"]
          user_id?: string
        }
        Relationships: []
      }
      verification_codes: {
        Row: {
          code: string
          created_at: string | null
          expires_at: string
          id: string
          type: string
          user_id: string
          verified_at: string | null
        }
        Insert: {
          code: string
          created_at?: string | null
          expires_at: string
          id?: string
          type: string
          user_id: string
          verified_at?: string | null
        }
        Update: {
          code?: string
          created_at?: string | null
          expires_at?: string
          id?: string
          type?: string
          user_id?: string
          verified_at?: string | null
        }
        Relationships: []
      }
      verification_details: {
        Row: {
          address: string | null
          created_at: string | null
          date_of_birth: string | null
          id: string
          id_number: string | null
          id_type: string
          updated_at: string | null
          user_id: string
          verification_id: string
          verified_name: string | null
        }
        Insert: {
          address?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          id?: string
          id_number?: string | null
          id_type: string
          updated_at?: string | null
          user_id: string
          verification_id: string
          verified_name?: string | null
        }
        Update: {
          address?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          id?: string
          id_number?: string | null
          id_type?: string
          updated_at?: string | null
          user_id?: string
          verification_id?: string
          verified_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "verification_details_verification_id_fkey"
            columns: ["verification_id"]
            isOneToOne: false
            referencedRelation: "verification_requests"
            referencedColumns: ["id"]
          },
        ]
      }
      verification_documents: {
        Row: {
          document_type: string
          file_path: string
          id: string
          reviewed_at: string | null
          reviewed_by: string | null
          reviewer_notes: string | null
          status: string | null
          uploaded_at: string | null
          verification_request_id: string
        }
        Insert: {
          document_type: string
          file_path: string
          id?: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          reviewer_notes?: string | null
          status?: string | null
          uploaded_at?: string | null
          verification_request_id: string
        }
        Update: {
          document_type?: string
          file_path?: string
          id?: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          reviewer_notes?: string | null
          status?: string | null
          uploaded_at?: string | null
          verification_request_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "verification_documents_verification_request_id_fkey"
            columns: ["verification_request_id"]
            isOneToOne: false
            referencedRelation: "verification_requests"
            referencedColumns: ["id"]
          },
        ]
      }
      verification_requests: {
        Row: {
          created_at: string | null
          documents: Json | null
          expires_at: string | null
          id: string
          profile_id: string | null
          requested_level: Database["public"]["Enums"]["verification_level"]
          reviewed_at: string | null
          reviewed_by: string | null
          reviewer_notes: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          documents?: Json | null
          expires_at?: string | null
          id?: string
          profile_id?: string | null
          requested_level: Database["public"]["Enums"]["verification_level"]
          reviewed_at?: string | null
          reviewed_by?: string | null
          reviewer_notes?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          documents?: Json | null
          expires_at?: string | null
          id?: string
          profile_id?: string | null
          requested_level?: Database["public"]["Enums"]["verification_level"]
          reviewed_at?: string | null
          reviewed_by?: string | null
          reviewer_notes?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "verification_requests_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "verification_requests_reviewed_by_fkey"
            columns: ["reviewed_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      verifications: {
        Row: {
          created_at: string | null
          id: string
          metadata: Json | null
          status: string
          type: string
          user_id: string | null
          verified_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          metadata?: Json | null
          status: string
          type: string
          user_id?: string | null
          verified_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          metadata?: Json | null
          status?: string
          type?: string
          user_id?: string | null
          verified_at?: string | null
        }
        Relationships: []
      }
      video_rooms: {
        Row: {
          appointment_id: string | null
          created_at: string
          ended_at: string | null
          id: string
          metadata: Json | null
          room_code: string
          started_at: string | null
          status: Database["public"]["Enums"]["video_room_status"] | null
        }
        Insert: {
          appointment_id?: string | null
          created_at?: string
          ended_at?: string | null
          id?: string
          metadata?: Json | null
          room_code: string
          started_at?: string | null
          status?: Database["public"]["Enums"]["video_room_status"] | null
        }
        Update: {
          appointment_id?: string | null
          created_at?: string
          ended_at?: string | null
          id?: string
          metadata?: Json | null
          room_code?: string
          started_at?: string | null
          status?: Database["public"]["Enums"]["video_room_status"] | null
        }
        Relationships: [
          {
            foreignKeyName: "video_rooms_appointment_id_fkey"
            columns: ["appointment_id"]
            isOneToOne: false
            referencedRelation: "virtual_appointments"
            referencedColumns: ["id"]
          },
        ]
      }
      virtual_appointments: {
        Row: {
          appointment_type: string
          client_id: string | null
          created_at: string
          creator_id: string | null
          duration: unknown
          id: string
          metadata: Json | null
          price: number
          room_id: string | null
          start_time: string
          status: string | null
        }
        Insert: {
          appointment_type: string
          client_id?: string | null
          created_at?: string
          creator_id?: string | null
          duration: unknown
          id?: string
          metadata?: Json | null
          price?: number
          room_id?: string | null
          start_time: string
          status?: string | null
        }
        Update: {
          appointment_type?: string
          client_id?: string | null
          created_at?: string
          creator_id?: string | null
          duration?: unknown
          id?: string
          metadata?: Json | null
          price?: number
          room_id?: string | null
          start_time?: string
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "virtual_appointments_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "virtual_appointments_creator_id_fkey"
            columns: ["creator_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      virtual_assets: {
        Row: {
          asset_type: string
          created_at: string
          created_by: string | null
          file_url: string
          id: string
          metadata: Json | null
          name: string
          updated_at: string
        }
        Insert: {
          asset_type: string
          created_at?: string
          created_by?: string | null
          file_url: string
          id?: string
          metadata?: Json | null
          name: string
          updated_at?: string
        }
        Update: {
          asset_type?: string
          created_at?: string
          created_by?: string | null
          file_url?: string
          id?: string
          metadata?: Json | null
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      virtual_events: {
        Row: {
          created_at: string
          creator_id: string | null
          current_participants: number | null
          description: string | null
          end_time: string | null
          event_type: string
          id: string
          max_participants: number | null
          metadata: Json | null
          price: number
          start_time: string
          status: string | null
          title: string
        }
        Insert: {
          created_at?: string
          creator_id?: string | null
          current_participants?: number | null
          description?: string | null
          end_time?: string | null
          event_type: string
          id?: string
          max_participants?: number | null
          metadata?: Json | null
          price?: number
          start_time: string
          status?: string | null
          title: string
        }
        Update: {
          created_at?: string
          creator_id?: string | null
          current_participants?: number | null
          description?: string | null
          end_time?: string | null
          event_type?: string
          id?: string
          max_participants?: number | null
          metadata?: Json | null
          price?: number
          start_time?: string
          status?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "virtual_events_creator_id_fkey"
            columns: ["creator_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      virtual_space_assets: {
        Row: {
          asset_id: string | null
          created_at: string
          id: string
          position: Json | null
          rotation: Json | null
          scale: Json | null
          space_id: string | null
        }
        Insert: {
          asset_id?: string | null
          created_at?: string
          id?: string
          position?: Json | null
          rotation?: Json | null
          scale?: Json | null
          space_id?: string | null
        }
        Update: {
          asset_id?: string | null
          created_at?: string
          id?: string
          position?: Json | null
          rotation?: Json | null
          scale?: Json | null
          space_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "virtual_space_assets_asset_id_fkey"
            columns: ["asset_id"]
            isOneToOne: false
            referencedRelation: "virtual_assets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "virtual_space_assets_space_id_fkey"
            columns: ["space_id"]
            isOneToOne: false
            referencedRelation: "virtual_spaces"
            referencedColumns: ["id"]
          },
        ]
      }
      virtual_spaces: {
        Row: {
          access_level: Database["public"]["Enums"]["access_level"]
          capacity: number
          created_at: string | null
          created_by: string | null
          current_users: number
          custom_models: Json | null
          default_environment_asset_id: string | null
          description: string | null
          environment_config: Json | null
          id: string
          is_featured: boolean | null
          max_users: number | null
          metadata: Json | null
          name: string
          owner_id: string | null
          scene_data: Json | null
          space_type: Database["public"]["Enums"]["space_type"]
          tags: string[] | null
          thumbnail_url: string | null
          updated_at: string | null
        }
        Insert: {
          access_level?: Database["public"]["Enums"]["access_level"]
          capacity?: number
          created_at?: string | null
          created_by?: string | null
          current_users?: number
          custom_models?: Json | null
          default_environment_asset_id?: string | null
          description?: string | null
          environment_config?: Json | null
          id?: string
          is_featured?: boolean | null
          max_users?: number | null
          metadata?: Json | null
          name: string
          owner_id?: string | null
          scene_data?: Json | null
          space_type: Database["public"]["Enums"]["space_type"]
          tags?: string[] | null
          thumbnail_url?: string | null
          updated_at?: string | null
        }
        Update: {
          access_level?: Database["public"]["Enums"]["access_level"]
          capacity?: number
          created_at?: string | null
          created_by?: string | null
          current_users?: number
          custom_models?: Json | null
          default_environment_asset_id?: string | null
          description?: string | null
          environment_config?: Json | null
          id?: string
          is_featured?: boolean | null
          max_users?: number | null
          metadata?: Json | null
          name?: string
          owner_id?: string | null
          scene_data?: Json | null
          space_type?: Database["public"]["Enums"]["space_type"]
          tags?: string[] | null
          thumbnail_url?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "virtual_spaces_default_environment_asset_id_fkey"
            columns: ["default_environment_asset_id"]
            isOneToOne: false
            referencedRelation: "virtual_assets"
            referencedColumns: ["id"]
          },
        ]
      }
      virtual_worlds: {
        Row: {
          capacity: number | null
          created_at: string | null
          creator_id: string | null
          description: string | null
          id: string
          is_private: boolean | null
          name: string
          physics_enabled: boolean | null
          scene_data: Json
          thumbnail_url: string | null
          updated_at: string | null
          world_type: Database["public"]["Enums"]["world_type"]
        }
        Insert: {
          capacity?: number | null
          created_at?: string | null
          creator_id?: string | null
          description?: string | null
          id?: string
          is_private?: boolean | null
          name: string
          physics_enabled?: boolean | null
          scene_data?: Json
          thumbnail_url?: string | null
          updated_at?: string | null
          world_type: Database["public"]["Enums"]["world_type"]
        }
        Update: {
          capacity?: number | null
          created_at?: string | null
          creator_id?: string | null
          description?: string | null
          id?: string
          is_private?: boolean | null
          name?: string
          physics_enabled?: boolean | null
          scene_data?: Json
          thumbnail_url?: string | null
          updated_at?: string | null
          world_type?: Database["public"]["Enums"]["world_type"]
        }
        Relationships: [
          {
            foreignKeyName: "virtual_worlds_creator_id_fkey"
            columns: ["creator_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      wallets: {
        Row: {
          balance: number | null
          created_at: string | null
          currency: string | null
          id: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          balance?: number | null
          created_at?: string | null
          currency?: string | null
          id?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          balance?: number | null
          created_at?: string | null
          currency?: string | null
          id?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      world_assets: {
        Row: {
          asset_type: string
          created_at: string | null
          id: string
          model_url: string
          name: string
          position: Json | null
          properties: Json | null
          rotation: Json | null
          scale: Json | null
          updated_at: string | null
          world_id: string
        }
        Insert: {
          asset_type: string
          created_at?: string | null
          id?: string
          model_url: string
          name: string
          position?: Json | null
          properties?: Json | null
          rotation?: Json | null
          scale?: Json | null
          updated_at?: string | null
          world_id: string
        }
        Update: {
          asset_type?: string
          created_at?: string | null
          id?: string
          model_url?: string
          name?: string
          position?: Json | null
          properties?: Json | null
          rotation?: Json | null
          scale?: Json | null
          updated_at?: string | null
          world_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "world_assets_world_id_fkey"
            columns: ["world_id"]
            isOneToOne: false
            referencedRelation: "virtual_worlds"
            referencedColumns: ["id"]
          },
        ]
      }
      world_instances: {
        Row: {
          created_at: string | null
          current_users: number | null
          id: string
          instance_number: number
          last_activity: string | null
          max_users: number | null
          metadata: Json | null
          status: string | null
          updated_at: string | null
          world_id: string
        }
        Insert: {
          created_at?: string | null
          current_users?: number | null
          id?: string
          instance_number: number
          last_activity?: string | null
          max_users?: number | null
          metadata?: Json | null
          status?: string | null
          updated_at?: string | null
          world_id: string
        }
        Update: {
          created_at?: string | null
          current_users?: number | null
          id?: string
          instance_number?: number
          last_activity?: string | null
          max_users?: number | null
          metadata?: Json | null
          status?: string | null
          updated_at?: string | null
          world_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "world_instances_world_id_fkey"
            columns: ["world_id"]
            isOneToOne: false
            referencedRelation: "virtual_worlds"
            referencedColumns: ["id"]
          },
        ]
      }
      world_interactions: {
        Row: {
          created_at: string | null
          id: string
          interaction_type: string
          metadata: Json | null
          position: Json
          user_id: string
          world_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          interaction_type: string
          metadata?: Json | null
          position?: Json
          user_id: string
          world_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          interaction_type?: string
          metadata?: Json | null
          position?: Json
          user_id?: string
          world_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "world_interactions_world_id_fkey"
            columns: ["world_id"]
            isOneToOne: false
            referencedRelation: "virtual_worlds"
            referencedColumns: ["id"]
          },
        ]
      }
      world_messages: {
        Row: {
          content: string
          created_at: string | null
          id: string
          updated_at: string | null
          user_id: string
          world_id: string
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          updated_at?: string | null
          user_id: string
          world_id: string
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          updated_at?: string | null
          user_id?: string
          world_id?: string
        }
        Relationships: []
      }
      world_presence: {
        Row: {
          id: string
          joined_at: string
          user_id: string
          world_id: string
        }
        Insert: {
          id?: string
          joined_at?: string
          user_id: string
          world_id: string
        }
        Update: {
          id?: string
          joined_at?: string
          user_id?: string
          world_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "world_presence_world_id_fkey"
            columns: ["world_id"]
            isOneToOne: false
            referencedRelation: "virtual_worlds"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      book_slot: {
        Args: { p_slot_id: string; p_client_id: string }
        Returns: Json
      }
      check_metaverse_access: {
        Args: { user_id: string }
        Returns: Database["public"]["Enums"]["metaverse_access_level"]
      }
      check_slot_availability: {
        Args: { p_escort_id: string; p_start_time: string; p_end_time: string }
        Returns: boolean
      }
      check_subscription: {
        Args: { creator_uuid: string }
        Returns: boolean
      }
      cleanup_old_interactions: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      cleanup_old_notifications: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      create_admin_notifications: {
        Args: {
          p_user_id: string
          p_type: string
          p_title: string
          p_message: string
          p_priority: string
          p_action_text: string
          p_action_url: string
        }
        Returns: undefined
      }
      decrement_users: {
        Args: { instance_id: string }
        Returns: number
      }
      expire_boosts: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      get_content_analytics: {
        Args: { start_date: string; end_date: string }
        Returns: Json
      }
      get_security_analytics: {
        Args: { start_date: string; end_date: string }
        Returns: Json
      }
      get_system_config: {
        Args: { p_category: string; p_key: string }
        Returns: Json
      }
      get_system_health: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
      get_user_analytics: {
        Args: { start_date: string; end_date: string }
        Returns: Json
      }
      get_user_roles: {
        Args: { _user_id: string }
        Returns: string[]
      }
      gtrgm_compress: {
        Args: { "": unknown }
        Returns: unknown
      }
      gtrgm_decompress: {
        Args: { "": unknown }
        Returns: unknown
      }
      gtrgm_in: {
        Args: { "": unknown }
        Returns: unknown
      }
      gtrgm_options: {
        Args: { "": unknown }
        Returns: undefined
      }
      gtrgm_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      has_role: {
        Args:
          | { _user_id: string; _role: string }
          | {
              user_id: string
              role_name: Database["public"]["Enums"]["user_role"]
            }
        Returns: boolean
      }
      increment_balance: {
        Args: { user_id: string; amount: number }
        Returns: number
      }
      increment_space_users: {
        Args: { space_id: string; increment_by: number }
        Returns: undefined
      }
      is_admin: {
        Args: { _user_id: string }
        Returns: boolean
      }
      log_admin_action: {
        Args:
          | { action: string; details: Json }
          | {
              p_action_type: string
              p_target_type: string
              p_target_id: string
              p_details: Json
            }
        Returns: undefined
      }
      log_content_view: {
        Args: { content_id: string; viewer_id: string }
        Returns: undefined
      }
      log_metaverse_entry: {
        Args: { p_user_id: string; p_space_id: string; p_session_data?: Json }
        Returns: string
      }
      log_metaverse_exit: {
        Args: { p_log_id: string }
        Returns: undefined
      }
      log_security_event: {
        Args: {
          p_user_id: string
          p_event_type: string
          p_description: string
          p_ip_address: string
          p_user_agent: string
        }
        Returns: string
      }
      process_content_purchase: {
        Args: {
          p_user_id: string
          p_content_id: string
          p_payment_method: string
        }
        Returns: Json
      }
      process_lucoin_transaction: {
        Args:
          | {
              p_user_id: string
              p_amount: number
              p_transaction_type: string
              p_description?: string
              p_metadata?: Json
            }
          | { sender_id: string; receiver_id: string; amount: number }
        Returns: string
      }
      process_subscription_payment: {
        Args: {
          subscriber_uuid: string
          subscription_tier: string
          payment_amount: number
        }
        Returns: boolean
      }
      process_transaction: {
        Args: {
          p_wallet_id: string
          p_amount: number
          p_type: string
          p_metadata?: Json
        }
        Returns: string
      }
      set_limit: {
        Args: { "": number }
        Returns: number
      }
      show_limit: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      show_trgm: {
        Args: { "": string }
        Returns: string[]
      }
      update_system_config: {
        Args: { p_category: string; p_key: string; p_value: Json }
        Returns: undefined
      }
      update_viewer_count: {
        Args: { stream_id: string; count_change: number }
        Returns: undefined
      }
    }
    Enums: {
      access_level: "public" | "premium" | "vip"
      ad_campaign_status:
        | "pending"
        | "active"
        | "paused"
        | "completed"
        | "rejected"
      ad_campaign_type: "banner" | "featured" | "sponsored"
      appointment_status:
        | "pending"
        | "confirmed"
        | "in_progress"
        | "completed"
        | "cancelled"
      asset_type: "model" | "texture" | "material" | "animation"
      avatar_feature_type: "hair" | "eyes" | "skin" | "clothing" | "accessories"
      booking_status: "pending" | "confirmed" | "cancelled" | "completed"
      bot_persona: "friendly" | "professional" | "casual" | "formal"
      content_access: "public" | "subscribers_only" | "ppv"
      content_type: "image" | "video" | "stream"
      gender: "male" | "female" | "other"
      message_status: "sent" | "delivered" | "read" | "failed"
      metaverse_access_level: "basic" | "premium" | "admin"
      moderation_status: "pending" | "approved" | "rejected" | "flagged"
      notification_priority: "low" | "medium" | "high" | "urgent"
      panel_type: "client" | "escort" | "creator" | "admin"
      payment_status: "pending" | "completed" | "failed" | "refunded"
      profile_status: "pending" | "active" | "suspended" | "banned"
      report_type: "inappropriate" | "copyright" | "spam" | "other"
      service_type: "massage" | "companionship" | "escort" | "other"
      space_type: "private_room" | "public_lounge" | "vip_area" | "event_space"
      subscription_status: "active" | "cancelled" | "expired"
      subscription_tier: "free" | "premium"
      transaction_status: "pending" | "completed" | "failed"
      transaction_type: "purchase" | "spend" | "refund" | "bonus"
      user_role:
        | "admin"
        | "client"
        | "creator"
        | "escort"
        | "verification_reviewer"
        | "moderator"
        | "premium"
        | "vip"
        | "ai_companion"
      user_status: "active" | "suspended" | "banned"
      verification_level: "none" | "basic" | "advanced" | "premium"
      verification_status: "pending" | "approved" | "rejected"
      verification_type: "creator" | "escort"
      video_room_status: "waiting" | "active" | "ended"
      world_type:
        | "social"
        | "gaming"
        | "business"
        | "education"
        | "entertainment"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      access_level: ["public", "premium", "vip"],
      ad_campaign_status: [
        "pending",
        "active",
        "paused",
        "completed",
        "rejected",
      ],
      ad_campaign_type: ["banner", "featured", "sponsored"],
      appointment_status: [
        "pending",
        "confirmed",
        "in_progress",
        "completed",
        "cancelled",
      ],
      asset_type: ["model", "texture", "material", "animation"],
      avatar_feature_type: ["hair", "eyes", "skin", "clothing", "accessories"],
      booking_status: ["pending", "confirmed", "cancelled", "completed"],
      bot_persona: ["friendly", "professional", "casual", "formal"],
      content_access: ["public", "subscribers_only", "ppv"],
      content_type: ["image", "video", "stream"],
      gender: ["male", "female", "other"],
      message_status: ["sent", "delivered", "read", "failed"],
      metaverse_access_level: ["basic", "premium", "admin"],
      moderation_status: ["pending", "approved", "rejected", "flagged"],
      notification_priority: ["low", "medium", "high", "urgent"],
      panel_type: ["client", "escort", "creator", "admin"],
      payment_status: ["pending", "completed", "failed", "refunded"],
      profile_status: ["pending", "active", "suspended", "banned"],
      report_type: ["inappropriate", "copyright", "spam", "other"],
      service_type: ["massage", "companionship", "escort", "other"],
      space_type: ["private_room", "public_lounge", "vip_area", "event_space"],
      subscription_status: ["active", "cancelled", "expired"],
      subscription_tier: ["free", "premium"],
      transaction_status: ["pending", "completed", "failed"],
      transaction_type: ["purchase", "spend", "refund", "bonus"],
      user_role: [
        "admin",
        "client",
        "creator",
        "escort",
        "verification_reviewer",
        "moderator",
        "premium",
        "vip",
        "ai_companion",
      ],
      user_status: ["active", "suspended", "banned"],
      verification_level: ["none", "basic", "advanced", "premium"],
      verification_status: ["pending", "approved", "rejected"],
      verification_type: ["creator", "escort"],
      video_room_status: ["waiting", "active", "ended"],
      world_type: [
        "social",
        "gaming",
        "business",
        "education",
        "entertainment",
      ],
    },
  },
} as const
