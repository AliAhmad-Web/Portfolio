/**
 * CustomerReviews — Contact testimonials matching the Live Reviews layout.
 * Purpose: Show the latest 4 reviews with slider controls and a submit bar.
 * Used by: ContactSection.
 */

import { useEffect, useMemo, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import {
  HiChevronLeft,
  HiChevronRight,
  HiOutlineChatBubbleLeftRight,
  HiOutlineCodeBracket,
  HiOutlineGlobeAlt,
  HiOutlineMapPin,
  HiOutlineSparkles,
  HiOutlineSquares2X2,
  HiOutlineStar,
  HiOutlineUser,
  HiPaperAirplane,
} from 'react-icons/hi2';
import SectionBadge from '../SectionBadge';
import { useRecaptcha } from '../../hooks/useRecaptcha';
import { useCustomerReviews } from '../../hooks/useCustomerReviews';
import { reviewAvatarSrc } from '../../data/clientAvatars';

const REVIEW_SERVICES = [
  { label: 'Web Development', tone: 'cyan', Icon: HiOutlineGlobeAlt },
  { label: 'UI/UX Design', tone: 'purple', Icon: HiOutlineSquares2X2 },
  { label: 'Full Stack Development', tone: 'green', Icon: HiOutlineCodeBracket },
  { label: 'AI Solutions', tone: 'gold', Icon: HiOutlineSparkles },
];

const initialForm = {
  name: '',
  location: '',
  rating: 5,
  comment: '',
  avatarUrl: '',
  service: REVIEW_SERVICES[0].label,
};

function avatarFor(review) {
  return reviewAvatarSrc(review);
}

function formatReviewDate(value) {
  const date = value ? new Date(value) : new Date();
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function serviceMeta(label) {
  return REVIEW_SERVICES.find((item) => item.label === label) || REVIEW_SERVICES[0];
}

function compressPhoto(file) {
  return new Promise((resolve, reject) => {
    if (!file || !file.type.startsWith('image/')) {
      reject(new Error('Please choose an image file.'));
      return;
    }
    if (file.size > 4 * 1024 * 1024) {
      reject(new Error('Please choose an image under 4 MB.'));
      return;
    }

    const image = new Image();
    const objectUrl = URL.createObjectURL(file);
    image.onload = () => {
      const canvas = document.createElement('canvas');
      const size = 96;
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d');
      const scale = Math.max(size / image.width, size / image.height);
      const width = image.width * scale;
      const height = image.height * scale;
      ctx.drawImage(image, (size - width) / 2, (size - height) / 2, width, height);
      URL.revokeObjectURL(objectUrl);
      resolve(canvas.toDataURL('image/jpeg', 0.72));
    };
    image.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error('Could not read that image.'));
    };
    image.src = objectUrl;
  });
}

function ReviewCard({ review, featured }) {
  const service = serviceMeta(review.service);
  const ServiceIcon = service.Icon;

  return (
    <article className={`contact-review-card is-${service.tone}${featured ? ' is-active' : ''}`}>
      <div className="contact-review-head">
        <img src={avatarFor(review)} alt="" className="contact-review-avatar" />
        <div className="contact-review-meta">
          <p className="contact-review-name">{review.name}</p>
          <p className="contact-review-location">
            <HiOutlineMapPin />
            <span>{review.location}</span>
          </p>
        </div>
        <time className="contact-review-date" dateTime={review.createdAt}>
          {formatReviewDate(review.createdAt)}
        </time>
      </div>
      <p className="contact-review-stars" aria-label={`${review.rating} out of 5 stars`}>
        {[1, 2, 3, 4, 5].map((value) => (
          <FaStar key={value} className={value <= review.rating ? 'is-on' : ''} />
        ))}
      </p>
      <p className="contact-review-text">{review.comment}</p>
      <span className={`contact-review-tag is-${service.tone}`}>
        <ServiceIcon />
        {service.label}
      </span>
    </article>
  );
}

export default function CustomerReviews({ showToast }) {
  const { reviews, submitReview } = useCustomerReviews();
  const { getToken } = useRecaptcha();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [paused, setPaused] = useState(false);

  const count = reviews.length;
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia('(max-width: 767px)').matches : false,
  );

  useEffect(() => {
    const media = window.matchMedia('(max-width: 767px)');
    const update = () => setIsMobile(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  const visibleCount = Math.min(isMobile ? 1 : 4, count);

  useEffect(() => {
    setPage(0);
  }, [reviews]);

  useEffect(() => {
    if (paused || count < 2) return undefined;
    const timer = window.setInterval(() => {
      setPage((current) => (current + 1) % count);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [paused, count]);

  const visibleReviews = useMemo(() => {
    if (!count) return [];
    return Array.from({ length: visibleCount }, (_, index) => reviews[(page + index) % count]);
  }, [reviews, page, count, visibleCount]);

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = 'Name is required.';
    if (!form.location.trim()) next.location = 'City / country is required.';
    if (!form.rating) next.rating = 'Please choose a rating.';
    if (!form.comment.trim() || form.comment.trim().length < 12) {
      next.comment = 'Review should be at least 12 characters.';
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handlePhoto = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      const avatarUrl = await compressPhoto(file);
      setForm((prev) => ({ ...prev, avatarUrl }));
      setErrors((prev) => ({ ...prev, avatarUrl: undefined }));
    } catch (error) {
      setErrors((prev) => ({ ...prev, avatarUrl: error.message }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      const recaptchaToken = await getToken('review');
      await submitReview({
        name: form.name.trim(),
        location: form.location.trim(),
        rating: form.rating,
        comment: form.comment.trim(),
        avatarUrl: form.avatarUrl,
        service: form.service,
        ...(recaptchaToken ? { recaptchaToken } : {}),
      });
      setForm(initialForm);
      setErrors({});
      setFormOpen(false);
      setPage(0);
      showToast?.('Thank you — your review is now live.', 'success');
    } catch (error) {
      showToast?.(error.message || 'Unable to submit review right now.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const goTo = (next) => {
    if (!count) return;
    setPage((next + count) % count);
  };

  return (
    <div className="contact-reviews">
      <div className="contact-reviews-intro">
        <SectionBadge icon={HiOutlineStar}>LIVE REVIEWS</SectionBadge>
        <h2>
          What <span className="contact-heading-accent">My Clients</span> Say
        </h2>
        <p className="contact-reviews-lead">
          Real feedback from real people. I&apos;m grateful for every review and always strive to
          deliver the best experience.
        </p>
        <span className="stats-divider" aria-hidden="true" />
      </div>

      {reviews.length ? (
        <>
          <div
            className="contact-reviews-slider"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <button
              type="button"
              className="contact-reviews-arrow"
              aria-label="Previous reviews"
              onClick={() => goTo(page - 1)}
            >
              <HiChevronLeft />
            </button>

            <div className="contact-reviews-grid" aria-label="Customer reviews">
              {visibleReviews.map((review, index) => (
                <ReviewCard key={`${review.id}-${index}`} review={review} featured={index === 0} />
              ))}
            </div>

            <button
              type="button"
              className="contact-reviews-arrow"
              aria-label="Next reviews"
              onClick={() => goTo(page + 1)}
            >
              <HiChevronRight />
            </button>
          </div>

          <div className="contact-reviews-dots" role="tablist" aria-label="Review slides">
            {reviews.map((review, index) => (
              <button
                key={review.id}
                type="button"
                className={index === page ? 'is-active' : ''}
                aria-label={`Show review ${index + 1}`}
                onClick={() => setPage(index)}
              />
            ))}
          </div>
        </>
      ) : (
        <p className="contact-reviews-empty">Be the first to leave a review.</p>
      )}

      <div className="contact-reviews-cta">
        <span className="contact-reviews-cta-icon" aria-hidden="true">
          <HiOutlineChatBubbleLeftRight />
          <FaStar />
        </span>
        <div className="contact-reviews-cta-copy">
          <h3>Have a Project in Mind?</h3>
          <p>Your feedback helps me grow and build better. Share your experience or leave a review!</p>
        </div>
        <button type="button" className="contact-submit" onClick={() => setFormOpen((open) => !open)}>
          <HiOutlineStar />
          Submit Review
          <HiChevronRight />
        </button>
      </div>

      {formOpen ? (
        <form className="contact-reviews-form" onSubmit={handleSubmit} noValidate>
          <div className="contact-fields-row">
            <label className="contact-field">
              <span className="contact-field-label is-purple">
                <HiOutlineUser />
                Name
              </span>
              <input
                type="text"
                name="review-name"
                value={form.name}
                onChange={(event) => setForm({ ...form, name: event.target.value })}
                placeholder="Your name"
                autoComplete="name"
                aria-invalid={Boolean(errors.name)}
              />
              {errors.name ? <p className="contact-error">{errors.name}</p> : null}
            </label>

            <label className="contact-field">
              <span className="contact-field-label is-purple">
                <HiOutlineMapPin />
                City / Country
              </span>
              <input
                type="text"
                name="review-location"
                value={form.location}
                onChange={(event) => setForm({ ...form, location: event.target.value })}
                placeholder="Lahore, Pakistan"
                autoComplete="address-level2"
                aria-invalid={Boolean(errors.location)}
              />
              {errors.location ? <p className="contact-error">{errors.location}</p> : null}
            </label>
          </div>

          <div className="contact-fields-row">
            <label className="contact-field">
              <span className="contact-field-label is-purple">
                <HiOutlineUser />
                Profile picture
              </span>
              <input type="file" accept="image/*" onChange={handlePhoto} />
              {form.avatarUrl ? (
                <span className="contact-review-photo-preview">
                  <img src={form.avatarUrl} alt="" />
                  Photo added
                </span>
              ) : null}
              {errors.avatarUrl ? <p className="contact-error">{errors.avatarUrl}</p> : null}
            </label>

            <label className="contact-field">
              <span className="contact-field-label is-purple">
                <HiOutlineSquares2X2 />
                Service
              </span>
              <select
                value={form.service}
                onChange={(event) => setForm({ ...form, service: event.target.value })}
              >
                {REVIEW_SERVICES.map((item) => (
                  <option key={item.label} value={item.label}>
                    {item.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="contact-field">
            <span className="contact-field-label is-purple">
              <HiOutlineStar />
              Rating
            </span>
            <div className="contact-review-rating" role="radiogroup" aria-label="Star rating">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  type="button"
                  className={value <= form.rating ? 'is-on' : ''}
                  aria-label={`${value} star${value === 1 ? '' : 's'}`}
                  aria-checked={value === form.rating}
                  role="radio"
                  onClick={() => setForm({ ...form, rating: value })}
                >
                  <FaStar />
                </button>
              ))}
            </div>
          </div>

          <label className="contact-field">
            <span className="contact-field-label is-purple">
              <HiOutlineChatBubbleLeftRight />
              Review
            </span>
            <textarea
              name="review-comment"
              rows="3"
              value={form.comment}
              onChange={(event) => setForm({ ...form, comment: event.target.value })}
              placeholder="Share your experience..."
              aria-invalid={Boolean(errors.comment)}
            />
            {errors.comment ? <p className="contact-error">{errors.comment}</p> : null}
          </label>

          <button type="submit" className="contact-submit" disabled={submitting}>
            <HiPaperAirplane />
            {submitting ? 'Sending...' : 'Submit Review'}
          </button>
        </form>
      ) : null}
    </div>
  );
}
