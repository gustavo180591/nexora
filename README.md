# Nexora

A world-class SaaS fintech platform for marketplace payments with Stripe Connect integration. Built with SvelteKit, TypeScript, and Tailwind CSS.

## 🚀 Features

### 🏦 Core Fintech Functionality
- **Multi-seller marketplace** with role-based access (Buyer/Seller/Admin)
- **Stripe Connect integration** for seamless payment processing
- **Real-time payouts** management and tracking
- **Commission-based revenue** sharing (10% platform fee)
- **Order management** with comprehensive status tracking

### 🎨 Premium UI/UX Design
- **Enterprise-grade dashboard** with world-class SaaS design
- **Responsive design** optimized for all devices
- **Modern components** with Tailwind CSS and smooth animations
- **Professional color palette** (Indigo primary, Slate neutrals)
- **Loading states** and empty states for optimal UX

### 📊 Dashboard Features
- **Seller Dashboard**: Revenue metrics, order tracking, Stripe onboarding
- **Admin Dashboard**: Platform overview, webhook monitoring, transaction analytics
- **Payouts Management**: Advanced filtering, status tracking, seller avatars

### 🔐 Authentication & Security
- **Secure registration** and login flows
- **Role-based access control** (RBAC)
- **Session management** with secure cookies
- **Protected routes** and API endpoints

## 🛠 Tech Stack

- **Frontend**: SvelteKit 5 with TypeScript
- **Styling**: Tailwind CSS v4 with custom configuration
- **Database**: PostgreSQL with Prisma ORM
- **Payments**: Stripe Connect for marketplace transactions
- **Authentication**: Custom auth implementation
- **Deployment**: Ready for production with adapters

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd nexora
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Configure your Stripe keys and database URL
```

4. Set up the database:
```bash
npx prisma migrate dev
npx prisma generate
```

## 🚀 Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 🏗️ Project Structure

```
src/
├── routes/                 # SvelteKit pages and API routes
│   ├── (auth)/            # Authentication pages
│   ├── dashboard/         # Dashboard pages
│   │   ├── +page.svelte   # Seller dashboard
│   │   ├── admin/         # Admin dashboard
│   │   └── payouts/       # Payouts management
│   └── api/               # API endpoints
├── lib/                   # Utility libraries
│   ├── server/           # Server-side utilities
│   └── utils/            # Shared utilities
└── app.css               # Global styles
```

## 💳 Payment Flow

1. **Customer** places an order through the marketplace
2. **Stripe** processes the payment securely
3. **Platform** takes a 10% commission automatically
4. **Seller** receives 90% of the payment
5. **Payouts** are processed to seller bank accounts

## 🎯 Key Pages

### Authentication
- **Register**: `/register` - Premium signup with account type selection
- **Login**: `/login` - Secure authentication flow

### Dashboards
- **Seller Dashboard**: `/dashboard` - Revenue, orders, and Stripe status
- **Admin Dashboard**: `/dashboard/admin` - Platform overview and analytics
- **Payouts**: `/dashboard/payouts` - Money flow management

## 🌟 Design System

Our design follows world-class SaaS standards:

- **Colors**: Indigo-600 (primary), Emerald-500 (success), Amber-500 (warning), Rose-500 (error)
- **Typography**: Inter font with clear hierarchy
- **Spacing**: Consistent 8px grid system
- **Components**: Rounded-2xl corners, soft shadows, smooth transitions

## 🔧 Environment Variables

Create a `.env` file with:

```env
DATABASE_URL="postgresql://..."
STRIPE_SECRET_KEY="sk_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
STRIPE_PLATFORM_FEE_PERCENTAGE="10"
```

## 🚀 Building for Production

```bash
npm run build
npm run preview
```

## 📈 Status

- ✅ Core authentication system
- ✅ Stripe Connect integration
- ✅ Dashboard UI (world-class design)
- ✅ Payouts management
- ✅ Role-based access control
- 🔄 Webhook processing (in progress)
- 🔄 Email notifications (planned)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'feat: add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 💎 Built with ❤️ for the fintech ecosystem

Nexora empowers creators and businesses to build thriving marketplaces with enterprise-grade payment infrastructure.
