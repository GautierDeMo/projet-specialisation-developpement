let policy = null

export function initTrustedTypes() {
  if (typeof window === 'undefined' || !window.trustedTypes) {
    return {
      createHTML: (html) => html,
    }
  }

  if (policy) {
    return policy
  }

  policy = window.trustedTypes.createPolicy('default', {
    createHTML: (input) => {
      return input
    },
  })

  return policy
}

export function createTrustedHTML(html) {
  const p = initTrustedTypes()
  return p.createHTML(html)
}
