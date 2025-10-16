import Image from 'next/image'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-pink-50 via-white to-pink-50 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-pink-500 to-pink-300 bg-clip-text text-transparent">
            About Alchira
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            A personal space where creativity meets technology
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <div>
            <h2 className="text-3xl font-bold mb-4">Hello! 👋</h2>
            <p className="text-gray-700 text-lg leading-relaxed mb-4">
              Welcome to Alchira, my personal corner of the internet where I share my thoughts, 
              experiences, and knowledge about technology, lifestyle, and everything that inspires me.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed mb-4">
              This blog was born out of a passion for writing and a desire to document my journey 
              in the world of web development, design, and personal growth. Whether you're here to 
              learn something new, find inspiration, or just enjoy some good reads, I hope you find 
              value in what I share.
            </p>
          </div>

          <div className="bg-gradient-to-br from-pink-50 to-white p-8 rounded-2xl">
            <h2 className="text-3xl font-bold mb-4">What You'll Find Here</h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-pink-500 to-pink-300 flex-shrink-0 mt-1"></div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Technology & Web Development</h3>
                  <p className="text-gray-600">
                    Tutorials, tips, and insights about modern web technologies like React, Next.js, 
                    TypeScript, and more.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-pink-500 to-pink-300 flex-shrink-0 mt-1"></div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Lifestyle & Personal Growth</h3>
                  <p className="text-gray-600">
                    Thoughts on productivity, creativity, and navigating life as a developer and creator.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-pink-500 to-pink-300 flex-shrink-0 mt-1"></div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Design & Creativity</h3>
                  <p className="text-gray-600">
                    Exploring the intersection of design and development, with a focus on creating 
                    beautiful and functional experiences.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-pink-500 to-pink-300 flex-shrink-0 mt-1"></div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Personal Stories</h3>
                  <p className="text-gray-600">
                    Sharing my journey, lessons learned, and experiences that have shaped who I am today.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-4">The Tech Stack</h2>
            <p className="text-gray-700 text-lg leading-relaxed mb-4">
              This blog is built with modern web technologies to ensure a fast, beautiful, 
              and seamless experience:
            </p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center space-x-2">
                <span className="text-pink-500">✓</span>
                <span><strong>Next.js 15</strong> - The React framework for production</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-pink-500">✓</span>
                <span><strong>TypeScript</strong> - For type-safe code</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-pink-500">✓</span>
                <span><strong>Supabase</strong> - Backend and database</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-pink-500">✓</span>
                <span><strong>Tailwind CSS</strong> - For beautiful styling</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-pink-500">✓</span>
                <span><strong>Markdown</strong> - For content authoring</span>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-pink-50 to-white p-8 rounded-2xl text-center">
            <h2 className="text-3xl font-bold mb-4">Let's Connect!</h2>
            <p className="text-gray-700 text-lg mb-6">
              I'd love to hear from you! Whether you have questions, feedback, or just want to say hi, 
              feel free to reach out.
            </p>
            <a
              href="/contact"
              className="inline-block btn-gradient text-white px-8 py-3 rounded-lg font-medium text-lg"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}


