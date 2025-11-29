'use client'

import React from 'react'
import styles from './youtubeVideo.module.css'

export function YouTubeVideo({ videoId, width = 560, height = 400, className = '' }) {
  return (
    <div className={`${styles.container} ${className}`} style={{ height: `${height}px` }}>
      <iframe
        width={width}
        height={height}
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className={styles.iframe}
      />
    </div>
  )
}

