# PRD: Runs Table Social Icons & Company Contacts Enrichment

## 1. Introduction/Overview

This feature introduces two main improvements to the Runs module:

1. **Runs Table Redesign**: Reorganize the runs table columns to display social media presence through visual icons, removing the explicit "Website" column in favor of a more compact icon-based representation showing web presence, Instagram, Facebook, and LinkedIn availability.

2. **Company Contacts Enrichment Option**: Add a new checkbox when creating Google Maps scraper runs that enables the Apify "Company Contacts Enrichment" add-on, allowing users to enrich their results with contact details extracted from business websites.

The goal is to provide a cleaner, more scannable table view while also giving users the option to enrich their scraping results with additional contact data.

## 2. Goals

- **G1**: Improve table readability by consolidating web/social presence into a compact icon column
- **G2**: Enable quick visual scanning of which contacts have web presence vs social media profiles
- **G3**: Properly categorize Facebook/Instagram URLs that were incorrectly stored as websites
- **G4**: Allow users to opt-in to Company Contacts Enrichment when creating Google Maps scraper runs
- **G5**: Reduce visual clutter by removing the dedicated Website text column

## 3. User Stories

### US1: Viewing Social Presence at a Glance
**As a** user viewing the runs table  
**I want to** see icons indicating which social platforms each contact has  
**So that** I can quickly identify contacts with strong online presence without reading URLs

### US2: Accessing Social Profiles
**As a** user analyzing a contact's online presence  
**I want to** click on an enabled social icon to open that profile  
**So that** I can quickly navigate to their social media pages

### US3: Enabling Contact Enrichment
**As a** user creating a new Google Maps scraper run  
**I want to** enable the Company Contacts Enrichment option  
**So that** my results include additional contact details like emails and social profiles extracted from business websites

### US4: Understanding Enrichment Costs
**As a** user considering the enrichment option  
**I want to** see a tooltip explaining what the feature does and its cost implications  
**So that** I can make an informed decision before enabling it

## 4. Functional Requirements

### 4.1 Runs Table Column Changes

| # | Requirement |
|---|-------------|
| FR1 | Remove the "Website" column from the runs table |
| FR2 | Reorder columns to: `#`, `Place Name`, `Ciudad`, `[Icons Column]`, followed by remaining columns |
| FR3 | The icons column must display 4 icons in order: Web, Instagram, Facebook, LinkedIn |
| FR4 | The icons column must have no text header (icons only or empty header) |
| FR5 | Each icon must be visually "enabled" (full opacity/color) if the contact has that platform |
| FR6 | Each icon must be visually "disabled" (grayed out/low opacity) if the contact lacks that platform |
| FR7 | Clicking an enabled icon must open the corresponding URL in a new browser tab |
| FR8 | Disabled icons must not be clickable (no hover cursor change, no action) |
| FR9 | Enabled icons must show a pointer cursor on hover |

### 4.2 Social Media Data Extraction

| # | Requirement |
|---|-------------|
| FR10 | When Apify returns social media data as an array, use `array[0]` as the primary social URL for each platform |
| FR11 | Extract Instagram URL from `instagrams[0]` field if available |
| FR12 | Extract Facebook URL from `facebooks[0]` field if available |
| FR13 | Extract LinkedIn URL from `linkedIns[0]` field if available |
| FR14 | The web icon should be enabled if the contact has a valid website URL (not a social media URL) |

### 4.3 Backend URL Validation & Categorization

| # | Requirement |
|---|-------------|
| FR15 | **Backend**: When processing run results, detect if the `website` field contains a Facebook URL |
| FR16 | **Backend**: When processing run results, detect if the `website` field contains an Instagram URL |
| FR17 | Facebook URL patterns to detect: `facebook.com`, `fb.com`, `fb.me`, `www.facebook.com` |
| FR18 | Instagram URL patterns to detect: `instagram.com`, `www.instagram.com`, `instagr.am` |
| FR19 | If a Facebook URL is detected in the website field, move it to the Facebook social field and set website to `null` |
| FR20 | If an Instagram URL is detected in the website field, move it to the Instagram social field and set website to `null` |
| FR21 | This validation must only apply to new runs (not retroactive) |

### 4.4 Company Contacts Enrichment Checkbox

| # | Requirement |
|---|-------------|
| FR22 | Add a new checkbox labeled "Company Contacts Enrichment" in the Google Maps scraper run creation form |
| FR23 | The checkbox must be **disabled by default** (opt-in) |
| FR24 | Add a tooltip icon (?) next to the checkbox label |
| FR25 | Tooltip content must explain: what the feature does, that it extracts emails and social profiles from business websites, and the pricing ($2.00 per 1,000 places) |
| FR26 | When enabled, pass `scrapeContacts: true` to the Apify API call |
| FR27 | When disabled, pass `scrapeContacts: false` (or omit the parameter) to the Apify API call |
| FR28 | The checkbox state must be stored with the run configuration |

## 5. Non-Goals (Out of Scope)

- **NG1**: Retroactive migration of existing runs data - only new runs will have the URL validation
- **NG2**: Detection of other social platforms (YouTube, LinkedIn, Twitter, TikTok) as website URLs - only Facebook and Instagram
- **NG3**: Social media profile enrichment (the second Apify add-on) - only Company Contacts Enrichment
- **NG4**: Bulk editing of social media URLs for existing contacts
- **NG5**: Custom icon ordering or column customization by users

## 6. Design Considerations

### 6.1 Icon Design
- Use consistent icon set (recommend Lucide icons or similar already in use)
- Suggested icons:
  - Web: `Globe` or `ExternalLink`
  - Instagram: `Instagram`
  - Facebook: `Facebook`
  - LinkedIn: `Linkedin`

### 6.2 Icon States
```
Enabled state:
- Full color/opacity
- Cursor: pointer
- Hover: slight scale or color change

Disabled state:
- Gray color or 30-40% opacity
- Cursor: default
- No hover effect
```

### 6.3 Column Width
- Icons column should be compact (approximately 120-150px to fit 4 icons comfortably)
- Icons should have consistent spacing (8-12px gap)

### 6.4 Tooltip for Enrichment Checkbox
```
Tooltip content suggestion:
"Enrich Google Maps places with contact details extracted from business websites, 
including business emails and social media profiles (Meta, LinkedIn, X, etc).

Pricing: $2.00 per 1,000 places ($0.002/place)"
```

## 7. Technical Considerations

### 7.1 Frontend (leads-scrapper-web)

- Modify the runs table component to reflect new column order
- Create a reusable `SocialIconsCell` component for the icons column
- Update GraphQL queries to ensure social media fields are fetched
- Add the enrichment checkbox to the run creation form
- Implement tooltip using existing UI tooltip component

### 7.2 Backend (leads-scrapper-backend)

- Modify the service that processes Apify results to include URL validation logic
- Create utility function to detect Facebook/Instagram URLs
- Update the run creation mutation to accept `scrapeContacts` boolean
- Pass the `scrapeContacts` flag to the Apify API call
- Ensure database schema supports storing the `scrapeContacts` preference per run

### 7.3 Data Structure Reference

Based on Apify response structure:
```typescript
// Social media fields from Apify
{
  instagrams: string[];  // Use [0] for primary
  facebooks: string[];   // Use [0] for primary
  linkedIns: string[];   // Use [0] for primary
  website: string;       // May contain social URLs that need reclassification
}
```

### 7.4 URL Detection Regex Patterns
```typescript
const FACEBOOK_PATTERN = /^https?:\/\/(www\.)?(facebook\.com|fb\.com|fb\.me)\//i;
const INSTAGRAM_PATTERN = /^https?:\/\/(www\.)?(instagram\.com|instagr\.am)\//i;
```

## 8. Success Metrics

| Metric | Target |
|--------|--------|
| Table load time | No increase from current (icon rendering should be negligible) |
| User adoption of enrichment | Track percentage of new runs with enrichment enabled |
| Correct URL categorization | 100% of FB/IG URLs in website field correctly reclassified |
| Icon click-through rate | Track how often users click enabled social icons |

## 9. Open Questions

| # | Question | Status |
|---|----------|--------|
| OQ1 | Should we show a count badge on icons if a contact has multiple profiles on the same platform? | Pending |
| OQ2 | Should the icons column be sortable (e.g., sort by "has Instagram")? | Pending |
| OQ3 | Should we add a filter to show only contacts with specific social platforms? | Pending |
| OQ4 | What should happen if the Apify enrichment fails for some results? | Pending |

---

## Appendix: Visual Reference

### Current Column Order
```
# | Place Name | Website | Ciudad | ...
```

### New Column Order
```
# | Place Name | Ciudad | [🌐 📷 📘 💼] | ...
```

### Icon States Example
```
Contact with website + Instagram only:
[🌐✓] [📷✓] [📘✗] [💼✗]
     ↑       ↑      ↑      ↑
  enabled enabled disabled disabled
```

