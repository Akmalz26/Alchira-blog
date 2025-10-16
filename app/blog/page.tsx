import { createClient } from '@/lib/supabase/server'
import PostCard from '@/components/PostCard'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

interface SearchParams {
  page?: string
  category?: string
  sort?: string
}

async function getPosts(searchParams: SearchParams) {
  const supabase = await createClient()
  const page = parseInt(searchParams.page || '1')
  const pageSize = 9
  const offset = (page - 1) * pageSize

  let query = supabase
    .from('posts')
    .select(`
      *,
      category:categories(name, slug),
      author:profiles(full_name, avatar_url)
    `, { count: 'exact' })
    .eq('status', 'published')

  // Apply category filter
  if (searchParams.category) {
    query = query.eq('category.slug', searchParams.category)
  }

  // Apply sorting
  if (searchParams.sort === 'popular') {
    query = query.order('view_count', { ascending: false })
  } else {
    query = query.order('published_at', { ascending: false })
  }

  const { data: posts, error, count } = await query
    .range(offset, offset + pageSize - 1)

  if (error) {
    console.error('Error fetching posts:', error)
    return { posts: [], totalPages: 0 }
  }

  const totalPages = Math.ceil((count || 0) / pageSize)

  return { posts: posts || [], totalPages }
}

async function getCategories() {
  const supabase = await createClient()
  
  const { data: categories, error } = await supabase
    .from('categories')
    .select('*')
    .order('name')

  if (error) {
    console.error('Error fetching categories:', error)
    return []
  }

  return categories
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  const params = await searchParams
  const [{ posts, totalPages }, categories] = await Promise.all([
    getPosts(params),
    getCategories()
  ])

  const currentPage = parseInt(params.page || '1')
  const currentSort = params.sort || 'latest'

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-pink-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog</h1>
          <p className="text-gray-600 text-lg">
            Explore articles, tutorials, and thoughts
          </p>
        </div>

        {/* Categories Filter */}
        {categories.length > 0 && (
          <div className="mb-8 flex flex-wrap gap-3 justify-center">
            <Link
              href="/blog"
              className={`px-4 py-2 rounded-full transition-colors ${
                !params.category
                  ? 'bg-gradient-to-r from-pink-500 to-pink-300 text-white'
                  : 'bg-white text-gray-700 hover:bg-pink-50'
              }`}
            >
              All
            </Link>
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/blog?category=${category.slug}`}
                className={`px-4 py-2 rounded-full transition-colors ${
                  params.category === category.slug
                    ? 'bg-gradient-to-r from-pink-500 to-pink-300 text-white'
                    : 'bg-white text-gray-700 hover:bg-pink-50'
                }`}
              >
                {category.name}
              </Link>
            ))}
          </div>
        )}

        {/* Sort Options */}
        <div className="mb-8 flex justify-end">
          <div className="flex items-center space-x-2">
            <span className="text-gray-600">Sort by:</span>
            <Link
              href={`/blog?sort=latest${params.category ? `&category=${params.category}` : ''}`}
              className={`px-4 py-2 rounded-lg transition-colors ${
                currentSort === 'latest'
                  ? 'bg-pink-500 text-white'
                  : 'bg-white text-gray-700 hover:bg-pink-50'
              }`}
            >
              Latest
            </Link>
            <Link
              href={`/blog?sort=popular${params.category ? `&category=${params.category}` : ''}`}
              className={`px-4 py-2 rounded-lg transition-colors ${
                currentSort === 'popular'
                  ? 'bg-pink-500 text-white'
                  : 'bg-white text-gray-700 hover:bg-pink-50'
              }`}
            >
              Popular
            </Link>
          </div>
        </div>

        {/* Posts Grid */}
        {posts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center space-x-2">
                {currentPage > 1 && (
                  <Link
                    href={`/blog?page=${currentPage - 1}${params.category ? `&category=${params.category}` : ''}${params.sort ? `&sort=${params.sort}` : ''}`}
                    className="px-4 py-2 rounded-lg bg-white text-gray-700 hover:bg-pink-50 transition-colors"
                  >
                    Previous
                  </Link>
                )}
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                  <Link
                    key={pageNum}
                    href={`/blog?page=${pageNum}${params.category ? `&category=${params.category}` : ''}${params.sort ? `&sort=${params.sort}` : ''}`}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      currentPage === pageNum
                        ? 'bg-gradient-to-r from-pink-500 to-pink-300 text-white'
                        : 'bg-white text-gray-700 hover:bg-pink-50'
                    }`}
                  >
                    {pageNum}
                  </Link>
                ))}

                {currentPage < totalPages && (
                  <Link
                    href={`/blog?page=${currentPage + 1}${params.category ? `&category=${params.category}` : ''}${params.sort ? `&sort=${params.sort}` : ''}`}
                    className="px-4 py-2 rounded-lg bg-white text-gray-700 hover:bg-pink-50 transition-colors"
                  >
                    Next
                  </Link>
                )}
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12 bg-white rounded-xl shadow-md">
            <p className="text-gray-600 text-lg">No posts found.</p>
          </div>
        )}
      </div>
    </div>
  )
}


