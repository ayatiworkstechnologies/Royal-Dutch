"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Bot, 
  Send, 
  X, 
  MessageCircle, 
  Calendar, 
  Clock, 
  User, 
  Check, 
  Phone, 
  HelpCircle,
  Sparkles,
  Info,
  MapPin,
  RefreshCw,
  Search,
  ChevronRight
} from "lucide-react";
import axiosInstance from "@/lib/api";
import { useBookingModal } from "@/context/BookingModalContext";

// API wrappers
const api = {
  categories: () => axiosInstance.get('/api/categories').then(res => res.data),
  services: () => axiosInstance.get('/api/services').then(res => res.data),
  staff: () => axiosInstance.get('/api/staff').then(res => res.data),
  slots: ({ serviceId, selectedDate, staffId }: any) => axiosInstance.get('/api/bookings/slots', { params: { service_id: serviceId, selected_date: selectedDate, staff_id: staffId } }).then(res => res.data),
  createBooking: (data: any) => axiosInstance.post('/api/bookings', data).then(res => res.data),
  lookupBookings: (phone: string) => axiosInstance.get(`/api/bookings/lookup?phone=${phone}`).then(res => res.data),
  chat: (messages: { role: string; content: string }[]) =>
    axiosInstance.post('/api/chat', { messages }).then(res => res.data.reply as string),
};

const money = (amount: number, currency: string = 'AED') => new Intl.NumberFormat('en-AE', { style: 'currency', currency }).format(amount);
const duration = (minutes: number) => `${minutes} mins`;

export default function AiHelpButton() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const { openModal } = useBookingModal();
  
  // Chat state machine
  const [flowState, setFlowState] = useState("idle");
  const [bookingData, setBookingData] = useState({
    service: null as any,
    staff_id: null as any,
    staff_name: "",
    booking_date: "",
    booking_time: "",
    patient: {
      full_name: "",
      phone: "",
      email: "",
      gender: "",
      age: "",
      notes: ""
    }
  });

  const bookingDataRef = useRef(bookingData);
  useEffect(() => {
    bookingDataRef.current = bookingData;
  }, [bookingData]);

  // DB context cache
  const [categories, setCategories] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [staff, setStaff] = useState<any[]>([]);
  const [slots, setSlots] = useState<any[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);

  // Load backend catalog when chatbot drawer is opened
  useEffect(() => {
    if (!open) return;
    Promise.all([
      api.categories().catch(() => []),
      api.services().catch(() => []),
      api.staff().catch(() => [])
    ]).then(([catData, servData, staffData]) => {
      setCategories(catData);
      setServices(servData);
      setStaff(staffData);
      setDataLoaded(true);
    });
  }, [open]);

  // Initial welcome greeting
  useEffect(() => {
    if (open && dataLoaded && messages.length === 0) {
      triggerBotResponse("Hello! Welcome to Royal Dutch Medical Centre. I am your automated clinic assistant. How can I help you today?", [
        { label: "Book Appointment", action: () => startBookingFlow() },
        { label: "Check Booking Status", action: () => startLookupFlow() },
        { label: "Clinic Hours & Location", action: () => showClinicInfo() }
      ]);
    }
  }, [open, dataLoaded, messages]);

  // Auto-scroll chat window to the bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, typing]);

  const addMessage = (msg: any) => {
    setMessages((prev) => [...prev, { id: Date.now() + Math.random(), ...msg }]);
  };

  const triggerBotResponse = (text: string, options: any = null, delay = 600) => {
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      addMessage({
        sender: "bot",
        text,
        options
      });
    }, delay);
  };

  const startBookingFlow = () => {
    setOpen(false); // Close AI assistant
    openModal(); // Open normal booking modal
  };

  const startLookupFlow = () => {
    setFlowState("lookup_phone");
    triggerBotResponse("Sure! Please enter the mobile phone number associated with your bookings to search:");
  };

  const showClinicInfo = () => {
    triggerBotResponse("Here are the Royal Dutch Medical Centre details:\n\n📅 **Opening Hours**: Monday to Saturday, 10:00 AM - 08:00 PM\n📍 **Location**: Premium Clinic block, Dubai, UAE\n📞 **Toll Free**: 800-ROYAL (76925)", [
      { label: "Book Appointment", action: () => startBookingFlow() },
      { label: "Main Menu", action: () => resetToMainMenu() }
    ]);
  };

  const resetToMainMenu = () => {
    setFlowState("idle");
    setBookingData({
      service: null,
      staff_id: null,
      staff_name: "",
      booking_date: "",
      booking_time: "",
      patient: { full_name: "", phone: "", email: "", gender: "", age: "", notes: "" }
    });
    triggerBotResponse("Is there anything else I can assist you with?", [
      { label: "Book Appointment", action: () => startBookingFlow() },
      { label: "Check Booking Status", action: () => startLookupFlow() },
      { label: "Clinic Details", action: () => showClinicInfo() }
    ]);
  };

  const handleCategorySelect = (categorySlug: string) => {
    const cat = categories.find(c => c.slug === categorySlug);
    const catServices = services.filter(s => s.category_id === cat?.id);
    addMessage({ sender: "user", text: `Category: ${cat?.name || categorySlug}` });
    
    if (catServices.length === 0) {
      triggerBotResponse("There are currently no treatments listed under this category. Choose another:", 
        categories.map(c => ({ label: c.name, action: () => handleCategorySelect(c.slug) }))
      );
      return;
    }

    setFlowState("booking_service");
    addMessage({
      sender: "bot",
      text: "Please select the specific treatment you want to schedule:",
      component: (
        <div className="grid gap-2 mt-2 max-h-48 overflow-y-auto no-scrollbar">
          {catServices.map(service => (
            <button
              key={service.id}
              type="button"
              onClick={() => handleServiceSelect(service)}
              className="flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-white hover:border-fuchsia-300 hover:bg-fuchsia-50/20 text-left transition-all cursor-pointer"
            >
              <div>
                <p className="text-xs font-bold text-slate-800">{service.name}</p>
                <p className="text-[10px] text-slate-400 mt-0.5">{duration(service.duration_minutes)}</p>
              </div>
              <span className="text-xs font-bold text-fuchsia-950">{money(service.price, service.currency)}</span>
            </button>
          ))}
        </div>
      )
    });
  };

  const handleServiceSelect = (service: any) => {
    setBookingData(prev => ({ ...prev, service }));
    addMessage({ sender: "user", text: `Selected Treatment: ${service.name}` });

    const assignedStaff = staff.filter(member => member.service_ids?.includes(service.id));
    setFlowState("booking_staff");

    addMessage({
      sender: "bot",
      text: `Excellent. We have specialists available for **${service.name}**. Choose a specific doctor or select Any Specialist:`,
      component: (
        <div className="grid gap-2 mt-2 max-h-48 overflow-y-auto no-scrollbar">
          <button
            type="button"
            onClick={() => handleStaffSelect(null, "Any Available Specialist")}
            className="p-3 rounded-xl border border-slate-100 bg-white hover:border-fuchsia-300 hover:bg-fuchsia-50/20 text-left transition-all cursor-pointer"
          >
            <p className="text-xs font-bold text-slate-800">Any Available Specialist</p>
            <p className="text-[10px] text-slate-400 mt-0.5">Let the system auto-assign the first available slot</p>
          </button>
          {assignedStaff.map(member => (
            <button
              key={member.id}
              type="button"
              onClick={() => handleStaffSelect(member.id, member.name)}
              className="p-3 rounded-xl border border-slate-100 bg-white hover:border-fuchsia-300 hover:bg-fuchsia-50/20 text-left transition-all cursor-pointer"
            >
              <p className="text-xs font-bold text-slate-800">{member.name}</p>
              <p className="text-[10px] text-slate-400 mt-0.5">{member.role} - {member.specialization}</p>
            </button>
          ))}
        </div>
      )
    });
  };

  const handleStaffSelect = (staffId: any, staffName: string) => {
    setBookingData(prev => ({ ...prev, staff_id: staffId, staff_name: staffName }));
    addMessage({ sender: "user", text: `Doctor: ${staffName}` });

    setFlowState("booking_date");
    
    const d0 = new Date();
    const d1 = new Date(); d1.setDate(d1.getDate() + 1);
    const d2 = new Date(); d2.setDate(d2.getDate() + 2);
    
    const formattedDates = [d0, d1, d2].map(d => ({
      raw: d.toISOString().slice(0, 10),
      label: d.toLocaleDateString("en-US", { weekday: 'short', month: 'short', day: 'numeric' })
    }));

    triggerBotResponse(`Choose a date for your visit:`, 
      formattedDates.map(fd => ({
        label: fd.label,
        action: () => handleDateSelect(fd.raw, fd.label)
      }))
    );
  };

  const handleDateSelect = (rawDate: string, labelDate: string) => {
    const currentService = bookingDataRef.current.service;
    const currentStaffId = bookingDataRef.current.staff_id;

    setBookingData(prev => ({ ...prev, booking_date: rawDate }));
    addMessage({ sender: "user", text: `Date: ${labelDate}` });
    setFlowState("booking_slot");

    if (!currentService) {
      triggerBotResponse("Could not locate your selected treatment. Let's restart:", [
        { label: "Restart Booking", action: () => startBookingFlow() }
      ]);
      return;
    }

    setLoadingSlots(true);
    api.slots({
      serviceId: currentService.id,
      selectedDate: rawDate,
      staffId: currentStaffId
    }).then(res => {
      setLoadingSlots(false);
      const available = res.slots || [];
      if (available.length === 0) {
        addMessage({
          sender: "bot",
          text: "Ah, it seems there are no available slots for this specialist on the selected date. Please choose another date:",
          options: [
            { label: "Change Date", action: () => handleStaffSelect(currentStaffId, bookingDataRef.current.staff_name) }
          ]
        });
        return;
      }

      addMessage({
        sender: "bot",
        text: `Here are the available slots. Choose a time:`,
        component: (
          <div className="grid grid-cols-3 gap-1.5 mt-2 max-h-40 overflow-y-auto p-1 bg-slate-50/50 rounded-xl">
            {available.map((time: string) => (
              <button
                key={time}
                type="button"
                onClick={() => handleSlotSelect(time)}
                className="py-2.5 px-1.5 rounded-lg border border-slate-200 bg-white hover:border-fuchsia-300 hover:bg-fuchsia-50 text-[10px] font-bold text-slate-800 text-center transition-all cursor-pointer"
              >
                {time}
              </button>
            ))}
          </div>
        )
      });
    }).catch(err => {
      setLoadingSlots(false);
      triggerBotResponse(`Error checking slots: ${err.message}`);
    });
  };

  const handleSlotSelect = (time: string) => {
    setBookingData(prev => ({ ...prev, booking_time: time }));
    addMessage({ sender: "user", text: `Time slot: ${time}` });

    setFlowState("booking_name");
    triggerBotResponse("Perfect! Let's collect patient details to secure this slot. What is your **Full Name**?");
  };

  const handleGenderSelect = (genderValue: string) => {
    const finalGender = genderValue === "Skip" ? "" : genderValue.toLowerCase();
    setBookingData(prev => ({
      ...prev,
      patient: { ...prev.patient, gender: finalGender }
    }));
    addMessage({ sender: "user", text: `Gender: ${genderValue}` });
    
    setFlowState("booking_age");
    triggerBotResponse("Thank you. What is your **Age in years**? (Or type 'none' to skip)");
  };

  const submitChatBooking = () => {
    const data = bookingDataRef.current;
    if (!data.service) return;

    setTyping(true);
    api.createBooking({
      service_id: data.service.id,
      staff_id: data.staff_id ? Number(data.staff_id) : null,
      booking_date: data.booking_date,
      booking_time: `${data.booking_time}:00`,
      patient: {
        full_name: data.patient.full_name,
        phone: data.patient.phone,
        email: data.patient.email || null,
        gender: data.patient.gender || null,
        age: data.patient.age ? Number(data.patient.age) : null,
      },
      notes: data.patient.notes || null,
      first_visit: true
    }).then((booking: any) => {
      setTyping(false);
      addMessage({
        sender: "bot",
        text: `🎉 **Success! Your reservation has been sent to the clinic team.**`,
        component: (
          <div className="mt-2 rounded-2xl border border-emerald-100 bg-emerald-50/40 p-4 shadow-sm text-xs text-emerald-950 space-y-2 font-sans">
            <div className="flex justify-between border-b border-emerald-100 pb-2">
              <span className="font-semibold">Booking Code</span>
              <span className="font-extrabold text-[#5b0f4d]">{booking.booking_code}</span>
            </div>
            <div>
              <p className="font-bold">{data.service.name}</p>
              <p className="text-[10px] text-slate-500 mt-0.5">{data.booking_date} at {data.booking_time}</p>
              <p className="text-[10px] text-slate-500">Doctor: {data.staff_name}</p>
              <p className="text-[10px] text-slate-500 capitalize">Patient: {data.patient.full_name} ({data.patient.gender || "unspecified"}, {data.patient.age ? `${data.patient.age} years` : "no age"})</p>
            </div>
            <div className="bg-white/70 p-2.5 rounded-lg border border-emerald-100/60 mt-2 text-[10px]">
              We have queued a template confirmation alert. Please check your status shortly.
            </div>
          </div>
        )
      });
      setFlowState("idle");
      triggerBotResponse("Is there anything else I can assist you with today?", [
        { label: "Book Another Appointment", action: () => startBookingFlow() },
        { label: "Main Menu", action: () => resetToMainMenu() }
      ]);
    }).catch(err => {
      setTyping(false);
      triggerBotResponse(`Failed to submit booking: ${err.message}. Let's try confirming again.`, [
        { label: "Confirm Booking", action: () => submitChatBooking() },
        { label: "Main Menu", action: () => resetToMainMenu() }
      ]);
    });
  };

  const renderConfirmCard = (finalBooking: any) => {
    addMessage({
      sender: "bot",
      text: "Splendid! Here is the booking summary. Please review and click Confirm to reserve:",
      component: (
        <div className="mt-2 rounded-2xl border border-slate-100 bg-white p-4 shadow-md text-xs space-y-3 font-sans">
          <h4 className="font-bold border-b pb-1.5 font-serif text-[#5b0f4d]">Appointment Reservation</h4>
          <div className="space-y-1 text-slate-600">
            <p>📍 **Service**: {finalBooking.service?.name}</p>
            <p>👤 **Doctor**: {finalBooking.staff_name}</p>
            <p>📅 **Schedule**: {finalBooking.booking_date} at {finalBooking.booking_time}</p>
            <p>👨⚕️ **Patient**: {finalBooking.patient.full_name}</p>
            <p>📞 **Contact**: {finalBooking.patient.phone}</p>
            {finalBooking.patient.email && <p>✉️ **Email**: {finalBooking.patient.email}</p>}
            {finalBooking.patient.gender && <p>🧬 **Gender**: <span className="capitalize">{finalBooking.patient.gender}</span></p>}
            {finalBooking.patient.age && <p>🎂 **Age**: {finalBooking.patient.age} years</p>}
            {finalBooking.patient.notes && <p>📝 **Notes**: {finalBooking.patient.notes}</p>}
          </div>
          <div className="flex items-center justify-between border-t pt-2 mt-2">
            <span className="font-bold text-slate-800">Fee: {money(finalBooking.service?.price, finalBooking.service?.currency)}</span>
            <button
              type="button"
              onClick={submitChatBooking}
              className="btn-premium-primary text-[10px] uppercase tracking-wider py-2 px-4 shadow-none cursor-pointer"
            >
              Confirm Booking
            </button>
          </div>
        </div>
      )
    });
  };

  const handleSend = (e: any) => {
    e.preventDefault();
    if (!input.trim()) return;

    const query = input.trim();
    addMessage({ sender: "user", text: query });
    setInput("");

    if (flowState === "booking_name") {
      setBookingData(prev => ({
        ...prev,
        patient: { ...prev.patient, full_name: query }
      }));
      setFlowState("booking_phone");
      triggerBotResponse(`Thank you, ${query}. What is your **Mobile Phone Number**?`);
      return;
    }

    if (flowState === "booking_phone") {
      setBookingData(prev => ({
        ...prev,
        patient: { ...prev.patient, phone: query }
      }));
      setFlowState("booking_email");
      triggerBotResponse(`Got it. What is your **Email Address**? (Type 'none' to skip)`);
      return;
    }

    if (flowState === "booking_email") {
      const emailVal = query.toLowerCase() === "none" ? "" : query;
      setBookingData(prev => ({
        ...prev,
        patient: { ...prev.patient, email: emailVal }
      }));
      
      setFlowState("booking_gender");
      triggerBotResponse("Please specify your **Gender**:", [
        { label: "Female", action: () => handleGenderSelect("Female") },
        { label: "Male", action: () => handleGenderSelect("Male") },
        { label: "Other", action: () => handleGenderSelect("Other") },
        { label: "Skip", action: () => handleGenderSelect("Skip") }
      ]);
      return;
    }

    if (flowState === "booking_gender") {
      handleGenderSelect(query);
      return;
    }

    if (flowState === "booking_age") {
      const ageVal = (query.toLowerCase() === "none" || isNaN(Number(query))) ? "" : query;
      setBookingData(prev => ({
        ...prev,
        patient: { ...prev.patient, age: ageVal }
      }));
      setFlowState("booking_notes");
      triggerBotResponse(`Understood. Are there any **symptoms or medical concerns** you would like the doctor to know in advance? (Type 'none' to skip)`);
      return;
    }

    if (flowState === "booking_notes") {
      const notesVal = query.toLowerCase() === "none" ? "" : query;
      const finalBooking = {
        ...bookingDataRef.current,
        patient: { ...bookingDataRef.current.patient, notes: notesVal }
      };
      setBookingData(finalBooking);
      setFlowState("booking_confirm");
      renderConfirmCard(finalBooking);
      return;
    }

    if (flowState === "lookup_phone") {
      setTyping(true);
      api.lookupBookings(query).then(res => {
        setTyping(false);
        if (res.length === 0) {
          triggerBotResponse(`We couldn't find any appointments linked to phone number: **${query}**. Check the number and type it again, or go back:`, [
            { label: "Main Menu", action: () => resetToMainMenu() }
          ]);
          return;
        }

        addMessage({
          sender: "bot",
          text: `Here are all the appointments found for phone **${query}** with their current status:`,
          component: (
            <div className="mt-2 space-y-2 max-h-48 overflow-y-auto no-scrollbar">
              {res.map((b: any) => (
                <div key={b.id} className="p-3 rounded-xl border border-slate-100 bg-white text-xs space-y-1 font-sans">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-800">{b.service_name}</span>
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                      b.status === "confirmed" ? "bg-fuchsia-50 text-fuchsia-900 border border-fuchsia-100" :
                      b.status === "completed" ? "bg-emerald-50 text-emerald-900" :
                      b.status === "cancelled" ? "bg-rose-50 text-rose-900" : "bg-amber-50 text-amber-900"
                    }`}>
                      {b.status}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-500">{b.booking_date} at {b.booking_time} with {b.staff_name}</p>
                  <p className="text-[9px] font-bold text-slate-400">Code: {b.booking_code}</p>
                </div>
              ))}
            </div>
          )
        });

        setFlowState("idle");
        triggerBotResponse("What else can I help you with?", [
          { label: "Check Another Phone", action: () => startLookupFlow() },
          { label: "Main Menu", action: () => resetToMainMenu() }
        ]);
      }).catch(err => {
        setTyping(false);
        triggerBotResponse(`Error querying database: ${err.message}. Try typing phone number again.`);
      });
      return;
    }

    const txt = query.toLowerCase();
    
    if (txt.includes("book") || txt.includes("appointment") || txt.includes("schedule")) {
      startBookingFlow();
      return;
    }
    if (txt.includes("status") || txt.includes("lookup") || txt.includes("check")) {
      startLookupFlow();
      return;
    }
    if (txt.includes("hour") || txt.includes("time") || txt.includes("open")) {
      showClinicInfo();
      return;
    }
    if (txt.includes("address") || txt.includes("location") || txt.includes("where") || txt.includes("place")) {
      showClinicInfo();
      return;
    }
    if (txt.includes("phone") || txt.includes("call") || txt.includes("contact") || txt.includes("toll")) {
      showClinicInfo();
      return;
    }
    if (txt.includes("menu") || txt.includes("exit") || txt.includes("home")) {
      resetToMainMenu();
      return;
    }

    const matches = services.filter(s => s.name.toLowerCase().includes(txt) || s.description?.toLowerCase().includes(txt));
    if (matches.length > 0) {
      setFlowState("booking_service");
      addMessage({
        sender: "bot",
        text: `I found **${matches.length}** treatment(s) matching your request:`,
        component: (
          <div className="grid gap-2 mt-2 max-h-48 overflow-y-auto no-scrollbar">
            {matches.map(service => (
              <button
                key={service.id}
                type="button"
                onClick={() => handleServiceSelect(service)}
                className="flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-white hover:border-fuchsia-300 hover:bg-fuchsia-50/20 text-left transition-all cursor-pointer"
              >
                <div>
                  <p className="text-xs font-bold text-slate-800">{service.name}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">{duration(service.duration_minutes)}</p>
                </div>
                <span className="text-xs font-bold text-fuchsia-950">{money(service.price, service.currency)}</span>
              </button>
            ))}
          </div>
        )
      });
      return;
    }

    // Free-form medical / general question → Claude AI
    setTyping(true);
    const history = messages
      .filter(m => m.sender === "bot" || m.sender === "user")
      .slice(-10)
      .map(m => ({ role: m.sender === "user" ? "user" : "assistant", content: m.text || "" }))
      .filter(m => m.content);
    history.push({ role: "user", content: query });

    api.chat(history).then(reply => {
      setTyping(false);
      addMessage({
        sender: "bot",
        text: reply,
        options: [
          { label: "Book Appointment", action: () => startBookingFlow() },
          { label: "Main Menu", action: () => resetToMainMenu() }
        ]
      });
    }).catch(() => {
      setTyping(false);
      triggerBotResponse("I'm sorry, I couldn't process that right now. Let me connect you with our team:", [
        { label: "Book Appointment", action: () => startBookingFlow() },
        { label: "Check Status", action: () => startLookupFlow() },
        { label: "Main Menu", action: () => resetToMainMenu() }
      ]);
    });
  };

  return (
    <div className="fixed bottom-6 left-5 z-999 flex flex-col items-start gap-3">
      {/* Bot Chat Window Drawer */}
      <AnimatePresence>
        {open && (
          <motion.section
            initial={{ opacity: 0, y: 30, scale: 0.95, originX: 0, originY: 1 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="w-[min(calc(100vw-2rem),380px)] h-125 flex flex-col rounded-2xl border border-fuchsia-950/10 bg-white shadow-[0_24px_70px_rgba(91,15,77,0.22)] overflow-hidden font-sans"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 bg-linear-to-r from-[#5b0f4d] to-[#38072e] p-4 text-white">
              <div className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 backdrop-blur-sm shadow-inner text-white">
                  <Bot size={18} className="text-fuchsia-200" />
                </span>
                <div>
                  <p className="text-sm font-bold tracking-wide">Royal Dutch AI Desk</p>
                  <p className="text-[10px] text-fuchsia-200/60 uppercase tracking-widest font-semibold">Conversational Booking</p>
                </div>
              </div>
              <button 
                type="button" 
                onClick={() => setOpen(false)} 
                className="rounded-lg p-1.5 text-white/70 hover:bg-white/10 hover:text-white transition-all cursor-pointer" 
                aria-label="Close assistant"
              >
                <X size={16} />
              </button>
            </div>

            {/* Message history Pane */}
            <div
              ref={scrollRef}
              className="grow overflow-y-auto p-4 space-y-4 bg-slate-50/30 no-scrollbar"
            >
              {messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`flex items-start gap-2.5 ${msg.sender === "user" ? "flex-row-reverse" : ""}`}
                >
                  {msg.sender === "bot" && (
                    <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-fuchsia-50 text-[#5b0f4d] ring-1 ring-fuchsia-100/50 shrink-0 text-[10px]">
                      <Bot size={12} />
                    </span>
                  )}
                  
                  <div className="max-w-[78%] flex flex-col gap-2">
                    {/* Message Bubble text */}
                    {msg.text && (
                      <div className={`p-3 rounded-2xl text-xs leading-relaxed shadow-sm border ${
                        msg.sender === "user" 
                          ? "bg-[#5b0f4d] text-white border-fuchsia-900 rounded-tr-none" 
                          : "bg-white text-slate-800 border-slate-200/80 rounded-tl-none whitespace-pre-line"
                      }`}>
                        {msg.text}
                      </div>
                    )}
                    
                    {/* Custom Inline Components */}
                    {msg.component}

                    {/* Inline Quick Action Buttons */}
                    {msg.options && (
                      <div className="flex flex-wrap gap-1.5 mt-1">
                        {msg.options.map((opt: any) => (
                          <button
                            key={opt.label}
                            type="button"
                            onClick={opt.action}
                            className="bg-white border border-fuchsia-100 hover:border-fuchsia-300 hover:bg-fuchsia-50 text-[10px] font-bold uppercase tracking-wider text-[#5b0f4d] px-3 py-2 rounded-lg transition-all shadow-sm cursor-pointer text-left"
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {/* Bot Typing indicator */}
              {typing && (
                <div className="flex items-start gap-2.5">
                  <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-fuchsia-50 text-[#5b0f4d] shrink-0 text-[10px]">
                    <Bot size={12} />
                  </span>
                  <div className="bg-white border border-slate-200/80 p-3 rounded-2xl rounded-tl-none">
                    <TypingIndicator />
                  </div>
                </div>
              )}
            </div>

            {/* Prompt input field */}
            <form onSubmit={handleSend} className="border-t border-slate-100 p-3 bg-white flex items-center gap-2 font-sans">
              <input 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={
                  flowState === "booking_name" ? "Type your full name..." :
                  flowState === "booking_phone" ? "Type mobile number..." :
                  flowState === "booking_email" ? "Type email address..." :
                  flowState === "booking_gender" ? "Select or type gender..." :
                  flowState === "booking_age" ? "Type age (years)..." :
                  flowState === "booking_notes" ? "Type symptoms / notes..." :
                  flowState === "lookup_phone" ? "Type phone number..." :
                  "Ask bot to book, lookup, hours..."
                }
                className="grow rounded-lg border border-slate-200 py-2 px-3 text-xs outline-none focus:border-fuchsia-400 focus:ring-1 focus:ring-fuchsia-400 transition-all" 
              />
              <button
                type="submit"
                aria-label="Send message"
                className="flex items-center justify-center bg-[#5b0f4d] hover:bg-[#38072e] text-white h-8 w-8 rounded-xl p-0 shrink-0 shadow-sm cursor-pointer transition-colors"
              >
                <Send size={12} />
              </button>
            </form>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Circle Toggle Button */}
      <button
        type="button"
        aria-label="Open AI assistant"
        onClick={() => setOpen((value) => !value)}
        className="flex h-13 w-13 items-center justify-center gap-2 rounded-full bg-linear-to-r from-[#5b0f4d] to-[#38072e] text-xs font-bold uppercase tracking-wider text-white shadow-[0_12px_30px_rgba(91,15,77,0.35)] hover:scale-105 active:scale-95 transition-all duration-300 sm:w-auto sm:px-5 cursor-pointer"
      >
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
