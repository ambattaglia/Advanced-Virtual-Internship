# Year Filter / Sorting Mechanism

This plan outlines adding a custom UI element (a "fake scroll bar") to filter or sort your albums by their release year. 

> [!WARNING]
> ## User Review Required
> Before I write the code, I need you to clarify a couple of details so I build exactly what you're imagining:
> 
> 1. **What exactly do you mean by "fake scroll bar"?** 
>    - Do you mean a **slider** (like a volume slider) where you drag a dot left and right across a timeline of years (e.g., 1960 to 2020)? 
>    - Or do you mean a **dropdown menu** that just looks like a custom scrollable box?
> 2. **Filter vs. Sort:** Do you want this to **filter** the albums (meaning it hides any albums that don't match the selected year/decade) or **sort** them (meaning it just rearranges them from newest to oldest)?

## Proposed Changes

### HTML (`index.html`)
#### [MODIFY] index.html
- Add the new "scroll bar" timeline/slider UI just above your search bar or just above the `#results` album grid.
- Add labels for the years.

### CSS (`style.css`)
#### [MODIFY] style.css
- Add custom CSS to style this "fake scroll bar" so it looks sleek and fits your purple/dark theme. We will hide the default browser styling and create a custom track and thumb if it's a slider.

### JavaScript (`index.js`)
#### [MODIFY] index.js
- Add a new array `defaultYears` to hold the release years for your 6 default Fleetwood Mac albums.
- Add an `addEventListener` to the new scroll bar so that when you move it or click a year, it triggers a JavaScript function.
- Write the logic to either filter or sort the albums on the screen based on the year selected.
- *(Note: If you search for new artists, we will also try to pull their release year from the MusicBrainz API to keep the filter working!)*

## Verification Plan
### Manual Verification
- We will open the site and drag the fake scroll bar.
- We will verify that the Fleetwood Mac default albums properly disappear or reorder based on the year selected.
- We will do a search for another artist and verify the slider still works on the new results.
