/** Approximate common device widths for layout regression checks. */
export const VIEWPORTS = {
  mobileCompact: { width: 367, height: 667, label: 'compact mobile reference viewport' },
  mobile: { width: 375, height: 667, label: 'iPhone SE / compact phone' },
  mobileLarge: { width: 430, height: 932, label: 'large phone' },
  tablet: { width: 768, height: 1024, label: 'tablet' },
  desktop: { width: 1280, height: 800, label: 'desktop' },
}

/**
 * Sets jsdom window size + matchMedia so components/tests can assert
 * mobile-oriented behavior. Tailwind still applies all classes in the DOM;
 * use this when logic or assertions depend on viewport.
 */
export function setViewport({ width, height = 800 } = VIEWPORTS.mobile) {
  Object.defineProperty(window, 'innerWidth', {
    configurable: true,
    writable: true,
    value: width,
  })
  Object.defineProperty(window, 'innerHeight', {
    configurable: true,
    writable: true,
    value: height,
  })

  window.matchMedia = (query) => {
    const minMatch = /min-width:\s*(\d+)px/.exec(query)
    const maxMatch = /max-width:\s*(\d+)px/.exec(query)
    let matches = false

    if (minMatch) matches = width >= Number(minMatch[1])
    if (maxMatch) matches = width <= Number(maxMatch[1])

    return {
      matches,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }
  }

  window.dispatchEvent(new Event('resize'))
}

/** Resolves Tailwind grid-cols utilities at a viewport width for JSDOM tests. */
export function gridColumnsAtWidth(className, width = window.innerWidth) {
  const breakpoints = { base: 0, sm: 640, md: 768, lg: 1024, xl: 1280, '2xl': 1536 }
  const columns = className
    .split(/\s+/)
    .map((token) => {
      const match = /^(?:(sm|md|lg|xl|2xl):)?grid-cols-(\d+)$/.exec(token)
      if (!match) return null

      const breakpoint = match[1] ?? 'base'
      return { minWidth: breakpoints[breakpoint], count: Number(match[2]) }
    })
    .filter((rule) => rule && width >= rule.minWidth)
    .sort((a, b) => a.minWidth - b.minWidth)

  return columns.at(-1)?.count ?? null
}
