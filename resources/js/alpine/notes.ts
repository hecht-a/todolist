import { Note } from './types'
import { fetchApi } from '../helpers/fetchApi'

const wait = (duration: number) => new Promise((resolve) => window.setTimeout(resolve, duration))

function reloadNotes() {
  fetch('/notes/sidebar')
    .then((response) => response.text())
    .then((data) => {
      const sidebar = document.querySelector('#sidebar')!
      sidebar.outerHTML = data
    })
}

const reset = () => {
  const input = document.querySelector('input')!
  const textarea = document.querySelector('textarea')!
  const selectedNote = document.querySelector<HTMLButtonElement>('.notes button[disabled]')

  if (selectedNote) {
    selectedNote.disabled = false
  }

  input.value = ''
  input.disabled = false
  input.focus()
  textarea.value = ''
  document.querySelector('.buttons')!.classList.add('hidden')
}

export default () => ({
  reset,
  fetchNote(e) {
    const { noteid } = e.target.dataset
    const selected: HTMLButtonElement | null = document.querySelector('button[disabled]')
    if (selected) {
      selected.disabled = false
    }
    e.target.disabled = true

    fetch(`/notes/${noteid}`, { method: 'get' })
      .then((response) => response.json())
      .then((data: Note) => {
        const input = document.querySelector('input')!
        const textarea = document.querySelector('textarea')!

        input.value = data.name
        input.disabled = true
        textarea.value = data.content
        textarea.focus()

        const buttons = document.querySelector<HTMLDivElement>('.buttons')!
        buttons.classList.remove('hidden')
        buttons.dataset.noteid = data.id.toString()
      })
  },
  saveNote(e) {
    const form: HTMLFormElement = e.target
    const fd = new FormData(form)

    fetchApi(
      form.action,
      {
        method: 'post',
        body: fd,
      },
      {
        callback: [reloadNotes],
        notif: true,
      }
    )

    wait(100).then(() => {
      form.querySelector('input')!.disabled = true
      document.querySelector<HTMLButtonElement>(`#sidebar .notes button:last-child`)!.disabled =
        true
    })
  },
  deleteNote() {
    const { noteid } = document.querySelector<HTMLDivElement>('.buttons')!.dataset

    fetchApi(
      `/notes/delete/${noteid}`,
      { method: 'delete' },
      { callback: [reloadNotes, reset], notif: true }
    )
  },
  editNote() {},
  downloadNote() {
    const { note }: { note: Note } = this

    const data = URL.createObjectURL(new Blob([note.content], { type: 'text/plain' }))

    const link = document.createElement('a')
    link.href = data
    link.download = note.name

    link.dispatchEvent(
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        view: window,
      })
    )

    setTimeout(() => {
      URL.revokeObjectURL(data)
      link.remove()
    }, 100)
  },
})
