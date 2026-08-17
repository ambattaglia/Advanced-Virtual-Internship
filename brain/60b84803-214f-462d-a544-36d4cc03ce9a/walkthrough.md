# Ultraverse NFT Marketplace Completion Walkthrough

All requirements of the project have been successfully completed. Static placeholders are replaced with dynamic API integrations, sliders are configured using Owl Carousel, and components adapt dynamically with loading states.

## Summary of Changes

### 1. App Routing & Global Animations
- Modified [App.jsx](file:///C:/Users/ambat/Dev/andrea-internship/src/App.jsx) to support dynamic parameters:
  - Route `/author/:id` maps to the Author Profile Page.
  - Route `/item-details/:id` maps to the Item Details Page.
- Integrated **AOS (Animate On Scroll)** globally to trigger fade-up animations on page elements when the user scrolls.

### 2. Homepage Integrations
- [HotCollections.jsx](file:///C:/Users/ambat/Dev/andrea-internship/src/components/home/HotCollections.jsx):
  - Fetches collections dynamically from the `/hotCollections` endpoint.
  - Displays them in an interactive, responsive Owl Carousel slider.
  - Renders custom shimmer skeleton cards during the API loading phase.
- [NewItems.jsx](file:///C:/Users/ambat/Dev/andrea-internship/src/components/home/NewItems.jsx):
  - Fetches items from the `/newItems` endpoint.
  - Renders dynamic countdown timers ticking every second based on `expiryDate`. Shows `Expired` if time runs out, and hides the timer if no expiry date is set.
  - Shimmer skeletons are rendered during loading.
- [TopSellers.jsx](file:///C:/Users/ambat/Dev/andrea-internship/src/components/home/TopSellers.jsx):
  - Fetches sellers from `/topSellers`.
  - Links to their respective dynamic author profile pages.
  - Displays shimmer lists during loading.

### 3. Explore Page
- [ExploreItems.jsx](file:///C:/Users/ambat/Dev/andrea-internship/src/components/explore/ExploreItems.jsx):
  - Fetches explore items dynamically from `/explore`.
  - Integrates a real-time title search box (filters items as you type).
  - Integrates a sorting dropdown (Default, Price: Low to High, Price: High to Low, Most Liked).
  - Integrates a "Load More" button that starts by showing 8 items and appends 4 more per click.
  - Displays live ticking countdown timers on cards with active expiries.
  - Shows custom grid skeleton cards during loading.

### 4. Item Details Page
- [ItemDetails.jsx](file:///C:/Users/ambat/Dev/andrea-internship/src/pages/ItemDetails.jsx):
  - Reads `id` parameter from the URL.
  - Fetches specific NFT metadata from `/itemDetails?nftId=:id`.
  - Renders detailed layout (views, likes, description, eth price, owner avatar/name, creator avatar/name).
  - Displays a detailed split-skeleton layout during loading.

### 5. Author Profile Page
- [Author.jsx](file:///C:/Users/ambat/Dev/andrea-internship/src/pages/Author.jsx):
  - Corrected this page component which was previously a duplicate of ExploreItems.
  - Reads `id` from the URL and fetches author profiles from `/authors?author=:id`.
  - Renders banner, avatar, username tag, wallet address, and follower count.
  - Implemented a copy-to-clipboard button for the wallet address.
  - Implemented an active follow/unfollow toggle button that dynamically increments/decrements followers count.
  - Integrated [AuthorItems.jsx](file:///C:/Users/ambat/Dev/andrea-internship/src/components/author/AuthorItems.jsx) to display the author's dynamic collections.

## Verification Results

- Verified a clean compilation build output with **zero compilation warnings**!
