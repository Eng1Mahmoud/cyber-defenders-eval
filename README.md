# CyberDefenders Frontend Developer Evaluation

## Overview
This project is an interactive chart component that visualizes cybersecurity certifications based on community ratings. It is built using **Next.js**, **shadcn/ui**, and **Recharts**.

## Live Demo
(Link to deployed version if applicable)

## Tech Stack
- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **UI Component Library**: [shadcn/ui](https://ui.shadcn.com/) (Radix UI + Tailwind CSS)
- **Visualization**: [Recharts](https://recharts.org/)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Language**: TypeScript

## Getting Started

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd cyber-defenders-eval
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Features implemented
- **Interactive Scatter Plot**:
  - X-axis: Market Presence
  - Y-axis: Satisfaction
  - Color-coded bubbles by Certification Type (Blue Team, Red Team, InfoSec).
  - Custom Tooltips on hover.
- **Filtering & Search**:
  - Filter by Certification Type.
  - Filter by Skill Level.
  - Search by Name or Abbreviation.
- **Detailed View**:
  - Click on any bubble to open a Dialog with full certification details.
- **Responsive Design**:
  - Fully responsive layout for mobile and desktop.
  - Collapsible filter stack on mobile.
- **Full Screen Mode**:
  - One-click toggle to view the roadmap in full screen.

## Decisions & Trade-offs
- **Chart Library**: I chose **Recharts** because it is built specifically for React, offering good composition and performance for this dataset size (~50-100 items). D3.js would offer more control but at a significant complexity cost.
- **State Management**: Used React local state (`useState`, `useMemo`) as the application complexity is low and doesn't require global state management like Redux or Zustand.
- **Mock Data**: Data is generated on the client side using a factory pattern to ensure a realistic distribution of values for visualization purposes.

## Folder Structure
- `app/`: Next.js App Router pages and layout.
- `components/Chart`: Specialized chart components.
- `components/Controls`: Filter and search controls.
- `components/ui`: Reusable UI components from shadcn/ui.
- `lib/`: Utility functions and type definitions.

## Future Improvements
- **Animation**: Add Framer Motion for smoother transitions when filtering points.
- **Backend Integration**: Replace mock data with real API calls.
- **Unit Testing**: Add Vitest/Jest tests for the filtering logic and components.

