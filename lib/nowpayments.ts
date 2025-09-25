import axios from 'axios'
import crypto from 'crypto'

const NOWPAYMENTS_API_URL = 'https://api.nowpayments.io/v1'

interface InvoiceRequest {
  price_amount: number
  price_currency: string
  pay_currency?: string
  order_id: string
  order_description: string
  ipn_callback_url?: string
  success_url?: string
  cancel_url?: string
  is_fixed_rate?: boolean
  is_fee_paid_by_user?: boolean
}

interface InvoiceResponse {
  id: string
  token_id: string
  order_id: string
  order_description: string
  price_amount: string
  price_currency: string
  pay_currency: string | null
  ipn_callback_url: string
  invoice_url: string
  success_url: string
  cancel_url: string
  partially_paid_url: string
  payout_currency: string
  created_at: string
  updated_at: string
  is_fixed_rate: boolean
  is_fee_paid_by_user: boolean
}

interface PaymentRequest {
  price_amount: number
  price_currency: string
  pay_currency: string
  order_id: string
  order_description: string
  ipn_callback_url?: string
  is_fixed_rate?: boolean
  is_fee_paid_by_user?: boolean
}

interface PaymentResponse {
  payment_id: string
  payment_status: string
  pay_address: string
  price_amount: number
  price_currency: string
  pay_amount: number
  pay_currency: string
  order_id: string
  order_description: string
  ipn_callback_url: string
  created_at: string
  updated_at: string
  purchase_id: string
  smart_contract: string
  network: string
  network_precision: number
  time_limit: string
  burning_percent: number
  expiration_estimate_date: string
}

export class NOWPaymentsService {
  private apiKey: string
  private ipnSecret: string

  constructor() {
    this.apiKey = process.env.NOWPAYMENTS_API_KEY || ''
    this.ipnSecret = process.env.NOWPAYMENTS_IPN_SECRET || ''
  }

  async createInvoice(userId: string, userEmail: string): Promise<InvoiceResponse> {
    const invoiceData: InvoiceRequest = {
      price_amount: 2400,
      price_currency: 'usd',
      order_id: `sub_${userId}_${Date.now()}`,
      order_description: `SportsStats API Annual Subscription for ${userEmail}`,
      ipn_callback_url: `${process.env.NEXT_PUBLIC_API_URL}/api/payment/webhook`,
      success_url: `${process.env.NEXT_PUBLIC_API_URL}/dashboard?payment=success`,
      cancel_url: `${process.env.NEXT_PUBLIC_API_URL}/dashboard?payment=cancelled`,
      is_fixed_rate: false,
      is_fee_paid_by_user: false
    }

    try {
      const response = await axios.post(
        `${NOWPAYMENTS_API_URL}/invoice`,
        invoiceData,
        {
          headers: {
            'x-api-key': this.apiKey,
            'Content-Type': 'application/json'
          }
        }
      )

      return response.data
    } catch (error) {
      console.error('Error creating invoice:', error)
      throw new Error('Failed to create invoice')
    }
  }

  async createPayment(userId: string, userEmail: string): Promise<PaymentResponse> {
    const paymentData: PaymentRequest = {
      price_amount: 2400,
      price_currency: 'usd',
      pay_currency: 'usdttrc20',
      order_id: `sub_${userId}_${Date.now()}`,
      order_description: `SportsStats API Annual Subscription for ${userEmail}`,
      ipn_callback_url: `${process.env.NEXT_PUBLIC_API_URL}/api/payment/webhook`,
      is_fixed_rate: false,
      is_fee_paid_by_user: false
    }

    try {
      const response = await axios.post(
        `${NOWPAYMENTS_API_URL}/payment`,
        paymentData,
        {
          headers: {
            'x-api-key': this.apiKey,
            'Content-Type': 'application/json'
          }
        }
      )

      return response.data
    } catch (error) {
      console.error('Error creating payment:', error)
      throw new Error('Failed to create payment')
    }
  }

  async getPaymentStatus(paymentId: string): Promise<any> {
    try {
      const response = await axios.get(
        `${NOWPAYMENTS_API_URL}/payment/${paymentId}`,
        {
          headers: {
            'x-api-key': this.apiKey
          }
        }
      )

      return response.data
    } catch (error) {
      console.error('Error fetching payment status:', error)
      throw new Error('Failed to fetch payment status')
    }
  }

  verifyWebhookSignature(payload: any, signature: string): boolean {
    const sortedPayload = this.sortObject(payload)
    const jsonString = JSON.stringify(sortedPayload)

    const hmac = crypto.createHmac('sha512', this.ipnSecret)
    hmac.update(jsonString)
    const calculatedSignature = hmac.digest('hex')

    return calculatedSignature === signature
  }

  private sortObject(obj: any): any {
    if (obj === null || typeof obj !== 'object') {
      return obj
    }

    if (Array.isArray(obj)) {
      return obj.map(item => this.sortObject(item))
    }

    const sortedKeys = Object.keys(obj).sort()
    const sortedObj: any = {}

    sortedKeys.forEach(key => {
      sortedObj[key] = this.sortObject(obj[key])
    })

    return sortedObj
  }

  async getAvailableCurrencies(): Promise<any> {
    try {
      const response = await axios.get(
        `${NOWPAYMENTS_API_URL}/currencies`,
        {
          headers: {
            'x-api-key': this.apiKey
          }
        }
      )

      return response.data
    } catch (error) {
      console.error('Error fetching currencies:', error)
      throw new Error('Failed to fetch currencies')
    }
  }

  async getMinimumPaymentAmount(currency: string): Promise<any> {
    try {
      const response = await axios.get(
        `${NOWPAYMENTS_API_URL}/min-amount`,
        {
          params: {
            currency_from: 'usd',
            currency_to: currency
          },
          headers: {
            'x-api-key': this.apiKey
          }
        }
      )

      return response.data
    } catch (error) {
      console.error('Error fetching minimum amount:', error)
      throw new Error('Failed to fetch minimum amount')
    }
  }
}

export default new NOWPaymentsService()