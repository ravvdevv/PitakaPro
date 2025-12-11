<div align="center" style="padding: 2rem 1rem 1.5rem;">
  <div style="margin-bottom:">
    <img 
      src="https://raw.githubusercontent.com/ravvdevv/PitakaPro/main/public/pitaka-pro-logo.png" 
      alt="PitakaPro Logo" 
      width="180"
      style="display: block; margin: 0 auto 1.25rem; filter: invert(100%); transition: all 0.3s ease;"
      onmouseover="this.style.filter='invert(0.5) sepia(1) saturate(5) hue-rotate(175deg)'"
      onmouseout="this.style.filter='invert(0%)'"
    > <h1 style="margin: 0; font-size: 2.5rem; font-weight: 700;">PitakaPro</h1>
    <h3 style="margin: 0.5rem 0 1.5rem; font-weight: 400;">✨ Modern Personal Finance Management</h3>
   
  
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
  [![Next.js](https://img.shields.io/badge/Next.js-13.4+-000000?style=flat&logo=next.js&logoColor=white)](https://nextjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

  <p>Take control of your finances with PitakaPro - A beautiful, intuitive, and powerful personal finance management application built with modern web technologies. Track expenses, manage budgets, and achieve your financial goals with ease.</p>
  
  [🚀 Live Demo](https://pitaka-pro.vercel.app/) | [📖 Documentation](#) | [💡 Feature Request](https://github.com/ravvdevv/PitakaPro/issues/new?template=feature_request.md)
</div>

## ✨ Features

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem; margin: 2rem 0;">
  <div style="background: #f8f9fa; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #4f46e5;">
    <h4>📊 Dashboard</h4>
    <p>Get a comprehensive overview of your financial health with beautiful visualizations and key metrics.</p>
  </div>
  
  <div style="background: #f8f9fa; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #10b981;">
    <h4>💳 Accounts</h4>
    <p>Track all your financial accounts in one place - bank accounts, credit cards, cash, and investments.</p>
  </div>
  
  <div style="background: #f8f9fa; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #f59e0b;">
    <h4>💰 Transactions</h4>
    <p>Easily record and categorize all your income and expenses with smart suggestions.</p>
  </div>
  
  <div style="background: #f8f9fa; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #8b5cf6;">
    <h4>📈 Budgets</h4>
    <p>Set monthly budgets for different categories and track your spending in real-time.</p>
  </div>
  
  <div style="background: #f8f9fa; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #ec4899;">
    <h4>🎯 Goals</h4>
    <p>Define financial goals and track your progress towards achieving them.</p>
  </div>
  
  <div style="background: #f8f9fa; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #3b82f6;">
    <h4>⚙️ Settings</h4>
    <p>Customize the application to match your preferences and financial needs.</p>
  </div>
</div>

## 🛠️ Tech Stack

<div style="display: flex; flex-wrap: wrap; gap: 1rem; margin: 1.5rem 0;">
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React">
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS">
  <img src="https://img.shields.io/badge/Radix-191919?style=for-the-badge&logo=radixui&logoColor=white" alt="Radix UI">
  <img src="https://img.shields.io/badge/Bun-000000?style=for-the-badge&logo=bun&logoColor=white" alt="Bun">
  <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel">
</div>

| Category          | Technologies                                                                 |
|-------------------|-----------------------------------------------------------------------------|
| **Frontend**      | Next.js 15, React 18, TypeScript                                           |
| **Styling**       | Tailwind CSS, Radix UI, CSS Modules                                        |
| **State**         | React Context, React Query                                                 |
| **Forms**         | React Hook Form, Zod Validation                                            |
| **Icons**         | Lucide Icons                                                               |
| **Build Tool**    | Bun (faster alternative to npm/yarn)                                       |
| **Deployment**    | Vercel (optimized for Next.js)                                             |
| **Code Quality**  | ESLint, Prettier, TypeScript strict mode                                   |

## 🚀 Getting Started

### 📋 Prerequisites

Before you begin, ensure you have the following installed:

- Node.js 18+ or [Bun](https://bun.sh/)
- Package manager: npm, yarn, or [pnpm](https://pnpm.io/) 
- Git for version control

### ⚙️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ravvdevv/PitakaPro.git
   cd PitakaPro
   ```

2. **Install dependencies** (using pnpm as an example)
   ```bash
   bun install
   # or
   pnpm install
   # or
   npm install
   ```

3. **Start the development server**
   ```bash
   bun dev
   # or
   pnpm dev
   # or
   npm run dev
   ```

4. **Open your browser** and navigate to:
   ```
   http://localhost:3000
   ```

5. **Start managing your finances!** 💰✨



## 📁 Project Structure

```
pitakapro/
├── app/                      # App Router directory (Next.js 13+)
│   ├── api/                  # API routes
│   ├── dashboard/            # Main dashboard routes
│   │   ├── accounts/         # Account management
│   │   ├── budgets/          # Budget tracking
│   │   ├── goals/            # Financial goals
│   │   └── transactions/     # Transaction management
│   ├── auth/                 # Authentication pages
│   ├── (marketing)/          # Marketing pages (landing, about, etc.)
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Home page
├── components/               # Reusable UI components
│   ├── dashboard-ui/         # Dashboard-specific components
│   ├── ui/                   # Base UI components (Radix UI)
│   ├── icons/                # Custom icon components
│   └── shared/               # Shared components across the app
├── lib/                      # Utility functions and data
│   ├── api/                  # API client and endpoints
│   ├── constants/            # App constants
│   ├── hooks/                # Custom React hooks
│   ├── types/                # TypeScript type definitions
│   └── utils/                # Utility functions
├── public/                   # Static assets
│   ├── images/               # Image assets
│   └── fonts/                # Custom fonts
├── styles/                   # Global styles
│   ├── globals.css           # Global CSS
│   └── theme/                # Theme configurations
├── .env.local                # Environment variables
├── next.config.js            # Next.js configuration
├── tailwind.config.js        # Tailwind CSS configuration
└── tsconfig.json             # TypeScript configuration
```


### Development

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

1. 🐛 **Report Bugs**: Open an issue to report any bugs you find
2. 💡 **Suggest Features**: Have an idea? We'd love to hear it!
3. 📝 **Improve Documentation**: Help us make the docs better
4. 💻 **Submit Pull Requests**: Contribute your own code improvements

### Development Workflow

1. Fork the repository
2. Create a new branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Commit your changes: `git commit -m 'Add some amazing feature'`
5. Push to the branch: `git push origin feature/amazing-feature`
6. Open a Pull Request

### Code Style

- Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification
- Write meaningful commit messages
- Keep PRs focused and small when possible
- Add tests for new features and bug fixes

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with ❤️ using Next.js and TypeScript
- Inspired by modern financial applications
- Thanks to all contributors who have helped improve this project

---

<div align="center">
  Made with ❤️ by [Raven](https://github.com/ravvdevv) 
</div>

## Acknowledgements

- Built with [Next.js](https://nextjs.org/)
- UI components powered by [Radix UI](https://www.radix-ui.com/)
- Icons from [Lucide](https://lucide.dev/) PitakaPro
