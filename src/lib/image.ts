// ---------------------------------------------------------------------------
// Downscale an uploaded photo to a small JPEG data URL — entirely on-device
// (canvas). localStorage is ~5 MB, so we cap the long edge (~600px) and use
// JPEG ~0.7. The photo is NEVER uploaded anywhere. (plan.md §7, 10.2)
// ---------------------------------------------------------------------------

function readAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = () => reject(reader.error ?? new Error('Could not read the file'))
    reader.readAsDataURL(file)
  })
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = () => reject(new Error('Could not load the image'))
    img.src = src
  })
}

/** Read → downscale → JPEG data URL. Throws on read/decode failure. */
export async function fileToDownscaledDataUrl(
  file: File,
  maxEdge = 600,
  quality = 0.7,
): Promise<string> {
  const original = await readAsDataUrl(file)
  const img = await loadImage(original)

  const longEdge = Math.max(img.width, img.height) || 1
  const scale = Math.min(1, maxEdge / longEdge)
  const w = Math.max(1, Math.round(img.width * scale))
  const h = Math.max(1, Math.round(img.height * scale))

  const canvas = document.createElement('canvas')
  canvas.width = w
  canvas.height = h
  const ctx = canvas.getContext('2d')
  if (!ctx) return original // very rare — fall back to the original
  ctx.drawImage(img, 0, 0, w, h)

  return canvas.toDataURL('image/jpeg', quality)
}
