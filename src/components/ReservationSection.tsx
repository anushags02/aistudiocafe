import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, Users, MapPin, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';
import { ReservationData, SeatingArea } from '../types/cafe';

const TIME_SLOTS = [
  { time: '08:00 AM', period: 'Morning Slow Bar' },
  { time: '09:30 AM', period: 'Morning Light' },
  { time: '11:00 AM', period: 'Seasonal Brunch' },
  { time: '12:30 PM', period: 'Midday Kitchen' },
  { time: '02:00 PM', period: 'Afternoon Quiet' },
  { time: '03:30 PM', period: 'Tea & Pastry' },
  { time: '04:30 PM', period: 'Golden Hour' },
];

const SEATING_OPTIONS: { id: SeatingArea; label: string; desc: string }[] = [
  { id: 'window', label: 'Sunlit Window Banquette', desc: 'Direct morning light with Mercer Street streetscape view' },
  { id: 'slow-bar', label: 'Slow Bar Pour-Over Counter', desc: 'Front-row view of the single-origin barista extractions' },
  { id: 'courtyard', label: 'Garden Courtyard', desc: 'Secluded outdoor cobblestones under Japanese maple trees' },
  { id: 'mezzanine', label: 'Quiet Mezzanine Library', desc: 'Cozy elevated alcove suited for reading and quiet discussions' },
];

export const ReservationSection: React.FC = () => {
  // Get tomorrow's date formatted as YYYY-MM-DD
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const defaultDateStr = tomorrow.toISOString().split('T')[0];

  const [date, setDate] = useState(defaultDateStr);
  const [time, setTime] = useState('09:30 AM');
  const [partySize, setPartySize] = useState(2);
  const [seatingArea, setSeatingArea] = useState<SeatingArea>('window');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedReservation, setConfirmedReservation] = useState<ReservationData | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !phone.trim()) {
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const code = 'MV-' + Math.floor(1000 + Math.random() * 9000);
      setConfirmedReservation({
        reservationId: code,
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        date,
        time,
        partySize,
        seatingArea,
        notes: notes.trim(),
        createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      });
      setIsSubmitting(false);
    }, 600);
  };

  const handleReset = () => {
    setConfirmedReservation(null);
    setName('');
    setEmail('');
    setPhone('');
    setNotes('');
  };

  return (
    <section id="reservations" className="py-24 bg-[#FAF7F2] border-b border-[#E8E2D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-14">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#8A5A36] block mb-2">
            Table Reservations
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif-display font-medium text-[#211D1A] tracking-tight leading-tight [text-wrap:balance]">
            Reserve Your Morning Sanctuary
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#696157] font-light leading-relaxed">
            We reserve 60% of our dining spaces in advance to guarantee an unhurried experience. Walk-ins are always welcomed at our standing espresso bar.
          </p>
        </div>

        {confirmedReservation ? (
          /* Confirmation Success Card */
          <div className="max-w-xl mx-auto bg-white rounded-xl border border-[#D5CABB] p-8 shadow-md text-center animate-in fade-in zoom-in-95 duration-200">
            <div className="w-12 h-12 bg-[#F3EFE9] text-[#8A5A36] rounded-full flex items-center justify-center mx-auto mb-4 border border-[#E3DCCF]">
              <CheckCircle2 className="w-6 h-6" />
            </div>

            <span className="text-xs font-semibold uppercase tracking-wider text-[#8A5A36] block">
              Reservation Confirmed
            </span>

            <h3 className="text-2xl font-serif-display font-medium text-[#211D1A] mt-1">
              We look forward to welcoming you, {confirmedReservation.name}
            </h3>

            <p className="text-xs text-[#7A7167] mt-1">
              A calendar confirmation has been registered. Reference: <strong className="text-[#211D1A] font-mono">{confirmedReservation.reservationId}</strong>
            </p>

            {/* Receipt Summary */}
            <div className="mt-6 bg-[#FAF7F2] rounded-lg p-5 border border-[#E8E2D8] text-left text-xs space-y-2.5">
              <div className="flex justify-between pb-2 border-b border-[#E8E2D8]">
                <span className="text-[#7A7167]">Date &amp; Time</span>
                <span className="font-semibold text-[#211D1A]">{confirmedReservation.date} at {confirmedReservation.time}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-[#E8E2D8]">
                <span className="text-[#7A7167]">Party Size</span>
                <span className="font-semibold text-[#211D1A]">{confirmedReservation.partySize} {confirmedReservation.partySize === 1 ? 'Guest' : 'Guests'}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-[#E8E2D8]">
                <span className="text-[#7A7167]">Seating Preference</span>
                <span className="font-semibold text-[#211D1A]">
                  {SEATING_OPTIONS.find(s => s.id === confirmedReservation.seatingArea)?.label}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7A7167]">Contact</span>
                <span className="text-[#59524B]">{confirmedReservation.email} · {confirmedReservation.phone}</span>
              </div>
              {confirmedReservation.notes && (
                <div className="pt-2 border-t border-[#E8E2D8] text-[11px] text-[#7A7167]">
                  <span className="font-medium text-[#544D45]">Notes:</span> {confirmedReservation.notes}
                </div>
              )}
            </div>

            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={handleReset}
                className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#59524B] bg-[#EFE9DE] hover:bg-[#E5DDCF] rounded-md transition-colors"
              >
                Make Another Booking
              </button>
              <a
                href="#menu"
                className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#211D1A] hover:bg-[#38322D] rounded-md transition-colors text-center"
              >
                Pre-Select Menu Items
              </a>
            </div>
          </div>
        ) : (
          /* Working Reservation Form */
          <div className="max-w-3xl mx-auto bg-white rounded-xl border border-[#E3DCCF] shadow-sm p-6 sm:p-10">
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* Step 1: Date & Party Size */}
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#8A5A36] mb-3">
                  <CalendarIcon className="w-3.5 h-3.5" />
                  <span>1. Choose Date &amp; Guests</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#59524B] mb-1.5">
                      Select Date
                    </label>
                    <input
                      type="date"
                      value={date}
                      min={new Date().toISOString().split('T')[0]}
                      onChange={(e) => setDate(e.target.value)}
                      required
                      className="w-full text-xs px-3.5 py-2.5 bg-[#FAF7F2] border border-[#DDD5C7] rounded-lg text-[#211D1A] focus:outline-none focus:ring-2 focus:ring-[#8A5A36]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#59524B] mb-1.5">
                      Party Size
                    </label>
                    <div className="grid grid-cols-6 gap-1">
                      {[1, 2, 3, 4, 5, 6].map((size) => (
                        <button
                          key={size}
                          type="button"
                          onClick={() => setPartySize(size)}
                          className={`py-2 text-xs font-semibold rounded-md border transition-all ${
                            partySize === size
                              ? 'bg-[#211D1A] text-white border-[#211D1A]'
                              : 'bg-[#FAF7F2] text-[#59524B] border-[#DDD5C7] hover:border-[#B5ABA0]'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 2: Time Slot */}
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#8A5A36] mb-3">
                  <Clock className="w-3.5 h-3.5" />
                  <span>2. Select Seating Time</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {TIME_SLOTS.map((slot) => (
                    <button
                      key={slot.time}
                      type="button"
                      onClick={() => setTime(slot.time)}
                      className={`p-2.5 text-left rounded-lg border transition-all ${
                        time === slot.time
                          ? 'bg-[#211D1A] text-white border-[#211D1A] shadow-xs'
                          : 'bg-[#FAF7F2] text-[#4A433D] border-[#DDD5C7] hover:border-[#B5ABA0]'
                      }`}
                    >
                      <span className="block text-xs font-semibold tabular-nums">{slot.time}</span>
                      <span className={`text-[10px] block mt-0.5 ${time === slot.time ? 'text-[#D8B48D]' : 'text-[#8A8074]'}`}>
                        {slot.period}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 3: Seating Preference */}
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#8A5A36] mb-3">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>3. Seating Atmosphere</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {SEATING_OPTIONS.map((opt) => (
                    <div
                      key={opt.id}
                      onClick={() => setSeatingArea(opt.id)}
                      className={`p-3.5 rounded-lg border cursor-pointer transition-all ${
                        seatingArea === opt.id
                          ? 'bg-[#F2EDE4] border-[#8A5A36] ring-1 ring-[#8A5A36]'
                          : 'bg-[#FAF7F2] border-[#DDD5C7] hover:border-[#B5ABA0]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-[#211D1A]">
                          {opt.label}
                        </span>
                        <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                          seatingArea === opt.id ? 'border-[#8A5A36] bg-[#8A5A36]' : 'border-[#C4BAAC]'
                        }`}>
                          {seatingArea === opt.id && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </div>
                      </div>
                      <p className="mt-1 text-[11px] text-[#696157] leading-relaxed">
                        {opt.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Step 4: Guest Contact Details */}
              <div className="pt-4 border-t border-[#E8E2D8]">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#8A5A36] mb-3">
                  <Users className="w-3.5 h-3.5" />
                  <span>4. Guest Details</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-[#59524B] mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Maya Lin"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="w-full text-xs px-3.5 py-2.5 bg-[#FAF7F2] border border-[#DDD5C7] rounded-lg text-[#211D1A] focus:outline-none focus:ring-2 focus:ring-[#8A5A36]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#59524B] mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      placeholder="name@domain.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full text-xs px-3.5 py-2.5 bg-[#FAF7F2] border border-[#DDD5C7] rounded-lg text-[#211D1A] focus:outline-none focus:ring-2 focus:ring-[#8A5A36]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#59524B] mb-1">
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      className="w-full text-xs px-3.5 py-2.5 bg-[#FAF7F2] border border-[#DDD5C7] rounded-lg text-[#211D1A] focus:outline-none focus:ring-2 focus:ring-[#8A5A36]"
                    />
                  </div>
                </div>

                <div className="mt-3">
                  <label className="block text-xs font-medium text-[#59524B] mb-1">
                    Special Occasion or Dietary Notes (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Quiet corner preferred, celebrating birthday, gluten intolerance"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    maxLength={140}
                    className="w-full text-xs px-3.5 py-2.5 bg-[#FAF7F2] border border-[#DDD5C7] rounded-lg text-[#211D1A] focus:outline-none focus:ring-2 focus:ring-[#8A5A36]"
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-[11px] text-[#7A7167]">
                  No reservation fee. Tables are held for 15 minutes past scheduled time.
                </p>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-8 py-3.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#211D1A] hover:bg-[#38322D] rounded-md transition-colors shadow-sm disabled:opacity-50 whitespace-nowrap"
                >
                  {isSubmitting ? 'Confirming...' : 'Confirm Table Reservation'}
                </button>
              </div>

            </form>
          </div>
        )}

      </div>
    </section>
  );
};
