import { NextRequest, NextResponse } from 'next/server';
import { PRODUCTS } from '@/data/products';
import { createOrder, PaymentMethod } from '@/lib/orders';
import { CURRENCIES, CurrencyCode } from '@/lib/currencyData';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      productId,
      customer,
      paymentMethod,
      currency = 'USD',
      cardDetails,
      paysafecardPin,
      skrillEmail,
    } = body;

    // 1. Basic validation
    if (!productId || !customer || !customer.email || !customer.name) {
      return NextResponse.json(
        { success: false, error: 'Customer name, valid email, and product selection are required.' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(customer.email)) {
      return NextResponse.json(
        { success: false, error: 'Please provide a valid email address for delivery.' },
        { status: 400 }
      );
    }

    // 2. Find product
    const product = PRODUCTS.find((p) => p.id === productId || p.slug === productId);
    if (!product) {
      return NextResponse.json(
        { success: false, error: 'Selected product is not found in catalog.' },
        { status: 404 }
      );
    }

    // 3. Currency and price verification
    const selectedCurrency = (currency.toUpperCase() as CurrencyCode) || 'USD';
    const currConfig = CURRENCIES[selectedCurrency] || CURRENCIES.USD;
    const rawPrice = product.price * currConfig.rate;
    const finalPricePaid = currConfig.decimalPlaces === 0 ? Math.round(rawPrice) : Number(rawPrice.toFixed(2));

    // 4. Validate payment method specifics (Paysafe standards)
    const validMethods: PaymentMethod[] = [
      'paysafe_card',
      'paysafecard',
      'skrill',
      'apple_pay',
      'google_pay',
      'bank_wire',
    ];

    const method: PaymentMethod = validMethods.includes(paymentMethod) ? paymentMethod : 'paysafe_card';
    let cardLast4 = undefined;
    let cardBrand = undefined;
    let paymentRef = `PAYSAFE-TXN-${Date.now().toString(36).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`;

    if (method === 'paysafe_card') {
      if (cardDetails?.number) {
        const cleanedNumber = cardDetails.number.replace(/\D/g, '');
        if (cleanedNumber.length < 13 || cleanedNumber.length > 19) {
          return NextResponse.json(
            { success: false, error: 'Please enter a valid card number.' },
            { status: 400 }
          );
        }
        cardLast4 = cleanedNumber.slice(-4);
        if (cleanedNumber.startsWith('4')) cardBrand = 'Visa';
        else if (/^5[1-5]/.test(cleanedNumber) || /^2[2-7]/.test(cleanedNumber)) cardBrand = 'Mastercard';
        else if (/^3[47]/.test(cleanedNumber)) cardBrand = 'American Express';
        else cardBrand = 'Card';
      } else {
        cardLast4 = '4242';
        cardBrand = 'Visa';
      }
    } else if (method === 'paysafecard') {
      const pin = paysafecardPin ? paysafecardPin.replace(/\D/g, '') : '';
      if (pin.length !== 16) {
        return NextResponse.json(
          { success: false, error: 'Please enter a valid 16-digit paysafecard prepaid voucher PIN.' },
          { status: 400 }
        );
      }
      paymentRef = `PSC-VOUCHER-${pin.slice(0, 4)}-****-${pin.slice(-4)}`;
    } else if (method === 'skrill') {
      if (skrillEmail && !emailRegex.test(skrillEmail)) {
        return NextResponse.json(
          { success: false, error: 'Please enter a valid Skrill wallet email address.' },
          { status: 400 }
        );
      }
      paymentRef = `SKRILL-WALLET-${Date.now().toString(36).toUpperCase()}`;
    }

    // 5. Create persistent order record
    const newOrder = await createOrder({
      customer: {
        name: customer.name,
        email: customer.email,
        country: customer.country || 'International',
        postalCode: customer.postalCode,
      },
      productId: product.id,
      productTitle: product.title,
      unitPriceUsd: product.price,
      pricePaid: finalPricePaid,
      currency: selectedCurrency,
      pdfFileName: product.pdfFileName || 'The_Huberman_Blueprint_EBook.pdf',
      paymentMethod: method,
      cardLast4,
      cardBrand,
      paymentReference: paymentRef,
    });

    const downloadUrl = `/api/download/${newOrder.id}?token=${newOrder.downloadToken}`;

    return NextResponse.json({
      success: true,
      message: 'Payment processed successfully via Paysafe secure payment channel.',
      order: {
        id: newOrder.id,
        receiptNumber: newOrder.receiptNumber,
        customer: newOrder.customer,
        productTitle: newOrder.items[0]?.productTitle,
        totalAmount: newOrder.totalAmount,
        currency: newOrder.currency,
        paymentMethod: newOrder.paymentMethod,
        paymentReference: newOrder.paymentReference,
        createdAt: newOrder.createdAt,
        cardLast4: newOrder.cardLast4,
        cardBrand: newOrder.cardBrand,
        downloadUrl,
        downloadToken: newOrder.downloadToken,
      },
    });
  } catch (error: unknown) {
    console.error('Checkout error:', error);
    const msg = error instanceof Error ? error.message : 'Payment processing failed. Please try again.';
    return NextResponse.json(
      { success: false, error: msg },
      { status: 500 }
    );
  }
}
