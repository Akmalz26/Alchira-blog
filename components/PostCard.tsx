import Link from 'next/link'
import Image from 'next/image'
import { formatDistanceToNow } from 'date-fns'

interface PostCardProps {
  post: {
    id: string
    title: string
    slug: string
    excerpt: string | null
    featured_image: string | null
    published_at: string | null
    view_count: number
    category?: {
      name: string
      slug: string
    } | null
    author?: {
      full_name: string | null
      avatar_url: string | null
    }
  }
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <article className="card-hover bg-white rounded-xl shadow-md overflow-hidden">
      {post.featured_image && (
        <Link href={`/blog/${post.slug}`}>
          <div className="relative h-48 w-full overflow-hidden">
            <Image
              src={post.featured_image}
              alt={post.title}
              fill
              className="object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        </Link>
      )}
      <div className="p-6">
        {post.category && (
          <Link
            href={`/kategori/${post.category.slug}`}
            className="inline-block px-3 py-1 text-xs font-medium text-pink-600 bg-pink-50 rounded-full hover:bg-pink-100 transition-colors mb-3"
          >
            {post.category.name}
          </Link>
        )}
        <Link href={`/blog/${post.slug}`}>
          <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-pink-500 transition-colors line-clamp-2">
            {post.title}
          </h3>
        </Link>
        {post.excerpt && (
          <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
        )}
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-2">
            {post.author?.avatar_url ? (
              <Image
                src={post.author.avatar_url}
                alt={post.author.full_name || 'Author'}
                width={24}
                height={24}
                className="rounded-full"
              />
            ) : (
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-pink-400 to-pink-200"></div>
            )}
            <span>{post.author?.full_name || 'Anonymous'}</span>
          </div>
          <div className="flex items-center space-x-4">
            {post.published_at && (
              <span>{formatDistanceToNow(new Date(post.published_at), { addSuffix: true })}</span>
            )}
            <span className="flex items-center space-x-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <span>{post.view_count}</span>
            </span>
          </div>
        </div>
      </div>
    </article>
  )
}


