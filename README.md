# DevFlow

**Email:** `test@devflow.com`  
**Password:** `password123`


---

### 🔹 Root Directory

| File/Folder        | Description |
|--------------------|-------------|
| `index.html`       | Main homepage of the site. It includes navigation, hero section, services, testimonials, and CTA. Styled using `root.css`, `dark.css`, `local.css`, and `critical.css`. |

---

### 📁 `assets/`

Assets used across the site including fonts, core images, and JavaScript.

- **fonts/**: Custom web fonts (Roboto) used throughout the site.
- **images/**: Raw images like logos, dashboards, and UI assets.
- **js/**: Contains `dark.js` (for dark mode toggling, but now we only have dark mode) and `nav.js` (for mobile nav behavior).

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
| `dark.css`         | Styles for dark mode functionality. Used to have a light mode.|
| `local.css`        | Main styles used on the homepage (e.g. layout, typography). |
| `reviews.css`      | Styling for the testimonial/review section. |
| `root.css`         | Base styling variables and root-level styles (colors, font sizes, etc). |
| `signin.css`       | Styles for the login/register page in `signin/index.html`. |

---

### 📁 `images/`

Optimized image versions in different resolutions (e.g. `200w`, `400w`, `850w`, `1920w`) for responsive loading using `<picture>` tags. Used across homepage and other pages for performance and SEO.

---

### 📁 `signin/`


**Email:** `test@devflow.com`  
**Password:** `password123`



| File               | Description |
|--------------------|-------------|
| `index.html`       | Sign in / register page with animated panel switching. Uses `signin.css` for styling and connects to logic for dummy login validation. |

---

### 📁 `requirements/`

Page for tracking and managing project requirements, allowing users to add, remove, and set priorities for functional and non-functional requirements.

| File               | Description |
|--------------------|-------------|
| `requirements.css` | Styles for the requirements tracking page, including priority indicators. |
| `requirements.html`| Structure for the requirements page with tables for functional and non-functional requirements. |
| `requirements.js`  | Logic for adding, removing, and updating requirements and applying priority styles.|

---



## Kyaa Goggins - Dashboard + Navigation

---

### 📁 `dashboard/`

| File               | Description |
|--------------------|-------------|
| `dashboard.html`       | Dashboard HTML View Site - Features references to css, libraries, and the general view of the dashboard and the containers. |
| `dashboard.css`       | Dashboard Styling - includes specific styling for all classes used in the dashboard page. |
| `dashboard.js`       | Dashboard Logic - Includes all functionality and logic for the dashboard page and any handling needed. |

### 📁 `navigation/`
| File               | Description |
|--------------------|-------------|
| `navigation.html`       | Navigation Sidebar HTML - Features the entire sidebar component. All functionality was handled on each individual js page for each portion of the app. |
