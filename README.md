# DevFlow

# Livia - Homepage + Login + Contact Pages

---

### 🔹 Root Directory

| File/Folder        | Description |
|--------------------|-------------|
| `index.html`       | Main homepage of the site. It includes navigation, hero section, services, testimonials, and CTA. Styled using `root.css`, `dark.css`, `local.css`, and `critical.css`. |
| `dashboard.html`   | A static HTML file showcasing the project dashboard layout. |
| `effort.html`, `effort.css`, `effort.js` | Pages and scripts for tracking and visualizing effort spent on various tasks. |
| `input.html`, `input.css`, `input.js` | UI for inputting project/task-related data. |
| `navigation.html`  | Possibly an isolated test or snippet for navigation bar development. |
| `script.js`        | General JavaScript used site-wide (if any). |
| `Structure.html`   | Likely a wireframe, template, or reference structure for layout planning. |
| `README.md`        | Markdown documentation file (you can paste this description here!). |

---

### 📁 `assets/`

Assets used across the site including fonts, core images, and JavaScript.

- **fonts/**: Custom web fonts (Roboto) used throughout the site.
- **images/**: Raw images like logos, dashboards, and UI assets.
- **js/**: Contains `dark.js` (for dark mode toggling) and `nav.js` (for mobile nav behavior).

---

### 📁 `contact/`

| File               | Description |
|--------------------|-------------|
| `index.html`       | The contact page with a contact form and address info. Uses `contact.css` for styling. |

---

### 📁 `css/`

All custom CSS styles for different parts of the site.

| File               | Description |
|--------------------|-------------|
| `contact.css`      | Styles specific to the contact page. |
| `critical.css`     | Critical styles loaded early to improve performance. |
| `dark.css`         | Styles for dark mode functionality. |
| `local.css`        | Main styles used on the homepage (e.g. layout, typography). |
| `projects.css`     | Possibly styles for a projects section or dashboard. |
| `reviews.css`      | Styling for the testimonial/review section. |
| `root.css`         | Base styling variables and root-level styles (colors, font sizes, etc). |
| `signin.css`       | Styles for the login/register page in `signin/index.html`. |

---

### 📁 `images/`

Optimized image versions in different resolutions (e.g. `200w`, `400w`, `850w`, `1920w`) for responsive loading using `<picture>` tags. Used across homepage and other pages for performance and SEO.

---

### 📁 `signin/`

| File               | Description |
|--------------------|-------------|
| `index.html`       | Sign in / register page with animated panel switching. Uses `signin.css` for styling and connects to logic for dummy login validation. |
"""

readme_path = Path("README.md")
readme_path.write_text(readme_content.strip())

"README.md file created successfully."
