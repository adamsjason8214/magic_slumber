import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | Magical Slumber Orlando",
  description: "The reservation terms, cancellation policy, and liability release for renting a SlumberPod or other items from Magical Slumber Orlando.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-black pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl font-bold mb-8">
          <span className="gradient-text">Agreement and Release of Liability</span>
        </h1>

        <div className="prose prose-invert prose-blue max-w-none space-y-8 text-gray-300">
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">RENTAL TERMS AND CONDITIONS</h2>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-white mb-3">Definitions</h3>
            <p>The &quot;Rented Equipment&quot; includes any and all equipment, products, and other property rented to Client by Magical Slumber LLC.</p>
            <p>The &quot;Client&quot; includes any person or persons who agree to rent or who reserve for rental the Rented Equipment.</p>
            <p>The &quot;Company&quot; is Magical Slumber LLC, a limited liability company organized under the laws of the State of Florida, with a principal place of business in Orlando, Florida.</p>
            <p>The &quot;Rental Period&quot; is the time period for which the Client has rented the Rented Equipment, and any additional time after the Rental Period during which Client either retains or fails to return the Rented Equipment.</p>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-white mb-3">Rented Equipment and Rental Period</h3>
            <p><strong>Rented Equipment.</strong> Client agrees to rent from the Company, and the Company agrees to rent to Client, the Rented Equipment designated in Client&apos;s reservation.</p>
            <p>Client understands and agrees that a delivery charge, as displayed at checkout, will be applied for delivery of the Rented Equipment to Client&apos;s designated destination. The Company will deliver the Rented Equipment to the destination at or before the beginning of the Rental Period. The Company may set up the Rented Equipment when possible, solely as a courtesy. It remains the Client&apos;s responsibility to ensure the equipment is set up properly and is safe for use.</p>
            <p>The Rental Period and Client&apos;s payment obligation will be extended to the date when the Rented Equipment is returned if it is not returned on the scheduled date and time. The Company will make no cost reduction for unused time or unused Rented Equipment.</p>
            <p>Client agrees to notify the Company in advance if Client seeks an extension of the Rental Period. Any extension may be granted or refused at the Company&apos;s sole discretion.</p>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-white mb-3">Fees and Reservations</h3>
            <p>All fees are due at the time a reservation is made. Fees vary depending upon the length of rental and the types and quantities of Rented Equipment. Client understands and agrees that Client&apos;s credit card will be charged for the full rental amount and any applicable delivery charge as displayed at checkout at the time of reservation.</p>
            <p>Reservations may be made online or by phone and must be secured with a valid credit card. A Company contact email address must be provided at the time of reservation. All online reservations will be confirmed by the Company via email or telephone within forty-eight (48) hours.</p>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-white mb-3">Damaged or Lost Equipment</h3>
            <p>Client agrees to pay the replacement cost of any equipment that is not returned, is lost, or is damaged or soiled to the extent that the Company, in its sole discretion, determines the equipment should not be rented to other customers.</p>
            <p>Replacement fees for lost or damaged Rented Equipment shall be based on the MSRP listed on the manufacturer&apos;s website.</p>
            <p>Client is not liable for ordinary wear and tear resulting from proper and normal use of the Rented Equipment.</p>
            <p>Client agrees to inspect the Rented Equipment upon receipt and to notify the Company immediately if any item is unfit for use or in unsatisfactory condition. Failure to notify the Company shall constitute a waiver of all claims related thereto.</p>
            <p>Client assumes full responsibility for using the Rented Equipment in accordance with manufacturer instructions, which may be provided upon request. The Company is not responsible for misuse of the Rented Equipment or failure to follow instructions or recommendations.</p>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-white mb-3">Indemnification and Hold Harmless</h3>
            <p>Client shall indemnify, defend, and hold harmless the Company and its officers, directors, managers, agents, and employees from and against any and all claims, damages, losses, liabilities, judgments, settlements, penalties, fines, costs, or expenses, including reasonable attorneys&apos; fees, arising out of or relating to:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>the use of the Rented Equipment;</li>
              <li>any act or omission of Client; or</li>
              <li>Client&apos;s negligence, willful misconduct, or breach of this Agreement.</li>
            </ul>
            <p>Client shall not enter into any settlement without the Company&apos;s prior written consent.</p>
            <p>Client acknowledges that use of the Rented Equipment involves inherent risks and voluntarily assumes all known and unknown risks associated with such use.</p>
            <p>Client, on behalf of themselves and their heirs, personal representatives, and next of kin, hereby releases and agrees not to sue the Company, its officers, agents, or employees for any bodily injury, disability, death, or property damage arising from use of the Rented Equipment, whether caused by negligence or otherwise.</p>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-white mb-3">Limitation of Liability</h3>
            <p>In no event shall the Company be liable for any consequential, indirect, incidental, special, exemplary, punitive, or enhanced damages arising out of or relating to this Agreement or the Rented Equipment, regardless of foreseeability or legal theory.</p>
            <p>The Company&apos;s aggregate liability under this Agreement shall not exceed three (3) times the total amount paid by Client to the Company.</p>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-white mb-3">Cancellations</h3>
            <p>Cancellations made at least four (4) days prior to the start of the Rental Period will receive a refund of all amounts paid, less a non-recoverable processing fee of approximately 3%.</p>
            <p>Cancellations made fewer than four (4) days but more than forty-eight (48) hours prior to the start of the Rental Period will receive a fifty percent (50%) refund.</p>
            <p>No refunds will be issued for cancellations made less than forty-eight (48) hours prior to the start of the Rental Period.</p>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-white mb-3">Miscellaneous</h3>
            <p>Client may not assign or transfer this Agreement without the Company&apos;s prior written consent.</p>
            <p>This Agreement shall be governed by the laws of the State of Florida. Any action to enforce this Agreement shall be brought exclusively in the appropriate state or federal court with jurisdiction in Florida.</p>
            <p>If any provision of this Agreement is held unenforceable, the remaining provisions shall remain in full force and effect.</p>
            <p>This Agreement benefits only the parties hereto and their permitted successors and assigns.</p>
            <p>The indemnification, hold harmless, and limitation of liability provisions shall survive the Rental Period.</p>
            <p>The prevailing party in any action to enforce this Agreement shall be entitled to recover reasonable attorneys&apos; fees and costs.</p>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-white mb-3">Waiver of Jury Trial</h3>
            <p>Each party knowingly and voluntarily waives any right to a trial by jury in any action arising out of or relating to this Agreement or the Rented Equipment.</p>
          </section>

          <section className="bg-white/5 border border-white/10 rounded-xl p-6 mt-8">
            <h3 className="text-lg font-semibold text-white mb-3">Attestation</h3>
            <p>I have read this Agreement and Release in its entirety and voluntarily agree to its terms. I acknowledge that my electronic or digital acceptance has the same legal effect as a handwritten signature.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
