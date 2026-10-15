'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck,
  Search,
  Download,
  Printer,
  HelpCircle,
  Mail,
  FileText,
  CheckCircle2,
  AlertCircle,
  Send,
  Lock,
  BookOpen,
} from 'lucide-react';

interface CustomerOrderSummary {
  id: string;
  receiptNumber: string;
  productTitle: string;
  totalAmount: number;
  currency: string;
  paymentMethod: string;
  paymentChannel: string;
  paymentStatus: string;
  paymentReference: string;
  createdAt: string;
  downloadCount: number;
  maxDownloads: number;
  downloadUrl: string;
  cardBrand?: string;
  cardLast4?: string;
  customer: {
    name: string;
    email: string;
    country: string;
  };
}

interface SubmittedTicketResponse {
  id: string;
  subject: string;
  createdAt: string;
  status: string;
}

export default function SupportPage() {
  // Order Lookup State
  const [lookupEmail, setLookupEmail] = useState('');
  const [isSearchingOrders, setIsSearchingOrders] = useState(false);
  const [orderResults, setOrderResults] = useState<CustomerOrderSummary[] | null>(null);
  const [lookupError, setLookupError] = useState('');

  // Selected Invoice Modal State
  const [selectedInvoice, setSelectedInvoice] = useState<CustomerOrderSummary | null>(null);

  // Support Ticket Form State
  const [ticketName, setTicketName] = useState('');
  const [ticketEmail, setTicketEmail] = useState('');
  const [ticketOrderId, setTicketOrderId] = useState('');
  const [ticketSubject, setTicketSubject] = useState('Download or Access Assistance');
  const [ticketPriority, setTicketPriority] = useState<'low' | 'medium' | 'high' | 'urgent'>('medium');
  const [ticketMessage, setTicketMessage] = useState('');
  const [isSubmittingTicket, setIsSubmittingTicket] = useState(false);
  const [submittedTicket, setSubmittedTicket] = useState<SubmittedTicketResponse | null>(null);
  const [ticketError, setTicketError] = useState('');

  // Handle Order Lookup
  const handleOrderLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLookupError('');
    setOrderResults(null);

    if (!lookupEmail.trim() || !lookupEmail.includes('@')) {
      setLookupError('Please enter a valid purchase email address.');
      return;
    }

    setIsSearchingOrders(true);
    try {
      const res = await fetch('/api/customer/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: lookupEmail }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to search order records.');
      }

      setOrderResults(data.orders);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error communicating with order vault.';
      setLookupError(msg);
    } finally {
      setIsSearchingOrders(false);
    }
  };

  // Handle Ticket Submission
  const handleTicketSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTicketError('');

    if (!ticketName || !ticketEmail || !ticketMessage) {
      setTicketError('Please fill in your name, email, and message.');
      return;
    }

    setIsSubmittingTicket(true);
    try {
      const res = await fetch('/api/support/ticket', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: ticketName,
          email: ticketEmail,
          orderId: ticketOrderId,
          subject: ticketSubject,
          message: ticketMessage,
          priority: ticketPriority,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to submit ticket.');
      }

      setSubmittedTicket(data.ticket);
      setTicketMessage('');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error submitting ticket.';
      setTicketError(msg);
    } finally {
      setIsSubmittingTicket(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 py-16 px-4 sm:px-6 lg:px-8">
      {/* Background radial highlight */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-amber-500/10 blur-[130px] pointer-events-none" />

      <div className="relative max-w-5xl mx-auto space-y-16">
        {/* HEADER */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>24/7 International Customer Care & Digital Order Vault</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
            Order Lookup & Priority Support
          </h1>
          <p className="text-neutral-400 text-sm sm:text-base max-w-2xl mx-auto">
            Retrieve your purchased publications, generate official VAT receipts, re-download high-resolution master PDFs, or reach our priority client support desk.
          </p>
        </div>

        {/* SECTION 1: ORDER LOOKUP & VAULT */}
        <div className="bg-neutral-900/70 border border-neutral-800 rounded-2xl p-6 sm:p-8 backdrop-blur-md shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-neutral-800 gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-white flex items-center gap-2.5">
                <Search className="w-5 h-5 text-amber-400" />
                Find Your Digital Purchases
              </h2>
              <p className="text-xs sm:text-sm text-neutral-400 mt-1">
                Enter the email address used during your Paysafe checkout to unlock your download links.
              </p>
            </div>
            <div className="text-xs font-mono text-neutral-400 flex items-center gap-1.5 self-start sm:self-auto bg-neutral-950 px-3 py-1.5 rounded-lg border border-neutral-800">
              <Lock className="w-3.5 h-3.5 text-emerald-400" />
              <span>Encrypted Vault</span>
            </div>
          </div>

          <form onSubmit={handleOrderLookup} className="mt-6 flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              required
              placeholder="Enter your purchase email (e.g. sample@theinnermethod.com)"
              value={lookupEmail}
              onChange={(e) => setLookupEmail(e.target.value)}
              className="flex-1 bg-neutral-950 border border-neutral-800 focus:border-amber-400/60 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none transition-colors"
            />
            <button
              type="submit"
              disabled={isSearchingOrders}
              className="py-3 px-6 rounded-xl font-semibold text-neutral-950 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 hover:from-amber-200 hover:to-amber-400 shadow-md shadow-amber-500/10 transition-all text-sm flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
            >
              {isSearchingOrders ? (
                <div className="inline-block animate-spin rounded-full h-4 w-4 border-2 border-neutral-950 border-t-transparent" />
              ) : (
                <Search className="w-4 h-4" />
              )}
              <span>Lookup Orders</span>
            </button>
          </form>

          {/* Quick Demo Hint */}
          <div className="mt-3 text-[11px] text-neutral-500 flex items-center gap-1">
            <span>Tip: Try testing with</span>
            <button
              type="button"
              onClick={() => setLookupEmail('sample@theinnermethod.com')}
              className="text-amber-400 hover:underline font-mono"
            >
              sample@theinnermethod.com
            </button>
            <span>to preview verified order output.</span>
          </div>

          {lookupError && (
            <div className="mt-4 p-3 rounded-lg bg-rose-950/50 border border-rose-500/50 text-rose-200 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{lookupError}</span>
            </div>
          )}

          {/* RESULTS LIST */}
          {orderResults !== null && (
            <div className="mt-8 space-y-4">
              <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-400">
                Purchases Found ({orderResults.length})
              </h3>

              {orderResults.length === 0 ? (
                <div className="text-center py-8 bg-neutral-950/60 rounded-xl border border-neutral-800/80 p-6 space-y-2">
                  <BookOpen className="w-8 h-8 text-neutral-600 mx-auto" />
                  <p className="text-sm text-neutral-300 font-medium">No orders found for this email address.</p>
                  <p className="text-xs text-neutral-500 max-w-md mx-auto">
                    Ensure you typed the exact email entered during payment. If you paid with a different address or need assistance, submit a ticket below.
                  </p>
                </div>
              ) : (
                <div className="grid gap-4">
                  {orderResults.map((order) => (
                    <motion.div
                      key={order.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-neutral-950 border border-neutral-800/90 hover:border-amber-500/40 rounded-xl p-5 transition-all shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-semibold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                            {order.id}
                          </span>
                          <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                            Paid via Paysafe ({order.paymentMethod})
                          </span>
                        </div>

                        <h4 className="text-base font-serif font-bold text-white pt-1">
                          {order.productTitle}
                        </h4>

                        <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-400 pt-1 font-mono">
                          <span>Date: {new Date(order.createdAt).toLocaleDateString()}</span>
                          <span>·</span>
                          <span className="text-neutral-200">
                            Paid: {order.currency} {order.totalAmount}
                          </span>
                          <span>·</span>
                          <span className="text-neutral-400">
                            Downloads: {order.downloadCount} / {order.maxDownloads}
                          </span>
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center gap-2 self-start md:self-auto pt-2 md:pt-0">
                        <a
                          href={order.downloadUrl}
                          download
                          className="inline-flex items-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold text-neutral-950 bg-gradient-to-r from-amber-300 to-amber-500 hover:from-amber-200 hover:to-amber-400 shadow transition-all"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Download PDF</span>
                        </a>

                        <button
                          type="button"
                          onClick={() => setSelectedInvoice(order)}
                          className="inline-flex items-center gap-1.5 py-2.5 px-3.5 rounded-xl text-xs font-medium text-neutral-200 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700/80 transition-colors"
                        >
                          <FileText className="w-3.5 h-3.5 text-neutral-400" />
                          <span>View Invoice</span>
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* SECTION 2: PRINTABLE INVOICE MODAL */}
        <AnimatePresence>
          {selectedInvoice && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative w-full max-w-xl bg-white text-neutral-900 rounded-2xl p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[90vh]"
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedInvoice(null)}
                  className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-neutral-900 rounded-full"
                >
                  ✕
                </button>

                {/* Print Button Header */}
                <div className="flex items-center justify-between pb-6 border-b border-neutral-200">
                  <div>
                    <span className="text-xs uppercase tracking-widest font-mono text-neutral-500 font-bold">
                      Official Tax Invoice & Receipt
                    </span>
                    <h3 className="text-xl font-serif font-bold text-neutral-950">
                      The Inner Method Publishing
                    </h3>
                  </div>
                  <button
                    onClick={() => window.print()}
                    className="inline-flex items-center gap-1.5 py-2 px-3 rounded-lg text-xs font-semibold bg-neutral-100 hover:bg-neutral-200 text-neutral-800 border border-neutral-300 transition-colors cursor-pointer"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Print Receipt</span>
                  </button>
                </div>

                {/* Invoice Meta */}
                <div className="grid grid-cols-2 gap-4 py-4 text-xs font-mono border-b border-neutral-200">
                  <div>
                    <p className="text-neutral-500">INVOICE NUMBER:</p>
                    <p className="font-bold text-neutral-900">{selectedInvoice.receiptNumber}</p>
                    <p className="text-neutral-500 mt-2">ORDER ID:</p>
                    <p className="font-bold text-neutral-900">{selectedInvoice.id}</p>
                  </div>
                  <div>
                    <p className="text-neutral-500">DATE ISSUED:</p>
                    <p className="font-bold text-neutral-900">
                      {new Date(selectedInvoice.createdAt).toLocaleDateString()}
                    </p>
                    <p className="text-neutral-500 mt-2">PAYMENT STATUS:</p>
                    <p className="font-bold text-emerald-700">PAID IN FULL (Paysafe)</p>
                  </div>
                </div>

                {/* Billed to */}
                <div className="py-4 text-xs font-mono border-b border-neutral-200">
                  <p className="text-neutral-500">LICENSED & BILLED TO:</p>
                  <p className="font-bold text-sm text-neutral-900">{selectedInvoice.customer.name}</p>
                  <p className="text-neutral-700">{selectedInvoice.customer.email}</p>
                  <p className="text-neutral-700">{selectedInvoice.customer.country}</p>
                </div>

                {/* Line Item */}
                <div className="py-4 space-y-2 border-b border-neutral-200 text-xs font-mono">
                  <div className="flex justify-between font-bold text-neutral-900 pb-1">
                    <span>Item Description</span>
                    <span>Amount</span>
                  </div>
                  <div className="flex justify-between text-neutral-800">
                    <span>
                      {selectedInvoice.productTitle} (Complete Masterclass PDF & Lifetime Access)
                    </span>
                    <span>
                      {selectedInvoice.currency} {selectedInvoice.totalAmount}
                    </span>
                  </div>
                  <div className="flex justify-between text-neutral-500 text-[11px] pt-1">
                    <span>VAT / International Digital Tax (0% Reverse-Charge)</span>
                    <span>{selectedInvoice.currency} 0.00</span>
                  </div>
                </div>

                {/* Total */}
                <div className="py-4 flex justify-between items-center text-sm font-mono">
                  <span className="font-bold text-neutral-900">Total Paid:</span>
                  <span className="text-lg font-bold text-neutral-950">
                    {selectedInvoice.currency} {selectedInvoice.totalAmount}
                  </span>
                </div>

                {/* Footer notes */}
                <div className="pt-3 text-[11px] text-neutral-500 text-center font-mono border-t border-neutral-200">
                  Payments securely processed via Paysafe Payment Channel. Reference: {selectedInvoice.paymentReference}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* SECTION 3: PRIORITY CUSTOMER SUPPORT DESK */}
        <div className="bg-neutral-900/70 border border-neutral-800 rounded-2xl p-6 sm:p-8 backdrop-blur-md shadow-xl">
          <div className="pb-6 border-b border-neutral-800">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-white flex items-center gap-2.5">
              <Mail className="w-5 h-5 text-amber-400" />
              Priority Customer Support Desk
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1">
              Need assistance with a download, formatting query, or billing verification? Our senior editorial and technical support team will resolve your request promptly.
            </p>
          </div>

          {submittedTicket ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-14 h-14 bg-emerald-500/20 border border-emerald-500/40 rounded-full flex items-center justify-center mx-auto text-emerald-400">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-serif font-bold text-white">Ticket Submitted Successfully</h3>
              <p className="text-xs sm:text-sm text-neutral-400 max-w-md mx-auto">
                Your ticket reference is <strong className="text-amber-400 font-mono">{submittedTicket.id}</strong>. We have logged your inquiry and our support desk will respond to your email within 2 to 4 hours.
              </p>
              <button
                type="button"
                onClick={() => setSubmittedTicket(null)}
                className="mt-4 py-2 px-5 rounded-xl text-xs font-semibold bg-neutral-800 hover:bg-neutral-700 text-neutral-200 transition-colors"
              >
                Submit Another Request
              </button>
            </div>
          ) : (
            <form onSubmit={handleTicketSubmit} className="mt-6 space-y-4">
              {ticketError && (
                <div className="p-3 rounded-lg bg-rose-950/50 border border-rose-500/50 text-rose-200 text-xs">
                  {ticketError}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-neutral-400 mb-1">Your Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alexander Vance"
                    value={ticketName}
                    onChange={(e) => setTicketName(e.target.value)}
                    disabled={isSubmittingTicket}
                    className="w-full bg-neutral-950 border border-neutral-800 focus:border-amber-400/60 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-neutral-400 mb-1">Your Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. name@domain.com"
                    value={ticketEmail}
                    onChange={(e) => setTicketEmail(e.target.value)}
                    disabled={isSubmittingTicket}
                    className="w-full bg-neutral-950 border border-neutral-800 focus:border-amber-400/60 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-1">
                  <label className="block text-xs font-mono text-neutral-400 mb-1">
                    Order Reference (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="TIM-ORD-2026-XXXXX"
                    value={ticketOrderId}
                    onChange={(e) => setTicketOrderId(e.target.value)}
                    disabled={isSubmittingTicket}
                    className="w-full bg-neutral-950 border border-neutral-800 focus:border-amber-400/60 rounded-xl px-4 py-2.5 text-sm font-mono text-white focus:outline-none"
                  />
                </div>
                <div className="sm:col-span-1">
                  <label className="block text-xs font-mono text-neutral-400 mb-1">Inquiry Category</label>
                  <select
                    value={ticketSubject}
                    onChange={(e) => setTicketSubject(e.target.value)}
                    disabled={isSubmittingTicket}
                    className="w-full bg-neutral-950 border border-neutral-800 focus:border-amber-400/60 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none"
                  >
                    <option value="Download or Access Assistance">Download or Access Assistance</option>
                    <option value="Paysafe Payment & Billing Verification">Paysafe Payment & Billing Verification</option>
                    <option value="3D Reader & Audio Support">3D Reader & Audio Support</option>
                    <option value="VAT Receipt & Invoice Request">VAT Receipt & Invoice Request</option>
                    <option value="30-Day Money-Back Guarantee">30-Day Money-Back Guarantee</option>
                    <option value="Other Inquiries">Other Inquiries</option>
                  </select>
                </div>
                <div className="sm:col-span-1">
                  <label className="block text-xs font-mono text-neutral-400 mb-1">Priority Level</label>
                  <select
                    value={ticketPriority}
                    onChange={(e) => setTicketPriority(e.target.value as 'low' | 'medium' | 'high' | 'urgent')}
                    disabled={isSubmittingTicket}
                    className="w-full bg-neutral-950 border border-neutral-800 focus:border-amber-400/60 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none"
                  >
                    <option value="low">Standard (12-24 Hours)</option>
                    <option value="medium">Medium (4-6 Hours)</option>
                    <option value="high">High Priority (2-4 Hours)</option>
                    <option value="urgent">Urgent Escalation (&lt; 2 Hours)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-neutral-400 mb-1">Describe Your Issue or Request</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Please provide any relevant details so we can assist you quickly..."
                  value={ticketMessage}
                  onChange={(e) => setTicketMessage(e.target.value)}
                  disabled={isSubmittingTicket}
                  className="w-full bg-neutral-950 border border-neutral-800 focus:border-amber-400/60 rounded-xl p-4 text-sm text-white focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmittingTicket}
                className="w-full py-3.5 px-6 rounded-xl font-semibold text-neutral-950 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 hover:from-amber-200 hover:to-amber-400 shadow-md shadow-amber-500/10 transition-all text-sm flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
              >
                {isSubmittingTicket ? (
                  <div className="inline-block animate-spin rounded-full h-4 w-4 border-2 border-neutral-950 border-t-transparent" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
                <span>Submit Priority Support Ticket</span>
              </button>
            </form>
          )}
        </div>

        {/* SECTION 4: PAYSAFE CHANNEL FAQ */}
        <div className="bg-neutral-900/40 border border-neutral-800/80 rounded-2xl p-6 sm:p-8 space-y-4">
          <h2 className="text-lg font-serif font-bold text-white flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-amber-400" />
            Paysafe Payment Channel FAQ
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-neutral-300">
            <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800/80 space-y-1.5">
              <h4 className="font-bold text-white">What payment methods does the Paysafe channel accept?</h4>
              <p className="text-neutral-400 leading-relaxed">
                We accept all major credit and debit cards (Visa, Mastercard, American Express, Discover), prepaid <strong>paysafecard</strong> vouchers, Skrill digital wallets, Neteller, Apple Pay, Google Pay, and international wire transfers.
              </p>
            </div>
            <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800/80 space-y-1.5">
              <h4 className="font-bold text-white">Is my payment information securely stored?</h4>
              <p className="text-neutral-400 leading-relaxed">
                No sensitive cardholder data, CVVs, or bank logins are ever stored on our servers. Transactions are tokenized directly with Paysafe under bank-grade 256-bit TLS encryption and PCI-DSS Level 1 compliance.
              </p>
            </div>
            <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800/80 space-y-1.5">
              <h4 className="font-bold text-white">What if my download fails or link expires?</h4>
              <p className="text-neutral-400 leading-relaxed">
                You can use this page to look up your order at any time using your checkout email and generate fresh authenticated download streams instantly.
              </p>
            </div>
            <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800/80 space-y-1.5">
              <h4 className="font-bold text-white">How does the 30-day money-back guarantee work?</h4>
              <p className="text-neutral-400 leading-relaxed">
                If our publications do not deliver the promised cognitive or strategic value, submit a ticket above or email support@theinnermethod.com within 30 days for an unconditional 100% refund.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
