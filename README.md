# iBox SkySearch - Flight Search Aggregator

A modern, responsive flight search and booking application built with Next.js, TypeScript, and Tailwind CSS.

## Features

### Flight Search
- Search flights by origin, destination, date, and number of passengers
- Clean, intuitive search form with validation

### Results View
- Display search results in a clear, readable format
- Sort by:
  - Price: Low to High
  - Price: High to Low
  - Duration: Shortest
  - Departure: Earliest
- Filter by:
  - Airline
  - Number of stops (Non-stop, 1 Stop, 2+ Stops)
  - Price range

### Booking Flow
- Select a flight from search results
- Complete booking form with individual passenger details:
  - Full name
  - Email
  - Phone number
- Receive booking confirmation with unique reference number and passenger details

### User Experience
- Responsive design that works on mobile, tablet, and desktop
- Loading states for better UX
- Empty state when no flights match filters
- Accessible with semantic HTML and keyboard navigation
- Custom button component for consistent styling across all pages

## Tech Stack

- **Next.js 16** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **Zustand** - State management
- **React Hook Form** - Form handling with validation
- **Zod** - Schema validation
- **Class Variance Authority** - Component variants
- **Sonner** - Toast notifications
- **Shadcn UI** - Component library

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

## Project Structure

```
src/
├── app/
│   ├── page.tsx                # Home page
│   ├── layout.tsx              # Root layout
│   ├── globals.css             # Global styles
│   └── flights/
│       ├── page.tsx            # Flight search results
│       └── [flightId]/
│           ├── booking/page.tsx # Booking form
│           └── confirmation/page.tsx # Booking confirmation
├── components/
│   ├── ui/
│   │   ├── button.tsx         # Custom button component
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   └── ...
│   ├── flights/
│   │   ├── BookingForm.tsx
│   │   ├── FlightCard.tsx
│   │   └── ...
│   ├── home/
│   │   └── FlightSearchBox.tsx
│   └── shared/
├── lib/
│   ├── types.ts               # TypeScript type definitions
│   ├── mock-data.ts           # Mock flight data
│   └── utils.ts               # Utility functions
└── store/
    └── flightSearchStore.ts   # Zustand store
```

## State Management

The application uses Zustand for global state management:
- Flight search parameters
- Filters and sorting
- Selected flight
- Booking details

## Future Improvements

- Add real API integration (replace mock data)
- Implement round-trip search
- Add more filters (time of day, departure/arrival airports)
- Persist booking data
- Add user authentication
- Implement seat selection
- Add payment integration
