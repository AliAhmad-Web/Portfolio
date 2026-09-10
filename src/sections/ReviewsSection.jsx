/**
 * ReviewsSection — Homepage wrapper for customer reviews after the Team banner.
 * Purpose: Keep CustomerReviews visuals intact while placing it below #team.
 * Used by: HomePage.
 */

import CustomerReviews from '../components/contact/CustomerReviews';

export default function ReviewsSection({ showToast }) {
  return (
    <section className="contact-screen contact-screen--reviews px-4 sm:px-6 lg:px-8" aria-label="Customer reviews">
      <div className="contact-fx" aria-hidden="true">
        <div className="contact-ambient" />
      </div>
      <div className="relative z-10 mx-auto max-w-7xl">
        <CustomerReviews showToast={showToast} />
      </div>
    </section>
  );
}
