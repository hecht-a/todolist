export function removeChildren(parent: HTMLElement): void {
  while (parent.lastChild) {
    parent.removeChild(parent.lastChild)
  }
}
