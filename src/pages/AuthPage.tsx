import React, { useState } from 'react';
import { ArrowLeft, Mail, Phone, Eye, EyeOff } from 'lucide-react';
import { createUserWithEmailAndPassword, RecaptchaVerifier, signInWithEmailAndPassword, signInWithPhoneNumber, signInWithPopup, updateProfile } from 'firebase/auth';
import { auth, googleProvider } from '../firebase/firebaseConfig';
import { saveUserToFirestore } from '../firebase/firebaseStore';
import {useAuth} from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom';
// 👇️ Declare recaptchaVerifier on the window object for TypeScript
declare global {
  interface Window {
    recaptchaVerifier: any;
  }
}



 function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [authMethod, setAuthMethod] = useState<'email' | 'phone'>('email');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState<any>(null);
  const {login}= useAuth()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    otp: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      console.log('Google user:', user);
      login(user);
      saveUserToFirestore(user);
      navigate('/home')

    } catch (error) {
      console.error('Google Sign-In Error:', error);
      alert("Google sign-in failed.");
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Set up recaptcha before sending OTP
  const generateRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        'recaptcha-container',
        {
          size: 'invisible',
          callback: (response: any) => {
            console.log('reCAPTCHA verified');
          }
        },
        auth
      );
    }
  };

  const handlePhoneAuth = async () => {
    setIsLoading(true);
    try {
      if (!otpSent) {
        generateRecaptcha();
        const appVerifier = window.recaptchaVerifier;

        const confirmation = await signInWithPhoneNumber(auth, '+917617028576', appVerifier);
        setConfirmationResult(confirmation);
        setOtpSent(true);
        alert('OTP sent to your phone.');
      } else {
        const result = await confirmationResult.confirm(formData.otp);
        const user = result.user;
        login(user);
        saveUserToFirestore(user);
        navigate('/home')
      }
    } catch (error) {
      console.error('Phone auth error:', error);
      alert('Failed to authenticate. Check phone number or OTP.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailAuth = async () => {
  setIsLoading(true);
  const { email, password, name } = formData;

  if (!email || !password) {
    alert("Email and password are required");
    setIsLoading(false);
    return;
  }

  try {
    let userCredential;

    if (isLogin) {
      // Existing user logging in
      userCredential = await signInWithEmailAndPassword(auth, email, password);
    } else {
      // New user registration
      userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, {
        displayName: name || "User",
      });
    }

    const user = userCredential.user;
    login(user);
    saveUserToFirestore(user);
    navigate('/home')
    console.log("User authenticated:", user);
  } catch (error: any) {
    alert(error.message);
    console.error("Email auth error:", error);
  } finally {
    setIsLoading(false);
  }
};

const onBack =()=>{
 navigate('/')
}
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="flex items-center space-x-3">
            <button
              onClick={onBack}
              className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-lg font-semibold text-gray-900">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h1>
          </div>
        </div>
      </header>

      <div className="max-w-md mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-xl">🌱</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {isLogin ? 'Sign In' : 'Join VillageFresh'}
          </h2>
          <p className="text-gray-600">
            {isLogin
              ? 'Welcome back! Sign in to continue shopping'
              : 'Create your account to start fresh shopping'}
          </p>
        </div>

        <button
          onClick={handleGoogleLogin}
          disabled={isLoading}
          className="w-full bg-white border-2 border-gray-200 hover:border-gray-300 text-gray-700 py-4 px-6 rounded-xl font-medium flex items-center justify-center space-x-3 transition-all mb-4 disabled:opacity-50"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
          <span>{isLoading ? 'Signing in...' : 'Continue with Google'}</span>
        </button>

        <div className="flex items-center my-6">
          <div className="flex-1 border-t border-gray-200"></div>
          <span className="px-4 text-sm text-gray-500">or</span>
          <div className="flex-1 border-t border-gray-200"></div>
        </div>

        <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
          <button
            onClick={() => setAuthMethod('email')}
            className={`flex-1 py-2 px-4 rounded-md font-medium text-sm transition-all ${authMethod === 'email'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600'
              }`}
          >
            <Mail className="w-4 h-4 inline mr-2" />
            Email
          </button>
          <button
            onClick={() => setAuthMethod('phone')}
            className={`flex-1 py-2 px-4 rounded-md font-medium text-sm transition-all ${authMethod === 'phone'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600'
              }`}
          >
            <Phone className="w-4 h-4 inline mr-2" />
            Phone
          </button>
        </div>

        <div className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                placeholder="Enter your full name"
              />
            </div>
          )}

          {authMethod === 'email' ? (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                  placeholder="Enter your email"
                />
              </div>
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg pr-12"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                  placeholder="+91 9876543210"
                />
              </div>
              {otpSent && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Enter OTP</label>
                  <input
                    type="text"
                    name="otp"
                    value={formData.otp}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                    placeholder="Enter 6-digit OTP"
                    maxLength={6}
                  />
                </div>
              )}
            </>
          )}
        </div>

        <button
          onClick={authMethod === 'email' ? handleEmailAuth : handlePhoneAuth}
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white py-4 px-6 rounded-xl font-semibold mt-6"
        >
          {isLoading
            ? 'Please wait...'
            : authMethod === 'phone' && !otpSent
              ? 'Send OTP'
              : isLogin
                ? 'Sign In'
                : 'Create Account'}
        </button>

        <div className="text-center mt-6">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-emerald-600 font-medium hover:text-emerald-700 transition-colors"
          >
            {isLogin
              ? "Don't have an account? Sign up"
              : "Already have an account? Sign in"}
          </button>
        </div>

        {/* ✅ Recaptcha must be rendered here */}
        <div id="recaptcha-container" />

        <p className="text-xs text-gray-500 text-center mt-6 leading-relaxed">
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
} export default AuthPage
