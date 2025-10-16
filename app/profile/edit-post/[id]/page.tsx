'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import dynamic from 'next/dynamic'

// Dynamic import TinyMCE to avoid SSR issues
const TinyMCEEditor = dynamic(() => import('@/components/TinyMCEEditor'), {
  ssr: false,
  loading: () => <div className="w-full h-96 bg-gray-100 rounded-lg animate-pulse"></div>
})

export default function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [categories, setCategories] = useState<any[]>([])
  const [tags, setTags] = useState<any[]>([])
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [newTagName, setNewTagName] = useState('')
  const [showAddTag, setShowAddTag] = useState(false)
  const [post, setPost] = useState({
    id: '',
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    featured_image: '',
    category_id: '',
    status: 'draft',
  })
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    checkAuth()
    loadData()
  }, [])

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      router.push('/login')
      return
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if (profile?.role !== 'admin') {
      toast.error('You do not have permission to edit posts')
      router.push('/profile')
    }
  }

  const loadData = async () => {
    try {
      const { id } = await params
      
      // Load post data
      const { data: postData, error: postError } = await supabase
        .from('posts')
        .select(`
          *,
          post_tags(tag:tags(id, name, slug))
        `)
        .eq('id', id)
        .single()

      if (postError || !postData) {
        toast.error('Post not found')
        router.push('/profile')
        return
      }

      // Set post data
      setPost({
        id: postData.id,
        title: postData.title,
        slug: postData.slug,
        content: postData.content,
        excerpt: postData.excerpt || '',
        featured_image: postData.featured_image || '',
        category_id: postData.category_id || '',
        status: postData.status,
      })

      // Set selected tags
      const postTags = postData.post_tags?.map((pt: any) => pt.tag.id) || []
      setSelectedTags(postTags)

      // Load categories and tags
      const [categoriesRes, tagsRes] = await Promise.all([
        supabase.from('categories').select('*').order('name'),
        supabase.from('tags').select('*').order('name')
      ])

      if (categoriesRes.data) setCategories(categoriesRes.data)
      if (tagsRes.data) setTags(tagsRes.data)
    } catch (error) {
      console.error('Error loading data:', error)
      toast.error('Failed to load post data')
    } finally {
      setLoading(false)
    }
  }

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/(^-|-$)/g, '')
  }

  const handleTitleChange = (title: string) => {
    setPost({
      ...post,
      title,
      slug: generateSlug(title),
    })
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}-${Math.random()}.${fileExt}`
      const filePath = `${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('post-images')
        .upload(filePath, file)

      if (uploadError) throw uploadError

      const { data: { publicUrl } } = supabase.storage
        .from('post-images')
        .getPublicUrl(filePath)

      setPost(prev => ({ ...prev, featured_image: publicUrl }))
      toast.success('Image uploaded!')
    } catch (error) {
      console.error('Error uploading image:', error)
      toast.error('Failed to upload image')
    } finally {
      setUploading(false)
    }
  }

  const handleAddTag = async () => {
    if (!newTagName.trim()) {
      toast.error('Tag name cannot be empty')
      return
    }

    try {
      const slug = generateSlug(newTagName)
      
      // Check if tag already exists
      const existing = tags.find(t => t.slug === slug)
      if (existing) {
        if (!selectedTags.includes(existing.id)) {
          setSelectedTags([...selectedTags, existing.id])
        }
        setNewTagName('')
        setShowAddTag(false)
        toast.success('Tag added to post')
        return
      }

      // Create new tag
      const { data: newTag, error } = await supabase
        .from('tags')
        .insert({ name: newTagName.trim(), slug })
        .select()
        .single()

      if (error) throw error

      setTags([...tags, newTag])
      setSelectedTags([...selectedTags, newTag.id])
      setNewTagName('')
      setShowAddTag(false)
      toast.success('New tag created and added!')
    } catch (error: any) {
      console.error('Error adding tag:', error)
      toast.error(error.message || 'Failed to add tag')
    }
  }

  const handleRemoveTag = (tagId: string) => {
    setSelectedTags(selectedTags.filter(id => id !== tagId))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      // Update post
      const { error: postError } = await supabase
        .from('posts')
        .update({
          title: post.title,
          slug: post.slug,
          content: post.content,
          excerpt: post.excerpt,
          featured_image: post.featured_image,
          category_id: post.category_id || null,
          status: post.status,
          published_at: post.status === 'published' ? new Date().toISOString() : null,
          updated_at: new Date().toISOString(),
        })
        .eq('id', post.id)

      if (postError) throw postError

      // Update tags
      // First, remove all existing tags
      await supabase
        .from('post_tags')
        .delete()
        .eq('post_id', post.id)

      // Then add selected tags
      if (selectedTags.length > 0) {
        const postTags = selectedTags.map(tagId => ({
          post_id: post.id,
          tag_id: tagId,
        }))

        const { error: tagsError } = await supabase
          .from('post_tags')
          .insert(postTags)

        if (tagsError) console.error('Error updating tags:', tagsError)
      }

      toast.success('Post updated successfully!')
      router.push('/profile')
    } catch (error: any) {
      console.error('Error updating post:', error)
      toast.error(error.message || 'Failed to update post')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-pink-50 py-12 flex items-center justify-center">
        <div className="animate-pulse-pink text-pink-500 text-lg">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-pink-50 py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Edit Post</h1>
            <button
              onClick={() => router.push('/profile')}
              className="text-gray-600 hover:text-pink-500 transition-colors"
            >
              ← Back to Profile
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title *
              </label>
              <input
                type="text"
                required
                value={post.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-pink-400 focus:outline-none transition-colors"
                placeholder="Enter post title"
              />
            </div>

            {/* Slug */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Slug *
              </label>
              <input
                type="text"
                required
                value={post.slug}
                onChange={(e) => setPost({ ...post, slug: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-pink-400 focus:outline-none transition-colors"
                placeholder="post-url-slug"
              />
            </div>

            {/* Excerpt */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Excerpt
              </label>
              <textarea
                value={post.excerpt}
                onChange={(e) => setPost({ ...post, excerpt: e.target.value })}
                rows={3}
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-pink-400 focus:outline-none transition-colors"
                placeholder="Brief description of your post"
              />
            </div>

            {/* Content with TinyMCE */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content *
              </label>
              <TinyMCEEditor
                value={post.content}
                onChange={(content) => setPost({ ...post, content })}
                height={500}
              />
            </div>

            {/* Featured Image */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Featured Image
              </label>
              <div className="space-y-2">
                {post.featured_image && (
                  <div className="relative w-full h-64 rounded-lg overflow-hidden">
                    <img
                      src={post.featured_image}
                      alt="Featured"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => setPost({ ...post, featured_image: '' })}
                      className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                )}
                <label className="cursor-pointer inline-block btn-gradient text-white px-6 py-2 rounded-lg font-medium">
                  {uploading ? 'Uploading...' : post.featured_image ? 'Change Image' : 'Upload Image'}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={uploading}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                value={post.category_id}
                onChange={(e) => setPost({ ...post, category_id: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-pink-400 focus:outline-none transition-colors"
                aria-label="Select category"
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tags
              </label>
              
              {/* Selected Tags */}
              {selectedTags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {selectedTags.map((tagId) => {
                    const tag = tags.find(t => t.id === tagId)
                    return tag ? (
                      <span
                        key={tagId}
                        className="inline-flex items-center space-x-2 px-3 py-1 bg-gradient-to-r from-pink-500 to-pink-300 text-white rounded-full text-sm"
                      >
                        <span>{tag.name}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveTag(tagId)}
                          className="hover:bg-white/20 rounded-full p-0.5"
                          aria-label={`Remove ${tag.name} tag`}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </span>
                    ) : null
                  })}
                </div>
              )}

              {/* Existing Tags */}
              <div className="flex flex-wrap gap-2 mb-3">
                {tags.filter(tag => !selectedTags.includes(tag.id)).map((tag) => (
                  <button
                    key={tag.id}
                    type="button"
                    onClick={() => setSelectedTags([...selectedTags, tag.id])}
                    className="px-4 py-2 rounded-full bg-gray-100 text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-colors"
                  >
                    + {tag.name}
                  </button>
                ))}
              </div>

              {/* Add New Tag */}
              {!showAddTag ? (
                <button
                  type="button"
                  onClick={() => setShowAddTag(true)}
                  className="text-pink-500 hover:text-pink-600 font-medium text-sm flex items-center space-x-1"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  <span>Create New Tag</span>
                </button>
              ) : (
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newTagName}
                    onChange={(e) => setNewTagName(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                    placeholder="New tag name"
                    className="flex-1 px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-pink-400 focus:outline-none transition-colors"
                  />
                  <button
                    type="button"
                    onClick={handleAddTag}
                    className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
                  >
                    Add
                  </button>
                  <button
                    type="button"
                    onClick={() => { setShowAddTag(false); setNewTagName('') }}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <div className="flex space-x-4">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    value="draft"
                    checked={post.status === 'draft'}
                    onChange={(e) => setPost({ ...post, status: e.target.value })}
                    className="text-pink-500"
                  />
                  <span>Draft</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    value="published"
                    checked={post.status === 'published'}
                    onChange={(e) => setPost({ ...post, status: e.target.value })}
                    className="text-pink-500"
                  />
                  <span>Published</span>
                </label>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex space-x-4">
              <button
                type="submit"
                disabled={saving}
                className="flex-1 btn-gradient text-white py-3 rounded-lg font-medium disabled:opacity-50"
              >
                {saving ? 'Updating...' : 'Update Post'}
              </button>
              <button
                type="button"
                onClick={() => router.push('/profile')}
                className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
