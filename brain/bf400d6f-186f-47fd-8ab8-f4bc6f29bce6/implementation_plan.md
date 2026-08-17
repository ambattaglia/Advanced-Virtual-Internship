# Fix and Complete YouTube Clone Application

The YouTube clone in `c:/Users/ambat/Desktop/youtube-clone` currently fails to build and run because `value_converter` is not exported from `src/data.js`, causing module resolution errors when `PlayVideo.jsx` is rendered. Additionally, several components (`PlayVideo`, `Recommended`, `Navbar`) use static fallback content or missing props instead of live YouTube API data.

## Proposed Changes

### 1. Fix Export & Utility Functions
#### [MODIFY] [data.js](file:///c:/Users/ambat/Desktop/youtube-clone/src/data.js)
- Export `value_converter` function from `src/data.js`.
- Enhance `value_converter` to properly format values into K, M, B with clean formatting.

### 2. Video Player & Dynamic Details
#### [MODIFY] [PlayVideo.jsx](file:///c:/Users/ambat/Desktop/youtube-clone/src/Components/PlayVideo/PlayVideo.jsx)
- Import `value_converter` from `../../data`.
- Fetch channel data (avatar, title, subscriber count) using YouTube `channels` API endpoint with `channelId` from `apiData`.
- Fetch real video comments using YouTube `commentThreads` API endpoint.
- Safely parse view counts, like counts, published dates, and channel information.

### 3. Recommended Videos Component
#### [MODIFY] [Video.jsx](file:///c:/Users/ambat/Desktop/youtube-clone/src/Pages/Video/Video.jsx)
- Pass `categoryId` prop to the `Recommended` component.

#### [MODIFY] [Recommended.jsx](file:///c:/Users/ambat/Desktop/youtube-clone/src/Components/Recommended/Recommended.jsx)
- Accept `categoryId` prop.
- Fetch popular videos in the same category from YouTube API `videos` endpoint.
- Display dynamic thumbnails, titles, channel names, and view counts with `Link` tags navigating to `/video/${item.snippet.categoryId}/${item.id}`.

### 4. Search & Feed Enhancements
#### [MODIFY] [Navbar.jsx](file:///c:/Users/ambat/Desktop/youtube-clone/src/Components/Navbar/Navbar.jsx)
- Add input handling for search term and optional search submission.

## Verification Plan

### Automated Build Verification
- Execute `npm run build` in `c:/Users/ambat/Desktop/youtube-clone` to ensure Vite compiles without errors.

### Manual Verification
- Start the development server with `npm run dev`.
- Verify category switching on Home page (Gaming, Tech, Music, etc.).
- Verify clicking a video loads YouTube player iframe, live video metadata, channel details, and comments.
- Verify recommended sidebar lists actual videos and clicking recommended videos navigates correctly.
