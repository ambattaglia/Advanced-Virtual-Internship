# React Library E-Commerce Application Implementation Plan

This plan details the steps required to complete the React Library E-Commerce application clone. We will resolve all compilation issues, organize files under a standard directory layout, add central state management for the shopping cart in `App.js`, create the missing `Cart` and `BestBooks` components, and verify the build.

## User Review Required

> [!NOTE]
> **Cart State Management:** We will lift the cart state up to `App.js` to manage items, quantities, and removals globally. This allows `Nav` (which displays the item count badge) and `BookInfo` (which has the "Add to Cart" button) to communicate seamlessly.
> 
> **Component Reorganization:** We are moving `Price.jsx` and `Rating.jsx` to `src/components/ui/` to keep UI components standardized, and renaming `Rating.jsx` to `Ratings.jsx` to match the imports expected in `BookInfo.jsx`.

## Open Questions
No open questions at this stage, as the reference site behavior is standard for this course project.

---

## Proposed Changes

### 1. State Management & Routing

#### [MODIFY] [App.js](file:///c:/Users/ambat/OneDrive/Documents/My-React-Project/src/App.js)
- Import `useState` from `'react'`.
- Import the `books` array from `./data`.
- Create state for `cart` initialized as an empty array `[]`.
- Implement `addItemToCart(book)`: check if the book is already in the cart; if so, increment quantity, otherwise add with quantity 1.
- Implement `changeQuantity(book, quantity)`: map through cart items and set the matching book's quantity to the target number.
- Implement `removeItem(book)`: filter out the target book from the cart.
- Calculate total cart quantity to pass to the `<Nav numberOfItems={...} />` component.
- Set up the `/cart` route: `<Route path="/cart" element={<Cart cart={cart} changeQuantity={changeQuantity} removeItem={removeItem} />} />`.
- Pass `books`, `addItemToCart`, and `cart` down to the `<BookInfo />` route.

---

### 2. UI Components & Organization

#### [DELETE] [Price.jsx](file:///c:/Users/ambat/OneDrive/Documents/My-React-Project/src/components/Price.jsx)
- Move this component to the `ui` folder.

#### [NEW] [Price.jsx](file:///c:/Users/ambat/OneDrive/Documents/My-React-Project/src/components/ui/Price.jsx)
- Drop-in replica of the original `Price` component inside `src/components/ui/`.

#### [DELETE] [Rating.jsx](file:///c:/Users/ambat/OneDrive/Documents/My-React-Project/src/components/Rating.jsx)
- Move this component to the `ui` folder and rename it.

#### [NEW] [Ratings.jsx](file:///c:/Users/ambat/OneDrive/Documents/My-React-Project/src/components/ui/Ratings.jsx)
- Drop-in replica of the original `Rating` component, renamed to `Ratings` (and referencing `star-half-alt` instead of `star-half-stroke` to align with icons imported in `index.js`).

#### [NEW] [BestBooks.jsx](file:///c:/Users/ambat/OneDrive/Documents/My-React-Project/src/components/ui/BestBooks.jsx)
- Retrieve books array from `../../data`.
- Filter out the current book being viewed (`+book.id !== +id`).
- Select books with 5-star ratings (`book.rating === 5`).
- Slice the first 4 results.
- Render them using the `Book` component.

#### [MODIFY] [Book.jsx](file:///c:/Users/ambat/OneDrive/Documents/My-React-Project/src/components/Book.jsx)
- Import `Link` from `react-router-dom` (currently missing).
- Import `Price` from `./ui/Price` and `Ratings` from `./ui/Ratings`.
- Update the component to dynamically link to `/books/${book.id}` instead of `/books/1`.
- Clean up unused empty click handler buttons and use `<Link>` components styled with class names (e.g., `.book__title--link`).
- Add standard skeleton loaders that show until the book image finishes loading.

---

### 3. Pages

#### [MODIFY] [BookInfo.jsx](file:///c:/Users/ambat/OneDrive/Documents/My-React-Project/src/pages/BookInfo.jsx)
- Accept `cart` as a prop.
- Check if the book already exists in the cart.
- Render a "Checkout" button linking to `/cart` if the book is in the cart, otherwise render the "Add to Cart" button.

#### [NEW] [Cart.jsx](file:///c:/Users/ambat/OneDrive/Documents/My-React-Project/src/pages/Cart.jsx)
- Accept `cart`, `changeQuantity`, and `removeItem` as props.
- Implement the page structure using the pre-defined CSS class names (`.cart__header`, `.cart__item`, etc.).
- Calculate the Subtotal, Tax (10%), and Total.
- Handle empty cart states using the `empty_cart.svg` asset and display a "Browse books" call to action.

#### [MODIFY] [Nav.jsx](file:///c:/Users/ambat/OneDrive/Documents/My-React-Project/src/components/Nav.jsx)
- Ensure the `numberOfItems` badge renders correctly from props.

#### [MODIFY] [Footer.jsx](file:///c:/Users/ambat/OneDrive/Documents/My-React-Project/src/components/Footer.jsx)
- Import `Link` from `react-router-dom`.
- Replace browser-reloading anchor `<a>` tags with Single Page App `<Link>` components.

---

## Verification Plan

### Automated Tests
- Run `npm run build` to verify there are no compilation or syntax errors.

### Manual Verification
- Start the application using `npm run start` (or `npm start`).
- Navigate through the Home page, Books page, and Book Info page.
- Test the filtering (Price Low-High, High-Low, Rating) on the `/books` page.
- Add a book to the cart and verify the Cart badge increments.
- Verify the button in BookInfo changes from "Add to Cart" to "Checkout" once added.
- Go to the Cart page, modify the quantity input, verify totals update.
- Remove items, verify the empty cart illustration appears.
