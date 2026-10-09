import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Privacy",
  description: "What Kuotivo collects, why, where it is stored and how to have it deleted.",
};

/**
 * Written to describe what the product and this website actually do. Every
 * claim here is checkable against the system: Azure Southeast Asia hosting,
 * per-organisation row-level isolation, PDFs rendered in the browser, and a
 * marketing site with no analytics and no cookies.
 *
 * If any of that changes, this page changes with it.
 */
export default function Privacy() {
  return (
    <LegalPage title="Privacy" updated="9 October 2026">
      <p>
        Kuotivo is built and operated by {site.author.name}. This page covers both this
        website and the application at <a href={site.app}>app.kuotivo.in</a>.
      </p>

      <h2>This website</h2>
      <p>
        <strong>No analytics, no tracking pixels and no cookies.</strong> Nothing on{" "}
        {site.domain} profiles you or follows you anywhere else. The only way this site
        sends anything is if you click &ldquo;Book a demo&rdquo;, which opens your own
        email client with a message you write and send yourself.
      </p>
      <p>
        Fonts are served from Google Fonts, and the site is hosted on Vercel. Both
        receive your IP address as a normal part of serving a web page, and both keep
        their own short-term request logs.
      </p>

      <h2>The application</h2>
      <p>
        If you use Kuotivo to run a business, the data you enter is yours: your
        customers, quotations, invoices, receipts, rate cards and company settings.
      </p>
      <ul>
        <li>
          <strong>Isolation.</strong> Every business is a separate tenant. Records carry
          an organisation id and the database enforces row-level security, so one
          business cannot read another&rsquo;s data even if the application asked it to.
        </li>
        <li>
          <strong>Where it lives.</strong> Microsoft Azure, Southeast Asia region.
          PostgreSQL holds the records, Azure Blob Storage for the files you upload such as
          your logo and signature stamp.
        </li>
        <li>
          <strong>PDFs are rendered in your browser</strong>, on your own machine. The
          contents of a quotation or invoice are not sent anywhere to be typeset.
        </li>
        <li>
          <strong>What is logged.</strong> An audit trail records who changed what and
          when, inside your own organisation, so you can see the history of a document.
        </li>
        <li>
          <strong>Email.</strong> Account and subscription notices are sent through
          Resend. No marketing email is sent, ever.
        </li>
        <li>
          <strong>Errors.</strong> Application errors are reported to Sentry to be
          fixed. Error reports are not used for any other purpose.
        </li>
      </ul>
      <p>
        Your data is never sold, never shared with advertisers, and never used to train
        any model.
      </p>

      <h2>Keeping and deleting</h2>
      <p>
        Business records are kept while your account is active, because a quotation and
        a tax invoice are documents you may be legally required to produce years later.
        Write to <a href={`mailto:${site.email}`}>{site.email}</a> and you can have an
        export of everything, or have the whole tenant deleted. Deletion is permanent.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about any of this, or about data you believe is held incorrectly:{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>
    </LegalPage>
  );
}
