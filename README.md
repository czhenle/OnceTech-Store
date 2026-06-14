# OnceTech Store 🖥️

A responsive e-commerce web application for tech peripherals and accessories, built with vanilla HTML, CSS, and JavaScript.

---

## 📋 Table of Contents

- [About](#about)
- [Features](#features)
- [Pages](#pages)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [License](#license)

---

## About

OnceTech Store is a static front-end e-commerce platform that allows users to browse and purchase tech peripherals including monitors, keyboards, mice, headsets, and audio equipment. The application includes user authentication flows, a shopping cart, checkout process, and a promotions system — all handled client-side using browser local storage.

---

## Features

- 🛍️ **Product Catalogue** — Dedicated pages for monitors, keyboards, mice, headsets, and audio products
- 🛒 **Shopping Cart** — Add, remove, and update quantities with persistent cart state via local storage
- 💳 **Checkout Flow** — Multi-step checkout process with order summary
- 🔐 **User Authentication** — Login and registration pages with client-side session handling
- 👤 **Account Management** — User account page for managing profile details
- 🏷️ **Promotions** — Dynamic promotions page with discount display logic
- 📱 **Responsive Design** — Layout adapts across desktop and mobile screen sizes

---

## Pages

| Page | File | Description |
|------|------|-------------|
| Home | `index.html` | Landing page with featured products |
| About | `about.html` | Store information and background |
| Monitor | `monitor.html` | Monitor product listings |
| Keyboard | `keyboard.html` | Keyboard product listings |
| Mice | `mice.html` | Mouse product listings |
| Headset | `headset.html` | Headset product listings |
| Audio | `audio.html` | Audio equipment listings |
| Cart | `cart.html` | Shopping cart with item management |
| Checkout | `checkout.html` | Order checkout and payment details |
| Promotions | `promotions.html` | Active deals and discounts |
| Login | `login.html` | User login page |
| Register | `register.html` | New user registration |
| Account | `account.html` | User account dashboard |

---

## Project Structure

```
OnceTech-Store/
├── images/               # Product and UI images
├── index.html            # Home page
├── about.html            # About page
├── account.html          # Account dashboard
├── audio.html            # Audio products
├── cart.html             # Shopping cart
├── cart.css              # Cart-specific styles
├── cart.js               # Cart logic (add/remove/update)
├── checkout.html         # Checkout page
├── headset.html          # Headset products
├── keyboard.html         # Keyboard products
├── login.html            # Login page
├── mice.html             # Mice products
├── monitor.html          # Monitor products
├── promotions.html       # Promotions page
├── promotions.css        # Promotions-specific styles
├── promotions.js         # Promotions logic
├── register.html         # Registration page
├── storage.js            # Local storage utilities
└── style.css             # Global styles
```

---

## Getting Started

No build tools or dependencies required. The project runs entirely in the browser.

### Prerequisites

- Any modern web browser (Chrome, Firefox, Edge, Safari)

### Running Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/czhenle/OnceTech-Store.git
   ```

2. Navigate to the project folder:
   ```bash
   cd OnceTech-Store
   ```

3. Open `index.html` in your browser:
   ```bash
   # Option 1: Open directly
   open index.html

   # Option 2: Use a local server (recommended)
   npx serve .
   ```

> Using a local server (e.g. `npx serve` or VS Code Live Server) is recommended to avoid browser restrictions on local file access.

---

## Usage

1. Browse product categories from the navigation bar
2. Click on a product to view details and add it to your cart
3. View and manage your cart via the Cart page
4. Proceed to Checkout to complete your order
5. Register or log in to manage your account
6. Check the Promotions page for active deals

---

## Technologies Used

| Technology | Purpose |
|------------|---------|
| HTML5 | Page structure and content |
| CSS3 | Styling and responsive layout |
| JavaScript (ES6) | Cart logic, promotions, and local storage |
| Browser Local Storage | Client-side cart and session persistence |

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
