const UP = 'UP'
const DOWN = 'DOWN'

const getNextSibling = (elem, selector) => {
	let sibling = elem.nextElementSibling

	if (!selector) return sibling

	while (sibling) {
		if (sibling.matches(selector)) return sibling
		sibling = sibling.nextElementSibling
	}
}

const getPreviousSibling = (elem, selector) => {
	let sibling = elem.previousElementSibling

	if (!selector) return sibling

	while (sibling) {
		if (sibling.matches(selector)) return sibling
		sibling = sibling.previousElementSibling
	}
}

const handleEvent = event => {
  let to
  switch (event.type) {
    case 'wheel':
      if (event.deltaY > 0) to = DOWN
      else if (event.deltaY < 0) to = UP
      break
    case 'keydown':
      if (event.code === 'ArrowDown') to = DOWN
      else if (event.code === 'ArrowUp') to = UP
      else to = false
      break
    default:
      break
  }

  return to
}

const goTo = event => {
  if (document.body.classList.contains('animating2')) return

  const to = handleEvent(event)

  if (!to) return

  let nextContent, nextBullet
  const currentContent = document.querySelector('.content--active')
  const currentBullet = document.querySelector('.bullet--active')
  currentBullet.classList.remove('bullet--active')
  if (to == DOWN) {
    nextContent = getNextSibling(currentContent, '.content') || document.querySelector('.content')
    nextBullet = getNextSibling(currentBullet, '.bullet') || document.querySelector('.bullet')
  } else if (to == UP) {
    nextContent = getPreviousSibling(currentContent, '.content') || document.querySelector('.content:last-of-type')
    nextBullet = getPreviousSibling(currentBullet, '.bullet') || document.querySelector('.bullet:last-of-type')
  }
  document.body.classList.add('animating', 'animating2')
  nextContent.classList.add('content--next')
  nextBullet.classList.add('bullet--active')

  setTimeout(() => {
    currentContent.classList.remove('content--active')
    nextContent.classList.remove('content--next')
    nextContent.classList.add('content--active')
    document.body.classList.remove('animating')
    setTimeout(() => {
      document.body.classList.remove('animating2')
    }, 700);
  }, 700)
}


document.addEventListener('DOMContentLoaded', () => {

  document.addEventListener('keydown', goTo, false)
  document.addEventListener('wheel', goTo, false)

})
