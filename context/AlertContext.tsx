"use client";

import React, { createContext, useCallback, useContext, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  CheckCircle2, XCircle, AlertTriangle, Info, X,
  AlertCircle, Trash2,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

type ToastType = "success" | "error" | "warning" | "info";

interface Toast {
  id: number;
  type: ToastType;
  title: string;
  message?: string;
}

interface ConfirmOptions {
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  danger?: boolean;
}

interface AlertContextValue {
  toast: (type: ToastType, title: string, message?: string) => void;
  success: (title: string, message?: string) => void;
  error: (title: string, message?: string) => void;
  warning: (title: string, message?: string) => void;
  info: (title: string, message?: string) => void;
  confirm: (options: ConfirmOptions) => Promise<boolean>;
}

// ─── Context ─────────────────────────────────────────────────────────────────

const AlertContext = createContext<AlertContextValue | null>(null);

export function useAlert() {
  const ctx = useContext(AlertContext);
  if (!ctx) throw new Error("useAlert must be used inside AlertProvider");
  return ctx;
}

// ─── Toast config ─────────────────────────────────────────────────────────────

const TOAST_CFG: Record<ToastType, { icon: React.ElementType; bar: string; icon_cls: string }> = {
  success: { icon: CheckCircle2,   bar: "bg-green-500",  icon_cls: "text-green-500" },
  error:   { icon: XCircle,        bar: "bg-red-500",    icon_cls: "text-red-500" },
  warning: { icon: AlertTriangle,  bar: "bg-amber-500",  icon_cls: "text-amber-500" },
  info:    { icon: Info,           bar: "bg-blue-500",   icon_cls: "text-blue-500" },
};

// ─── Provider ────────────────────────────────────────────────────────────────

export function AlertProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [confirmState, setConfirmState] = useState<(ConfirmOptions & { resolve: (v: boolean) => void }) | null>(null);
  const counter = useRef(0);

  const removeToast = useCallback((id: number) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const toast = useCallback((type: ToastType, title: string, message?: string) => {
    const id = ++counter.current;
    setToasts(prev => [...prev, { id, type, title, message }]);
    setTimeout(() => removeToast(id), 4500);
  }, [removeToast]);

  const success = useCallback((t: string, m?: string) => toast("success", t, m), [toast]);
  const error   = useCallback((t: string, m?: string) => toast("error",   t, m), [toast]);
  const warning = useCallback((t: string, m?: string) => toast("warning", t, m), [toast]);
  const info    = useCallback((t: string, m?: string) => toast("info",    t, m), [toast]);

  const confirm = useCallback((options: ConfirmOptions): Promise<boolean> => {
    return new Promise(resolve => {
      setConfirmState({ ...options, resolve });
    });
  }, []);

  const resolveConfirm = (value: boolean) => {
    confirmState?.resolve(value);
    setConfirmState(null);
  };

  return (
    <AlertContext.Provider value={{ toast, success, error, warning, info, confirm }}>
      {children}

      {/* ── Toast stack ── */}
      {typeof window !== "undefined" && createPortal(
        <div className="fixed top-5 right-5 z-[9999] flex flex-col gap-3 w-[340px] max-w-[calc(100vw-2.5rem)]">
          {toasts.map(t => {
            const cfg = TOAST_CFG[t.type];
            return (
              <div
                key={t.id}
                className="relative flex items-start gap-3 rounded-2xl bg-white border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.12)] p-4 overflow-hidden animate-in slide-in-from-right-5 fade-in duration-300"
              >
                {/* left color bar */}
                <span className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl ${cfg.bar}`} />
                <cfg.icon className={`w-5 h-5 shrink-0 mt-0.5 ${cfg.icon_cls}`} />
                <div className="flex-1 min-w-0 pr-2">
                  <p className="text-sm font-semibold text-slate-800 font-primary leading-snug">{t.title}</p>
                  {t.message && <p className="text-xs text-slate-500 font-secondary mt-0.5 leading-relaxed">{t.message}</p>}
                </div>
                <button
                  type="button"
                  onClick={() => removeToast(t.id)}
                  className="shrink-0 text-slate-300 hover:text-slate-500 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>,
        document.body
      )}

      {/* ── Confirm dialog ── */}
      {confirmState && typeof window !== "undefined" && createPortal(
        <div className="fixed inset-0 z-[9998] flex items-center justify-center p-4">
          {/* backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => resolveConfirm(false)}
          />
          {/* card */}
          <div className="relative z-10 w-full max-w-sm rounded-3xl bg-white shadow-[0_24px_60px_rgba(0,0,0,0.18)] p-7 animate-in zoom-in-95 fade-in duration-200">
            <div className={`mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full ${confirmState.danger ? "bg-red-50" : "bg-(--primary-plum)/8"}`}>
              {confirmState.danger
                ? <Trash2 className="w-6 h-6 text-red-500" />
                : <AlertCircle className="w-6 h-6 text-(--primary-plum)" />
              }
            </div>

            <h3 className="text-center text-lg font-bold text-slate-900 font-primary">{confirmState.title}</h3>
            <p className="mt-2 text-center text-sm text-slate-500 font-secondary leading-relaxed">{confirmState.message}</p>

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => resolveConfirm(false)}
                className="flex-1 rounded-xl border border-slate-200 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors font-primary"
              >
                {confirmState.cancelLabel ?? "Cancel"}
              </button>
              <button
                type="button"
                onClick={() => resolveConfirm(true)}
                className={`flex-1 rounded-xl py-2.5 text-sm font-semibold text-white transition-colors font-primary ${
                  confirmState.danger
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-(--primary-plum) hover:opacity-90"
                }`}
              >
                {confirmState.confirmLabel ?? "Confirm"}
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </AlertContext.Provider>
  );
}
