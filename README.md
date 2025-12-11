# PitakaPro - Personal Finance Management System

PitakaPro is a modern, feature-rich personal finance management application built with Next.js, React, and TypeScript. It helps users track their finances, manage budgets, set financial goals, and gain insights into their spending habits.

## Features

- **Dashboard**: Overview of financial status with key metrics and visualizations
- **Accounts Management**: Track multiple bank accounts, cash, and other financial instruments
- **Transactions**: Record and categorize income and expenses
- **Budgets**: Set and track monthly budgets for different categories
- **Goals**: Define and monitor financial goals
- **Settings**: Customize application preferences and categories

## Tech Stack

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS with Radix UI components
- **Form Handling**: React Hook Form with Zod validation
- **Icons**: Lucide Icons
- **Build Tool**: Bun
- **Deployment**: Vercel (ready)

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- npm, yarn, or pnpm (pnpm is recommended as it's already configured)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ravvdevv/PitakaPro.git
   cd PitakaPro
   ```

2. Install dependencies:
   ```bash
   bun install
   # or
   pnpm install
   # or
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   bun dev
   # or
   pnpm dev
   # or
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
.
├── app/                    # App Router directory
│   ├── dashboard/         # Main dashboard routes
│   │   ├── accounts/      # Account management
│   │   ├── budgets/       # Budget tracking
│   │   ├── goals/         # Financial goals
│   │   └── transactions/  # Transaction management
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # Reusable UI components
│   ├── dashboard-ui/      # Dashboard-specific components
│   └── ui/                # Base UI components (shadcn/ui)
├── lib/                   # Utility functions and data
├── public/                # Static assets
└── styles/                # Global styles
```

## Available Scripts

- `bun dev` - Start the development server
- `bun build` - Build for production
- `bun start` - Start production server
- `bun lint` - Run ESLint
- `pnpm dev` - Start the development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- Built with [Next.js](https://nextjs.org/)
- UI components powered by [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/) PitakaPro
