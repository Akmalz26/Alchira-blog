'use client'

import { Editor } from '@tinymce/tinymce-react'
import { useRef } from 'react'

interface TinyMCEEditorProps {
  value: string
  onChange: (content: string) => void
  height?: number
}

export default function TinyMCEEditor({ value, onChange, height = 500 }: TinyMCEEditorProps) {
  const editorRef = useRef<any>(null)

  return (
    <Editor
      apiKey="us5k11n22fvccimhy645zjsiqgkl4l5du8597i653h7qqni0" // Using no-api-key for development (will show a notification)
      onInit={(evt, editor) => editorRef.current = editor}
      value={value}
      onEditorChange={onChange}
      init={{
        height: height,
        menubar: true,
        plugins: [
          'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
          'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
          'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
        ],
        toolbar: 'undo redo | blocks | ' +
          'bold italic forecolor | alignleft aligncenter ' +
          'alignright alignjustify | bullist numlist outdent indent | ' +
          'removeformat | link image | code | help',
        content_style: `
          body { 
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            font-size: 16px;
            line-height: 1.6;
            color: #1a1a1a;
          }
          h1, h2, h3, h4, h5, h6 {
            font-family: 'Playfair Display', serif !important;
            font-weight: bold !important;
            color: #1a1a1a !important;
            margin-top: 2rem !important;
            margin-bottom: 1rem !important;
          }
          h1 { font-size: 2.25rem !important; line-height: 1.1 !important; }
          h2 { font-size: 1.875rem !important; line-height: 1.2 !important; }
          h3 { font-size: 1.5rem !important; line-height: 1.3 !important; }
          h4 { font-size: 1.25rem !important; line-height: 1.4 !important; }
          h5 { font-size: 1.125rem !important; line-height: 1.4 !important; }
          h6 { font-size: 1rem !important; line-height: 1.5 !important; }
          img {
            max-width: 100%;
            height: auto;
            border-radius: 12px;
            margin: 2rem 0;
          }
          code {
            background: #f8f9fa;
            padding: 0.2rem 0.4rem;
            border-radius: 4px;
            font-size: 0.9em;
          }
          pre {
            background: #1e1e1e;
            color: #fff;
            border-radius: 12px;
            padding: 1.5rem;
            overflow-x: auto;
          }
          blockquote {
            border-left: 4px solid #ff6b9d;
            padding-left: 1rem;
            margin: 1rem 0;
            font-style: italic;
            background: #fff0f5;
            padding: 1rem;
            border-radius: 0 12px 12px 0;
          }
          a {
            color: #ff6b9d;
            text-decoration: underline;
          }
        `,
        skin: 'oxide',
        content_css: 'default',
        branding: false,
        promotion: false,
      }}
    />
  )
}

