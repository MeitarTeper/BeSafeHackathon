import React from 'react';
import { Link } from 'react-router-dom';


const Terms = () => {
  return (
    <div>
      <h1>Website Terms and Conditions</h1>
      <p><strong>Last Updated: [Insert Date]</strong></p>

      <section>
        <h2>1. Acceptance of Terms</h2>
        <p>
          By using the Website, you confirm that you are at least 8 years old or have the permission of a parent or guardian to use the Website. If you are under 8, please do not use this Website.
        </p>
      </section>

      <section>
        <h2>2. Purpose of the Website</h2>
        <p>
          The Website is designed to educate children and parents about internet safety. All content is provided for informational and educational purposes only.
        </p>
      </section>

      <section>
        <h2>3. User Responsibilities</h2>
        <p>When using the Website, you agree to:</p>
        <ul>
          <li>Use the Website only for lawful purposes.</li>
          <li>Respect the intellectual property rights of the Website and its content.</li>
          <li>Not share any personal information (e.g., passwords, addresses) through any interactive features on the Website.</li>
          <li>Notify us immediately if you encounter inappropriate content or behavior.</li>
        </ul>
      </section>

      <section>
        <h2>4. Prohibited Activities</h2>
        <p>You agree not to:</p>
        <ul>
          <li>Use the Website for any illegal or unauthorized purposes.</li>
          <li>Interfere with the Website’s functionality, including hacking, introducing viruses, or disrupting the service.</li>
          <li>Collect or attempt to collect personal information from other users.</li>
          <li>Post or share content that is harmful, offensive, or violates any law.</li>
        </ul>
      </section>

      <section>
        <h2>5. Intellectual Property</h2>
        <p>
          All content, materials, and features on the Website, including text, graphics, logos, and software, are the intellectual property of [SafeNet] or its licensors. You may not copy, reproduce, distribute, or use any content without prior written consent.
        </p>
      </section>

      <section>
        <h2>6. User-Generated Content</h2>
        <p>If the Website allows user-generated content, such as comments or submissions:</p>
        <ul>
          <li>You retain ownership of your content but grant us a non-exclusive, royalty-free license to use, modify, and display your content on the Website.</li>
          <li>You are solely responsible for the content you submit and ensure it complies with these Terms.</li>
        </ul>
      </section>

      <section>
        <h2>7. Privacy</h2>
        <p>
          Your privacy is important to us. Please review our <a href="/privacy-policy">Privacy Policy</a> for details on how we collect, use, and protect your information.
        </p>
      </section>

      <section>
        <h2>8. Third-Party Links</h2>
        <p>
          The Website may include links to third-party websites. These links are provided for convenience and do not signify endorsement. We are not responsible for the content or practices of these third-party sites.
        </p>
      </section>

      <section>
        <h2>9. Disclaimers</h2>
        <p>
          - The Website and its content are provided "as is" without warranties of any kind, express or implied.<br />
          - We do not guarantee the accuracy, completeness, or reliability of the information provided.<br />
          - Use the Website at your own risk.
        </p>
      </section>

      <section>
        <h2>10. Limitation of Liability</h2>
        <p>
          To the fullest extent permitted by law, [Website Name] and its affiliates shall not be liable for any damages arising from your use of the Website.
        </p>
      </section>

      <section>
        <h2>11. Changes to Terms</h2>
        <p>
          We reserve the right to modify these Terms at any time. Changes will be effective upon posting to the Website. Continued use of the Website signifies your acceptance of updated Terms.
        </p>
      </section>

      <section>
        <h2>12. Termination</h2>
        <p>
          We may terminate or suspend your access to the Website at our sole discretion, without notice, if you violate these Terms.
        </p>
      </section>

      <section>
        <h2>13. Governing Law</h2>
        <p>
          These Terms are governed by the laws of [Your Jurisdiction]. Any disputes shall be resolved exclusively in the courts of [Your Jurisdiction].
        </p>
      </section>

      <section>
        <h2>14. Contact Us</h2>
        <p>
          If you have any questions about these Terms, please contact us at:
        </p>
        <address>
          [Website Name] <br />
          [Contact Email Address] <br />
          [Contact Phone Number (Optional)]
        </address>
      </section>

      <p>
        By using the Website, you acknowledge that you have read, understood, and agree to these Terms and Conditions.
      </p>
    </div>
  );
};

export default Terms;
