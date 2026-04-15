import { LoginForm } from '@/features/auth/components/LoginForm'
import logo from '@/assets/img/logo1.png'

function LoginPage() {
  return (
    <div className="min-h-screen flex bg-slate-100 relative overflow-hidden">
      <div className="absolute inset-0 lg:hidden">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat login-background-image" />
        <div className="absolute inset-0 login-image-overlay" />
        <div className="absolute inset-0 bg-slate-100/30 backdrop-blur-[0.5px]" />
      </div>

      <div className="login-floating-orb animate-float hidden lg:block w-75 h-75 top-[-5%] right-[5%] bg-(--primary-color)" />
      <div className="login-floating-orb hidden lg:block w-50 h-50 bottom-[10%] right-[20%] bg-(--secondary-color) [animation-delay:1.5s] animate-[float_4s_ease-in-out_infinite]" />

      <div className="hidden lg:flex lg:w-[55%] relative">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat login-background-image" />
        <div className="absolute inset-0 login-image-overlay" />
      </div>

      <div className="flex-1 flex items-center justify-center p-6 sm:p-10 relative z-10">
        <div className="w-full max-w-100 animate-slide-in-right">
          <div className="lg:hidden flex items-center gap-2.5 mb-8">
            <div className="w-10 h-10 rounded-lg bg-white/90 border border-slate-200 p-1.5 flex items-center justify-center shadow-sm">
              <img
                src={logo}
                alt="OMG Temple"
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <span className="text-lg font-display font-bold text-slate-900">OMG Temple</span>
          </div>

          <LoginForm />

          <div className="hidden lg:flex items-center justify-center mt-6 gap-1.5">
            <span className="text-xs text-slate-500/80">Powered by</span>
            <span className="text-xs font-display font-semibold text-slate-600">
              OMG Temple Governance System
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
