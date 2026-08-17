# Implementation Plan - React Music App (-interactive-web-app)

We will convert your existing vanilla HTML/CSS/JS music application inside `-interactive-web-app` into a React-based single page application (SPA), keeping your current assets, design layout, styles, and features while adding:
1. **React Components**: Breaking down the interface into clean React components.
2. **useState & useEffect**: Managing search state, loading state, slider value state, and active song/album data.
3. **React Router**: Multiple pages setup:
   - `/`: Homepage (containing Navbar, Banner, Search bar, MusicBrainz API search results, Fleetwood Mac slider, and Album grid).
   - `/album/:id`: A dedicated Music Details Page for Fleetwood Mac albums.
   - `/song/:id` (or detailed overlay): Details Page for searched MusicBrainz tracks.
4. **API Search**: Continue querying the MusicBrainz API for dynamic song searches.
5. **Filter/Sort by Year**: Filtering default albums using the interactive release year range-slider.

---

## User Review Required

> [!NOTE]
> - **Style Preservation**: We will copy your original `style.css` into React's styling entry point so all existing fonts, animations, layout grids, cards, and custom media queries are fully preserved.
> - **Asset Preservation**: Your original assets (e.g. Fleetwood Mac covers, banner, icons) will be integrated directly into the React build folder structure.
> - **React Router Configuration**: We will configure routes so clicking on any album card navigates to `/album/:id` where detailed tracklists, release labels, and mock playback options are rendered.

---

## Proposed Changes

All modifications will occur in the [interactive-web-app](file:///C:/Users/ambat/OneDrive/Documents/-interactive-web-app) directory:

### React App Setup
- Create a React project structure in the repository using Vite (React template).
- Install `react-router-dom` and FontAwesome (if needed, or load via HTML link).
- Move existing HTML structure into React component layouts.

### Components

#### [NEW] [src/components/Navbar.jsx](file:///C:/Users/ambat/OneDrive/Documents/-interactive-web-app/src/components/Navbar.jsx)
- React version of your current navigation bar with matching logo and hover links.

#### [NEW] [src/components/Footer.jsx](file:///C:/Users/ambat/OneDrive/Documents/-interactive-web-app/src/components/Footer.jsx)
- React version of your current footer.

#### [NEW] [src/components/AlbumCard.jsx](file:///C:/Users/ambat/OneDrive/Documents/-interactive-web-app/src/components/AlbumCard.jsx)
- Component for the Fleetwood Mac albums with the flip card hover animation.
- Clicking navigates to `/album/:id`.

#### [NEW] [src/components/SongCard.jsx](file:///C:/Users/ambat/OneDrive/Documents/-interactive-web-app/src/components/SongCard.jsx)
- Component for MusicBrainz API search results.
- Clicking navigates to `/song/:id` or displays detailed credits.

### Pages

#### [NEW] [src/App.jsx](file:///C:/Users/ambat/OneDrive/Documents/-interactive-web-app/src/App.jsx)
- Configure routes:
  - `/` -> `Home.jsx` (homepage with banner, search input, slider, album grid, and search result list)
  - `/album/:id` -> `AlbumDetails.jsx` (details page for default albums)
  - `/song/:id` -> `SongDetails.jsx` (details page for searched tracks)

#### [NEW] [src/pages/Home.jsx](file:///C:/Users/ambat/OneDrive/Documents/-interactive-web-app/src/pages/Home.jsx)
- Render the current landing page UI.
- Use `useState` for search query, search results list, loading indicator, and the year range slider value.
- Use `useEffect` to trigger album rendering and year filtering.

#### [NEW] [src/pages/AlbumDetails.jsx](file:///C:/Users/ambat/OneDrive/Documents/-interactive-web-app/src/pages/AlbumDetails.jsx)
- Dedicated page for the Fleetwood Mac albums.
- Displays detailed information: album cover, title, release year, record label, tracklist, and a mock audio player.

#### [NEW] [src/pages/SongDetails.jsx](file:///C:/Users/ambat/OneDrive/Documents/-interactive-web-app/src/pages/SongDetails.jsx)
- Displays details of a song fetched from MusicBrainz API (using the track ID).
- Shows artist credit, release date, tags, and playback option.

### Styling

#### [NEW] [src/index.css](file:///C:/Users/ambat/OneDrive/Documents/-interactive-web-app/src/index.css)
- Imports your existing `style.css` styles so that all layouts, typography, and card designs match perfectly.

---

## Verification Plan

### Automated Verification
- Run `npm run build` to confirm everything builds successfully.

### Manual Verification
- Start local server using `npm run dev`.
- Confirm homepage displays the banner, slider, and albums.
- Drag slider and verify albums filter by year.
- Perform a search in the search bar and verify results fetch from MusicBrainz API.
- Click an album/song card and confirm it routes to the details page with correct information.
