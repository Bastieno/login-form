import { useState, useEffect } from 'react';
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

const LoginForm = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [showScrollDown, setShowScrollDown] = useState<boolean>(true);
  const [formData, setFormData] = useState<LoginData>({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  const openModal = (): void => {
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
  };

  // Mock fetch function to simulate server communication
  const mockFetch = async (url: string, options: RequestInit): Promise<Response> => {
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
      }, 1500); // Simulate network delay
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

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

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
        console.log('Login successful! Token:', result.token);
        // In a real app, you would store the token and redirect the user
        setTimeout(() => {
          closeModal();
        }, 2000);
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
      {showScrollDown && (
        <div className="scroll-down">
          SCROLL DOWN
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
            <path d="M16 3C8.832031 3 3 8.832031 3 16s5.832031 13 13 13 13-5.832031 13-13S23.167969 3 16 3zm0 2c6.085938 0 11 4.914063 11 11 0 6.085938-4.914062 11-11 11-6.085937 0-11-4.914062-11-11C5 9.914063 9.914063 5 16 5zm-1 4v10.28125l-4-4-1.40625 1.4375L16 23.125l6.40625-6.40625L21 15.28125l-4 4V9z"/> 
          </svg>
        </div>
      )}
      
      <div className="container"></div>
      
      <div className={`modal ${isOpen ? 'is-open' : ''}`}>
        <div className="modal-container">
          <div className="modal-left">
            <h1 className="modal-title">Welcome!</h1>
            <p className="modal-desc">Please enter your credentials to continue.</p>
            
            <form onSubmit={handleSubmit}>
              <div className="input-block">
                <label htmlFor="email" className="input-label">Email</label>
                <input 
                  type="email" 
                  name="email" 
                  id="email" 
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  required
                />
              </div>
              <div className="input-block">
                <label htmlFor="password" className="input-label">Password</label>
                <input 
                  type="password" 
                  name="password" 
                  id="password" 
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  required
                />
              </div>
              
              {error && (
                <div className="error-message" style={{
                  color: '#e74c3c',
                  fontSize: '14px',
                  marginBottom: '15px',
                  padding: '10px',
                  backgroundColor: '#fdf2f2',
                  border: '1px solid #fecaca',
                  borderRadius: '4px'
                }}>
                  {error}
                </div>
              )}
              
              {success && (
                <div className="success-message" style={{
                  color: '#27ae60',
                  fontSize: '14px',
                  marginBottom: '15px',
                  padding: '10px',
                  backgroundColor: '#f0f9f4',
                  border: '1px solid #bbf7d0',
                  borderRadius: '4px'
                }}>
                  {success}
                </div>
              )}
              
              <div className="modal-buttons">
                <a href="#" className="">Forgot your password?</a>
                <button 
                  type="submit" 
                  className="input-button"
                  disabled={isLoading}
                  style={{
                    opacity: isLoading ? 0.7 : 1,
                    cursor: isLoading ? 'not-allowed' : 'pointer'
                  }}
                >
                  {isLoading ? 'Logging in...' : 'Login'}
                </button>
              </div>
            </form>
            
            <p className="sign-up">Don't have an account? <a href="#">Sign up now</a></p>
          </div>
          <div className="modal-right">
            <img src="https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=dfd2ec5a01006fd8c4d7592a381d3776&auto=format&fit=crop&w=1000&q=80" alt="" />
          </div>
          <button className="icon-button close-button" onClick={closeModal}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
              <path d="M 25 3 C 12.86158 3 3 12.86158 3 25 C 3 37.13842 12.86158 47 25 47 C 37.13842 47 47 37.13842 47 25 C 47 12.86158 37.13842 3 25 3 z M 25 5 C 36.05754 5 45 13.94246 45 25 C 45 36.05754 36.05754 45 25 45 C 13.94246 45 5 36.05754 5 25 C 5 13.94246 13.94246 5 25 5 z M 16.990234 15.990234 A 1.0001 1.0001 0 0 0 16.292969 17.707031 L 23.585938 25 L 16.292969 32.292969 A 1.0001 1.0001 0 1 0 17.707031 33.707031 L 25 26.414062 L 32.292969 33.707031 A 1.0001 1.0001 0 1 0 33.707031 32.292969 L 26.414062 25 L 33.707031 17.707031 A 1.0001 1.0001 0 0 0 32.980469 15.990234 A 1.0001 1.0001 0 0 0 32.292969 16.292969 L 25 23.585938 L 17.707031 16.292969 A 1.0001 1.0001 0 0 0 16.990234 15.990234 z"></path>
            </svg>
          </button>
        </div>
        <button className="modal-button" onClick={openModal}>Click here to login</button>
      </div>
    </>
  );
};

export default LoginForm;
