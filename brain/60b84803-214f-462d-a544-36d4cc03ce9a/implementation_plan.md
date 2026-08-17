# Ultraverse NFT Marketplace Implementation Plan

This plan outlines the steps required to complete the Ultraverse NFT Marketplace website, replacing placeholder static data with dynamic API data, adding interactive features (timers, filters, sliders), and implementing loading states.

## User Review Required

> [!IMPORTANT]
> The project will use the backend API at `https://us-central1-nft-cloud-functions.cloudfunctions.net`.
> 
> We will install the following npm dependencies as specified in the tutorial:
> - `jquery` and `react-owl-carousel` (for sliders) OR `keen-slider`
> - `aos` (for animations)
> 
> We will configure dynamic routing for the Author profile and Item Details pages:
> - `/author/:id`
> - `/item-details/:id`

## Proposed Changes

We will implement the following changes in the `C:\Users\ambat\Dev\andrea-internship` project:

---

### 1. App Routing

#### [MODIFY] [App.jsx](file:///C:/Users/ambat/Dev/andrea-internship/src/App.jsx)
- Update `<Route path="/author" ... />` to `<Route path="/author/:id" ... />`
- Update `<Route path="/item-details" ... />` to `<Route path="/item-details/:id" ... />`

---

### 2. Home Page Components

#### [MODIFY] [HotCollections.jsx](file:///C:/Users/ambat/Dev/andrea-internship/src/components/home/HotCollections.jsx)
- Fetch hot collections from `https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections` using Axios.
- Render cards inside an Owl Carousel slider using `react-owl-carousel`.
- Implement a loading state with skeleton cards (including placeholders for titles, images, and text) while the API request is loading.
- Link each collection card to its explore/author page dynamically.

#### [MODIFY] [NewItems.jsx](file:///C:/Users/ambat/Dev/andrea-internship/src/components/home/NewItems.jsx)
- Fetch new items from `https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems`.
- Render cards inside a slider.
- Implement a dynamic countdown timer for each card based on `expiryDate` (calculated using setInterval). If expired, display "Expired".
- Implement loading skeleton cards.
- Link cards to `/item-details/:id`.

#### [MODIFY] [TopSellers.jsx](file:///C:/Users/ambat/Dev/andrea-internship/src/components/home/TopSellers.jsx)
- Fetch top sellers from `https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers`.
- Implement loading skeleton list items.
- Link each seller avatar to `/author/:id`.

---

### 3. Explore Page

#### [MODIFY] [ExploreItems.jsx](file:///C:/Users/ambat/Dev/andrea-internship/src/components/explore/ExploreItems.jsx)
- Fetch explore items from `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore`.
- Add a search input or dropdown filters for:
  - Default / None
  - Price: Low to High
  - Price: High to Low
  - Most Liked (likes)
- Add a "Load More" button to display more items (initial 8 items, then loading 4 more on click).
- Implement loading skeleton cards.

---

### 4. Item Details Page

#### [MODIFY] [ItemDetails.jsx](file:///C:/Users/ambat/Dev/andrea-internship/src/pages/ItemDetails.jsx)
- Retrieve `id` using `useParams()`.
- Fetch item details from `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=:id`.
- Render dynamic information (title, price, views, likes, description, image, ownerName, ownerImage, creatorName, creatorImage).
- Add skeleton layout for loading state.

---

### 5. Author Profile Page

#### [MODIFY] [Author.jsx](file:///C:/Users/ambat/Dev/andrea-internship/src/pages/Author.jsx)
- Rename or rewrite `Author.jsx` to be a proper Page component (currently it is a duplicate of `ExploreItems`).
- Retrieve `id` using `useParams()`.
- Fetch author profile from `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=:id`.
- Render author banner, avatar, name, address, tag, and follower count.
- Implement a follow/unfollow toggle button that dynamically increments/decrements the followers count.
- Render the author's collection via `AuthorItems.jsx`.
- Implement loading state skeleton.

#### [MODIFY] [AuthorItems.jsx](file:///C:/Users/ambat/Dev/andrea-internship/src/components/author/AuthorItems.jsx)
- Pass down the author's `nftCollection` array.
- Render the author's list of NFTs dynamically.

---

## Verification Plan

### Automated Verification
- Run `npm run build` to verify there are no compilation or bundling errors.

### Manual Verification
- Run `npm start` and test the following user flows in the browser:
  - Homepage sliders for Hot Collections and New Items (drag, navigate).
  - Countdown timers on New Items (updating every second, displaying expiry).
  - Sorting and Load More button on Explore page.
  - Clicking on any NFT card opens its Item Details page with accurate details.
  - Clicking on any author avatar opens the corresponding Author Profile page.
  - Follow/unfollow toggle on Author Profile page dynamically updates follower count.
