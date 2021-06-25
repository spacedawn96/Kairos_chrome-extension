export function isBackgroundPage(): boolean {
  return window.innerHeight === 0 && window.innerWidth === 0
}

if (isBackgroundPage()) {
  console.log('[INFO] Script is loaded as a background page')
  import('./background/index')
} else {
  console.log('[INFO] Script is not loaded as a background page')
  import('./Render')
}
