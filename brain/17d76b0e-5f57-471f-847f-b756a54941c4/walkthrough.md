# Year Slider Sorting Feature

I have successfully added a custom slider that allows you to sort albums by year! Here is how the new functionality works:

## What Was Added

1. **The Slider UI:**
   - A purple timeline slider has been added right above your album grid.
   - It ranges from **1960** to **2024**.
   - As you drag the slider, the text above it updates dynamically to show the year you are currently selecting.

2. **The Sorting Logic:**
   - I added the correct release years to your 6 default Fleetwood Mac albums (e.g., *Rumours* is 1977, *The Dance* is 1997).
   - As you drag the slider, the albums automatically rearrange themselves. The albums closest to the year you selected will be brought to the front of the list!
   - This works seamlessly with your flip cards. I even added the year next to the title on the front of the card (e.g., "Rumors (1977)") so you can easily see the sorting in action.

3. **Search Integration:**
   - If you use the search bar, the script will now try to pull the release year directly from the MusicBrainz API so the sorting slider works on new searches too!

> [!TIP]
> Try dragging the slider to 1977. You should see *Rumours* snap right to the front!

## Where to Find This
All these changes have been applied to your cloned repository folder located here:
`C:\Users\ambat\.gemini\antigravity\scratch\Mod-5-Final-Project`

Open the `index.html` file in that folder to test out your new feature!
