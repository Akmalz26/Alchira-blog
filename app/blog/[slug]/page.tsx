import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'
import PostCard from '@/components/PostCard'
import ShareButton from '@/components/ShareButton'

export const dynamic = 'force-dynamic'

async function getPost(slug: string) {
  const supabase = await createClient()

  const { data: post, error } = await supabase
    .from('posts')
    .select(`
      *,
      category:categories(name, slug),
      author:profiles(full_name, avatar_url, bio),
      post_tags(tag:tags(name, slug))
    `)
    .eq('slug', slug)
    .eq('status', 'published')
    .single()

  if (error || !post) {
    return null
  }

  // Increment view count
  await supabase.rpc('increment_post_views', { post_id: post.id })

  return post
}

async function getRelatedPosts(postId: string, categoryId: string | null) {
  const supabase = await createClient()

  let query = supabase
    .from('posts')
    .select(`
      *,
      category:categories(name, slug),
      author:profiles(full_name, avatar_url)
    `)
    .eq('status', 'published')
    .neq('id', postId)
    .limit(3)

  if (categoryId) {
    query = query.eq('category_id', categoryId)
  }

  const { data: posts, error } = await query.order('published_at', { ascending: false })

  if (error) {
    console.error('Error fetching related posts:', error)
    return []
  }

  return posts || []
}

async function getComments(postId: string) {
  const supabase = await createClient()

  const { data: comments, error } = await supabase
    .from('comments')
    .select(`
      *,
      user:profiles(full_name, avatar_url)
    `)
    .eq('post_id', postId)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching comments:', error)
    return []
  }

  return comments || []
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) {
    notFound()
  }

  const [relatedPosts, comments] = await Promise.all([
    getRelatedPosts(post.id, post.category_id),
    getComments(post.id)
  ])

  const tags = post.post_tags?.map((pt: any) => pt.tag) || []

  return (
    <div className="min-h-screen bg-white">
      {/* Featured Image */}
      {post.featured_image && (
        <div className="relative w-full h-[400px] md:h-[500px]">
          <Image
            src={post.featured_image}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        </div>
      )}

      {/* Post Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category */}
        {post.category && (
          <Link
            href={`/kategori/${post.category.slug}`}
            className="inline-block px-4 py-2 text-sm font-medium text-pink-600 bg-pink-50 rounded-full hover:bg-pink-100 transition-colors mb-4"
          >
            {post.category.name}
          </Link>
        )}

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
          {post.title}
        </h1>

        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-6 mb-8 pb-8 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            {post.author?.avatar_url ? (
              <Image
                src={post.author.avatar_url}
                alt={post.author.full_name || 'Author'}
                width={48}
                height={48}
                className="rounded-full"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-400 to-pink-200"></div>
            )}
            <div>
              <p className="font-medium text-gray-900">{post.author?.full_name || 'Anonymous'}</p>
              <p className="text-sm text-gray-600">
                {post.published_at && formatDistanceToNow(new Date(post.published_at), { addSuffix: true })}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-1 text-gray-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            <span>{post.view_count} views</span>
          </div>
        </div>

         {/* Content */}
         <div 
           className="mb-12 prose prose-lg max-w-none
             prose-headings:font-['Playfair_Display'] prose-headings:font-bold prose-headings:text-gray-900
             prose-h1:text-4xl prose-h1:mb-6 prose-h1:mt-8 prose-h1:leading-tight
             prose-h2:text-3xl prose-h2:mb-4 prose-h2:mt-6 prose-h2:leading-tight
             prose-h3:text-2xl prose-h3:mb-3 prose-h3:mt-5 prose-h3:leading-tight
             prose-h4:text-xl prose-h4:mb-2 prose-h4:mt-4 prose-h4:leading-tight
             prose-h5:text-lg prose-h5:mb-2 prose-h5:mt-3 prose-h5:leading-tight
             prose-h6:text-base prose-h6:mb-2 prose-h6:mt-3 prose-h6:leading-tight
             prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4
             prose-a:text-pink-500 prose-a:no-underline hover:prose-a:underline
             prose-img:rounded-xl prose-img:my-8 prose-img:shadow-lg
             prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm
             prose-pre:bg-gray-900 prose-pre:rounded-xl prose-pre:text-gray-100 prose-pre:p-4
             prose-blockquote:border-l-4 prose-blockquote:border-pink-400 
             prose-blockquote:bg-pink-50 prose-blockquote:italic prose-blockquote:rounded-r-lg prose-blockquote:p-4 prose-blockquote:my-6
             prose-ul:list-disc prose-ul:pl-6 prose-ul:mb-4
             prose-ol:list-decimal prose-ol:pl-6 prose-ol:mb-4
             prose-li:mb-2 prose-li:text-gray-700
             prose-strong:font-semibold prose-strong:text-gray-900
             prose-em:italic prose-em:text-gray-700
             prose-table:border-collapse prose-table:w-full prose-table:my-6
             prose-th:border prose-th:border-gray-300 prose-th:px-4 prose-th:py-2 prose-th:bg-gray-50 prose-th:font-semibold
             prose-td:border prose-td:border-gray-300 prose-td:px-4 prose-td:py-2"
           dangerouslySetInnerHTML={{ __html: post.content }}
         />

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {tags.map((tag: any) => (
              <Link
                key={tag.slug}
                href={`/tag/${tag.slug}`}
                className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-pink-50 hover:text-pink-600 transition-colors"
              >
                #{tag.name}
              </Link>
            ))}
          </div>
        )}

        {/* Share Buttons */}
        {/* <div className="flex items-center space-x-4 mb-12 pb-8 border-b border-gray-200">
          <span className="font-medium text-gray-900">Share:</span>
          <ShareButton postTitle={post.title} />
        </div> */}

        {/* Author Bio */}
        {post.author?.bio && (
          <div className="bg-gradient-to-br from-pink-50 to-white p-6 rounded-xl mb-12">
            <h3 className="font-semibold text-lg mb-3">About the Author</h3>
            <div className="flex items-start space-x-4">
              {post.author?.avatar_url ? (
                <Image
                  src={post.author.avatar_url}
                  alt={post.author.full_name || 'Author'}
                  width={64}
                  height={64}
                  className="rounded-full"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-400 to-pink-200 flex-shrink-0"></div>
              )}
              <div>
                <p className="font-medium text-gray-900 mb-1">{post.author?.full_name}</p>
                <p className="text-gray-600">{post.author.bio}</p>
              </div>
            </div>
          </div>
        )}

        {/* Comments Section */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold mb-6">Comments ({comments.length})</h3>
          {comments.length > 0 ? (
            <div className="space-y-6">
              {comments.map((comment: any) => (
                <div key={comment.id} className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-start space-x-3">
                    {comment.user?.avatar_url ? (
                      <Image
                        src={comment.user.avatar_url}
                        alt={comment.user.full_name || 'User'}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-pink-200"></div>
                    )}
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-medium text-gray-900">{comment.user?.full_name || 'Anonymous'}</p>
                        <p className="text-sm text-gray-600">
                          {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}
                        </p>
                      </div>
                      <p className="text-gray-700">{comment.content}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No comments yet. Be the first to comment!</p>
          )}
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="bg-gradient-to-br from-gray-50 to-pink-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-8">Related Posts</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost) => (
                <PostCard key={relatedPost.id} post={relatedPost} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}


