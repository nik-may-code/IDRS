/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // --- NEW UNIFIED COLORS ---
        'unified-dark-bg': '#121212',     // The new very dark background for header/sidebar
        'unified-dark-pill': '#2D2D2D',   // The background for the badges/pills

        // --- Content & Text Colors (mostly unchanged) ---
        'content-bg': '#f4f4f8',
        'text-light': '#ffffff',
        'text-dark': '#111827',
        
        // --- Sidebar Specific Colors (for links) ---
        'sidebar-active-bg': '#E5E7EB',
        'sidebar-active-text': '#18181B',
        'sidebar-muted-text': '#A1A1AA',
        'sidebar-hover-bg': '#27272A',
      },
      spacing: {
        'sidebar-width': '260px',
        'header-height': '64px',
      },
    },
  },

  // ✅ Enables print-specific utility variants
  variants: {
    extend: {
      display: ['print'],        // Enables `print:block`, `print:hidden`
      overflow: ['print'],       // Enables `print:overflow-visible`
      width: ['print'],          // Enables `print:w-full`, etc.
      borderWidth: ['print'],    // Optional: print borders
      textAlign: ['print'],      // Optional: print text alignment
    },
  },

  plugins: [],
};