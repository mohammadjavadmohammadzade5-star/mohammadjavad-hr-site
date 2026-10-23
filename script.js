
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.textContent = isOpen ? '×' : '☰';
});

navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.textContent = '☰';
  });
});

document.querySelectorAll('[data-topic]').forEach((link) => {
  link.addEventListener('click', () => {
    const topic = link.getAttribute('data-topic');
    const topicSelect = document.getElementById('topic');
    const matchingOption = Array.from(topicSelect.options)
      .find((option) => option.text === topic);

    if (matchingOption) topicSelect.value = matchingOption.value;
  });
});

document.querySelectorAll('[data-kind]').forEach((link) => {
  link.addEventListener('click', () => {
    const kind = link.getAttribute('data-kind');
    const typeSelect = document.getElementById('requestType');
    typeSelect.value = kind === 'آموزش' ? 'درخواست آموزش' : '';
  });
});

document.getElementById('year').textContent = new Date().getFullYear();

document.getElementById('requestForm').addEventListener('submit', async (event) => {
  event.preventDefault();

  const form = event.currentTarget;
  if (!form.reportValidity()) return;

  const data = new FormData(form);

  const request = {
    name: data.get('fullName'),
    phone: data.get('phone'),
    requestType: data.get('requestType'),
    topic: data.get('topic') || 'انتخاب نشده',
    message: data.get('details') || 'بدون توضیح'
  };

  const result = document.getElementById('formResult');
  result.hidden = false;
  result.textContent = 'در حال ارسال درخواست...';

  try {
    await fetch(
      'https://script.google.com/macros/s/AKfycbxxIhG5zPsxHkgY9NCLzzSOuD6Mju1fJe3Se_hJyQ4gqFZ1_kQwrq7rZdlQblo1AQMiVw/exec',
      {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8'
        },
        body: JSON.stringify(request)
      }
    );

    result.textContent =
      'درخواست ارسال شد؛ برای اطمینان از دریافت، تلگرام خودت را بررسی کن.';
    form.reset();
  } catch (error) {
    result.textContent =
      'ارسال درخواست با مشکل مواجه شد. اتصال اینترنت را بررسی و دوباره تلاش کن.';
    console.error('Form submission error:', error);
  }

  result.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
});
