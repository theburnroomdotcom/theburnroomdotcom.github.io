# The Burn Room Website

A sophisticated, story-driven website for **The Burn Room** — a chef-curated private dining experience by Keshav Menon in Kochi.

## 🌐 Live Site

Once deployed, the site will be available at: `https://theburnroomdotcom.github.io`

## 📁 Project Structure

```
theburnroomdotcom.github.io/
├── index.html          # Homepage
├── menu.html           # Seasonal menus & archive
├── experience.html     # Photo & video gallery
├── contact.html        # Reservations & FAQs
├── css/
│   └── styles.css      # Complete design system
├── js/
│   └── main.js         # Interactivity & animations
└── assets/
    ├── images/         # Photos (add your own)
    └── videos/         # Videos (add your own)
```

## 🚀 Getting Started

### Deploy to GitHub Pages

1. Push this repository to GitHub
2. Go to **Settings** → **Pages**
3. Under "Source", select **Deploy from a branch**
4. Select the **main** branch and **/ (root)** folder
5. Click **Save** and wait for deployment

### Local Development

Simply open `index.html` in your browser, or use a local server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve .
```

## 🖼️ Adding Your Media

### Images

Replace the placeholder content with your actual images:

1. Add images to `assets/images/`
2. Update the `<img>` tags in HTML files with your image paths

### Videos

For the hero background video:

1. Add your video to `assets/videos/hero-bg.mp4`
2. The video should be short (15-30 sec) and loop seamlessly

See the README files in each assets folder for detailed guidelines.

## ✏️ Customization

### Updating Content

- **Upcoming events**: Edit the event cards in `index.html` (search for "Upcoming Events")
- **Menu items**: Update courses in `menu.html`
- **Testimonials**: Add/edit testimonials in `index.html`
- **Contact info**: Update phone/Instagram in multiple pages

### Styling

All styles are in `css/styles.css`. Key CSS variables:

```css
--accent-gold: #c5a572;      /* Primary accent color */
--bg-primary: #0d1510;       /* Main background */
--bg-secondary: #1a2820;     /* Section backgrounds */
```

## 📱 Features

- ✅ Fully responsive (mobile, tablet, desktop)
- ✅ Video hero background with fallback image
- ✅ Smooth scroll animations
- ✅ Testimonial carousel
- ✅ Mobile navigation menu
- ✅ SEO-optimized meta tags
- ✅ GitHub Pages compatible (static HTML/CSS/JS)

## 📞 Contact

- **Instagram**: [@the_burnroom_](https://instagram.com/the_burnroom_)
- **Phone**: +91 88487 95728
- **Location**: Rock Paper Scissors Aesthetics, Panampily Nagar Extension, Kochi
