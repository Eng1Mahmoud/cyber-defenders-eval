# CyberDefenders Frontend Developer Evaluation

## Overview
This project is an interactive chart component that visualizes cybersecurity certifications based on community ratings. It is built using **Next.js**, **shadcn/ui**, and **Recharts**. Ideally suited for cybersecurity professionals looking to navigate their career path.

## Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Eng1Mahmoud/cyber-defenders-eval.git
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

## Architecture Decisions & Rationale

*   **framework: Next.js (App Router)**: Chosen for its robust features like Server Components, automatic routing, and ease of deployment. It provides a solid foundation for scaling if this component becomes part of a larger platform.
*   **UI Library: shadcn/ui**: Selected for its accessibility, dark mode support, and ease of customization. It allows for a premium, consistent look (using Tailwind CSS) without the bloat of heavy component libraries.
*   **Component Architecture (Refactored)**:
    *   **Dashboard (Container)**: Manages all state (filters, search, selection) and logic. It passes strict/filtered data to child components.
    *   **CertScatterPlot (Presentation)**: A pure, stateless component responsible only for rendering the visualization. This separation of concerns improves maintainability and testability.
*   **Visualization: Recharts**:
    *   *Rationale*: Recharts is built specifically for React (component-based), making it easy to integrate into the React component tree. It supports responsive containers out of the box.
    *   *Trade-off*: While easier to use than D3.js, it offers slightly less low-level control over complex animations.
*   **State Management**: React's native `useState` and `useMemo` were sufficient.
    *   *Rationale*: The state (filters, search queries) is local to the dashboard. Introducing Redux or Context would be over-engineering for this scope.

## Assumptions Made

*   **Data Scale**: Assumed a dataset size of ~50-100 certifications. The current client-side filtering and rendering performance is optimized for this range.
*   **Mobile Usage**: Assumed that mobile users prefer tapping over hovering. Implemented larger touch targets (20px invisible hit area) for easier interaction on small screens.
*   **Browser Support**: Targeted modern browsers (Chrome, Edge, Firefox, Safari) with support for Flexbox and modern CSS features.

## Known Limitations & Trade-offs

*   **Mock Data**: The application currently runs on client-side generated mock data (`lib/data.ts`). In a production environment, this would be replaced by a server-side API fetch.
*   **Initial Load**: The chart library is loaded on the client side. There is a brief moment before hydration where the chart appears (handled by Next.js loading states, but noticeable).
*   **Animation**: Complex transition animations (e.g., bubbles moving to new positions when filtering) were skipped in favor of instant updates for performance and implementation speed, though this could be added with libraries like Framer Motion.

## Features Implemented

*   **Interactive Scatter Plot**: Market Presence vs. Satisfaction visualization.
*   **Color Coding**: Distinct colors for Blue Team (blue), Red Team (red), and InfoSec (gray/white) certifications.
*   **Rich Interactions**: 
    *   **Tooltip**: Displays Name, Abbreviation, Metrics, and **Total Votes** on hover.
    *   **Detailed Modal**: Full certification data including Cost, Attempts, Training status, Domains, and Job Roles.
*   **Advanced Filtering**: Conjunctive filtering by Type, Skill Level, and Search text.
*   **Responsive Design**: Mobile-adaptive layout with optimized touch targets.
*   **Theme**: CyberDefenders-inspired dark theme (#0F172A).
*   **Accessibility**: ARIA labels, keyboard navigation, and focus management.

## Project Structure

*   `components/Chart/`: Specialized sub-components (`CertScatterPlot`, `QuadrantLabel`, `ChartNode`).
*   `components/Controls/`: Control elements (`FilterBar`, `FullScreenToggle`).
*   `components/CertDetailsDialog.tsx`: Modal for displaying certification details.
*   `types/`: Centralized TypeScript interfaces.
*   `lib/`: Data generation and helpers.
