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
- Complete booking form with passenger details (name, email, phone)
- Receive booking confirmation with unique reference number

### User Experience
- Responsive design that works on mobile, tablet, and desktop
- Loading states for better UX
- Empty state when no flights match filters
- Accessible with semantic HTML and keyboard navigation

## Tech Stack

- **Next.js 16** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **React Hooks** - useState, useMemo for state management

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
│   ├── page.tsx          # Main application page (all components)
│   ├── layout.tsx        # Root layout
│   └── globals.css       # Global styles
├── lib/
│   ├── types.ts          # TypeScript type definitions
│   ├── mock-data.ts      # Mock flight data (31 flights)
│   └── utils.ts          # Utility functions (filter, sort, format)
└── components/           # (Can be split into separate files for scalability)
```

## State Management

The application uses React's built-in hooks:
- `useState` - For managing application state (search params, filters, selected flight, etc.)
- `useMemo` - For memoizing computed values (filtered/sorted flights, unique airlines)

## Future Improvements

- Add real API integration (replace mock data)
- Implement round-trip search
- Add more filters (time of day, departure/arrival airports)
- Persist booking data
- Add user authentication
- Implement seat selection
- Add payment integration
