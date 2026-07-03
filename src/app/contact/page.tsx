import ContactForm from '@/components/ContactForm'

export const metadata = {
  title: 'Contact',
  description: 'Get in touch with VIP Studio for wedding photography booking inquiries. Call +91 92999 50999 or reach us on WhatsApp.',
}

export default function ContactPage() {
  return (
    <div className="py-20 px-4 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-2">Contact Us</h1>
      <p className="text-gray-500 mb-10">
        Ready to capture your special moments? Get in touch with us.
      </p>

      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-lg font-semibold mb-4">Get in Touch</h2>
          <div className="space-y-4 text-gray-600">
            <div>
              <p className="font-medium text-gray-900">Location</p>
              <p>Nellore, Andhra Pradesh</p>
            </div>
            <div>
              <p className="font-medium text-gray-900">Phone / WhatsApp</p>
              <a
                href="https://wa.me/919299950999"
                target="_blank"
                rel="noopener noreferrer"
                className="text-red hover:text-red-dark transition"
              >
                +91 92999 50999
              </a>
            </div>
            <div>
              <p className="font-medium text-gray-900">Instagram</p>
              <a
                href="https://www.instagram.com/vipevents_nellore/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-900 underline hover:text-gray-600"
              >
                @vipevents_nellore
              </a>
            </div>
            <div>
              <p className="font-medium text-gray-900">Facebook</p>
              <a
                href="https://www.facebook.com/VIPweddingsnellore"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-900 underline hover:text-gray-600"
              >
                VIP Weddings Nellore
              </a>
            </div>
          </div>
        </div>

        <ContactForm />
      </div>
    </div>
  )
}
