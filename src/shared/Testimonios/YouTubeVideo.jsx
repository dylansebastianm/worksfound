'use client'

import React, { useState } from 'react'
import { FaYoutube } from 'react-icons/fa'
import styles from './youtubeVideo.module.css'

const THUMB_HQ = (id) => `https://img.youtube.com/vi/${id}/hqdefault.jpg`
const THUMB_MAX = (id) => `https://img.youtube.com/vi/${id}/maxresdefault.jpg`

export function YouTubeVideo({ videoId, width = 560, height = 400, className = '', thumbnailFirst = false }) {
  const [playing, setPlaying] = useState(!thumbnailFirst)
  const [thumbSrc, setThumbSrc] = useState(THUMB_MAX(videoId))

  const onThumbError = () => setThumbSrc(THUMB_HQ(videoId))

  if (thumbnailFirst && !playing) {
    return (
      <div
        className={`${styles.container} ${styles.thumbnailWrap} ${className}`}
        style={{ width: `${width}px`, height: `${height}px` }}
        onClick={() => setPlaying(true)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && setPlaying(true)}
        aria-label="Reproducir video"
      >
        <img
          src={thumbSrc}
          alt=""
          width={width}
          height={height}
          className={styles.thumbnail}
          onError={onThumbError}
          loading="lazy"
          decoding="async"
        />
        <div className={styles.playOverlay} aria-hidden>
          <FaYoutube className={styles.playIcon} />
        </div>
      </div>
    )
  }

  return (
    <div className={`${styles.container} ${className}`} style={{ width: `${width}px`, height: `${height}px` }}>
      <iframe
        width={width}
        height={height}
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className={styles.iframe}
      />
    </div>
  )
}

