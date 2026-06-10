import type { BlogContentBlock } from "../blogs";

export const acneReturningContent: BlogContentBlock[] = [
  {
    type: "heading",
    text: "Why Acne Keeps Returning",
  },
  {
    type: "paragraph",
    text: "Recurring acne is often linked to heat, sweat, product buildup, clogged pores, hormonal changes, and inconsistent skincare.",
  },
  {
    type: "paragraph",
    text: "In humid climates, the skin may produce more oil, making it easier for pores to become congested.",
  },
  {
    type: "heading",
    text: "Common Skincare Mistakes",
  },
  {
    type: "list",
    items: [
      "Skipping sunscreen because the skin feels oily",
      "Over-cleansing the face",
      "Using heavy creams in hot weather",
      "Not removing makeup properly",
      "Touching the face frequently",
    ],
  },
  {
    type: "image",
    src: "/images/blogs/blog-3.jpg",
    alt: "Acne skincare treatment",
  },
];