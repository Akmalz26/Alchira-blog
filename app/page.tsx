import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import PostCard from '@/components/PostCard'

export const dynamic = 'force-dynamic'

async function getRecentPosts() {
  const supabase = await createClient()
  
  const { data: posts, error } = await supabase
    .from('posts')
    .select(`
      *,
      category:categories(name, slug),
      author:profiles(full_name, avatar_url)
    `)
    .eq('status', 'published')
    .order('published_at', { ascending: false })
    .limit(6)

  if (error) {
    console.error('Error fetching posts:', error)
    return []
  }

  return posts
}

async function getPopularCategories() {
  const supabase = await createClient()
  
  const { data: categories, error } = await supabase
    .from('categories')
    .select('*')
    .limit(4)

  if (error) {
    console.error('Error fetching categories:', error)
    return []
  }

  return categories
}

export default async function Home() {
  const [posts, categories] = await Promise.all([
    getRecentPosts(),
    getPopularCategories()
  ])

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-pink-50 via-white to-pink-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-pink-500 to-pink-300 bg-clip-text text-transparent">
              Welcome to Alchira
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Ruang pribadi tempat saya berbagi pemikiran, pengalaman, gaya hidup, dan segala hal yang menginspirasi saya.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/blog"
                className="btn-gradient text-white px-8 py-3 rounded-lg font-medium text-lg inline-block"
              >
                Explore Blog
              </Link>
              <Link
                href="/about"
                className="bg-white text-gray-700 px-8 py-3 rounded-lg font-medium text-lg inline-block border-2 border-gray-200 hover:border-pink-300 transition-colors"
              >
                About Me
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      {categories.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Explore Topics</h2>
              <p className="text-gray-600">Browse articles by category</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/kategori/${category.slug}`}
                  className="group"
                >
                  <div className="card-hover bg-gradient-to-br from-pink-50 to-white p-6 rounded-xl border-2 border-pink-100 text-center">
                    <h3 className="text-xl font-semibold text-gray-900 group-hover:text-pink-500 transition-colors">
                      {category.name}
                    </h3>
                    {category.description && (
                      <p className="text-gray-600 text-sm mt-2">{category.description}</p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Recent Posts Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">Latest Posts</h2>
              <p className="text-gray-600">Fresh content, just for you</p>
            </div>
            <Link
              href="/blog"
              className="text-pink-500 hover:text-pink-600 font-medium flex items-center space-x-2"
            >
              <span>View All</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No posts yet. Check back soon!</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Stay Connected</h2>
          <p className="text-gray-600 mb-8">
            Get the latest updates and articles delivered straight to your inbox
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-pink-400 focus:outline-none transition-colors"
            />
            <button className="btn-gradient text-white px-6 py-3 rounded-lg font-medium whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
