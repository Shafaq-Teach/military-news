import React, { useState } from 'react';
import { useMilitary } from '../../context/MilitaryContext';
import { User, Eye, EyeOff, Check, X, KeyRound, ShieldCheck, AlertCircle } from 'lucide-react';

export const AdminLoginModal: React.FC = () => {
  const { 
    isLoginModalOpen, 
    setIsLoginModalOpen, 
    adminLogin, 
    changeAdminPassword,
    getAdminCredentials,
    language 
  } = useMilitary();

  const [mode, setMode] = useState<'login' | 'change-password'>('login');
  
  // Login fields
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Change Password fields
  const [currUser, setCurrUser] = useState('admin');
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [showNewPass, setShowNewPass] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  if (!isLoginModalOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    const success = adminLogin(username, password, rememberMe);
    if (!success) {
      setErrorMsg(
        language === 'en'
          ? 'Invalid username or password'
          : language === 'ar'
          ? 'اسم المستخدم أو كلمة المرور غير صحيحة'
          : 'ئىشلەتكۈچى نامى ياكى مەخپىي نومۇر خاتا بولدى'
      );
    }
  };

  const handleChangePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (newPass !== confirmPass) {
      setErrorMsg(
        language === 'en'
          ? 'New passwords do not match'
          : language === 'ar'
          ? 'كلمتا المرور الجديدتان غير متطابقتين'
          : 'يېڭى كىرگۈزگەن مەخپىي نومۇرلار ماسلاشمىدى'
      );
      return;
    }

    const result = changeAdminPassword(currentPass, newPass, currUser);
    if (!result.success) {
      setErrorMsg(result.error || 'خاتالىق كۆرۈلدى');
    } else {
      setSuccessMsg(
        language === 'en'
          ? 'Password updated successfully! Please login.'
          : language === 'ar'
          ? 'تم تغيير كلمة المرور بنجاح! يرجى تسجيل الدخول.'
          : 'مەخپىي نومۇر مۇۋەپپەقىيەتلىك ئۆزگەرتىلدى! ئەمدى كىرىڭ.'
      );
      setPassword(newPass);
      setTimeout(() => {
        setMode('login');
        setSuccessMsg('');
      }, 1500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-300">
      
      {/* Landscape Background Image */}
      <div 
        className="fixed inset-0 bg-cover bg-center pointer-events-none transition-all"
        style={{ backgroundImage: 'url(./login-bg.jpg)' }}
      />
      
      {/* Subtle Ambient Lighting */}
      <div className="fixed inset-0 bg-black/20 pointer-events-none" />

      {/* Frosted Glass Card */}
      <div 
        dir="ltr"
        className="relative w-full max-w-[390px] sm:max-w-[420px] rounded-[36px] p-7 sm:p-10 shadow-[0_30px_70px_rgba(0,0,0,0.45)] border border-white/40 text-white z-10 my-auto text-start"
        style={{
          background: 'rgba(255, 255, 255, 0.14)',
          backdropFilter: 'blur(28px)',
          WebkitBackdropFilter: 'blur(28px)',
          boxShadow: 'inset 0 1.5px 2px rgba(255, 255, 255, 0.65), inset 0 -1.5px 2px rgba(0, 0, 0, 0.15), 0 25px 60px rgba(0, 0, 0, 0.45)'
        }}
      >
        
        {/* Close Button */}
        <button
          onClick={() => {
            setIsLoginModalOpen(false);
            try {
              if (window.location.pathname.includes('sensiz520') || window.location.hash.includes('sensiz520')) {
                const basePath = window.location.pathname.replace(/\/sensiz520\/?$/, '') || '/';
                window.history.replaceState(null, '', basePath);
              }
            } catch {}
          }}
          className="absolute top-6 end-6 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/30 flex items-center justify-center text-white/80 hover:text-white transition-all shadow-sm"
          title={language === 'en' ? 'Close' : language === 'ar' ? 'إغلاق' : 'تاقاش'}
        >
          <X className="w-5 h-5" />
        </button>

        {mode === 'login' ? (
          /* =======================================================
             LOGIN MODE (Exact Match to Uploaded Design)
             ======================================================= */
          <div>
            
            {/* Header */}
            <h2 className="text-3xl sm:text-[34px] font-bold text-white tracking-tight mb-2 font-sans">
              Login
            </h2>
            <p className="text-sm sm:text-[15px] text-white/90 font-normal mb-7 sm:mb-8 font-sans leading-snug">
              Welcome back please login to your account
            </p>

            {/* Error Notification */}
            {errorMsg && (
              <div className="mb-5 p-3 rounded-2xl bg-rose-500/30 border border-rose-400/50 flex items-center gap-2 text-xs text-white font-medium animate-in fade-in">
                <AlertCircle className="w-4 h-4 text-rose-300 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Success Notification */}
            {successMsg && (
              <div className="mb-5 p-3 rounded-2xl bg-emerald-500/30 border border-emerald-400/50 flex items-center gap-2 text-xs text-white font-medium animate-in fade-in">
                <ShieldCheck className="w-4 h-4 text-emerald-300 shrink-0" />
                <span>{successMsg}</span>
              </div>
            )}

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              
              {/* Username Input */}
              <div className="relative">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="User Name"
                  required
                  className="w-full bg-white/[0.08] hover:bg-white/[0.12] focus:bg-white/[0.18] border border-white/35 rounded-2xl px-5 py-4 pe-12 text-white placeholder-white/70 focus:outline-none focus:ring-1 focus:ring-white/70 text-sm sm:text-base font-sans transition-all"
                />
                <User className="w-5 h-5 text-white/70 absolute end-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              {/* Password Input */}
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                  className="w-full bg-white/[0.08] hover:bg-white/[0.12] focus:bg-white/[0.18] border border-white/35 rounded-2xl px-5 py-4 pe-12 text-white placeholder-white/70 focus:outline-none focus:ring-1 focus:ring-white/70 text-sm sm:text-base font-sans transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute end-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              {/* Remember Me Checkbox */}
              <div className="flex items-center gap-2.5 pt-1 pb-2">
                <button
                  type="button"
                  onClick={() => setRememberMe(!rememberMe)}
                  className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all cursor-pointer ${
                    rememberMe 
                      ? 'bg-[#22c55e] border-white/30 text-white shadow-sm' 
                      : 'bg-white/10 border-white/40'
                  }`}
                >
                  {rememberMe && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </button>
                <label 
                  onClick={() => setRememberMe(!rememberMe)}
                  className="text-xs sm:text-sm text-white font-medium cursor-pointer font-sans select-none"
                >
                  Remember me
                </label>
              </div>

              {/* Lime-to-Green Gradient Action Button */}
              <button
                type="submit"
                className="w-full py-4 rounded-2xl font-bold text-base sm:text-lg text-white tracking-wide shadow-[0_8px_25px_rgba(46,184,92,0.45)] hover:opacity-95 active:scale-[0.98] transition-all font-sans cursor-pointer mt-2"
                style={{
                  background: 'linear-gradient(90deg, #9ecb36 0%, #61be45 45%, #2cb455 100%)'
                }}
              >
                Login
              </button>

            </form>

            {/* Signup / Change Password Link matching original UI */}
            <div className="text-center text-sm text-white/90 mt-5 font-sans">
              <span>Don't have an account? </span>
              <button
                type="button"
                onClick={() => {
                  setErrorMsg('');
                  setSuccessMsg('');
                  setMode('change-password');
                }}
                className="font-bold text-white hover:underline cursor-pointer"
              >
                Signup
              </button>
            </div>

            {/* Change Password Link */}
            <div className="text-center text-xs text-white/80 mt-2 font-sans">
              <button
                type="button"
                onClick={() => {
                  setErrorMsg('');
                  setSuccessMsg('');
                  setMode('change-password');
                }}
                className="hover:underline text-lime-300/90 font-medium cursor-pointer"
              >
                مەخپىي نومۇرنى ئۆزگەرتىش (Change Password)
              </button>
            </div>

            {/* Default credentials hint */}
            <div className="text-center text-[11px] text-white/60 mt-2.5 font-sans">
              سۈكۈتتىكى نامى: <span className="font-mono text-white/90">admin</span> | نومۇرى: <span className="font-mono text-white/90">admin123</span>
            </div>

            {/* Footer Attribution (exact match to uploaded design) */}
            <div className="text-center text-xs text-white/75 mt-5 font-sans italic">
              Created by <span className="font-semibold text-white">anggidwiiputra</span>
            </div>

          </div>
        ) : (
          /* =======================================================
             CHANGE PASSWORD MODE (مەخپىي نومۇرنى ئۆزگەرتىش)
             ======================================================= */
          <div>
            
            <h2 className="text-2xl sm:text-[28px] font-bold text-white tracking-tight mb-2 font-sans">
              {language === 'en' ? 'Change Password' : language === 'ar' ? 'تغيير كلمة المرور' : 'مەخپىي نومۇر ئۆزگەرتىش'}
            </h2>
            <p className="text-xs sm:text-sm text-white/90 font-normal mb-6 font-sans leading-snug">
              {language === 'en' 
                ? 'Update your credentials to secure your account' 
                : language === 'ar' 
                ? 'قم بتحديث بيانات الاعتماد لتأمين حسابك' 
                : 'ھېسابات بىخەتەرلىكى ئۈچۈن يېڭى مەخپىي نومۇر تەڭشەڭ'}
            </p>

            {/* Error Notification */}
            {errorMsg && (
              <div className="mb-4 p-3 rounded-2xl bg-rose-500/30 border border-rose-400/50 flex items-center gap-2 text-xs text-white font-medium animate-in fade-in">
                <AlertCircle className="w-4 h-4 text-rose-300 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Success Notification */}
            {successMsg && (
              <div className="mb-4 p-3 rounded-2xl bg-emerald-500/30 border border-emerald-400/50 flex items-center gap-2 text-xs text-white font-medium animate-in fade-in">
                <ShieldCheck className="w-4 h-4 text-emerald-300 shrink-0" />
                <span>{successMsg}</span>
              </div>
            )}

            <form onSubmit={handleChangePasswordSubmit} className="space-y-3.5">
              
              {/* Username Input */}
              <div className="relative">
                <input
                  type="text"
                  value={currUser}
                  onChange={(e) => setCurrUser(e.target.value)}
                  placeholder={language === 'en' ? 'User Name' : 'ئىشلەتكۈچى نامى'}
                  required
                  className="w-full bg-white/[0.08] hover:bg-white/[0.12] focus:bg-white/[0.18] border border-white/35 rounded-2xl px-5 py-3.5 pe-12 text-white placeholder-white/70 focus:outline-none focus:ring-1 focus:ring-white/70 text-sm font-sans transition-all"
                />
                <User className="w-5 h-5 text-white/70 absolute end-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              {/* Current Password */}
              <div className="relative">
                <input
                  type="password"
                  value={currentPass}
                  onChange={(e) => setCurrentPass(e.target.value)}
                  placeholder={language === 'en' ? 'Current Password' : 'ھازىرقى مەخپىي نومۇر'}
                  required
                  className="w-full bg-white/[0.08] hover:bg-white/[0.12] focus:bg-white/[0.18] border border-white/35 rounded-2xl px-5 py-3.5 pe-12 text-white placeholder-white/70 focus:outline-none focus:ring-1 focus:ring-white/70 text-sm font-sans transition-all"
                />
                <KeyRound className="w-5 h-5 text-white/70 absolute end-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              {/* New Password */}
              <div className="relative">
                <input
                  type={showNewPass ? 'text' : 'password'}
                  value={newPass}
                  onChange={(e) => setNewPass(e.target.value)}
                  placeholder={language === 'en' ? 'New Password' : 'يېڭى مەخپىي نومۇر'}
                  required
                  className="w-full bg-white/[0.08] hover:bg-white/[0.12] focus:bg-white/[0.18] border border-white/35 rounded-2xl px-5 py-3.5 pe-12 text-white placeholder-white/70 focus:outline-none focus:ring-1 focus:ring-white/70 text-sm font-sans transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPass(!showNewPass)}
                  className="absolute end-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors"
                  tabIndex={-1}
                >
                  {showNewPass ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              {/* Confirm New Password */}
              <div className="relative">
                <input
                  type="password"
                  value={confirmPass}
                  onChange={(e) => setConfirmPass(e.target.value)}
                  placeholder={language === 'en' ? 'Confirm New Password' : 'يېڭى نومۇرنى قايتا كىرگۈزۈڭ'}
                  required
                  className="w-full bg-white/[0.08] hover:bg-white/[0.12] focus:bg-white/[0.18] border border-white/35 rounded-2xl px-5 py-3.5 pe-12 text-white placeholder-white/70 focus:outline-none focus:ring-1 focus:ring-white/70 text-sm font-sans transition-all"
                />
                <ShieldCheck className="w-5 h-5 text-white/70 absolute end-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              {/* Update Button */}
              <button
                type="submit"
                className="w-full py-4 rounded-2xl font-bold text-base text-white tracking-wide shadow-[0_8px_25px_rgba(46,184,92,0.45)] hover:opacity-95 active:scale-[0.98] transition-all font-sans cursor-pointer mt-3"
                style={{
                  background: 'linear-gradient(90deg, #9ecb36 0%, #61be45 45%, #2cb455 100%)'
                }}
              >
                {language === 'en' ? 'Update Password' : language === 'ar' ? 'تحديث كلمة المرور' : 'مەخپىي نومۇرنى يېڭىلاش'}
              </button>

            </form>

            {/* Back to Login */}
            <div className="text-center mt-5">
              <button
                type="button"
                onClick={() => {
                  setErrorMsg('');
                  setSuccessMsg('');
                  setMode('login');
                }}
                className="text-xs sm:text-sm font-semibold text-white/90 hover:text-white hover:underline cursor-pointer"
              >
                {language === 'en' ? '← Back to Login' : language === 'ar' ? '← العودة لتسجيل الدخول' : '← كىرىشكە قايتىش'}
              </button>
            </div>

          </div>
        )}

      </div>

    </div>
  );
};
