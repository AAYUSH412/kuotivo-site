import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Terms",
  description: "The terms of use for Kuotivo, the window quoting and invoicing application.",
};

/**
 * Honest about the current stage rather than pretending to be a large vendor.
 * In particular it says plainly that billing is invoiced manually and that
 * Kuotivo is not a tax adviser: both true, and both better said here than
 * discovered later.
 */
export default function Terms() {
  return (
    <LegalPage title="Terms" updated="9 October 2026">
      <p>
        These terms cover the use of Kuotivo, operated by {site.author.name}. Using the
        application means accepting them.
      </p>

      <h2>What Kuotivo is</h2>
      <p>
        Software for preparing window and fenestration quotations, GST tax invoices and
        payment receipts. It has been in production use since {site.liveSince}.
      </p>

      <h2>Your account</h2>
      <ul>
        <li>One organisation per business. You are responsible for the accounts you create inside it and for keeping their passwords safe.</li>
        <li>The data you enter remains yours. You may export it or ask for it to be deleted at any time.</li>
        <li>Do not use the application to store anything unlawful, or attempt to reach another organisation&rsquo;s data.</li>
      </ul>

      <h2>Documents and tax, which is the section to read</h2>
      <p>
        Kuotivo computes GST from the information you give it: your state, your
        customer&rsquo;s GST state code, the rate on the document and the HSN or SAC codes
        you enter. It determines CGST and SGST versus IGST from those values and issues
        gap-free document numbers per financial year.
      </p>
      <p>
        <strong>
          Kuotivo is not a tax adviser, and a document it produces is still your
          document.
        </strong>{" "}
        You are responsible for the correctness of what you issue and file. Check it
        before you send it.
      </p>

      <h2>Payment</h2>
      <p>
        Kuotivo is a paid subscription per business. At present renewals are invoiced
        directly rather than collected through the application, and your licence period
        is set when payment is received. If a subscription lapses you are warned, then
        given a grace period, and only then is access suspended. Your data is not
        deleted when that happens.
      </p>

      <h2>Availability</h2>
      <p>
        Reasonable effort goes into keeping the service up, and backups are taken and
        periodically test-restored. No uptime guarantee is offered. Keep your own copies
        of documents that matter to you; every quotation and invoice can be downloaded
        as a PDF.
      </p>

      <h2>Liability</h2>
      <p>
        Kuotivo is provided as is. To the extent the law allows, liability for any claim
        relating to the service is limited to the subscription fees you paid in the
        twelve months before the claim.
      </p>

      <h2>Changes and ending</h2>
      <p>
        You may stop using Kuotivo at any time and request an export. These terms may be
        updated; material changes will be notified by email to the account owner.
        Disputes are subject to the jurisdiction of the courts at Vadodara, Gujarat.
      </p>

      <h2>Contact</h2>
      <p>
        <a href={`mailto:${site.email}`}>{site.email}</a>
      </p>
    </LegalPage>
  );
}
