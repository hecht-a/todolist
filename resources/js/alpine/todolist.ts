import { fetchApi } from '../helpers/fetchApi'

function reloadList() {
  fetch('/todolist/items/not-done')
    .then((response) => response.text())
    .then((data) => {
      const notDoneContainer = document.querySelector('.not-done-list')!
      notDoneContainer.outerHTML = data
    })

  fetch('/todolist/items/done')
    .then((response) => response.text())
    .then((data) => {
      const doneContainer = document.querySelector('.done-list')!
      doneContainer.outerHTML = data
    })
}

const getItemId = (elem: HTMLElement): null | number => {
  if (elem.nodeName.toLowerCase() !== 'small') {
    if (!elem.parentElement) {
      return null
    }
    return getItemId(elem.parentElement)
  }

  if (!elem.dataset.noteid) {
    return null
  }

  return parseInt(elem.dataset.noteid)
}

export default () => ({
  isOpen: false,
  show(e) {
    const { url } = e.currentTarget.dataset

    fetchApi<string>(
      url,
      {
        method: 'get',
      },
      { notif: false }
    ).then((response) => {
      const modal = document.querySelector('.modal')!
      modal.insertAdjacentHTML('beforeend', response)
      this.isOpen = true
    })
  },
  hide() {
    const modal = document.querySelector('.modal')!
    modal.lastChild!.remove()

    this.isOpen = false
  },
  createItem(e) {
    const form: HTMLFormElement = e.target
    const fd = new FormData(form)
    fetchApi(form.action, { method: 'post', body: fd }, { callback: reloadList, notif: true })
  },
  deleteItem(e) {
    const { itemid } = e.target.parentNode.dataset

    fetchApi(
      `/todolist/delete/${itemid}`,
      { method: 'delete' },
      { callback: reloadList, notif: true }
    )
  },
  switchState(e) {
    const { itemid } = e.target.parentNode.dataset

    fetchApi(
      `/todolist/switch/${itemid}`,
      { method: 'put' },
      { notif: false, callback: reloadList }
    )
  },
})
