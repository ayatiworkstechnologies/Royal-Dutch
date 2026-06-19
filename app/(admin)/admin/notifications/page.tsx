"use client";

import React, { useEffect, useState } from 'react';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import api from '@/lib/api';
import { useAlert } from '@/context/AlertContext';
import { Trash2, Search, Bell, MessageSquare, Mail, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface Notification {
  id: number;
  user_id: number;
  title: string;
  message: string;
  channel: string;
  status: string;
  read: boolean;
  created_at: string;
}

export default function AdminNotificationsPage() {
  const { user } = useAdminAuth();
  const { success: toastSuccess, error: toastError, warning: toastWarning, info: toastInfo, confirm: confirmDialog } = useAlert();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const response = await api.get('/api/notifications?limit=100');
      setNotifications(response.data.items || response.data);
    } catch (error) {
      console.error('Failed to fetch notifications', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchNotifications();
    }
  }, [user]);

  const handleDelete = async (id: number) => {
    if (!(await confirmDialog({ title: 'Delete Notification', message: 'Are you sure you want to delete this notification?', danger: true, confirmLabel: 'Delete' }))) return;
    try {
      await api.delete(`/api/notifications/${id}`);
      fetchNotifications();
    } catch (error) {
      console.error('Failed to delete notification', error);
    }
  };

  const getChannelIcon = (channel: string | null) => {
    if (!channel) return <AlertCircle className="w-5 h-5 text-slate-500" />;
    switch (channel.toLowerCase()) {
      case 'email': return <Mail className="w-5 h-5 text-blue-500" />;
      case 'whatsapp': return <MessageSquare className="w-5 h-5 text-green-500" />;
      case 'dashboard': return <Bell className="w-5 h-5 text-purple-500" />;
      default: return <AlertCircle className="w-5 h-5 text-slate-500" />;
    }
  };

  const filteredNotifications = notifications.filter(n => 
    (n.title && n.title.toLowerCase().includes(search.toLowerCase())) || 
    (n.message && n.message.toLowerCase().includes(search.toLowerCase())) ||
    (n.channel && n.channel.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <h1 className="text-4xl font-bold text-slate-900 font-primary tracking-tight mb-2">Notifications Log</h1>
      </div>

      <div className="glass-panel p-6 rounded-3xl shadow-soft flex items-center gap-2">
        <Search className="w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search by title, message, or channel..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-transparent border-none focus:ring-0 outline-none text-sm"
        />
      </div>

      <div className="glass-panel shadow-soft rounded-3xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-slate-50/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Channel & Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Title / Content</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white/20 divide-y divide-slate-100/60">
              {loading ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-slate-500">Loading notifications...</td>
                </tr>
              ) : filteredNotifications.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-slate-500">No notifications found</td>
                </tr>
              ) : (
                filteredNotifications.map((notification) => (
                  <tr key={notification.id} className="hover:bg-white/60 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        {getChannelIcon(notification.channel)}
                        <span className="text-sm font-medium text-slate-800 capitalize">{notification.channel}</span>
                      </div>
                      <div className="text-xs text-slate-500 mt-1">{new Date(notification.created_at).toLocaleString()}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-slate-800 flex items-center space-x-2">
                        <span>{notification.title}</span>
                        {!notification.read && notification.channel === 'dashboard' && (
                          <span className="w-2 h-2 rounded-full bg-[#B48F57]"></span>
                        )}
                      </div>
                      <div className="text-sm text-slate-500 mt-1 line-clamp-2">{notification.message}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full capitalize
                        ${notification.status === 'sent' ? 'bg-green-100/80 text-green-800 border border-green-200' : 
                          notification.status === 'failed' ? 'bg-red-100/80 text-red-800 border border-red-200' : 
                          'bg-yellow-100/80 text-yellow-800 border border-yellow-200'}`}>
                        {notification.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
                      <button onClick={() => handleDelete(notification.id)} className="text-red-600 hover:text-red-900 inline-flex items-center" title="Delete">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
