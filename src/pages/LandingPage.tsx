import { Link } from 'react-router-dom'
import { Cookie, BookOpen, Apple, Package, Calendar, Smartphone, Database, Shield } from 'lucide-react'

export function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-komora-50 to-stone-50">
      <header className="bg-white/80 backdrop-blur-sm border-b border-stone-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🫙</span>
            <span className="text-lg font-bold text-komora-700">Комора</span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/app"
              className="text-sm font-medium text-stone-600 hover:text-komora-700 transition-colors"
            >
              Відкрити додаток
            </Link>
            <Link
              to="/admin"
              className="text-sm font-medium px-4 py-2 rounded-xl bg-komora-600 text-white hover:bg-komora-700 transition-colors"
            >
              Адмін
            </Link>
          </div>
        </div>
      </header>

      <section className="max-w-5xl mx-auto px-4 pt-16 pb-12 text-center">
        <div className="text-6xl mb-4">🫙</div>
        <h1 className="text-4xl sm:text-5xl font-bold text-stone-800 mb-4">
          Комора
        </h1>
        <p className="text-lg sm:text-xl text-stone-600 max-w-2xl mx-auto mb-8">
          Додаток для домашнього консервування, обліку запасів та управління продуктами.
          Понад 850 продуктів, 42 рецепти, календар сезонності — все в одному місці.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/app"
            className="px-6 py-3 rounded-xl bg-komora-600 text-white font-semibold hover:bg-komora-700 transition-colors"
          >
            Почати користуватись
          </Link>
          <Link
            to="/admin"
            className="px-6 py-3 rounded-xl bg-white border border-stone-300 text-stone-700 font-semibold hover:bg-stone-50 transition-colors"
          >
            Панель адміністратора
          </Link>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-stone-800 text-center mb-10">Можливості</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard
            icon={Cookie}
            title="Закрутки"
            description="Облік домашніх заготовок: що зроблено, коли, з яких продуктів, термін придатності."
          />
          <FeatureCard
            icon={BookOpen}
            title="Рецепти"
            description="Колекція рецептів для консервування з інгредієнтами, кроками та порадами."
          />
          <FeatureCard
            icon={Apple}
            title="Продукти"
            description="Довідник з 850+ продуктів з умовами зберігання, сумісністю та сезонністю."
          />
          <FeatureCard
            icon={Package}
            title="Запаси"
            description="Облік продуктів вдома з відстеженням термінів придатності."
          />
          <FeatureCard
            icon={Calendar}
            title="Календар сезонності"
            description="Візуальний календар, який показує, які продукти зараз в сезоні."
          />
          <FeatureCard
            icon={Smartphone}
            title="PWA"
            description="Встановлюється на телефон або комп'ютер, працює офлайн."
          />
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <StatCard value="850+" label="Продуктів" />
          <StatCard value="42" label="Рецептів" />
          <StatCard value="10" label="Категорій" />
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-stone-800 text-center mb-8">Технології</h2>
        <div className="flex flex-wrap justify-center gap-3">
          {['React 18', 'TypeScript', 'Vite', 'Tailwind CSS', 'Dexie.js (IndexedDB)', 'PWA', 'Express', 'SQLite'].map(tech => (
            <span key={tech} className="px-4 py-2 rounded-full bg-white border border-stone-200 text-sm font-medium text-stone-700">
              {tech}
            </span>
          ))}
        </div>
      </section>

      <footer className="border-t border-stone-200 py-8 text-center text-sm text-stone-500">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Shield size={16} />
          <Database size={16} />
        </div>
        <p>Комора — домашні закрутки та облік продуктів</p>
        <p className="mt-1">
          <a href="https://github.com/vitaliy-n/komora" target="_blank" rel="noopener" className="text-komora-600 hover:underline">
            GitHub
          </a>
        </p>
      </footer>
    </div>
  )
}

function FeatureCard({ icon: Icon, title, description }: { icon: any; title: string; description: string }) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-stone-200 hover:shadow-md transition-shadow">
      <div className="w-12 h-12 rounded-xl bg-komora-50 flex items-center justify-center mb-4">
        <Icon size={24} className="text-komora-600" />
      </div>
      <h3 className="text-lg font-semibold text-stone-800 mb-2">{title}</h3>
      <p className="text-sm text-stone-600">{description}</p>
    </div>
  )
}

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-stone-200">
      <div className="text-3xl font-bold text-komora-600">{value}</div>
      <div className="text-sm text-stone-500 mt-1">{label}</div>
    </div>
  )
}
