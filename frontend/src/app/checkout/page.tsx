"use client";

import { useState } from "react";
import { useCartStore } from "@/entities/cart/cart-store";
import { orderService } from "@/features/orders/api/order-service";
import { Container } from "@/shared/ui/container";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { shippingSchema, paymentSchema, ShippingFormData, PaymentFormData } from "@/features/checkout/schemas";
import { Check, CreditCard, Truck } from "lucide-react";
import { cn } from "@/shared/utils/cn";

const STEPS = ["Shipping", "Payment", "Review"];

export default function CheckoutPage() {
  const { items, clearCart } = useCartStore();
  const [currentStep, setCurrentStep] = useState(0);
  const [shippingData, setShippingData] = useState<ShippingFormData | null>(null);
  const [paymentData, setPaymentData] = useState<PaymentFormData | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "", lastName: "", email: "", address: "", city: "", postalCode: "", country: "",
    cardNumber: "", expiryDate: "", cvc: "", cardHolder: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = shippingSchema.parse(formData);
      setShippingData(data);
      setCurrentStep(1);
    } catch {
      alert("Please fill in all required fields correctly.");
    }
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = paymentSchema.parse(formData);
      setPaymentData(data);
      setCurrentStep(2);
    } catch {
      alert("Please fill in all payment details correctly.");
    }
  };

  const handlePlaceOrder = async () => {
    if (!shippingData) return;
    setIsProcessing(true);
    try {
      await orderService.createOrder({
        shippingAddress: {
          firstName: shippingData.firstName,
          lastName: shippingData.lastName,
          email: shippingData.email,
          line1: shippingData.address,
          city: shippingData.city,
          postalCode: shippingData.postalCode,
          country: shippingData.country,
        },
        items: items.map((item) => ({
          productId: item.product.id,
          productSlug: item.product.slug,
          productName: item.product.name,
          unitPrice: item.product.price,
          currency: item.product.currency,
          quantity: item.quantity,
          size: item.size,
          color: item.color,
          image: item.product.images[0] ?? "",
        })),
        idempotencyKey: typeof crypto !== "undefined" ? crypto.randomUUID() : undefined,
      });
      await clearCart();
      setIsSuccess(true);
    } finally {
      setIsProcessing(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="py-20 bg-brand-cream min-h-screen">
        <Container className="text-center max-w-md">
          <div className="w-20 h-20 bg-brand-teal text-white rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10" />
          </div>
          <h1 className="font-montserrat font-bold text-3xl text-brand-teal mb-4">Order Confirmed!</h1>
          <p className="text-brand-charcoal/70 mb-8">
            Thank you for your order, {shippingData?.firstName}. We&apos;ll send a confirmation email to {shippingData?.email} shortly.
          </p>
          <Button onClick={() => window.location.href = "/"} className="w-full bg-brand-gold hover:bg-brand-gold/90 text-white">
            Return to Home
          </Button>
        </Container>
      </div>
    );
  }

  if (items.length === 0 && !isSuccess) {
      return (
          <div className="py-20 bg-brand-cream min-h-screen text-center">
             <Container>
              <h1 className="font-montserrat font-bold text-2xl text-brand-teal">Cart is empty</h1>
              <Button onClick={() => window.location.href = "/products"} className="mt-4" variant="link">Go Shopping</Button>
             </Container>
          </div>
      )
  }

  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const shipping = subtotal > 150 ? 0 : 15;
  const total = subtotal + shipping;

  return (
    <div className="py-12 bg-brand-cream min-h-screen">
      <Container>
        <div className="flex flex-col md:flex-row gap-8 lg:gap-16">
          <div className="flex-1">
            <div className="flex items-center mb-10">
              {STEPS.map((step, index) => (
                <div key={step} className="flex items-center">
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors",
                    index <= currentStep ? "bg-brand-teal text-white" : "bg-brand-teal/10 text-brand-teal"
                  )}>
                    {index < currentStep ? <Check className="w-4 h-4" /> : index + 1}
                  </div>
                  <span className={cn(
                    "ml-2 text-sm font-medium",
                    index <= currentStep ? "text-brand-teal" : "text-brand-charcoal/50"
                  )}>{step}</span>
                  {index < STEPS.length - 1 && (
                    <div className="w-12 h-px bg-brand-teal/20 mx-4" />
                  )}
                </div>
              ))}
            </div>

            {currentStep === 0 && (
              <form onSubmit={handleShippingSubmit} className="space-y-6 bg-white p-8 rounded-sm shadow-sm border border-brand-teal/5">
                <h2 className="font-montserrat font-bold text-xl text-brand-teal flex items-center gap-2">
                  <Truck className="w-5 h-5" /> Shipping Details
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">First Name</label>
                    <Input name="firstName" value={formData.firstName} onChange={handleChange} required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Last Name</label>
                    <Input name="lastName" value={formData.lastName} onChange={handleChange} required />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <Input name="email" type="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium">Address</label>
                    <Input name="address" value={formData.address} onChange={handleChange} required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">City</label>
                    <Input name="city" value={formData.city} onChange={handleChange} required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Postal Code</label>
                    <Input name="postalCode" value={formData.postalCode} onChange={handleChange} required />
                  </div>
                </div>
                 <div className="space-y-2">
                    <label className="text-sm font-medium">Country</label>
                    <Input name="country" value={formData.country} onChange={handleChange} required />
                </div>
                <Button type="submit" className="w-full h-12 bg-brand-teal hover:bg-brand-teal/90 text-white">
                  Continue to Payment
                </Button>
              </form>
            )}

            {currentStep === 1 && (
              <form onSubmit={handlePaymentSubmit} className="space-y-6 bg-white p-8 rounded-sm shadow-sm border border-brand-teal/5">
                <h2 className="font-montserrat font-bold text-xl text-brand-teal flex items-center gap-2">
                  <CreditCard className="w-5 h-5" /> Payment Details
                </h2>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Card Number</label>
                  <Input name="cardNumber" placeholder="0000 0000 0000 0000" value={formData.cardNumber} onChange={handleChange} required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Expiry Date (MM/YY)</label>
                    <Input name="expiryDate" placeholder="MM/YY" value={formData.expiryDate} onChange={handleChange} required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">CVC</label>
                    <Input name="cvc" placeholder="123" value={formData.cvc} onChange={handleChange} required />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Card Holder Name</label>
                  <Input name="cardHolder" value={formData.cardHolder} onChange={handleChange} required />
                </div>
                <div className="flex gap-4">
                    <Button type="button" variant="outline" onClick={() => setCurrentStep(0)} className="flex-1">Back</Button>
                    <Button type="submit" className="flex-1 h-12 bg-brand-teal hover:bg-brand-teal/90 text-white">
                    Review Order
                    </Button>
                </div>
              </form>
            )}

            {currentStep === 2 && (
              <div className="space-y-6 bg-white p-8 rounded-sm shadow-sm border border-brand-teal/5">
                <h2 className="font-montserrat font-bold text-xl text-brand-teal">Review Order</h2>
                
                <div className="space-y-4 text-sm">
                  <div className="p-4 bg-brand-cream/30 rounded-sm">
                    <h3 className="font-bold mb-2 text-brand-teal">Shipping to:</h3>
                    <p>{shippingData?.firstName} {shippingData?.lastName}</p>
                    <p>{shippingData?.address}</p>
                    <p>{shippingData?.city}, {shippingData?.postalCode}</p>
                    <p>{shippingData?.country}</p>
                  </div>
                  <div className="p-4 bg-brand-cream/30 rounded-sm">
                    <h3 className="font-bold mb-2 text-brand-teal">Payment Method:</h3>
                    <p>Card ending in **** {paymentData?.cardNumber.slice(-4)}</p>
                  </div>
                </div>

                <div className="flex gap-4">
                    <Button type="button" variant="outline" onClick={() => setCurrentStep(1)} className="flex-1">Back</Button>
                    <Button onClick={handlePlaceOrder} disabled={isProcessing} className="flex-1 h-12 bg-brand-gold hover:bg-brand-gold/90 text-white">
                    {isProcessing ? "Processing..." : `Pay ${new Intl.NumberFormat('en-IE', { style: 'currency', currency: 'EUR' }).format(total)}`}
                    </Button>
                </div>
              </div>
            )}
          </div>

          <div className="w-full lg:w-96">
            <div className="bg-white p-6 rounded-sm shadow-sm border border-brand-teal/5 sticky top-24">
              <h3 className="font-montserrat font-bold text-lg text-brand-teal mb-4">Order Summary</h3>
              <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2">
                {items.map((item) => (
                    <div key={`${item.product.id}-${item.size}-${item.color}`} className="flex gap-4 text-sm">
                        <div className="w-16 h-20 bg-brand-teal/5 rounded-sm overflow-hidden flex-shrink-0">
                             <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                            <p className="font-bold text-brand-teal line-clamp-2">{item.product.name}</p>
                            <p className="text-brand-charcoal/60">Qty: {item.quantity}</p>
                            <p className="font-medium">{new Intl.NumberFormat('en-IE', { style: 'currency', currency: item.product.currency }).format(item.product.price)}</p>
                        </div>
                    </div>
                ))}
              </div>
              
              <div className="space-y-2 text-sm border-t border-brand-teal/10 pt-4">
                 <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{new Intl.NumberFormat('en-IE', { style: 'currency', currency: 'EUR' }).format(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? "Free" : new Intl.NumberFormat('en-IE', { style: 'currency', currency: 'EUR' }).format(shipping)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-2 text-brand-teal">
                  <span>Total</span>
                  <span>{new Intl.NumberFormat('en-IE', { style: 'currency', currency: 'EUR' }).format(total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
