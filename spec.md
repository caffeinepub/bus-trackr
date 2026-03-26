# Bus Trackr

## Current State
- Home page has a single search bar for depots, popular depots grid, and a link to the live tracker page
- TrackPage shows 5 hardcoded live routes always visible regardless of user query
- Routes data exists for all 22 Haryana districts with `DEPOT_ROUTES` and `getAllRoutes` helper is missing but data is there
- `getCurrentStop()` function calculates bus position based on time

## Requested Changes (Diff)

### Add
- Google Maps-style "From" and "To" autocomplete inputs on the home page (with swap button between them)
- Route search logic: when user fills both From and To, search across ALL routes in `DEPOT_ROUTES` for any route whose stops array contains both origin and destination city names (case-insensitive partial match)
- Display matched routes below the search panel with: route number, origin→destination, next departure, stops count
- Each matched route card should have a "Track Live" button that navigates to TrackPage with that route pre-selected
- On TrackPage, if a route is passed via URL param or state, show ONLY that route's timeline prominently at top, then a divider, then all other running buses below
- Add a helper function `getAllRoutes()` to depots.ts that flattens all routes from all depots into a single array
- Add a helper `searchRoutesByStops(from: string, to: string): BusRoute[]` that searches all routes and returns routes where stops contain both from and to cities (from before to in stops order)

### Modify
- Home page: replace single search bar with the From/To Google Maps-style panel. Keep the rest of the page (popular depots, live tracker preview) below.
- TrackPage: if a `routeId` search param is present in the URL, highlight that specific route at the top with a special "Your Route" badge and larger display; show remaining routes below in a collapsible "Other Buses" section

### Remove
- Nothing removed

## Implementation Plan
1. Add `getAllRoutes()` and `searchRoutesByStops(from, to)` helpers to `src/frontend/src/data/depots.ts`
2. Rewrite home page search panel to a From/To dual-input with swap button and autocomplete dropdown (suggestions from all stop names across all routes)
3. Show search results as route cards with next departure time and a "Track Live" button linking to `/track?routeId=<id>`
4. Modify TrackPage to read `routeId` search param, show matched route prominently at top if found, then other active buses below
5. Keep rest of home page intact below the search panel
