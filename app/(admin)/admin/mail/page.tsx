"use client";

import React, { useEffect, useState } from 'react';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import api from '@/lib/api';
import { Trash2, Search, Send, CheckCircle, XCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface Mail {
  id: number;
  recipient_email: string;
  subject: string;
  status: 'draft' | 'queued' | 'processing' | 'sent' | 'failed';
  retry_count: number;
  error_message: string | null;
  created_at: string;
}

export default function AdminMailPage() {
  const { user } = useAdminAuth();
  const [mails, setMails] = useState<Mail[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [smtpStatus, setSmtpStatus] = useState<any>(null);
  const [testingSmtp, setTestingSmtp] = useState(false);
  const [processingQueue, setProcessingQueue] = useState(false);

  const fetchMails = async () => {
    setLoading(true);
    try {
      const response = await api.get('/api/mail?limit=100');
      setMails(response.data.items || response.data);
    } catch (error) {
      console.error('Failed to fetch mail', error);
    } finally {
      setLoading(false);
    }
  };

  const checkSmtp = async () => {
    setTestingSmtp(true);
    try {
      const response = await api.get('/api/mail/smtp-status');
      setSmtpStatus(response.data);
    } catch (error) {
      console.error('SMTP Check Failed', error);
      setSmtpStatus({ success: false, message: 'Failed to connect to SMTP server' });
    } finally {
      setTestingSmtp(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchMails();
      checkSmtp();
    }
  }, [user]);

  const handleSendQueued = async () => {
    setProcessingQueue(true);
    try {
      const response = await api.post('/api/mail/send-queued');
      alert(`Sent: ${response.data.sent_count}, Failed: ${response.data.failed_count}`);
      fetchMails();
    } catch (error: any) {
      console.error('Failed to process queue', error);
      alert(error.response?.data?.detail || 'Failed to process queue');
    } finally {
      setProcessingQueue(false);
    }
  };

  const handleSendOne = async (id: number) => {
    try {
      await api.post(`/api/mail/${id}/send`);
      fetchMails();
      alert('Mail sent successfully!');
    } catch (error: any) {
      console.error('Failed to send mail', error);
      alert(error.response?.data?.detail || 'Failed to send mail');
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this mail record?')) {
      try {
        await api.delete(`/api/mail/${id}`);
        fetchMails();
      } catch (error) {
        console.error('Failed to delete mail', error);
      }
    }
  };

  const filteredMails = mails.filter(m => 
    m.recipient_email.toLowerCase().includes(search.toLowerCase()) || 
    m.subject.toLowerCase().includes(search.toLowerCase()) ||
    m.status.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <h1 className="text-2xl font-bold text-gray-900 font-cinzel">Mail Queue</h1>
        <div className="flex space-x-3">
          <Button variant="outline" onClick={checkSmtp} isLoading={testingSmtp}>
            <RefreshCw className="w-4 h-4 mr-2" /> Test SMTP
          </Button>
          <Button onClick={handleSendQueued} isLoading={processingQueue} className="flex items-center">
            <Send className="w-4 h-4 mr-2" /> Process Queue
          </Button>
        </div>
      </div>

      {smtpStatus && (
        <div className={`p-4 rounded-xl shadow-sm ring-1 flex items-center gap-3 ${smtpStatus.success ? 'bg-green-50 ring-green-500/20 text-green-800' : 'bg-red-50 ring-red-500/20 text-red-800'}`}>
          {smtpStatus.success ? <CheckCircle className="w-6 h-6 text-green-500" /> : <XCircle className="w-6 h-6 text-red-500" />}
          <div>
            <h3 className="font-semibold">{smtpStatus.success ? 'SMTP Connection Successful' : 'SMTP Connection Failed'}</h3>
            <p className="text-sm opacity-90">{smtpStatus.message}</p>
          </div>
        </div>
      )}

      <div className="bg-white p-4 rounded-xl shadow-sm ring-1 ring-gray-900/5 flex items-center gap-2">
        <Search className="w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search by recipient, subject, or status..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-transparent border-none focus:ring-0 outline-none text-sm"
        />
      </div>

      <div className="bg-white shadow-sm ring-1 ring-gray-900/5 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Recipient</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status / Error</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-gray-500">Loading mail queue...</td>
                </tr>
              ) : filteredMails.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-gray-500">Queue is empty</td>
                </tr>
              ) : (
                filteredMails.map((mail) => (
                  <tr key={mail.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{mail.recipient_email}</div>
                      <div className="text-xs text-gray-500">{new Date(mail.created_at).toLocaleString()}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 line-clamp-1">{mail.subject}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full capitalize
                        ${mail.status === 'sent' ? 'bg-green-100 text-green-800' : 
                          mail.status === 'failed' ? 'bg-red-100 text-red-800' : 
                          mail.status === 'queued' ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-gray-100 text-gray-800'}`}>
                        {mail.status}
                      </span>
                      {mail.status === 'failed' && mail.error_message && (
                        <div className="text-xs text-red-500 mt-1 line-clamp-2 max-w-xs" title={mail.error_message}>
                          {mail.error_message}
                        </div>
                      )}
                      {mail.retry_count > 0 && (
                        <div className="text-xs text-gray-500 mt-1">Retries: {mail.retry_count}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
                      {(mail.status === 'queued' || mail.status === 'failed' || mail.status === 'draft') && (
                        <button onClick={() => handleSendOne(mail.id)} className="text-blue-600 hover:text-blue-900 inline-flex items-center" title="Send Now">
                          <Send className="w-4 h-4" />
                        </button>
                      )}
                      <button onClick={() => handleDelete(mail.id)} className="text-red-600 hover:text-red-900 inline-flex items-center" title="Delete">
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
