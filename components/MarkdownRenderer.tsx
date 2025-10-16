'use client'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

interface MarkdownRendererProps {
  content: string
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <ReactMarkdown
      className="prose prose-lg max-w-none"
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      components={{
        code({ node, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || '')
          const inline = !match
          
          if (inline) {
            return (
              <code className={className} {...props}>
                {children}
              </code>
            )
          }

          return (
            <SyntaxHighlighter
              style={vscDarkPlus}
              language={match[1]}
              PreTag="div"
              {...props}
            >
              {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>
          )
        },
        h1: ({ children }) => (
          <h1 className="text-4xl font-bold mb-6 mt-8">{children}</h1>
        ),
        h2: ({ children }) => (
          <h2 className="text-3xl font-bold mb-5 mt-7">{children}</h2>
        ),
        h3: ({ children }) => (
          <h3 className="text-2xl font-bold mb-4 mt-6">{children}</h3>
        ),
        p: ({ children }) => (
          <p className="mb-4 leading-relaxed text-gray-700">{children}</p>
        ),
        a: ({ href, children }) => (
          <a
            href={href}
            className="text-pink-500 hover:text-pink-600 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {children}
          </a>
        ),
        ul: ({ children }) => (
          <ul className="list-disc list-inside mb-4 space-y-2">{children}</ul>
        ),
        ol: ({ children }) => (
          <ol className="list-decimal list-inside mb-4 space-y-2">{children}</ol>
        ),
        blockquote: ({ children }) => (
          <blockquote className="border-l-4 border-pink-400 pl-4 py-2 my-4 italic bg-pink-50 rounded-r-lg">
            {children}
          </blockquote>
        ),
        img: ({ src, alt }) => (
          <img
            src={src}
            alt={alt || ''}
            className="rounded-xl my-8 w-full"
          />
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  )
}


