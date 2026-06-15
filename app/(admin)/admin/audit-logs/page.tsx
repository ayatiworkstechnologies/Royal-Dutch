"use client";

import React, { useEffect, useState } from 'react';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import api from '@/lib/api';
import { Search, ShieldAlert, Activity, User, Globe } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface AuditLog {
  id: number;
  user_id: number;
  action: string;
  entity_type: string;
  entity_id: string | null;
  old_value: any | null;
  new_value: any | null;
  ip_address: string | null;
  user_agent: string | null;
  created_at: string;
  user?: {
    name: string;
    email: string;
  };
}

export default function AdminAuditLogsPage() {
  const { user } = useAdminAuth();
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [actionFilter, setActionFilter] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const fetchLogs = async () => {
    setLoading(true);
    setErrorMsg('');
    try {
      const params = new URLSearchParams();
      params.append('limit', '100');
      if (actionFilter) params.append('action', actionFilter);

      const response = await api.get(`/api/v1/audit-logs?${params.toString()}`);
      setLogs(response.data.items || response.data);
    } catch (error: any) {
      console.error('Failed to fetch audit logs', error);
      if (error.response?.status === 403) {
        setErrorMsg('Access Denied. Only Super Admins can view audit logs.');
      } else {
        setErrorMsg('Failed to load audit logs.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchLogs();
    }
  }, [user, actionFilter]);

  const filteredLogs = logs.filter(l => 
    l.action.toLowerCase().includes(search.toLowerCase()) || 
    l.entity_type.toLowerCase().includes(search.toLowerCase()) ||
    (l.user?.name && l.user.name.toLowerCase().includes(search.toLowerCase())) ||
    (l.user?.email && l.user.email.toLowerCase().includes(search.toLowerCase())) ||
    (l.ip_address && l.ip_address.includes(search))
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-cinzel">System Audit Logs</h1>
          <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
            <ShieldAlert className="w-4 h-4" /> Super Admin access required. Logs are read-only.
          </p>
        </div>
        
        <div className="flex space-x-4">
          <select
            value={actionFilter}
            onChange={(e) => setActionFilter(e.target.value)}
            className="border-gray-300 rounded-md shadow-sm focus:ring-[#B48F57] focus:border-[#B48F57] sm:text-sm"
          >
            <option value="">All Actions</option>
            <option value="create">Create</option>
            <option value="update">Update</option>
            <option value="delete">Delete</option>
            <option value="login">Login</option>
            <option value="send">Send (Mail)</option>
          </select>
        </div>
      </div>

      {errorMsg ? (
        <div className="bg-red-50 text-red-800 p-6 rounded-xl flex items-center justify-center border border-red-200">
          <ShieldAlert className="w-6 h-6 mr-3 text-red-500" />
          <span className="font-medium">{errorMsg}</span>
        </div>
      ) : (
        <>
          <div className="bg-white p-4 rounded-xl shadow-sm ring-1 ring-gray-900/5 flex items-center gap-2">
            <Search className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search logs by user, action, entity, or IP address..."
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
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actor</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action & Entity</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">IP / Context</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {loading ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center text-gray-500">Loading audit logs...</td>
                    </tr>
                  ) : filteredLogs.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center text-gray-500">No logs found</td>
                    </tr>
                  ) : (
                    filteredLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{new Date(log.created_at).toLocaleString()}</div>
                          <div className="text-xs text-gray-500 font-mono mt-1">ID: {log.id}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-2">
                            <User className="w-4 h-4 text-gray-400" />
                            <div>
                              <div className="text-sm font-medium text-gray-900">{log.user?.name || `User ID: ${log.user_id}`}</div>
                              {log.user?.email && <div className="text-xs text-gray-500">{log.user.email}</div>}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-2">
                            <Activity className="w-4 h-4 text-[#B48F57]" />
                            <span className="text-sm font-bold capitalize text-gray-900">{log.action}</span>
                          </div>
                          <div className="text-sm text-gray-500 mt-1">
                            {log.entity_type} {log.entity_id ? `(#${log.entity_id})` : ''}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-2 text-sm text-gray-900">
                            <Globe className="w-4 h-4 text-gray-400" />
                            <span>{log.ip_address || 'N/A'}</span>
                          </div>
                          {log.user_agent && (
                            <div className="text-xs text-gray-500 mt-1 truncate max-w-[150px]" title={log.user_agent}>
                              {log.user_agent.split(' ')[0]}
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-xs font-mono text-gray-500 max-h-24 overflow-y-auto max-w-xs whitespace-pre-wrap break-words bg-gray-50 p-2 rounded border border-gray-100">
                            {log.new_value && <div><span className="font-semibold text-gray-700">Changes:</span> {JSON.stringify(log.new_value)}</div>}
                            {!log.new_value && !log.old_value && <span>No data payload</span>}
                            {log.old_value && !log.new_value && <div><span className="font-semibold text-gray-700">Deleted Data:</span> {JSON.stringify(log.old_value)}</div>}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
