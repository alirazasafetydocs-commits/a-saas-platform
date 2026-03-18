import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-6">
            AI Powered SaaS Platform
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Generate professional resumes, cover letters, HSE documents, websites and more with AI. 
            Premium templates and unlimited downloads for VIP users.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register" className="bg-primary hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all">
              Get Started Free
            </Link>
            <Link href="/pricing" className="border-2 border-accent text-accent px-8 py-4 rounded-xl font-semibold text-lg hover:bg-accent hover:text-white transition-all">
              View Pricing
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
