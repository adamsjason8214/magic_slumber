import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Magical Slumber Orlando",
  description: "How Magical Slumber Orlando collects, uses, and protects information submitted when you book a SlumberPod or other rental.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-black pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl font-bold mb-8">
          <span className="gradient-text">Privacy Policy</span>
        </h1>

        <div className="prose prose-invert prose-blue max-w-none space-y-8 text-gray-300">
          <p>This Privacy Policy describes how your personal information is collected, used, and shared when you visit our website or make a purchase from the site (the &quot;Site&quot;). Magical Slumber LLC (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) is committed to protecting your privacy.</p>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">DESCRIPTION OF THE INFORMATION WE COLLECT</h2>
            <p>When you visit the Site, we automatically collect certain information about your device, including information about your web browser, IP address, time zone, and cookies installed on your device. Additionally, as you browse the Site, we collect information about the individual web pages or products you view, the websites or search terms that referred you to the Site, and information about how you interact with the Site. We refer to this automatically collected information as &quot;Device Information.&quot;</p>

            <p className="mt-4">We collect Device Information using the following technologies:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li><strong>Cookies</strong> are data files placed on your device or computer that often include an anonymous unique identifier. You can learn more about cookies and how to disable them at <a href="http://www.allaboutcookies.org" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">http://www.allaboutcookies.org</a>.</li>
              <li><strong>Log files</strong> track actions occurring on the Site and collect data including your IP address, browser type, Internet service provider (ISP), referring/exit pages, and date/time stamps.</li>
              <li><strong>Web beacons, tags, and pixels</strong> are electronic files used to record information about how you browse the Site.</li>
            </ul>

            <p className="mt-4">When you make a purchase or attempt to make a purchase through the Site, we collect certain information from you, including your name, billing address, shipping address, payment information (such as credit card numbers), email address, and phone number. We refer to this information as &quot;Order Information.&quot;</p>
            <p>&quot;Personal Information&quot; in this Privacy Policy refers to both Device Information and Order Information.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">HOW WE USE YOUR PERSONAL INFORMATION</h2>
            <p>We use Order Information to fulfill any orders placed through the Site (including processing payment information, arranging delivery, and providing invoices and/or confirmations). Additionally, we use Order Information to:</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>Communicate with you;</li>
              <li>Screen orders for potential risk or fraud; and</li>
              <li>Provide you with information or advertising relating to our products or services, in line with your preferences.</li>
            </ul>
            <p className="mt-4">We use Device Information to help screen for potential risk and fraud (in particular, your IP address) and to improve and optimize our Site by generating analytics about how our customers browse and interact with the Site and to assess the effectiveness of our marketing and advertising efforts.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">SHARING YOUR PERSONAL INFORMATION</h2>
            <p>We share your Personal Information with third parties to help us use your Personal Information as described above. For example, we use Stripe to process payments—you can read more about how Stripe uses your Personal Information here: <a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">https://stripe.com/privacy</a></p>
            <p className="mt-4">We also use Google Analytics to help us understand how our customers use the Site—you can read more about how Google uses your Personal Information here: <a href="https://www.google.com/intl/en/policies/privacy/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">https://www.google.com/intl/en/policies/privacy/</a></p>
            <p className="mt-2">You can opt out of Google Analytics here: <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">https://tools.google.com/dlpage/gaoptout</a></p>
            <p className="mt-4">We may also share your Personal Information to comply with applicable laws and regulations, respond to a subpoena, search warrant, or other lawful request for information we receive, or otherwise protect our rights.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">ADVERTISING</h2>
            <p>Magical Slumber LLC uses your Personal Information to provide you with targeted advertisements or marketing communications we believe may be of interest to you.</p>
            <p className="mt-4">For more information about targeted advertising, you can visit the Network Advertising Initiative&apos;s educational page at: <a href="http://www.networkadvertising.org/understanding-online-advertising/how-does-it-work" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">http://www.networkadvertising.org/understanding-online-advertising/how-does-it-work</a></p>
            <p className="mt-4">You can opt out of targeted advertising using the links below:</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>Facebook: <a href="https://www.facebook.com/settings/?tab=ads" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">https://www.facebook.com/settings/?tab=ads</a></li>
              <li>Google: <a href="https://www.google.com/settings/ads/anonymous" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">https://www.google.com/settings/ads/anonymous</a></li>
              <li>Bing: <a href="https://advertise.bingads.microsoft.com/en-us/resources/policies/personalized-ads" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">https://advertise.bingads.microsoft.com/en-us/resources/policies/personalized-ads</a></li>
            </ul>
            <p className="mt-4">You can also opt out of some services via the Digital Advertising Alliance&apos;s opt-out portal: <a href="http://optout.aboutads.info/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">http://optout.aboutads.info/</a></p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">DO NOT TRACK</h2>
            <p>Please note that we do not alter our Site&apos;s data collection and use practices when we see a Do Not Track signal from your browser.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">EUROPEAN RESIDENTS</h2>
            <p>If you are a resident of the European Economic Area (EEA), you have the right to access the Personal Information we hold about you and to request that your Personal Information be corrected, updated, or deleted. If you would like to exercise this right, please contact us using the contact information below.</p>
            <p className="mt-4">Additionally, please note that we process your information in order to fulfill contracts we might have with you or to pursue our legitimate business interests. Please also note that your information may be transferred outside of Europe, including to Canada and the United States.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">DATA RETENTION</h2>
            <p>When you place an order through the Site, we will maintain your Order Information for our records unless and until you ask us to delete this information, or it is lost or deleted due to server or storage malfunction.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">CHANGES</h2>
            <p>We may update this Privacy Policy from time to time to reflect changes to our practices or for other operational, legal, or regulatory reasons.</p>
          </section>

          <section className="bg-white/5 border border-white/10 rounded-xl p-6 mt-8">
            <h2 className="text-xl font-semibold text-white mb-4">CONTACT US</h2>
            <p>For more information about Magical Slumber LLC&apos;s privacy practices, if you have questions, or if you would like to make a complaint or suggestion, please contact us by email at:</p>
            <p className="mt-2"><a href="mailto:magicalslumberorlando@gmail.com" className="text-blue-400 hover:text-blue-300">magicalslumberorlando@gmail.com</a></p>
          </section>
        </div>
      </div>
    </div>
  );
}
