# Login Form App

A modern, accessible login form built with React, TypeScript, and Vite. Features a creative scroll-triggered modal design with comprehensive accessibility support and progressive enhancement.

## ✨ Features

### 🎨 **User Experience**

- **Multiple Access Methods**: Header button, scroll trigger, and bottom button
- **Progressive Enhancement**: Works with and without JavaScript
- **Delightful Animations**: Success checkmark animation with smooth transitions
- **Professional Design**: Glassmorphism header and premium visual polish
- **Responsive Layout**: Mobile-friendly with appropriate breakpoints

### ♿ **Accessibility (WCAG 2.1 AA Compliant)**

- **Keyboard Navigation**: Full keyboard accessibility with focus trap
- **Screen Reader Support**: Proper ARIA labels, live regions, and semantic HTML
- **Focus Management**: Auto-focus, focus restoration, and visible focus indicators
- **Motion Sensitivity**: Respects `prefers-reduced-motion` user preferences
- **Form Accessibility**: Autocomplete attributes, error linking, and validation states

### 🛠 **Technical Excellence**

- **TypeScript**: Full type safety with proper interfaces
- **CSS Custom Properties**: Organized design tokens for easy theming
- **Named Constants**: No magic numbers, self-documenting code
- **Clean Architecture**: No inline styles, proper separation of concerns
- **Mock API**: Realistic form validation and network simulation

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd login-form
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## 🎯 Usage

### Login Methods

1. **Header Button**: Click the "Login" button in the top-right corner
2. **Scroll Trigger**: Scroll down to automatically trigger the modal
3. **Bottom Button**: Click the "Click here to login" button

### Test Credentials

The form includes mock validation:

- **Email**: Any valid email format (must contain @)
- **Password**: Minimum 6 characters
- **Success**: Any valid credentials will show success animation

### No-JavaScript Fallback

Users without JavaScript will see a functional HTML form with server-side submission capability.

## 🏗 Project Structure

```text
src/
├── App.tsx                 # Main app component
├── LoginForm.tsx           # Login form with modal logic
├── LoginForm.css           # Comprehensive styling with CSS custom properties
├── index.css              # Global styles and resets
└── main.tsx               # App entry point
```

## 🎨 Design System

### CSS Custom Properties

The app uses a comprehensive design token system:

```css
:root {
  /* Color Palette */
  --color-primary: #8c7569;
  --color-success: #27ae60;
  --color-error: #e74c3c;

  /* Animation Timing */
  --timing-fast: 0.3s;
  --timing-medium: 0.6s;
  --timing-success-animation: 0.6s;

  /* Network Delays */
  --delay-network-simulation: 1500ms;
  --delay-success-display: 3500ms;
}
```

### Typography

- **Font Family**: Nunito (Google Fonts)
- **Weights**: 400 (regular), 600 (semi-bold), 700 (bold)

## 🚀 Deployment

This project is configured for automatic deployment to GitHub Pages using GitHub Actions.

### Automatic Deployment

The app automatically deploys to GitHub Pages when you:

1. Push changes to the `main` branch
2. Manually trigger the workflow from the Actions tab

### Setup Instructions

1. **Enable GitHub Pages**:
   - Go to your repository Settings → Pages
   - Under "Source", select "GitHub Actions"
   - The workflow will handle the rest automatically

2. **Access Your Deployed App**:
   - Your app will be available at: `https://yourusername.github.io/login-form/`
   - Replace `yourusername` with your GitHub username

### Manual Deployment

If you prefer manual deployment, you can also run:

```bash
npm run build
```

Then upload the `dist/` folder contents to your hosting provider.

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Quality Features

- **TypeScript**: Full type safety
- **ESLint**: Code linting and formatting
- **CSS Custom Properties**: Organized design tokens
- **Named Constants**: No magic numbers
- **Semantic HTML**: Proper accessibility structure

## 📱 Browser Support

- **Modern Browsers**: Chrome, Firefox, Safari, Edge (latest versions)
- **Progressive Enhancement**: Graceful degradation for older browsers
- **Mobile**: Responsive design for all screen sizes

## ♿ Accessibility Features

### Keyboard Navigation

- `Tab` / `Shift+Tab`: Navigate between elements
- `Enter` / `Space`: Activate buttons
- `Escape`: Close modal

### Screen Reader Support

- Proper heading structure
- Form labels and descriptions
- Live regions for dynamic content
- Modal semantics with ARIA attributes

### Focus Management

- Auto-focus on modal open
- Focus trap within modal
- Focus restoration on modal close
- Visible focus indicators

## 🎭 Animation Details

### Success Animation

- **Duration**: 0.6s ease-in-out
- **Elements**: Animated checkmark with circle drawing
- **Accessibility**: Respects `prefers-reduced-motion`

### Modal Transitions

- **Open**: Scale and fade in with staggered content
- **Close**: Smooth fade out with focus restoration

## 🔒 Security Considerations

- **Form Validation**: Both client-side and server-side validation
- **XSS Prevention**: Proper input sanitization
- **CSRF Protection**: Ready for CSRF token implementation
- **Autocomplete**: Secure autocomplete attributes

## 📊 Performance

- **Bundle Size**: Optimized with Vite
- **CSS**: Efficient custom properties and minimal specificity
- **JavaScript**: Lazy loading and efficient event handling
- **Images**: Optimized external image loading

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Design Inspiration**: Modern login form patterns
- **Accessibility Guidelines**: WCAG 2.1 AA standards
- **Animation Inspiration**: Micro-interactions and delightful UX
- **Icons**: Custom SVG icons for optimal performance

---

Built with ❤️ using React, TypeScript, and modern web standards.
