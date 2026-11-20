(() => {
  const gallery = document.querySelector('.lineup-sketch');
  const dialog = gallery.querySelector('dialog');
  const photo = dialog.querySelector('img');
  const title = dialog.querySelector('h3');
  const description = dialog.querySelector('p');

  for (const card of gallery.querySelectorAll('.lineup-sketch__card')) {
    card.addEventListener('click', () => {
      const thumbnail = card.querySelector('img');
      title.textContent = [...card.querySelector('.lineup-sketch__caption').children]
        .map(label => label.textContent).join(' · ');
      photo.alt = thumbnail.alt;
      photo.src = thumbnail.currentSrc || thumbnail.src;
      description.textContent = card.dataset.description;
      dialog.showModal();
    });
  }
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right ||
        event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
  });
})();
