/* ========================================
   African Pride — Products
   To add a product: copy one block, change the details,
   put its photos in /images. Add soldOut:true on a colour to show SOLD OUT.
   ======================================== */
const IMG = 'images/';

const PRODUCTS = [
  {
    id: 'signature-tee', name: 'Heritage Signature Tee', type: 'Crew Neck', category: 'tee',
    price: 48, featured: true, hasWordmark: false,
    about: 'Heavyweight cotton crew neck with the cursive Ray signature on the chest and the mother-and-child print at the hem.',
    colors: [
      { key: 'black', label: 'Black',     hex: '#111111', image: IMG + 'tee-signature-black.webp' },
      { key: 'white', label: 'White',     hex: '#ffffff', image: IMG + 'tee-signature-white.webp' },
      { key: 'grey',  label: 'Grey',      hex: '#8b8b8b', image: IMG + 'tee-signature-grey.webp' },
      { key: 'navy',  label: 'Navy Blue', hex: '#1b2a4a', image: IMG + 'tee-signature-navy.webp' },
    ],
  },
  {
    id: 'collar-tee', name: 'Heritage Collar Tee', type: 'Crew Neck', category: 'tee',
    price: 48, featured: true, hasWordmark: true,
    about: 'Heavyweight cotton crew neck with the AFRICAN PRIDE collar wordmark and the mother-and-child print at the hem.',
    colors: [
      { key: 'navy',  label: 'Navy Blue', hex: '#1b2a4a', image: IMG + 'tee-collar-navy.webp' },
      { key: 'black', label: 'Black',     hex: '#111111', image: IMG + 'tee-collar-black.webp' },
      { key: 'white', label: 'White',     hex: '#ffffff', image: IMG + 'tee-collar-white.webp' },
    ],
  },
  {
    id: 'heritage-tank', name: 'Heritage Tank', type: 'Sleeveless', category: 'tank',
    price: 42, featured: true, hasWordmark: false,
    about: 'Sleeveless cut carrying the mother-and-child artwork on the front.',
    colors: [{ key: 'black', label: 'Black', hex: '#111111', image: IMG + 'tank-black.webp' }],
  },
];
