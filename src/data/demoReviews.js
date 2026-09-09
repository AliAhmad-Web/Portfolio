/**
 * Demo + seed reviews for the Contact testimonials strip.
 * Purpose: Keep 8 reviews on screen — 1 real/seed review plus demo fillers.
 * Used by: useCustomerReviews, reviews.service.js
 */

export const MAX_REVIEWS = 8;

export const EXISTING_REVIEW = {
  id: 'existing-ali-khan',
  name: 'Ali Khan',
  location: 'Lahore, Pakistan',
  rating: 5,
  comment:
    "Ali built an AI-powered project for my business, and I'm really impressed with the results. The system is smart, fast, and exactly what I needed. Highly recommended!",
  avatarUrl: '/reviews/existing.jpg',
  service: 'AI Solutions',
  createdAt: '2026-09-09T11:01:25.716Z',
};

export const DEMO_REVIEWS = [
  {
    id: 'demo-fatima-noor',
    name: 'Fatima Noor',
    location: 'Lahore, Pakistan',
    rating: 5,
    comment:
      'Clean, fast website and a smooth handoff. Communication stayed professional from kickoff through launch.',
    avatarUrl: '/reviews/demo-1.jpg',
    service: 'Web Development',
    createdAt: '2026-08-18T09:20:00.000Z',
  },
  {
    id: 'demo-james-walker',
    name: 'James Walker',
    location: 'London, United Kingdom',
    rating: 5,
    comment:
      'The AI workflow he designed now handles tasks we used to do by hand. Clear thinking and solid engineering.',
    avatarUrl: '/reviews/demo-2.jpg',
    service: 'AI Solutions',
    createdAt: '2026-07-22T14:05:00.000Z',
  },
  {
    id: 'demo-amina-siddiqui',
    name: 'Amina Siddiqui',
    location: 'Karachi, Pakistan',
    rating: 5,
    comment:
      'Full stack delivery was reliable — frontend, API, and dashboard all felt like one product.',
    avatarUrl: '/reviews/demo-3.jpg',
    service: 'Full Stack Development',
    createdAt: '2026-06-14T11:40:00.000Z',
  },
  {
    id: 'demo-noah-patel',
    name: 'Noah Patel',
    location: 'Toronto, Canada',
    rating: 4,
    comment:
      'Automation around our lead intake saved the team hours each week. Straightforward to maintain as well.',
    avatarUrl: '/reviews/demo-4.jpg',
    service: 'AI Solutions',
    createdAt: '2026-05-09T16:15:00.000Z',
  },
  {
    id: 'demo-zainab-khan',
    name: 'Zainab Khan',
    location: 'Islamabad, Pakistan',
    rating: 5,
    comment:
      'Modern web app, careful attention to detail, and a result our clients noticed immediately.',
    avatarUrl: '/reviews/demo-5.jpg',
    service: 'Web Development',
    createdAt: '2026-04-02T08:50:00.000Z',
  },
  {
    id: 'demo-sofia-rossi',
    name: 'Sofia Rossi',
    location: 'Milan, Italy',
    rating: 5,
    comment:
      'The interface is polished and easy to use. He translated a dense brief into a clear digital product.',
    avatarUrl: '/reviews/demo-6.jpg',
    service: 'UI/UX Design',
    createdAt: '2026-02-19T13:30:00.000Z',
  },
  {
    id: 'demo-omar-farooq',
    name: 'Omar Farooq',
    location: 'Dubai, UAE',
    rating: 5,
    comment:
      'Strong digital solution for operations — integrations, admin tools, and a stable launch on schedule.',
    avatarUrl: '/reviews/demo-7.jpg',
    service: 'Full Stack Development',
    createdAt: '2026-01-11T10:10:00.000Z',
  },
];

const DEMO_ID_SET = new Set(DEMO_REVIEWS.map((review) => review.id));

function reviewKey(review) {
  return `${String(review?.name || '')
    .trim()
    .toLowerCase()}|${String(review?.location || '')
    .trim()
    .toLowerCase()}`;
}

const EXISTING_KEY = reviewKey(EXISTING_REVIEW);

export function isDemoReviewId(id) {
  return DEMO_ID_SET.has(String(id || ''));
}

export function mergeReviews(list = []) {
  const stored = [];
  const seen = new Set();

  for (const review of Array.isArray(list) ? list : []) {
    if (!review || isDemoReviewId(review.id)) continue;
    const key = review.id || reviewKey(review);
    if (seen.has(key) || seen.has(reviewKey(review))) continue;
    seen.add(key);
    seen.add(reviewKey(review));
    stored.push(review);
    if (stored.length >= MAX_REVIEWS) break;
  }

  const hasExisting =
    stored.some((review) => review.id === EXISTING_REVIEW.id || reviewKey(review) === EXISTING_KEY);

  const merged = hasExisting || stored.length >= MAX_REVIEWS ? [...stored] : [...stored, EXISTING_REVIEW];

  for (const demo of DEMO_REVIEWS) {
    if (merged.length >= MAX_REVIEWS) break;
    merged.push(demo);
  }

  return merged.slice(0, MAX_REVIEWS);
}
