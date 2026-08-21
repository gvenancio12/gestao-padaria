import AuthForm from '@/components/AuthForm';

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#E17208] to-[#994701] dark:from-[#4D2306] dark:to-[#1a0a01] relative overflow-hidden transition-colors">
      {/* Pattern background - simple CSS dots pattern to mimic the bread pattern temporarily */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#ffffff 2px, transparent 2px)',
          backgroundSize: '40px 40px'
        }}
      ></div>
      
      <div className="relative z-10 w-full flex justify-center">
        <AuthForm />
      </div>
    </main>
  );
}
