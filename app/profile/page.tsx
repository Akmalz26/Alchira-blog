import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

export const dynamic = 'force-dynamic'

async function getProfile() {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/login')
  }

  const { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  if (error) {
    console.error('Error fetching profile:', error)
  }

  return { user, profile }
}

async function getUserPosts(userId: string) {
  const supabase = await createClient()
  
  const { data: posts, error } = await supabase
    .from('posts')
    .select('*, category:categories(name, slug)')
    .eq('author_id', userId)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching posts:', error)
    return []
  }

  return posts || []
}

export default async function ProfilePage() {
  const { user, profile } = await getProfile()
  const posts = await getUserPosts(user.id)

  const isAdmin = profile?.role === 'admin'

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-pink-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
            {/* Avatar */}
            <div className="relative">
              {profile?.avatar_url ? (
                <Image
                  src={profile.avatar_url}
                  alt={profile.full_name || 'User'}
                  width={120}
                  height={120}
                  className="rounded-full"
                />
              ) : (
                <div className="w-30 h-30 rounded-full bg-gradient-to-br from-pink-400 to-pink-200 flex items-center justify-center">
                  <span className="text-white text-4xl font-bold">
                    {profile?.full_name?.charAt(0) || user.email?.charAt(0)}
                  </span>
                </div>
              )}
              {isAdmin && (
                <span className="absolute -top-2 -right-2 bg-gradient-to-r from-pink-500 to-pink-300 text-white text-xs px-2 py-1 rounded-full">
                  Admin
                </span>
              )}
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold mb-2">
                {profile?.full_name || 'User'}
              </h1>
              {profile?.username && (
                <p className="text-gray-600 mb-2">@{profile.username}</p>
              )}
              <p className="text-gray-600 mb-4">{user.email}</p>
              {profile?.bio && (
                <p className="text-gray-700 mb-4">{profile.bio}</p>
              )}
              {profile?.website && (
                <a
                  href={profile.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pink-500 hover:text-pink-600 inline-flex items-center space-x-1"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  <span>{profile.website}</span>
                </a>
              )}
            </div>

            {/* Edit Button */}
            <Link
              href="/profile/edit"
              className="btn-gradient text-white px-6 py-2 rounded-lg font-medium"
            >
              Edit Profile
            </Link>
          </div>
        </div>

        {/* Admin Actions */}
        {isAdmin && (
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link
                href="/profile/manage-posts"
                className="card-hover bg-gradient-to-br from-pink-50 to-white p-6 rounded-xl border-2 border-pink-100 text-center"
              >
                <svg className="w-12 h-12 mx-auto mb-3 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                <h3 className="text-lg font-semibold">Manage Posts</h3>
              </Link>

              <Link
                href="/profile/create-post"
                className="card-hover bg-gradient-to-br from-pink-50 to-white p-6 rounded-xl border-2 border-pink-100 text-center"
              >
                <svg className="w-12 h-12 mx-auto mb-3 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <h3 className="text-lg font-semibold">Create Post</h3>
              </Link>

              <Link
                href="/profile/categories"
                className="card-hover bg-gradient-to-br from-pink-50 to-white p-6 rounded-xl border-2 border-pink-100 text-center"
              >
                <svg className="w-12 h-12 mx-auto mb-3 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                <h3 className="text-lg font-semibold">Manage Categories</h3>
              </Link>
            </div>
          </div>
        )}

        {/* User's Posts */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">My Posts</h2>
            {isAdmin && (
              <Link
                href="/profile/create-post"
                className="text-pink-500 hover:text-pink-600 font-medium"
              >
                + New Post
              </Link>
            )}
          </div>

          {posts.length > 0 ? (
            <div className="space-y-4">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-pink-300 transition-colors"
                >
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {post.title}
                    </h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        post.status === 'published'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {post.status}
                      </span>
                      {post.category && (
                        <span>{post.category.name}</span>
                      )}
                      <span>{post.view_count} views</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {post.status === 'published' && (
                      <Link
                        href={`/blog/${post.slug}`}
                        className="px-4 py-2 text-gray-700 hover:text-pink-500 transition-colors"
                      >
                        View
                      </Link>
                    )}
                    {isAdmin && (
                      <Link
                        href={`/profile/edit-post/${post.id}`}
                        className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
                      >
                        Edit
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-600">
              <p>No posts yet.</p>
              {isAdmin && (
                <Link
                  href="/profile/create-post"
                  className="inline-block mt-4 text-pink-500 hover:text-pink-600 font-medium"
                >
                  Create your first post →
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}


