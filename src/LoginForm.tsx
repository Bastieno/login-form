import { useState, useEffect, useRef } from 'react';
import './LoginForm.css';

interface LoginData {
  email: string;
  password: string;
}

interface LoginResponse {
  success: boolean;
  message: string;
  token?: string;
}

// Constants for timing values (matching CSS custom properties)
const TIMING_CONSTANTS = {
  NETWORK_SIMULATION_DELAY: 1500,
  SUCCESS_DISPLAY_DURATION: 3500,
  FOCUS_DELAY: 100,
} as const;

const LoginForm = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [showScrollDown, setShowScrollDown] = useState<boolean>(true);
  const [formData, setFormData] = useState<LoginData>({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [showSuccessAnimation, setShowSuccessAnimation] = useState<boolean>(false);
  const [jsEnabled, setJsEnabled] = useState<boolean>(false);

  // Refs for accessibility
  const modalRef = useRef<HTMLDivElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const errorMessageId = 'login-error-message';
  const successMessageId = 'login-success-message';

  const openModal = (): void => {
    // Store current focus for restoration
    previousFocusRef.current = document.activeElement as HTMLElement;
    setIsOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = (): void => {
    setIsOpen(false);
    document.body.style.overflow = "initial";
    // Reset form state when closing modal
    setFormData({ email: '', password: '' });
    setError('');
    setSuccess('');
    
    // Restore focus to previous element
    if (previousFocusRef.current) {
      previousFocusRef.current.focus();
    }
  };

  // Mock fetch function to simulate server communication
  const mockFetch = async (_url: string, options: RequestInit): Promise<Response> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const body = JSON.parse(options.body as string);
        
        // Mock validation logic
        if (!body.email || !body.password) {
          resolve(new Response(JSON.stringify({
            success: false,
            message: 'Email and password are required'
          }), { status: 400 }));
          return;
        }

        if (!body.email.includes('@')) {
          resolve(new Response(JSON.stringify({
            success: false,
            message: 'Please enter a valid email address'
          }), { status: 400 }));
          return;
        }

        if (body.password.length < 6) {
          resolve(new Response(JSON.stringify({
            success: false,
            message: 'Password must be at least 6 characters long'
          }), { status: 400 }));
          return;
        }

        // Mock successful login
        resolve(new Response(JSON.stringify({
          success: true,
          message: 'Login successful!',
          token: 'mock-jwt-token-' + Date.now()
        }), { status: 200 }));
      }, TIMING_CONSTANTS.NETWORK_SIMULATION_DELAY);
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear errors when user starts typing
    if (error) setError('');
    if (success) setSuccess('');
  };

  const handleInputBlockClick = (inputId: string): void => {
    const input = document.getElementById(inputId);
    if (input) {
      input.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');
    setShowSuccessAnimation(false);

    try {
      console.log('Sending login request with:', formData);
      
      const response = await mockFetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result: LoginResponse = await response.json();

      if (result.success) {
        setSuccess(result.message);
        setShowSuccessAnimation(true);
        console.log('Login successful! Token:', result.token);
        
        // Show success animation, then close modal
        setTimeout(() => {
          closeModal();
        }, TIMING_CONSTANTS.SUCCESS_DISPLAY_DURATION);
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Progressive enhancement - detect JavaScript
  useEffect(() => {
    setJsEnabled(true);
  }, []);

  // Focus management and modal effects
  useEffect(() => {
    if (isOpen && emailInputRef.current) {
      // Focus the email input when modal opens
      setTimeout(() => {
        emailInputRef.current?.focus();
      }, TIMING_CONSTANTS.FOCUS_DELAY);
    }
  }, [isOpen]);

  // Focus trap for modal
  useEffect(() => {
    if (!isOpen) return;

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      const modal = modalRef.current;
      if (!modal) return;

      const focusableElements = modal.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    };

    document.addEventListener('keydown', handleTabKey);
    return () => document.removeEventListener('keydown', handleTabKey);
  }, [isOpen]);

  useEffect(() => {
    const handleScroll = (): void => {
      if (window.scrollY > window.innerHeight / 3 && !isOpened) {
        setIsOpened(true);
        setShowScrollDown(false);
        openModal();
      }
    };

    const handleKeyDown = (evt: KeyboardEvent): void => {
      if (evt.keyCode === 27) {
        closeModal();
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpened]);

  return (
    <>
      {/* Header with Login Link */}
      <header className="header">
        <div className="header-content">
          <h1 className="logo">MyApp</h1>
          <nav className="nav">
            <button 
              className="nav-login-btn"
              onClick={openModal}
              aria-label="Open login dialog"
              type="button"
            >
              Login
            </button>
          </nav>
        </div>
      </header>

      {/* Progressive Enhancement: Only show scroll instruction if JS is enabled */}
      {jsEnabled && showScrollDown && (
        <div className="scroll-down">
          SCROLL DOWN
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
            <path d="M16 3C8.832031 3 3 8.832031 3 16s5.832031 13 13 13 13-5.832031 13-13S23.167969 3 16 3zm0 2c6.085938 0 11 4.914063 11 11 0 6.085938-4.914062 11-11 11-6.085937 0-11-4.914062-11-11C5 9.914063 9.914063 5 16 5zm-1 4v10.28125l-4-4-1.40625 1.4375L16 23.125l6.40625-6.40625L21 15.28125l-4 4V9z"/> 
          </svg>
        </div>
      )}

      {/* Fallback content for no-JS users */}
      <noscript>
        <div className="no-js-login">
          <div className="no-js-container">
            <h2>Login Required</h2>
            <p>Please enable JavaScript for the full experience, or use the form below:</p>
            <form action="/login" method="post" className="no-js-form">
              <div className="input-block">
                <label htmlFor="no-js-email">Email</label>
                <input type="email" id="no-js-email" name="email" required autoComplete="email" />
              </div>
              <div className="input-block">
                <label htmlFor="no-js-password">Password</label>
                <input type="password" id="no-js-password" name="password" required autoComplete="current-password" />
              </div>
              <button type="submit" className="input-button">Login</button>
            </form>
          </div>
        </div>
      </noscript>
      
      <div className="container"></div>
      
      <div 
        className={`modal ${isOpen ? 'is-open' : ''}`}
        role={isOpen ? "dialog" : undefined}
        aria-modal={isOpen ? "true" : undefined}
        aria-labelledby={isOpen ? "modal-title" : undefined}
        aria-hidden={!isOpen}
      >
        <div className="modal-container" ref={modalRef}>
          <div className="modal-left">
            <h1 id="modal-title" className="modal-title">Welcome!</h1>
            <p className="modal-desc">Please enter your credentials to continue.</p>
            
            <form onSubmit={handleSubmit} noValidate>
              <div 
                className="input-block"
                onClick={() => handleInputBlockClick('email')}
                role="button"
                tabIndex={-1}
              >
                <label htmlFor="email" className="input-label">Email</label>
                <input 
                  ref={emailInputRef}
                  type="email" 
                  name="email" 
                  id="email" 
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  required
                  autoComplete="email"
                  aria-describedby={error ? errorMessageId : undefined}
                  aria-invalid={error ? "true" : "false"}
                />
              </div>
              <div 
                className="input-block"
                onClick={() => handleInputBlockClick('password')}
                role="button"
                tabIndex={-1}
              >
                <label htmlFor="password" className="input-label">Password</label>
                <input 
                  type="password" 
                  name="password" 
                  id="password" 
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  required
                  autoComplete="current-password"
                  aria-describedby={error ? errorMessageId : undefined}
                  aria-invalid={error ? "true" : "false"}
                />
              </div>
              
              {error && (
                <div 
                  id={errorMessageId}
                  className="error-message" 
                  role="alert"
                  aria-live="polite"
                >
                  {error}
                </div>
              )}
              
              {success && (
                <div 
                  id={successMessageId}
                  className={`success-message ${showSuccessAnimation ? 'success-animation' : ''}`}
                  role="alert"
                  aria-live="polite"
                >
                  {showSuccessAnimation && (
                    <svg 
                      className="success-icon" 
                      width="20" 
                      height="20" 
                      viewBox="0 0 20 20" 
                      fill="none"
                    >
                      <circle 
                        cx="10" 
                        cy="10" 
                        r="9" 
                        stroke="var(--color-success)" 
                        strokeWidth="2" 
                        fill="none"
                      />
                      <path 
                        d="M6 10l3 3 5-5" 
                        stroke="var(--color-success)" 
                        strokeWidth="2" 
                        fill="none" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                  {success}
                </div>
              )}
              
              <div className="modal-buttons">
                <button 
                  type="button"
                  className="forgot-password-link"
                  onClick={() => alert('Forgot password functionality would be implemented here')}
                >
                  Forgot your password?
                </button>
                <button 
                  type="submit" 
                  className="input-button"
                  disabled={isLoading}
                  aria-describedby={isLoading ? "login-status" : undefined}
                >
                  {isLoading ? 'Logging in...' : 'Login'}
                </button>
                {isLoading && (
                  <span id="login-status" className="sr-only">
                    Login in progress, please wait
                  </span>
                )}
              </div>
            </form>
            
            <p className="sign-up">
              Don't have an account? 
              <button 
                type="button"
                className="sign-up-link"
                onClick={() => alert('Sign up functionality would be implemented here')}
              >
                Sign up now
              </button>
            </p>
          </div>
          <div className="modal-right">
            <img 
              src="https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=dfd2ec5a01006fd8c4d7592a381d3776&auto=format&fit=crop&w=1000&q=80" 
              alt="A workspace with a laptop, coffee cup, and plant on a white desk"
            />
          </div>
          <button 
            className="icon-button close-button" 
            onClick={closeModal}
            aria-label="Close login dialog"
            type="button"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" aria-hidden="true">
              <path d="M 25 3 C 12.86158 3 3 12.86158 3 25 C 3 37.13842 12.86158 47 25 47 C 37.13842 47 47 37.13842 47 25 C 47 12.86158 37.13842 3 25 3 z M 25 5 C 36.05754 5 45 13.94246 45 25 C 45 36.05754 36.05754 45 25 45 C 13.94246 45 5 36.05754 5 25 C 5 13.94246 13.94246 5 25 5 z M 16.990234 15.990234 A 1.0001 1.0001 0 0 0 16.292969 17.707031 L 23.585938 25 L 16.292969 32.292969 A 1.0001 1.0001 0 1 0 17.707031 33.707031 L 25 26.414062 L 32.292969 33.707031 A 1.0001 1.0001 0 1 0 33.707031 32.292969 L 26.414062 25 L 33.707031 17.707031 A 1.0001 1.0001 0 0 0 32.980469 15.990234 A 1.0001 1.0001 0 0 0 32.292969 16.292969 L 25 23.585938 L 17.707031 16.292969 A 1.0001 1.0001 0 0 0 16.990234 15.990234 z"></path>
            </svg>
          </button>
        </div>
        <button 
          className="modal-button" 
          onClick={openModal}
          aria-label="Open login dialog"
          type="button"
        >
          Click here to login
        </button>
      </div>
    </>
  );
};

export default LoginForm;
