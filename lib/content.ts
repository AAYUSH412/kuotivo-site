/**
 * Every word on the site.
 *
 * One file on purpose: the owner edits copy far more often than layout, and a
 * text change should never require opening a component.
 *
 * Two hard rules enforced here (tasteskill 9.G and 9.F):
 *   1. ZERO em-dash or en-dash characters. Not in headlines, body, captions,
 *      button labels or alt text. Use a period, a comma, a colon or a hyphen.
 *   2. The middle dot is rationed to at most one per line.
 *
 * Facts come from `Kuotivo-Product-Proposal.md` and from the owner directly.
 * The "one to two hours" below is his own account of how Aastha Enterprise
 * built a quotation before Kuotivo. The specific number is what makes the line
 * land, so do not soften it to "hours".
 */

export const site = {
  name: "Kuotivo",
  domain: "kuotivo.in",
  url: "https://kuotivo.in",
  tagline: "Window and fenestration quoting software for Indian fabricators",
  description:
    "Kuotivo turns a window drawing into a priced, GST-ready quotation in minutes. Built for Indian aluminium and glazing fabricators, with real shop drawings, correct CGST, SGST and IGST, and gap-free statutory numbering.",
  email: "aayush@kuotivo.in",
  app: "https://app.kuotivo.in",
  author: { name: "Aayush Vaghela", url: "https://aayush-vaghela.vercel.app" },
  liveSince: "25 July 2026",
} as const;

/** One CTA label for one intent, used in the nav, the hero and the footer
 *  (tasteskill 4.5, no duplicate CTA intent). */
export const CTA_LABEL = "Book a demo";

export const demoMailto =
  `mailto:${site.email}` +
  `?subject=${encodeURIComponent("Demo request for Kuotivo")}` +
  `&body=${encodeURIComponent(
    [
      "Hello Aayush,",
      "",
      "I would like to see Kuotivo.",
      "",
      "Business name:",
      "City:",
      "What we fabricate:",
      "Quotations a month:",
      "Phone or WhatsApp:",
      "",
      "Thanks,",
    ].join("\n"),
  )}`;

export const nav = [
  { label: "Drawings", href: "#drawings" },
  { label: "How it works", href: "#how" },
  { label: "GST", href: "#gst" },
  { label: "Inside", href: "#inside" },
] as const;

export const hero = {
  title: "Quote a window in minutes, not an evening.",
  lede: "Draw the window on a grid. Kuotivo prices it and produces the shop drawing, then turns the quotation into a GST invoice.",
  priceMeta: "34.88 sq.ft at ₹355.00 per sq.ft",
  priceLabel: "Line value",
} as const;

/** A single credibility line under the hero. There is exactly one customer, so
 *  a logo wall would be a lie and three equal stat boxes would be filler. */
export const proof = {
  lead: "Running the quoting and invoicing at",
  customer: "Aastha Enterprise",
  trade: "aluminium, glazing and furniture fabrication in Vadodara",
  since: "since July 2026",
} as const;

export const problem = {
  title: "A quotation used to take one to two hours.",
  body: "Aastha Enterprise fabricates aluminium windows, structural glazing and furniture. Before Kuotivo, the proprietor built every quotation himself:",
  steps: [
    { verb: "Draw", text: "each window in AutoCAD." },
    { verb: "Export", text: "the drawing as an image." },
    { verb: "Paste", text: "it into a hand made layout, one window at a time." },
    { verb: "Retype", text: "the sizes, do the GST by hand, send it." },
  ],
  kicker:
    "One to two hours a quotation, depending on the number of items. Invoices were written in Microsoft Word. There was no Tally, no accounting software, and no reliable record of the last invoice number.",
  caption: "The drawing was made somewhere else, printed, and pasted in by hand.",
} as const;

export const engine = {
  eyebrow: "The drawing engine",
  title: "It produces a shop drawing, not a thumbnail.",
  lede: "You lay a window out as a grid: column widths and row heights in millimetres, and what each panel does. Kuotivo generates a drawing a fabricator can work from.",
  /** Six capabilities, six bento cells. Cell count matches content count
   *  exactly (tasteskill 4.7). Sizes vary on purpose. */
  cells: [
    {
      key: "panels",
      icon: "GridFour",
      title: "Twelve panel kinds",
      body: "Fixed, openable, sliding, sliding door, casement left and right, awning, hopper, louver, exhaust fan, door left and right.",
      span: "lg:col-span-2",
    },
    {
      key: "merge",
      icon: "ArrowsOutLineHorizontal",
      title: "Merged panels",
      body: "A full width top light over two sliders. A tall fixed pane beside a slider. Column and row spans, both.",
      span: "",
    },
    {
      key: "mesh",
      icon: "Rows",
      title: "Two mesh modes",
      body: "Mesh on its own track of a three track slider, or a separate fixed frame over the panel. Modelled as a choice, because both at once is a window nobody can build.",
      span: "",
    },
    {
      key: "tracks",
      icon: "ArrowsLeftRight",
      title: "Sliders of one to four tracks",
      body: "With forced shutter direction, so a centre opening pair draws the way it is actually built.",
      span: "",
    },
    {
      key: "arch",
      icon: "Circle",
      title: "Arched and Palladian heads",
      body: "Semicircular, segmental or stilted, as geometry above an unchanged rectangular grid. A Palladian head changes the price, because the area above the flat shoulders comes off the billable area.",
      span: "lg:col-span-2",
    },
    {
      key: "pure",
      icon: "Equals",
      title: "One source of truth",
      body: "The engine has no database and no network. Pricing, the live preview and the PDF call the same functions, so the three can never disagree.",
      span: "",
    },
  ],
} as const;

export const how = {
  title: "Quotation to invoice to money in the bank.",
  lede: "One spine. Everything else in the product serves it.",
  cards: [
    {
      title: "Draw and price the quotation",
      body: "Pick the customer, add lines, draw or pick each window. Rates come from your rate card, in sq.ft or m².",
      shot: "/shots/quotations.png",
      alt: "The Kuotivo quotations list showing eleven quotations with status, window count and grand total.",
    },
    {
      title: "Convert it to a tax invoice",
      body: "One click from a finalized quotation, with the tax recomputed from the customer rather than copied across.",
      shot: "/shots/invoice-detail.png",
      alt: "A Kuotivo tax invoice detail screen for an inter state IGST invoice.",
    },
    {
      title: "Record what you collect",
      body: "Receipts against invoices, seven payment methods, part payments. Payment status is derived from the money, never typed.",
      shot: "/shots/payments.png",
      alt: "The Money to Collect screen in Kuotivo listing receipts recorded against invoices.",
    },
    {
      title: "See who owes you",
      body: "Money to collect, overdue, collected this month, and which quotations are still waiting for a reply.",
      shot: "/shots/dashboard.png",
      alt: "The Kuotivo dashboard showing money to collect, overdue, collected this month and quotations to follow up.",
    },
    {
      title: "Keep the catalog once",
      body: "Every window type you fabricate, drawn once and picked from the quotation wizard after that.",
      shot: "/shots/window-types.png",
      alt: "The Kuotivo window types catalog with thumbnail drawings for nine window types.",
    },
    {
      title: "Price from a rate card",
      body: "Profile system and glass spec to a rupee rate, with a hardware add on and a minimum billable area.",
      shot: "/shots/rate-cards.png",
      alt: "The Kuotivo rate cards screen listing profile systems against glass specifications and rates.",
    },
    {
      title: "Close the books",
      body: "Receivables ageing, sales and GST summary, customer statement. PDF and CSV.",
      shot: "/shots/reports.png",
      alt: "The Kuotivo reports screen offering receivables ageing, sales and GST summary and customer statement.",
    },
    {
      title: "Know what changed",
      body: "Every edit recorded against the document number, so the history still reads usefully years later.",
      shot: "/shots/audit-logs.png",
      alt: "The Kuotivo audit log listing who changed which document and when.",
    },
  ],
} as const;

export const gst = {
  title: "Indian GST is not a setting here. It is the product.",
  lede: "This is where software translated from somewhere else falls over.",
  lead: {
    title: "CGST and SGST, or IGST, decided for you",
    body: "From the customer's GST state code against yours. On conversion it is recomputed from the customer rather than copied from the quotation, so the legally binding document is right even when the quote was not.",
  },
  numbering: {
    title: "Numbering is statutory, not a display id",
    body: "Gap free, per financial year, unique to your business. The year rolls in April and each year gets its own counter.",
    samples: ["QT/26-27/00042", "INV/26-27/00010", "RCPT/26-27/00003"],
  },
  rest: [
    { title: "HSN and SAC per line", body: "Optional, because most buyers are homeowners." },
    { title: "Reverse charge", body: "Carried on the invoice where the law expects it." },
    { title: "E-way bill and vehicle", body: "Recorded against the invoice, not kept in a notebook." },
    { title: "Rounding is a visible line", body: "Shown as its own amount, never a silent adjustment." },
  ],
} as const;

/**
 * Twelve modules, grouped the way the product's own sidebar groups them.
 * A flat twelve row list with a hairline under each row is the layout
 * tasteskill 4.9 names as the worst default, and the grouping is not invented:
 * it is the app's real navigation.
 */
export const inside = {
  title: "Twelve modules. All of them live.",
  lede: "Nothing here is on a roadmap.",
  groups: [
    {
      name: "Overview",
      items: [
        ["Dashboard", "Money to collect, overdue, collected this month, quotes awaiting reply."],
        ["Alerts", "Expiring quotations and overdue invoices, the things that need chasing."],
        ["Reports", "Receivables ageing, sales and GST summary, customer statement."],
      ],
    },
    {
      name: "Sales",
      items: [
        ["Customers", "GSTIN and PAN, state and GST state code, site and project defaults."],
        ["Quotations", "Customer, lines, draw or pick the window, price, PDF."],
        ["Invoices", "Convert a quotation or raise a blank one. Draft, finalized, cancelled."],
        ["Money to Collect", "Receipts, part payments, seven methods, reference numbers."],
      ],
    },
    {
      name: "Catalog",
      items: [
        ["Window Types", "The drawing catalog the quotation wizard picks from."],
        ["Rate Cards", "Profile system and glass spec to a rate, with a minimum billable area."],
      ],
    },
    {
      name: "Admin",
      items: [
        ["Users", "Owner, staff and viewer. Three roles, no ceremony."],
        ["Audit Logs", "Who changed what, when, with the document number beside the change."],
        ["Settings", "Company identity, bank and UPI, GST config, terms, signature stamp."],
      ],
    },
  ],
} as const;

export const reference = {
  title: "Built with a fabricator, not for a category.",
  body: "Aastha Enterprise in Vadodara fabricates aluminium windows, structural glazing, railing and furniture. Hitesh Panchal ran it on hand built quotations and Word invoices. Kuotivo was built around his work, and it has run his quoting and invoicing in production since July 2026.",
  caption: "Aluminium sections being measured in a fabrication workshop.",
} as const;

export const cta = {
  title: "See it on your own windows.",
  body: "Tell me what you fabricate and roughly how many quotations you issue a month. I will show you the product on a real job rather than a canned demo.",
} as const;
