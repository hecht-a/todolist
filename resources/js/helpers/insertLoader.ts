export async function insertLoader(element: string, fn: () => Promise<void> | void): Promise<void> {
  const targetElement = document.querySelector(element)
  if (!targetElement) {
    return
  }

  targetElement.insertAdjacentHTML(
    'beforeend',
    "<div class='loader'><div class='lds-roller'><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div>"
  )

  await fn()

  const loader = document.querySelector('.loader')
  if (loader) {
    loader.remove()
  }
}
