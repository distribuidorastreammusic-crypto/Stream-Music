
import React, { useState } from 'react';
import { Music, Lock, Mail, Phone, ArrowRight, Loader2, AlertCircle, Info } from 'lucide-react';
import { User } from '../types';

interface LoginProps {
  onLogin: (user: User) => void;
  onNavigateToSignup: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin, onNavigateToSignup }) => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    // Simulação de login com lógica administrativa
    setTimeout(() => {
      setIsLoading(false);
      
      // O seu número master para acesso administrativo: 957729023
      const isAdmin = identifier === '957729023' || identifier === '957709023';

      if (isAdmin) {
        onLogin({
          id: 'admin-master',
          fullName: 'Ibrahim Rabiu',
          artistName: 'Stream Master',
          province: 'Luanda',
          idNumber: '008391115B043',
          phone: identifier,
          email: 'suporte@stream.ao',
          role: 'admin',
          photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
        });
        return;
      }

      // Login de artista padrão
      if (identifier && password.length >= 4) {
        onLogin({
          id: 'user-' + Math.random().toString(36).substr(2, 5),
          fullName: 'Artista Convidado',
          artistName: identifier,
          province: 'Luanda',
          idNumber: '000000000LA000',
          phone: identifier.includes('@') ? '923000000' : identifier,
          email: identifier.includes('@') ? identifier : 'user@stream.ao',
          role: 'artist',
          photo: `https://api.dicebear.com/7.x/initials/svg?seed=${identifier}`
        });
      } else {
        setError('Número/Email ou senha inválidos. Tente novamente.');
      }
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8 animate-in fade-in zoom-in-95 duration-500">
        <div className="text-center space-y-4">
          <div className="inline-flex w-16 h-16 bg-black rounded-[1.5rem] items-center justify-center shadow-2xl">
            <Music className="text-white" size={32} />
          </div>
          <div>
            <h1 className="text-2xl font-black text-gray-900 uppercase tracking-tighter">Stream Music</h1>
            <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.4em]">Distribution Platform</p>
          </div>
        </div>

        <div className="bg-gray-50/50 p-10 rounded-[3rem] border border-gray-100 space-y-8 shadow-sm">
          <div className="space-y-2">
            <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight leading-none">Bem-vindo</h2>
            <p className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">Inicie sessão para gerir a sua música</p>
          </div>

          {error && (
            <div className="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-500 animate-in slide-in-from-top-2">
              <AlertCircle size={18} />
              <p className="text-[10px] font-black uppercase tracking-widest leading-none">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">E-mail ou Telefone</label>
              <div className="relative group">
                <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-black transition-colors">
                  {identifier.includes('@') ? <Mail size={20} /> : <Phone size={20} />}
                </div>
                <input 
                  type="text" 
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="Seu contacto"
                  className="w-full bg-white border border-gray-100 rounded-2xl pl-16 pr-6 py-5 text-sm font-bold text-black outline-none focus:ring-4 focus:ring-gray-100/50 transition-all shadow-sm"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Senha</label>
              <div className="relative group">
                <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-black transition-colors">
                  <Lock size={20} />
                </div>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white border border-gray-100 rounded-2xl pl-16 pr-6 py-5 text-sm font-bold text-black outline-none focus:ring-4 focus:ring-gray-100/50 transition-all shadow-sm"
                />
              </div>
            </div>

            <button 
              disabled={isLoading}
              className="w-full py-5 bg-black text-white rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-2xl hover:bg-gray-800 transition-all active:scale-95 flex items-center justify-center gap-3 mt-4 disabled:opacity-50"
            >
              {isLoading ? <Loader2 size={20} className="animate-spin" /> : <>Entrar no Painel <ArrowRight size={20} /></>}
            </button>
          </form>

          {/* Admin Access Hint */}
          <div className="p-5 bg-blue-50/50 rounded-2xl border border-blue-100 flex gap-4">
             <Info size={18} className="text-blue-500 shrink-0" />
             <p className="text-[9px] text-blue-600 font-bold uppercase tracking-tight leading-relaxed">
               Acesso Master: Utilize o número cadastrado como administrador para aceder às funções de moderação.
             </p>
          </div>
        </div>

        <div className="text-center">
          <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">
            Ainda não tem conta?{' '}
            <button onClick={onNavigateToSignup} className="text-black font-black hover:underline">Cadastrar-se</button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
