export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  turnaround: string;
  popular?: boolean;
  features: string[];
  category: 'printing' | 'finishing' | 'digital';
}

export interface PriceItem {
  id: string;
  service: string;
  rate: string;
  numericRate: number;
  unit: string;
  details: string;
}

export interface BusinessConfig {
  name: string;
  tagline: string;
  subtitle: string;
  addressLine1: string;
  addressLine2: string;
  locality: string;
  state: string;
  country: string;
  fullAddress: string;
  phone: string;
  phoneRaw: string;
  whatsapp: string;
  whatsappRaw: string;
  email: string;
  openingHoursWeekdays: string;
  openingHoursSunday: string;
}

export const INITIAL_BUSINESS_CONFIG: BusinessConfig = {
  name: "Abhinaya.com",
  tagline: "Your Trusted Xerox & Digital Service Center",
  subtitle: "Fast, reliable and affordable printing, Xerox, scanning, lamination, binding and digital document services — all in one place.",
  addressLine1: "Chorunuru, Koravar Verappa House",
  addressLine2: "Near Government Hospital & Veterinary Hospital",
  locality: "Kudligi, Sandur",
  state: "Karnataka",
  country: "India",
  fullAddress: "Chorunuru, Koravar Verappa House, Near Government Hospital & Veterinary Hospital, Kudligi, Sandur, Karnataka, India",
  phone: "+91 94801 23456",
  phoneRaw: "+919480123456",
  whatsapp: "+91 94801 23456",
  whatsappRaw: "919480123456",
  email: "support@abhinaya.com",
  openingHoursWeekdays: "Monday – Saturday: 8:00 AM – 9:00 PM",
  openingHoursSunday: "Sunday: 9:00 AM – 2:00 PM",
};

export const INITIAL_PRICES: PriceItem[] = [
  {
    id: "bw-xerox",
    service: "B/W Xerox",
    rate: "₹1",
    numericRate: 1,
    unit: "per page",
    details: "Crisp laser photocopy on standard 75 GSM paper (single side)",
  },
  {
    id: "color-print",
    service: "Color Printing",
    rate: "₹10",
    numericRate: 10,
    unit: "per page",
    details: "High-resolution color ink/laser print on bright paper",
  },
  {
    id: "bw-print",
    service: "B/W Printing",
    rate: "₹2",
    numericRate: 2,
    unit: "per page",
    details: "Sharp computer printouts from phone, email, or USB",
  },
  {
    id: "scanning",
    service: "Document Scanning",
    rate: "₹5",
    numericRate: 5,
    unit: "per page",
    details: "High DPI crystal clear scanning to PDF or JPG format",
  },
  {
    id: "lamination",
    service: "Lamination",
    rate: "Starting from ₹20",
    numericRate: 20,
    unit: "per document",
    details: "Thermal waterproof sealing for ID cards, certificates & A4 docs",
  },
  {
    id: "spiral-binding",
    service: "Spiral Binding",
    rate: "Starting from ₹30",
    numericRate: 30,
    unit: "per booklet",
    details: "Includes transparent front cover, sturdy black back sheet & coil",
  },
  {
    id: "passport-photo",
    service: "Passport Photos",
    rate: "Starting from ₹50",
    numericRate: 50,
    unit: "set of 8 photos",
    details: "Instant capture, background cleanup, and quick photo sheet print",
  },
  {
    id: "resume-service",
    service: "Resume & Office Print",
    rate: "₹5",
    numericRate: 5,
    unit: "per page",
    details: "Premium executive bond paper printing for resumes and formal letters",
  },
];

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: "xerox",
    title: "Xerox & Photocopy",
    description: "Black & white and color photocopy services with clear, sharp output.",
    turnaround: "Instant while you wait",
    popular: true,
    features: [
      "Ultra-sharp high-speed digital xerox",
      "Single-side and double-sided (duplex) copying",
      "Auto-document feeder for bulk document stacks",
      "Enlargement & reduction scaling support",
    ],
    category: "printing",
  },
  {
    id: "color-printing",
    title: "Color Printing",
    description: "High-quality color printing for documents, projects, flyers and photos.",
    turnaround: "1–5 minutes",
    popular: true,
    features: [
      "Vibrant photo-grade laser & inkjet color technology",
      "Ideal for project reports, college charts & presentations",
      "Flyers, brochures, certificates & invitations",
      "A4, Legal, and A3 format availability",
    ],
    category: "printing",
  },
  {
    id: "bw-printing",
    title: "Black & White Printing",
    description: "Affordable printing for students, offices and everyday documents.",
    turnaround: "Instant",
    popular: false,
    features: [
      "Cost-effective per-page rates for bulk print runs",
      "Direct printing from WhatsApp, Pen drive, or Email",
      "Official government job notices & exam hall tickets",
      "Office invoices, bills, and study materials",
    ],
    category: "printing",
  },
  {
    id: "scanning",
    title: "Document Scanning",
    description: "Scan documents into PDF/JPG format with high resolution.",
    turnaround: "Instant delivery",
    popular: false,
    features: [
      "High-resolution 300 to 600 DPI scanning",
      "Multi-page single PDF compilation",
      "Instant file transfer via WhatsApp or Email",
      "Safe handling of fragile original certificates",
    ],
    category: "digital",
  },
  {
    id: "lamination",
    title: "Lamination",
    description: "Protect certificates, ID cards, documents and important papers.",
    turnaround: "2–3 minutes",
    popular: true,
    features: [
      "Heavy-duty glossy thermal protective film",
      "Aadhaar, PAN, Voter ID, and Driving License pouching",
      "SSLC, PUC, Degree & marks card lamination",
      "Moisture-proof, tear-proof & dust-resistant finish",
    ],
    category: "finishing",
  },
  {
    id: "spiral-binding",
    title: "Spiral Binding",
    description: "Professional spiral binding for projects, assignments and reports.",
    turnaround: "5–10 minutes",
    popular: false,
    features: [
      "Clean transparent protective PVC front cover",
      "Rigid dark backing board for durability",
      "Smooth plastic coils holding up to 300+ sheets",
      "Perfect for college projects, thesis, and manuals",
    ],
    category: "finishing",
  },
  {
    id: "passport-photos",
    title: "Passport & ID Photos",
    description: "Passport-size and ID photographs with instant cutting and packaging.",
    turnaround: "5 minutes",
    popular: false,
    features: [
      "Compliant with govt, visa, school & competitive exams",
      "White, blue, or custom background substitution",
      "Premium glossy photo paper with non-fading inks",
      "Sets of 8, 16, or 32 photos with digital soft copy",
    ],
    category: "printing",
  },
  {
    id: "resume-printing",
    title: "Resume & Document Printing",
    description: "Professional CV, resume and office document printing.",
    turnaround: "Instant",
    popular: false,
    features: [
      "Clean typography inspection & margin alignment",
      "Premium 85+ GSM smooth executive executive sheets",
      "Clean presentation envelopes available",
      "Direct support for PDF, Word, and Google Docs",
    ],
    category: "printing",
  },
  {
    id: "online-services",
    title: "Online / Digital Services",
    description: "Help customers with document printing, online forms and digital document services where applicable.",
    turnaround: "Quick assistance",
    popular: true,
    features: [
      "Online exam application & admit card printouts",
      "Government portal form submission assistance",
      "Aadhaar, PAN, and Ration card downloads",
      "Document resizing, photo compression & file conversions",
    ],
    category: "digital",
  },
];

export const TRUST_POINTS = [
  {
    title: "Fast Service",
    description: "Get your documents printed quickly with minimal waiting time.",
    metric: "< 5 Min",
    metricLabel: "Average turnaround",
  },
  {
    title: "Quality Results",
    description: "Clear text, sharp images and professional finishing on genuine papers.",
    metric: "1200 DPI",
    metricLabel: "Laser clarity",
  },
  {
    title: "Affordable Pricing",
    description: "Competitive transparent prices tailored for students, families and local businesses.",
    metric: "₹1/page",
    metricLabel: "Starting xerox",
  },
  {
    title: "Friendly Service",
    description: "Helpful in-person assistance for formatting, scanning, and digital government portals.",
    metric: "100%",
    metricLabel: "Helpful support",
  },
  {
    title: "Convenient Ordering",
    description: "Send your files directly through WhatsApp before visiting to have them ready.",
    metric: "24/7",
    metricLabel: "WhatsApp drop-in",
  },
];

export const WORKFLOW_STEPS = [
  {
    step: "01",
    title: "Send Your Document",
    description: "Send your document through WhatsApp or our online quote form with your page and copy requirements.",
    hint: "PDF, Word, Images, or scanned files accepted",
  },
  {
    step: "02",
    title: "We Print",
    description: "We prepare, inspect, and print your documents with sharp precision and finishing.",
    hint: "Quality checked on high-speed commercial machines",
  },
  {
    step: "03",
    title: "Collect Your Order",
    description: "Visit Abhinaya.com in Chorunuru and collect your completed, neatly packaged order without waiting.",
    hint: "Quick pickup near Govt Hospital & Vet Hospital",
  },
];
