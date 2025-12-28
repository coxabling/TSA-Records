
import React, { useState, useEffect } from 'react';
import { User } from './LoginPage';

interface CheckoutPageProps {
  user: User;
}

const CheckoutPage: React.FC<CheckoutPageProps> = ({ user }) => {
  const [method, setMethod] = useState<'stripe' | 'paypal'>('stripe');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  // Extract item details from URL or session
  const params = new URLSearchParams(window.location.search);
  const itemName = params.get('item') || 'TSA Pro Plan';
  const itemPrice = params.get('price') || '$79.00';
  const serviceType = params.get('type') || 'subscription';

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      
      // Update the Order Flow: Payment Confirmed (Stage 2)
      const pendingOrders = JSON.parse(localStorage.getItem(`tsa-pending-${user.email}`) || '{}');
      if (pendingOrders.item === itemName) {
        // In a real app, you'd update the DB. Here we simulate updating the campaign status.
        // For micro-services, we find the latest and update its status
        const storageKeys = ['tsa-campaigns', 'tsa-tiktok-orders', 'tsa-artist-pages', 'tsa-radio-distro', 'tsa-playlist-subs', 'tsa-epks', 'tsa-sync-apps', 'tsa-accelerator-apps'];
        
        storageKeys.forEach(key => {
            const data = JSON.parse(localStorage.getItem(key) || '[]');
            const updated = data.map((item: any) => {
                if (item.userEmail === user.email && item.status === 'Order Received') {
                    return { ...item, status: 'Payment Confirmed' };
                }
                return item;
            });
            localStorage.setItem(key, JSON.stringify(updated));
        });
      }
    }, 2500);
  };

  if (isSuccess) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-6">
        <div className="max-w-md w-full text-center space-y-8 animate-in fade-in zoom-in duration-700">
          <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto border border-green-500/30">
            <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-4xl font-black uppercase italic tracking-tighter">Payment Confirmed</h1>
          <p className="text-gray-400">Your transaction was successful. Your {itemName} is now moving to <strong>Content Review</strong> (Stage 3).</p>
          <div className="pt-8">
            <a href="#/dashboard" className="px-12 py-4 bg-neon-purple text-white font-black rounded-2xl uppercase tracking-[0.4em] hover:scale-105 transition-all shadow-neon-purple block">Enter Command Center</a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-24 px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Order Summary */}
          <div className="space-y-12">
            <div>
              <h1 className="text-5xl font-black uppercase italic tracking-tighter mb-4">Checkout</h1>
              <p className="text-gray-500 text-lg italic">Complete your payment to activate your TSA service.</p>
            </div>

            <div className="bg-white/[0.02] border border-white/5 rounded-[48px] p-10 backdrop-blur-3xl">
              <h2 className="text-[10px] font-black text-gray-700 uppercase tracking-[0.6em] mb-8">Selected Service</h2>
              <div className="flex justify-between items-end">
                <div>
                  <div className="text-3xl font-black text-white tracking-tight">{itemName}</div>
                  <div className="text-[12px] text-neon-purple font-black uppercase tracking-[0.3em] mt-2">{serviceType}</div>
                </div>
                <div className="text-4xl font-black text-white tracking-tighter">{itemPrice}</div>
              </div>
              <div className="mt-8 pt-8 border-t border-white/5 space-y-4">
                <div className="flex justify-between text-xs font-bold text-gray-500 uppercase tracking-widest">
                  <span>Subtotal</span>
                  <span>{itemPrice}</span>
                </div>
                <div className="flex justify-between text-xs font-bold text-gray-500 uppercase tracking-widest">
                  <span>Processing Fee</span>
                  <span>$0.00</span>
                </div>
                <div className="flex justify-between text-lg font-black text-white uppercase tracking-tighter pt-4">
                  <span>Total Due</span>
                  <span className="text-electric-blue">{itemPrice}</span>
                </div>
              </div>
            </div>

            <div className="bg-electric-blue/5 border border-electric-blue/20 rounded-3xl p-6 flex gap-6 items-center">
              <div className="w-12 h-12 bg-electric-blue/10 rounded-full flex items-center justify-center shrink-0">
                 <svg className="w-6 h-6 text-electric-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              </div>
              <p className="text-[11px] text-gray-400 font-bold uppercase tracking-wider leading-relaxed">Secure transaction via industrial-grade encryption. No financial data is stored on TSA servers.</p>
            </div>
          </div>

          {/* Payment Gateway Interface */}
          <div className="bg-white/[0.01] border border-white/5 rounded-[64px] p-10 lg:p-14 shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 p-10 opacity-[0.03] text-[200px] -rotate-12">💳</div>
             
             <h2 className="text-2xl font-black text-white uppercase tracking-tighter mb-10 italic">Select Payment Engine</h2>
             
             <div className="grid grid-cols-2 gap-6 mb-12">
                <button 
                  onClick={() => setMethod('stripe')}
                  className={`flex flex-col items-center justify-center p-8 rounded-[40px] border-2 transition-all group ${method === 'stripe' ? 'border-neon-purple bg-neon-purple/5' : 'border-white/5 hover:border-white/20'}`}
                >
                   <div className="h-8 flex items-center mb-4">
                      <svg viewBox="0 0 60 25" className={`h-full ${method === 'stripe' ? 'fill-neon-purple' : 'fill-gray-600 group-hover:fill-white'}`}><path d="M59.64 14.28c0-4.59-2.29-8.21-6.41-8.21-4.12 0-6.16 3.74-6.16 8.21 0 5.22 2.6 8.2 6.16 8.2 2.21 0 3.73-.59 4.88-1.51l.01-.01v-3.32c-1.13.74-2.12 1.09-3.5 1.09-1.57 0-2.61-.63-2.61-2.48h11.51c.01-.19.12-.44.12-.73V14.28zm-8.87-1.88c0-1.58.82-2.31 2.22-2.31 1.34 0 2.22.73 2.22 2.31H50.77zM44.42 14.28c0-4.59-2.29-8.21-6.41-8.21-4.12 0-6.16 3.74-6.16 8.21 0 5.22 2.6 8.2 6.16 8.2 2.21 0 3.73-.59 4.88-1.51l.01-.01v-3.32c-1.13.74-2.12 1.09-3.5 1.09-1.57 0-2.61-.63-2.61-2.48H44.8c.01-.19.12-.44.12-.73V14.28zm-8.87-1.88c0-1.58.82-2.31 2.22-2.31 1.34 0 2.22.73 2.22 2.31H35.55zM27.24 6.07c-1.28 0-2.31.59-3.08 1.19l-.15-1.03h-3.77v16.14l4.24-.91V16.8c1.03-.66 2.06-1 3.19-1 1.76 0 2.61 1.1 2.61 2.76v5.82h4.24v-6.07c.01-4.12-2.13-6.24-5.28-6.24zM16.12 6.07c-1.28 0-2.31.59-3.08 1.19l-.15-1.03h-3.77v16.14l4.24-.91V16.8c1.03-.66 2.06-1 3.19-1 1.76 0 2.61 1.1 2.61 2.76v5.82h4.24v-6.07c.01-4.12-2.13-6.24-5.28-6.24zM4.04 6.24h3.76l-.15 1.03c.77-.6 1.8-1.19 3.08-1.19 3.15 0 5.29 2.12 5.29 6.24v6.07h-4.24v-5.82c0-1.66-.85-2.76-2.61-2.76-1.13 0-2.16.34-3.19 1v4.66l-4.24.91V6.24zM.16 0h4.24v4.24H.16z"/></svg>
                   </div>
                   <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 group-hover:text-white">Stripe</span>
                </button>
                <button 
                  onClick={() => setMethod('paypal')}
                  className={`flex flex-col items-center justify-center p-8 rounded-[40px] border-2 transition-all group ${method === 'paypal' ? 'border-electric-blue bg-electric-blue/5' : 'border-white/5 hover:border-white/20'}`}
                >
                   <div className="h-8 flex items-center mb-4">
                      <svg viewBox="0 0 100 100" className={`h-full ${method === 'paypal' ? 'fill-electric-blue' : 'fill-gray-600 group-hover:fill-white'}`}><path d="M78.6 30c-2.8-12.7-13.4-18.7-27.4-18.7H21c-1.4 0-2.6 1.1-2.8 2.5L7.1 82c-.2 1.2.7 2.2 1.9 2.2h15.4c1.4 0 2.6-1.1 2.8-2.5l3.8-23.7c.2-1.4 1.4-2.5 2.8-2.5h8.9c16.3 0 29.1-6.6 32.7-25.5H75.4zM53.1 46H39.4l2.4-15h13.7c5.6 0 9.8 1.9 10.9 7.5 1.1 5.6-3.1 7.5-13.3 7.5z" /></svg>
                   </div>
                   <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 group-hover:text-white">PayPal</span>
                </button>
             </div>

             <form onSubmit={handlePayment} className="space-y-8">
                {method === 'stripe' ? (
                  <div className="space-y-6">
                    <div className="bg-black/60 border border-white/5 p-8 rounded-3xl space-y-6">
                       <div>
                          <label className="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-3 block">Card Network Number</label>
                          <input required type="text" placeholder="xxxx xxxx xxxx xxxx" className="w-full bg-transparent border-b border-white/10 text-xl font-mono text-white p-2 focus:border-neon-purple outline-none" />
                       </div>
                       <div className="grid grid-cols-2 gap-10">
                          <div>
                             <label className="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-3 block">Expiry</label>
                             <input required type="text" placeholder="MM / YY" className="w-full bg-transparent border-b border-white/10 text-xl font-mono text-white p-2 focus:border-neon-purple outline-none" />
                          </div>
                          <div>
                             <label className="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-3 block">CVC</label>
                             <input required type="password" placeholder="***" className="w-full bg-transparent border-b border-white/10 text-xl font-mono text-white p-2 focus:border-neon-purple outline-none" />
                          </div>
                       </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-electric-blue/5 border border-electric-blue/10 p-10 rounded-[40px] text-center space-y-6">
                     <div className="text-4xl">🌎</div>
                     <p className="text-gray-400 font-bold italic">You will be securely redirected to the PayPal gateway to finalize your transaction.</p>
                  </div>
                )}

                <button 
                  disabled={isProcessing}
                  type="submit" 
                  className={`w-full py-8 text-[14px] font-black uppercase tracking-[0.8em] rounded-[40px] shadow-2xl active:scale-95 transition-all border-b-6 ${method === 'stripe' ? 'bg-white text-black border-gray-400 hover:bg-neon-purple hover:text-white hover:border-neon-purple' : 'bg-[#FFC439] text-[#003087] border-[#cc9d2d]'}`}
                >
                  {isProcessing ? (
                    <span className="flex items-center justify-center gap-4">
                       <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></span>
                       Authorizing...
                    </span>
                  ) : (
                    `Finalize $${itemPrice.replace('$', '')} Order`
                  )}
                </button>
             </form>

             <p className="mt-10 text-center text-[10px] text-gray-700 font-black uppercase tracking-[0.3em]">
                By completing this order, you agree to the <a href="#/about" className="text-gray-500 hover:text-white underline">TSA Global Licensing Terms</a>.
             </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
