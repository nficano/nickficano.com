const offsetViewHeight = () => {
  const applyOffset = () => {
    const vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty('--vh', `${vh}px`)
  }
  const addEventListeners = () => {
    window.addEventListener('resize', () => applyOffset())
    window.addEventListener('orientationchange', () => applyOffset())
  }

  applyOffset()
  addEventListeners()
}
offsetViewHeight()
