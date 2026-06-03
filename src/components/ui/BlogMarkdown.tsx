'use client'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'

interface BlogMarkdownProps {
  content: string
}

export function BlogMarkdown({ content }: BlogMarkdownProps) {
  const normalizedContent = content
    .replace(/\\n/g, '\n')
    .replace(/\r\n/g, '\n')

  return (
    <div className="prose prose-neutral dark:prose-invert max-w-none
      prose-headings:scroll-mt-20
      prose-h1:text-2xl prose-h1:font-bold prose-h1:mt-8 prose-h1:mb-3
      prose-h2:text-xl prose-h2:font-semibold prose-h2:mt-6 prose-h2:mb-2 prose-h2:pb-2 prose-h2:border-b prose-h2:border-border
      prose-h3:text-lg prose-h3:font-medium prose-h3:mt-5 prose-h3:mb-2
      prose-h4:text-base prose-h4:font-medium prose-h4:mt-4 prose-h4:mb-2
      prose-p:text-sm prose-p:leading-7 prose-p:mt-3 prose-p:mb-3
      prose-li:text-sm prose-li:leading-7
      prose-strong:text-foreground prose-strong:font-semibold
      prose-ul:mt-3 prose-ul:mb-3 prose-ul:pl-5
      prose-ol:mt-3 prose-ol:mb-3 prose-ol:pl-5
      prose-blockquote:mt-4 prose-blockquote:mb-4
      prose-pre:mt-4 prose-pre:mb-4
      prose-table:mt-4 prose-table:mb-4
      prose-th:text-left prose-th:font-medium prose-th:text-xs
      prose-td:text-xs
    ">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          img: ({ src, alt, ...props }) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={src} alt={alt || ''} className="rounded-lg mx-auto" loading="lazy" {...props} />
          ),
          a: ({ href, children, ...props }) => (
            <a
              href={href}
              target={href?.startsWith('http') ? '_blank' : undefined}
              rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="text-primary hover:underline"
              {...props}
            >
              {children}
            </a>
          ),
          pre: ({ children, ...props }) => (
            <pre className="rounded-lg border border-border bg-card p-4 overflow-x-auto text-xs" {...props}>
              {children}
            </pre>
          ),
          code: ({ className, children, ...props }) => {
            const isInline = !className
            return isInline ? (
              <code className="bg-muted text-primary px-1.5 py-0.5 rounded text-xs font-mono" {...props}>
                {children}
              </code>
            ) : (
              <code className="text-xs font-mono" {...props}>
                {children}
              </code>
            )
          },
          hr: () => <hr className="my-6 border-border" />,
        }}
      >
        {normalizedContent}
      </ReactMarkdown>
    </div>
  )
}
