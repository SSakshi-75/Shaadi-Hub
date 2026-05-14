import { motion } from 'framer-motion';

const Loader = ({ fullPage = false, color = 'pink', variant = 'default' }) => {
  const isPurple = color === 'purple';
  const isCharcoal = color === 'charcoal';
  const isAdmin = variant === 'admin';
  
  const mainColor = isCharcoal || isAdmin ? '#0F172A' : isPurple ? '#6C4AB6' : '#E91E63';
  const secondaryColor = isCharcoal || isAdmin ? '#334155' : isPurple ? '#8D72E1' : '#F06292';

  if (isAdmin) {
    return (
      <div className="fixed inset-0 bg-slate-50 flex flex-col items-center justify-center z-[100] font-sans overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-slate-200/50 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-slate-200/50 rounded-full blur-[120px]"></div>

        <div className="relative z-10 flex flex-col items-center">
          <div className="relative mb-12">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="w-24 h-24 rounded-[32px] border-2 border-slate-100 shadow-sm"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="absolute inset-2 rounded-[24px] border-t-2 border-slate-900 shadow-lg shadow-slate-900/10"
            />
            <motion.div
              initial={{ opacity: 0.5, scale: 0.8 }}
              animate={{ opacity: [0.5, 1, 0.5], scale: [0.8, 1.1, 0.8] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="w-4 h-4 bg-slate-900 rounded-full shadow-xl shadow-slate-900/40" />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center"
          >
            <h2 className="text-xl font-black text-slate-900 tracking-tighter uppercase mb-2">
              Shaadi<span className="text-slate-400">Hub</span>
            </h2>
            <div className="flex items-center justify-center gap-2">
              <span className="w-1.5 h-1.5 bg-slate-900 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
              <span className="w-1.5 h-1.5 bg-slate-900 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
              <span className="w-1.5 h-1.5 bg-slate-900 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] ml-2">Executive Suite Access</p>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center justify-center ${fullPage ? 'fixed inset-0 bg-white/90 backdrop-blur-md z-[100]' : 'py-20'}`}>
      <div className="relative flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          className="w-20 h-20 rounded-full border-[3px] border-transparent"
          style={{ borderTopColor: mainColor, borderRightColor: mainColor }}
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="absolute w-14 h-14 rounded-full border-[3px] border-transparent opacity-40"
          style={{ borderBottomColor: secondaryColor, borderLeftColor: secondaryColor }}
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-4 h-4 rounded-full shadow-lg"
          style={{ backgroundColor: mainColor }}
        />
        <div 
          className="absolute w-24 h-24 blur-3xl opacity-10 rounded-full"
          style={{ backgroundColor: mainColor }}
        />
      </div>
    </div>
  );
};

export default Loader;
