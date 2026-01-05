# PRD: Contact Detail Page - HubSpot-Style Layout

## Introduction/Overview

This feature redesigns the Person Contact detail page to follow a HubSpot-inspired layout. The new design features a **fixed left sidebar** with contact information and quick action buttons, alongside a **right content area with tabbed navigation**. The goal is to improve usability by providing quick access to contact actions (WhatsApp, Email, LinkedIn) and a clear overview of contact details, while maintaining flexibility for future tab additions.

## Goals

1. Create a professional, HubSpot-style contact detail layout with a left sidebar and right content area
2. Provide quick-action buttons (WhatsApp, Email, LinkedIn, More) for immediate contact engagement
3. Display all relevant contact information in an organized "About this contact" section
4. Implement a tabbed interface in the content area, starting with an "Overview" tab
5. Improve user experience with direct links (wa.me for WhatsApp, mailto for email, external link for LinkedIn)

## User Stories

1. **As a user**, I want to see a contact's photo/avatar and name prominently displayed, so I can quickly identify whose profile I'm viewing.

2. **As a user**, I want to click a WhatsApp button that opens WhatsApp directly with the contact's number, so I can message them immediately without copying/pasting.

3. **As a user**, I want to click an Email button that opens my email client with the contact's email pre-filled, so I can compose a message quickly.

4. **As a user**, I want to click a LinkedIn button that opens the contact's LinkedIn profile in a new tab, so I can view their professional information.

5. **As a user**, I want to access Edit and Delete options from a "More" menu, so I can manage the contact without cluttering the main interface.

6. **As a user**, I want to see all contact details (email, phone, job title, company, LinkedIn) in an "About this contact" section, so I have all information at a glance.

7. **As a user**, I want to navigate between different tabs (starting with Overview), so I can access different aspects of the contact's information.

## Functional Requirements

### Layout Structure

1. The page must have a **two-column layout**:
   - **Left sidebar** (fixed width, ~280-320px): Contains contact header and "About this contact" section
   - **Right content area** (flexible width): Contains tabbed navigation with content panels

2. The layout must be **responsive**:
   - On desktop: Side-by-side columns
   - On mobile/tablet: Stacked layout (sidebar on top, tabs below)

### Left Sidebar - Contact Header

3. The sidebar header must display:
   - A large avatar (64x64px or 80x80px) with the contact's initials as fallback
   - The contact's full name (`firstName lastName`) as a heading
   - The contact's job title (if available) as a subtitle

4. Below the avatar/name, display a row of **action buttons**:
   - **WhatsApp button**: Icon button that opens `https://wa.me/{phoneNumber}` (cleaned number, digits only) in a new tab
   - **Email button**: Icon button that opens `mailto:{email}` to compose an email
   - **LinkedIn button**: Icon button that opens the LinkedIn URL in a new tab
   - **More button**: Icon button (three dots) that opens a dropdown menu

5. Action buttons must be **conditionally displayed**:
   - WhatsApp button: Only show if `celular` field has a value
   - Email button: Only show if `email` field has a value
   - LinkedIn button: Only show if `linkedinUrl` field has a value
   - More button: Always visible

6. The **More dropdown menu** must contain:
   - "Editar contacto" option - triggers the existing edit contact sheet
   - "Eliminar contacto" option - triggers the existing delete contact dialog

### Left Sidebar - About This Contact

7. Display an **"About this contact"** section with a collapsible/expandable design (expanded by default)

8. The section must display the following fields (if available):
   - **Email**: Displayed with a Mail icon, clickable (mailto link)
   - **Teléfono/Celular**: Displayed with a Phone icon, clickable (tel link)
   - **LinkedIn**: Displayed with a LinkedIn icon, clickable (external link)
   - **Cargo/Job Title**: Displayed with a Briefcase icon
   - **Empresa/Company**: Displayed with a Building icon, optionally linked to the company detail page

9. If a field is empty/null, it should not be displayed (no empty rows)

### Right Content Area - Tabs

10. The right content area must use the existing `CardTabs` component pattern

11. Initially, implement only the **"Overview"** tab:
    - Tab label: "Overview" or "Resumen"
    - Content: Can be empty or display a simple message like "Contenido de resumen próximamente"

12. The tabs structure must be extensible for future tabs (Activities, Notes, etc.)

### Integration with Existing Components

13. Reuse the existing `EditContactSheet` component for the "Editar contacto" action

14. Reuse the existing `DeleteContactDialog` component for the "Eliminar contacto" action

15. Maintain the existing data fetching logic using Apollo Client and the `GET_CONTACT` query

16. Keep the existing error and loading states (with skeleton loading)

### Navigation

17. Include a breadcrumb navigation at the top of the page:
    - Format: `Contactos > {Contact Name}`
    - Use the existing `DetailHeader` component

18. The breadcrumb "Contactos" link should navigate to `/contacts`

## Non-Goals (Out of Scope)

1. **Additional tabs content**: Only the Overview tab structure will be implemented; actual content for future tabs (Activities, Notes, etc.) is out of scope
2. **Contact owner/assignment**: No user assignment or ownership fields
3. **Activity timeline**: No email/call/meeting logging functionality
4. **Custom fields**: No dynamic or user-defined contact properties
5. **Company contact detail redesign**: This PRD focuses only on Person contacts; Company contacts will be addressed separately if needed

## Design Considerations

### Visual Reference

- Primary inspiration: HubSpot contact detail page (see attached screenshot)
- Secondary reference: Existing student detail page layout for tab implementation

### Component Structure

```
PersonDetailPage
├── DetailHeader (breadcrumb + optional actions)
└── Container (flex, responsive)
    ├── ContactSidebar (left, fixed width)
    │   ├── ContactHeader
    │   │   ├── Avatar
    │   │   ├── Name + JobTitle
    │   │   └── ActionButtons (WhatsApp, Email, LinkedIn, More)
    │   └── AboutSection
    │       └── ContactFields (email, phone, linkedin, jobTitle, company)
    └── CardTabs (right, flexible)
        └── OverviewTab (content placeholder)
```

### Styling

- Use existing design system components (Avatar, Button, Card, DropdownMenu)
- Sidebar background should have subtle differentiation (e.g., slightly different shade or border)
- Action buttons should use icon-only style with tooltips
- Maintain consistent spacing with the rest of the application

### Icons

- WhatsApp: Use a MessageCircle icon or custom WhatsApp icon
- Email: Mail icon (already available via lucide-react)
- LinkedIn: Linkedin icon (already available via lucide-react)
- More: MoreHorizontal or MoreVertical icon
- Phone: Phone icon
- Job Title: Briefcase icon
- Company: Building icon

## Technical Considerations

### Phone Number Formatting for WhatsApp

- WhatsApp links require digits only (no spaces, dashes, or special characters)
- Implement a utility function to clean phone numbers: `cleanPhoneNumber(phone: string): string`
- Example: `+54 11 1234-5678` → `5411123456789`

### Existing Dependencies

- Apollo Client for data fetching (already implemented)
- Lucide React for icons
- Radix UI for dropdown menus
- Existing contact types and queries

### File Structure

New/modified files:
- `modules/contacts/components/contact-sidebar.tsx` - New sidebar component
- `modules/contacts/components/contact-action-buttons.tsx` - New action buttons component
- `modules/contacts/components/about-contact-section.tsx` - New about section component
- `modules/contacts/components/person-overview-tab.tsx` - New overview tab content
- `app/(authenticated)/contacts/person/[id]/page.tsx` - Modified page layout
- `modules/contacts/utils/phone.ts` - Phone number formatting utility

## Success Metrics

1. **Functional**: All action buttons work correctly (WhatsApp opens wa.me, Email opens mailto, LinkedIn opens profile)
2. **Visual**: Layout matches HubSpot-style design with clear sidebar/content separation
3. **Responsive**: Page is usable on both desktop and mobile devices
4. **Integration**: Edit and Delete actions work correctly using existing components
5. **Performance**: No regression in page load time

## Open Questions

1. Should we show a tooltip on hover for each action button explaining what it does?
2. For contacts without a phone number, should the WhatsApp button be hidden or shown as disabled?
3. Should the "About this contact" section be collapsible, or always expanded?
4. What placeholder content should we show in the Overview tab until we define its actual content?

