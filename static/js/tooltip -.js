
  document.querySelectorAll('a, button, img, h1, h2, h3, h4, h5, h6').forEach(el => {
    if (el.classList.contains('escape-tooltip') || el.dataset.tooltipProcessed) return;
    el.dataset.tooltipProcessed = "true";

    const text = el.getAttribute('title') ||
                 el.getAttribute('alt') ||
                 el.innerText?.trim();

    if (!text) return;

    el.removeAttribute('title');

    // Buat tooltip
    const tooltip = document.createElement('div');
    tooltip.className = `tooltip-box invisible absolute z-[99999] px-3 py-1 text-sm bg-gray-800 text-white rounded
                         opacity-0 scale-95 transition duration-150`;
    tooltip.textContent = text;
    document.body.appendChild(tooltip);

    const popper = Popper.createPopper(el, tooltip, {
      placement: 'top',
      modifiers: [
        { name: 'offset', options: { offset: [0, 8] } },
        { name: 'preventOverflow', options: { boundary: 'viewport' } }
      ]
    });

    function show() {
      tooltip.classList.remove('invisible', 'opacity-0', 'scale-95');
      tooltip.classList.add('opacity-100', 'scale-100');
      popper.update();
    }

    function hide() {
      tooltip.classList.remove('opacity-100', 'scale-100');
      tooltip.classList.add('opacity-0', 'scale-95');
      setTimeout(() => {
        tooltip.classList.add('invisible');
      }, 150);
    }

    el.addEventListener('mouseenter', show);
    el.addEventListener('mouseleave', hide);
    el.addEventListener('focus', show);
    el.addEventListener('blur', hide);
  }); 