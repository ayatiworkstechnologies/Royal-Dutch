"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Send, X, MessageCircle, Clock, CalendarDays, Search, Stethoscope } from "lucide-react";
import axiosInstance from "@/lib/api";

// ─── API helpers ────────────────────────────────────────────────────────────
const api = {
  categories: () => axiosInstance.get("/api/categories").then(r => r.data),
  services:   () => axiosInstance.get("/api/services").then(r => r.data),
  staff:      () => axiosInstance.get("/api/staff").then(r => r.data),
  slots: ({ serviceId, selectedDate, staffId }: any) =>
    axiosInstance.get("/api/bookings/slots", {
      params: { service_id: serviceId, selected_date: selectedDate, staff_id: staffId },
    }).then(r => r.data),
  createBooking: (data: any) => axiosInstance.post("/api/bookings", data).then(r => r.data),
  lookupBookings: (phone: string) =>
    axiosInstance.get(`/api/bookings/lookup?phone=${phone}`).then(r => r.data),
  chat: (messages: { role: string; content: string }[], services: any[], categories: any[]) =>
    axiosInstance
      .post("/api/chat", { messages, services, categories })
      .then(r => r.data.reply as string),
};

const money  = (n: number, c = "AED") => new Intl.NumberFormat("en-AE", { style: "currency", currency: c }).format(n);
const dur    = (m: number) => `${m} min`;

// ─── Types ───────────────────────────────────────────────────────────────────
type Msg = {
  id: number;
  sender: "bot" | "user";
  text?: string;
  component?: React.ReactNode;
  options?: { label: string; action: () => void }[];
};

// ─── Component ───────────────────────────────────────────────────────────────
export default function AiHelpButton() {
  const [open, setOpen]         = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput]       = useState("");
  const [typing, setTyping]     = useState(false);
  const [flowState, setFlowState] = useState("idle");

  // catalog
  const [categories, setCategories] = useState<any[]>([]);
  const [services,   setServices]   = useState<any[]>([]);
  const [staff,      setStaff]      = useState<any[]>([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  // booking data
  const [bookingData, setBookingData] = useState({
    service:      null as any,
    staff_id:     null as any,
    staff_name:   "",
    booking_date: "",
    booking_time: "",
    patient: { full_name: "", phone: "", email: "", gender: "", age: "", notes: "" },
  });
  const bookingRef = useRef(bookingData);
  useEffect(() => { bookingRef.current = bookingData; }, [bookingData]);

  const scrollRef = useRef<HTMLDivElement>(null);

  // ── load catalog on open ────────────────────────────────────────────────
  useEffect(() => {
    if (!open) return;
    Promise.all([
      api.categories().catch(() => []),
      api.services().catch(() => []),
      api.staff().catch(() => []),
    ]).then(([c, s, st]) => {
      setCategories(c);
      setServices(s);
      setStaff(st);
      setDataLoaded(true);
    });
  }, [open]);

  // ── auto-scroll ─────────────────────────────────────────────────────────
  useEffect(() => {
    if (scrollRef.current)
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, typing]);

  // ── welcome message ─────────────────────────────────────────────────────
  useEffect(() => {
    if (open && dataLoaded && messages.length === 0) {
      botSay(
        "Hello! I'm your Royal Dutch Medical Centre AI assistant 👋\n\nI can answer questions about our services, help you find the right treatment, or book an appointment — all right here in this chat.",
        [
          { label: "🏥 Book Appointment",      action: startBooking },
          { label: "🔍 Find a Service",        action: showServiceSearch },
          { label: "📋 Check My Booking",      action: startLookup },
          { label: "🕐 Hours & Location",      action: showClinicInfo },
        ]
      );
    }
  }, [open, dataLoaded, messages.length]);

  // ─── helpers ─────────────────────────────────────────────────────────────
  const addMsg = (m: Omit<Msg, "id">) =>
    setMessages(prev => [...prev, { id: Date.now() + Math.random(), ...m }]);

  const botSay = (text: string, options?: Msg["options"], delay = 600) => {
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      addMsg({ sender: "bot", text, options });
    }, delay);
  };

  const userSay = (text: string) => addMsg({ sender: "user", text });

  const resetMenu = () => {
    setFlowState("idle");
    setBookingData({
      service: null, staff_id: null, staff_name: "",
      booking_date: "", booking_time: "",
      patient: { full_name: "", phone: "", email: "", gender: "", age: "", notes: "" },
    });
    botSay("Is there anything else I can help you with?", [
      { label: "🏥 Book Appointment",  action: startBooking },
      { label: "🔍 Find a Service",    action: showServiceSearch },
      { label: "📋 Check My Booking",  action: startLookup },
      { label: "🕐 Clinic Info",       action: showClinicInfo },
    ]);
  };

  // ─── Clinic info ─────────────────────────────────────────────────────────
  const showClinicInfo = () => {
    userSay("Clinic hours & location");
    botSay(
      "📅 Hours: Monday – Saturday, 10:00 AM – 8:00 PM\n📍 Location: Premium Clinic block, Dubai, UAE\n📞 Toll Free: 800-ROYAL (76925)",
      [
        { label: "Book Appointment", action: startBooking },
        { label: "Main Menu",        action: resetMenu },
      ]
    );
  };

  // ─── Service Search ───────────────────────────────────────────────────────
  const showServiceSearch = () => {
    userSay("Find a service");
    setFlowState("search_service");
    botSay("What condition, symptom, or treatment are you looking for? Type it below and I'll find matching services for you.");
  };

  // ─── Booking flow ─────────────────────────────────────────────────────────
  const startBooking = () => {
    userSay("Book an appointment");
    setFlowState("booking_category");
    addMsg({
      sender: "bot",
      text: "Sure! Please choose a care category to get started:",
      component: (
        <div className="grid gap-2 mt-2 max-h-44 overflow-y-auto no-scrollbar">
          {categories.map(c => (
            <button
              key={c.id}
              type="button"
              onClick={() => pickCategory(c)}
              className="p-3 rounded-xl border border-slate-100 bg-white hover:border-fuchsia-300 hover:bg-fuchsia-50/30 text-left transition-all cursor-pointer"
            >
              <p className="text-xs font-bold text-slate-800">{c.name}</p>
              {c.description && <p className="text-[10px] text-slate-400 mt-0.5 line-clamp-1">{c.description}</p>}
            </button>
          ))}
        </div>
      ),
    });
  };

  const pickCategory = (cat: any) => {
    userSay(`Category: ${cat.name}`);
    const catServices = services.filter(s => s.category_id === cat.id);
    if (catServices.length === 0) {
      botSay("No services listed under this category. Choose another:", categories.map(c => ({ label: c.name, action: () => pickCategory(c) })));
      return;
    }
    setFlowState("booking_service");
    addMsg({
      sender: "bot",
      text: `Great! Here are the services under **${cat.name}**. Please select one:`,
      component: (
        <div className="grid gap-2 mt-2 max-h-48 overflow-y-auto no-scrollbar">
          {catServices.map(s => (
            <button
              key={s.id}
              type="button"
              onClick={() => pickService(s)}
              className="flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-white hover:border-fuchsia-300 hover:bg-fuchsia-50/20 text-left transition-all cursor-pointer"
            >
              <div>
                <p className="text-xs font-bold text-slate-800">{s.name}</p>
                {s.description && <p className="text-[10px] text-slate-400 mt-0.5 line-clamp-2">{s.description}</p>}
                <p className="text-[10px] text-slate-400 mt-0.5">{dur(s.duration_minutes)}</p>
              </div>
              <span className="text-xs font-bold text-fuchsia-950 ml-3 shrink-0">{money(s.price, s.currency)}</span>
            </button>
          ))}
        </div>
      ),
    });
  };

  const pickService = (service: any) => {
    setBookingData(p => ({ ...p, service }));
    userSay(`Service: ${service.name}`);
    const assigned = staff.filter(m => m.service_ids?.includes(service.id));
    setFlowState("booking_staff");
    addMsg({
      sender: "bot",
      text: `You chose **${service.name}** (${money(service.price, service.currency)} · ${dur(service.duration_minutes)}). Now select a specialist:`,
      component: (
        <div className="grid gap-2 mt-2 max-h-48 overflow-y-auto no-scrollbar">
          <button type="button" onClick={() => pickStaff(null, "Any Available Specialist")}
            className="p-3 rounded-xl border border-slate-100 bg-white hover:border-fuchsia-300 hover:bg-fuchsia-50/20 text-left transition-all cursor-pointer">
            <p className="text-xs font-bold text-slate-800">Any Available Specialist</p>
            <p className="text-[10px] text-slate-400 mt-0.5">System assigns first available slot</p>
          </button>
          {assigned.map(m => (
            <button key={m.id} type="button" onClick={() => pickStaff(m.id, m.name)}
              className="p-3 rounded-xl border border-slate-100 bg-white hover:border-fuchsia-300 hover:bg-fuchsia-50/20 text-left transition-all cursor-pointer">
              <p className="text-xs font-bold text-slate-800">{m.name}</p>
              <p className="text-[10px] text-slate-400 mt-0.5">{m.role}{m.specialization ? ` · ${m.specialization}` : ""}</p>
            </button>
          ))}
        </div>
      ),
    });
  };

  const pickStaff = (staffId: any, staffName: string) => {
    setBookingData(p => ({ ...p, staff_id: staffId, staff_name: staffName }));
    userSay(`Doctor: ${staffName}`);
    setFlowState("booking_date");
    const today = new Date();
    const dates = Array.from({ length: 7 }, (_, i) => {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      return {
        raw:   d.toISOString().slice(0, 10),
        label: d.toLocaleDateString("en-AE", { weekday: "short", month: "short", day: "numeric" }),
      };
    });
    botSay("Choose your preferred appointment date:", dates.map(d => ({ label: d.label, action: () => pickDate(d.raw, d.label) })));
  };

  const pickDate = (raw: string, label: string) => {
    const cur = bookingRef.current;
    setBookingData(p => ({ ...p, booking_date: raw }));
    userSay(`Date: ${label}`);
    setFlowState("booking_slot");
    setTyping(true);
    api.slots({ serviceId: cur.service?.id, selectedDate: raw, staffId: cur.staff_id })
      .then(res => {
        setTyping(false);
        const available: string[] = res.slots || [];
        if (available.length === 0) {
          botSay("No available slots on that date. Choose another date:", [
            { label: "Pick Different Date", action: () => pickStaff(cur.staff_id, cur.staff_name) },
            { label: "Main Menu", action: resetMenu },
          ]);
          return;
        }
        addMsg({
          sender: "bot",
          text: "Available time slots — choose one:",
          component: (
            <div className="grid grid-cols-3 gap-1.5 mt-2 max-h-40 overflow-y-auto p-1 bg-slate-50/50 rounded-xl">
              {available.map(t => (
                <button key={t} type="button" onClick={() => pickSlot(t)}
                  className="py-2.5 px-1.5 rounded-lg border border-slate-200 bg-white hover:border-fuchsia-300 hover:bg-fuchsia-50 text-[10px] font-bold text-slate-800 text-center transition-all cursor-pointer">
                  {t}
                </button>
              ))}
            </div>
          ),
        });
      })
      .catch(() => {
        setTyping(false);
        botSay("Could not load slots. Please try a different date.", [
          { label: "Try Again", action: () => pickStaff(cur.staff_id, cur.staff_name) },
        ]);
      });
  };

  const pickSlot = (time: string) => {
    setBookingData(p => ({ ...p, booking_time: time }));
    userSay(`Time: ${time}`);
    setFlowState("booking_name");
    botSay("Perfect! Let's collect your details. What is your **Full Name**?");
  };

  const submitBooking = () => {
    const d = bookingRef.current;
    if (!d.service) return;
    setTyping(true);
    api.createBooking({
      service_id:   d.service.id,
      staff_id:     d.staff_id ? Number(d.staff_id) : null,
      booking_date: d.booking_date,
      booking_time: `${d.booking_time}:00`,
      patient: {
        full_name: d.patient.full_name,
        phone:     d.patient.phone,
        email:     d.patient.email || null,
        gender:    d.patient.gender || null,
        age:       d.patient.age ? Number(d.patient.age) : null,
      },
      notes:       d.patient.notes || null,
      first_visit: true,
    })
      .then((booking: any) => {
        setTyping(false);
        addMsg({
          sender: "bot",
          text: "🎉 **Booking confirmed! Your appointment has been submitted.**",
          component: (
            <div className="mt-2 rounded-2xl border border-emerald-100 bg-emerald-50/40 p-4 text-xs text-emerald-950 space-y-2">
              <div className="flex justify-between border-b border-emerald-100 pb-2">
                <span className="font-semibold">Booking Code</span>
                <span className="font-extrabold text-[#5b0f4d]">{booking.booking_code}</span>
              </div>
              <p className="font-bold">{d.service.name}</p>
              <p className="text-[10px] text-slate-500">{d.booking_date} at {d.booking_time} · Dr. {d.staff_name}</p>
              <p className="text-[10px] text-slate-500">Patient: {d.patient.full_name} · {d.patient.phone}</p>
              <p className="text-[10px] bg-white/70 p-2 rounded-lg border border-emerald-100/60 mt-1">
                A confirmation will be sent to you shortly. Our team will reach out if needed.
              </p>
            </div>
          ),
        });
        setFlowState("idle");
        botSay("Is there anything else I can help you with?", [
          { label: "Book Another",  action: startBooking },
          { label: "Main Menu",     action: resetMenu },
        ]);
      })
      .catch(err => {
        setTyping(false);
        botSay(`Booking failed: ${err?.response?.data?.detail || err.message}. Please try again.`, [
          { label: "Retry",      action: submitBooking },
          { label: "Main Menu",  action: resetMenu },
        ]);
      });
  };

  const showConfirmCard = (finalData: typeof bookingData) => {
    addMsg({
      sender: "bot",
      text: "Here is your booking summary. Please confirm:",
      component: (
        <div className="mt-2 rounded-2xl border border-slate-100 bg-white p-4 shadow-md text-xs space-y-2">
          <h4 className="font-bold border-b pb-1.5 font-serif text-[#5b0f4d]">Appointment Summary</h4>
          <div className="space-y-1 text-slate-600">
            <p>📋 <strong>Service:</strong> {finalData.service?.name}</p>
            <p>👨‍⚕️ <strong>Doctor:</strong> {finalData.staff_name}</p>
            <p>📅 <strong>Date:</strong> {finalData.booking_date} at {finalData.booking_time}</p>
            <p>👤 <strong>Patient:</strong> {finalData.patient.full_name}</p>
            <p>📞 <strong>Phone:</strong> {finalData.patient.phone}</p>
            {finalData.patient.email && <p>✉️ <strong>Email:</strong> {finalData.patient.email}</p>}
            {finalData.patient.gender && <p>🧬 <strong>Gender:</strong> <span className="capitalize">{finalData.patient.gender}</span></p>}
            {finalData.patient.age && <p>🎂 <strong>Age:</strong> {finalData.patient.age} yrs</p>}
            {finalData.patient.notes && <p>📝 <strong>Notes:</strong> {finalData.patient.notes}</p>}
          </div>
          <div className="flex items-center justify-between border-t pt-2 mt-1">
            <span className="font-bold text-slate-800">{money(finalData.service?.price, finalData.service?.currency)}</span>
            <button type="button" onClick={submitBooking}
              className="bg-[#5b0f4d] hover:bg-[#38072e] text-white text-[10px] uppercase tracking-wider py-2 px-4 rounded-lg cursor-pointer transition-colors">
              Confirm Booking
            </button>
          </div>
        </div>
      ),
    });
  };

  // ─── Lookup flow ────────────────────────────────────────────────────────
  const startLookup = () => {
    userSay("Check my booking");
    setFlowState("lookup_phone");
    botSay("Please enter the mobile phone number linked to your booking:");
  };

  // ─── Input handler ──────────────────────────────────────────────────────
  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    const query = input.trim();
    if (!query) return;
    userSay(query);
    setInput("");

    // ── booking data collection states ──────────────────────────────────
    if (flowState === "booking_name") {
      setBookingData(p => ({ ...p, patient: { ...p.patient, full_name: query } }));
      setFlowState("booking_phone");
      botSay(`Thanks ${query}! What is your **mobile phone number**?`);
      return;
    }
    if (flowState === "booking_phone") {
      setBookingData(p => ({ ...p, patient: { ...p.patient, phone: query } }));
      setFlowState("booking_email");
      botSay("Got it. What is your **email address**? (Type 'skip' to skip)");
      return;
    }
    if (flowState === "booking_email") {
      const email = query.toLowerCase() === "skip" ? "" : query;
      setBookingData(p => ({ ...p, patient: { ...p.patient, email } }));
      setFlowState("booking_gender");
      botSay("Please select your **gender**:", [
        { label: "Female", action: () => pickGender("female") },
        { label: "Male",   action: () => pickGender("male") },
        { label: "Other",  action: () => pickGender("other") },
        { label: "Skip",   action: () => pickGender("") },
      ]);
      return;
    }
    if (flowState === "booking_age") {
      const age = isNaN(Number(query)) || query.toLowerCase() === "skip" ? "" : query;
      setBookingData(p => ({ ...p, patient: { ...p.patient, age } }));
      setFlowState("booking_notes");
      botSay("Any symptoms or notes for the doctor? (Type 'skip' to skip)");
      return;
    }
    if (flowState === "booking_notes") {
      const notes = query.toLowerCase() === "skip" ? "" : query;
      const finalData = { ...bookingRef.current, patient: { ...bookingRef.current.patient, notes } };
      setBookingData(finalData);
      setFlowState("booking_confirm");
      showConfirmCard(finalData);
      return;
    }

    // ── lookup state ─────────────────────────────────────────────────────
    if (flowState === "lookup_phone") {
      setTyping(true);
      api.lookupBookings(query).then(res => {
        setTyping(false);
        if (res.length === 0) {
          botSay(`No bookings found for **${query}**. Check the number and try again.`, [
            { label: "Try Again",  action: startLookup },
            { label: "Main Menu", action: resetMenu },
          ]);
          return;
        }
        addMsg({
          sender: "bot",
          text: `Found **${res.length}** booking(s) for ${query}:`,
          component: (
            <div className="mt-2 space-y-2 max-h-48 overflow-y-auto no-scrollbar">
              {res.map((b: any) => (
                <div key={b.id} className="p-3 rounded-xl border border-slate-100 bg-white text-xs space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-800">{b.service_name}</span>
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase ${
                      b.status === "confirmed" ? "bg-blue-50 text-blue-800" :
                      b.status === "completed" ? "bg-green-50 text-green-800" :
                      b.status === "cancelled" ? "bg-red-50 text-red-800" : "bg-yellow-50 text-yellow-800"
                    }`}>{b.status}</span>
                  </div>
                  <p className="text-[10px] text-slate-400">{b.booking_date} at {b.booking_time}</p>
                  <p className="text-[9px] font-bold text-slate-300">Ref: {b.booking_code}</p>
                </div>
              ))}
            </div>
          ),
        });
        setFlowState("idle");
        botSay("Need anything else?", [
          { label: "Book Appointment", action: startBooking },
          { label: "Main Menu",        action: resetMenu },
        ]);
      }).catch(() => {
        setTyping(false);
        botSay("Could not look up bookings. Please try again.", [{ label: "Retry", action: startLookup }]);
      });
      return;
    }

    // ── service search ────────────────────────────────────────────────────
    if (flowState === "search_service") {
      const txt = query.toLowerCase();
      const matches = services.filter(
        s => s.name.toLowerCase().includes(txt) || (s.description || "").toLowerCase().includes(txt)
      );
      if (matches.length > 0) {
        setFlowState("booking_service");
        addMsg({
          sender: "bot",
          text: `Found **${matches.length}** matching service(s):`,
          component: (
            <div className="grid gap-2 mt-2 max-h-48 overflow-y-auto no-scrollbar">
              {matches.map(s => (
                <button key={s.id} type="button" onClick={() => pickService(s)}
                  className="flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-white hover:border-fuchsia-300 hover:bg-fuchsia-50/20 text-left transition-all cursor-pointer">
                  <div>
                    <p className="text-xs font-bold text-slate-800">{s.name}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">{dur(s.duration_minutes)}</p>
                  </div>
                  <span className="text-xs font-bold text-fuchsia-950">{money(s.price, s.currency)}</span>
                </button>
              ))}
            </div>
          ),
        });
        return;
      }
      // No local match → ask Claude
    }

    // ── keyword shortcuts ─────────────────────────────────────────────────
    const txt = query.toLowerCase();
    if (/(book|appointment|schedule|visit)/.test(txt)) { startBooking(); return; }
    if (/(status|check|lookup|my booking)/.test(txt))  { startLookup(); return; }
    if (/(hour|open|time|when)/.test(txt))             { showClinicInfo(); return; }
    if (/(where|location|address|place|map)/.test(txt)){ showClinicInfo(); return; }
    if (/(service|treat|care|what do you|offer)/.test(txt)) { showServiceSearch(); return; }
    if (/(menu|back|home|exit)/.test(txt))             { resetMenu(); return; }

    // ── Claude AI fallback ────────────────────────────────────────────────
    setTyping(true);
    const history = messages
      .filter(m => m.text)
      .slice(-12)
      .map(m => ({ role: m.sender === "user" ? "user" as const : "assistant" as const, content: m.text! }));
    history.push({ role: "user", content: query });

    api.chat(history, services, categories)
      .then(reply => {
        setTyping(false);
        addMsg({
          sender: "bot",
          text: reply,
          options: [
            { label: "Book Appointment", action: startBooking },
            { label: "Main Menu",        action: resetMenu },
          ],
        });
      })
      .catch(() => {
        setTyping(false);
        botSay("I couldn't process that right now. How else can I help?", [
          { label: "Book Appointment", action: startBooking },
          { label: "Main Menu",        action: resetMenu },
        ]);
      });
  };

  // ── gender helper ──────────────────────────────────────────────────────
  const pickGender = (gender: string) => {
    userSay(gender || "Prefer not to say");
    setBookingData(p => ({ ...p, patient: { ...p.patient, gender } }));
    setFlowState("booking_age");
    botSay("What is your **age**? (Type 'skip' to skip)");
  };

  // ─── Render ──────────────────────────────────────────────────────────────
  return (
    <div className="fixed bottom-6 left-5 z-999 flex flex-col items-start gap-3">
      <AnimatePresence>
        {open && (
          <motion.section
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="w-[min(calc(100vw-2rem),390px)] h-140 flex flex-col rounded-2xl border border-fuchsia-950/10 bg-white shadow-[0_24px_70px_rgba(91,15,77,0.22)] overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 bg-linear-to-r from-[#5b0f4d] to-[#38072e] p-4 text-white shrink-0">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 backdrop-blur-sm">
                  <Bot size={18} className="text-fuchsia-200" />
                </div>
                <div>
                  <p className="text-sm font-bold tracking-wide">Royal Dutch AI Assistant</p>
                  <p className="text-[10px] text-fuchsia-200/60 uppercase tracking-widest">Service &amp; Booking Help</p>
                </div>
              </div>
              <button type="button" onClick={() => setOpen(false)} aria-label="Close chat"
                className="rounded-lg p-1.5 text-white/60 hover:bg-white/10 hover:text-white transition-all cursor-pointer">
                <X size={16} />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="grow overflow-y-auto p-4 space-y-4 bg-slate-50/30 no-scrollbar">
              {!dataLoaded && (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center text-slate-400">
                    <Bot size={28} className="mx-auto mb-2 opacity-40" />
                    <p className="text-xs">Loading clinic data…</p>
                  </div>
                </div>
              )}

              {messages.map(msg => (
                <div key={msg.id} className={`flex items-start gap-2.5 ${msg.sender === "user" ? "flex-row-reverse" : ""}`}>
                  {msg.sender === "bot" && (
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-fuchsia-50 text-[#5b0f4d] ring-1 ring-fuchsia-100/50">
                      <Bot size={12} />
                    </span>
                  )}
                  <div className="max-w-[80%] flex flex-col gap-2">
                    {msg.text && (
                      <div className={`p-3 rounded-2xl text-xs leading-relaxed shadow-sm border whitespace-pre-line ${
                        msg.sender === "user"
                          ? "bg-[#5b0f4d] text-white border-fuchsia-900 rounded-tr-none"
                          : "bg-white text-slate-800 border-slate-200/80 rounded-tl-none"
                      }`}>
                        {msg.text}
                      </div>
                    )}
                    {msg.component}
                    {msg.options && (
                      <div className="flex flex-wrap gap-1.5 mt-1">
                        {msg.options.map(opt => (
                          <button key={opt.label} type="button" onClick={opt.action}
                            className="bg-white border border-fuchsia-100 hover:border-fuchsia-300 hover:bg-fuchsia-50 text-[10px] font-bold uppercase tracking-wider text-[#5b0f4d] px-3 py-2 rounded-lg transition-all shadow-sm cursor-pointer">
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {typing && (
                <div className="flex items-start gap-2.5">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-fuchsia-50 text-[#5b0f4d]">
                    <Bot size={12} />
                  </span>
                  <div className="bg-white border border-slate-200/80 p-3 rounded-2xl rounded-tl-none">
                    <TypingIndicator />
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <form onSubmit={handleSend} className="border-t border-slate-100 p-3 bg-white flex items-center gap-2 shrink-0">
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder={
                  flowState === "booking_name"  ? "Your full name…" :
                  flowState === "booking_phone" ? "Mobile number…" :
                  flowState === "booking_email" ? "Email address…" :
                  flowState === "booking_age"   ? "Age in years…" :
                  flowState === "booking_notes" ? "Symptoms / notes…" :
                  flowState === "lookup_phone"  ? "Phone number…" :
                  flowState === "search_service"? "Search services…" :
                  "Ask me anything about our services…"
                }
                className="grow rounded-xl border border-slate-200 py-2.5 px-3 text-xs outline-none focus:border-fuchsia-400 focus:ring-1 focus:ring-fuchsia-400/50 transition-all"
              />
              <button type="submit" aria-label="Send message"
                className="flex items-center justify-center bg-[#5b0f4d] hover:bg-[#38072e] text-white h-9 w-9 rounded-xl shrink-0 shadow-sm cursor-pointer transition-colors">
                <Send size={13} />
              </button>
            </form>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <button type="button" aria-label="Open AI assistant"
        onClick={() => setOpen(v => !v)}
        className="flex h-13 w-13 items-center justify-center gap-2 rounded-full bg-linear-to-r from-[#5b0f4d] to-[#38072e] text-xs font-bold uppercase tracking-wider text-white shadow-[0_12px_30px_rgba(91,15,77,0.35)] hover:scale-105 active:scale-95 transition-all duration-300 sm:w-auto sm:px-5 cursor-pointer">
        <MessageCircle size={22} className="animate-pulse sm:w-4 sm:h-4" />
        <span className="hidden sm:inline tracking-wider">AI Assistant</span>
      </button>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1">
      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400 [animation-delay:0ms]" />
      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400 [animation-delay:150ms]" />
      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400 [animation-delay:300ms]" />
    </div>
  );
}
