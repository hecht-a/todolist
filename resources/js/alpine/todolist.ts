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

export default () => ({
  isOpen: false,
  show() {
    this.isOpen = true
  },
  hide() {
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
