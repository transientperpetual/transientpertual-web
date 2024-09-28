'use client'

import React, { useEffect, useState } from 'react'
import mermaid from 'mermaid'

const MermaidComponent = ({ code }) => {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    mermaid.initialize({
      startOnLoad: true,
      // look: 'handDrawn',
      theme: 'dark',
      securityLevel: 'loose',
    })
  }, [])

  useEffect(() => {
    if (isClient) {
      mermaid.contentLoaded()
    }
  }, [code, isClient])

  // render only if in the client
  if (!isClient) {
    return null
  }

  return <div className="mermaid" dangerouslySetInnerHTML={{ __html: code }} />
}

export default MermaidComponent
