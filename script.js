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
    const matchingOption = Array.from(topicSelect.options).find((option) => option.text === topic);
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

document.getElementById('requestForm').addEventListener('submit', (event) => {
  event.preventDefault();

  const form = event.currentTarget;
  if (!form.reportValidity()) return;

  const data = new FormData(form);
  const details = [
    'درخواست جدید از سایت شخصی محمدجواد محمدزاده',
    'نام: ' + data.get('fullName'),
    'شماره تماس: ' + data.get('phone'),
    'نوع درخواست: ' + data.get('requestType'),
    'موضوع: ' + (data.get('topic') || 'انتخاب نشده'),
    'توضیحات: ' + (data.get('details') || 'بدون توضیح')
  ].join('\n');

  const result = document.getElementById('formResult');
  result.hidden = false;
  result.textContent = 'فرم در مرورگر بررسی شد؛ اما هنوز به سرور متصل نیست و برای تو ارسال یا ذخیره نمی‌شود.\n\nبرای انتقال درخواست، متن زیر را کپی کن و از طریق ایمیل یا پیام‌رسان برای خودت بفرست:\n\n' + details;

  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(details).then(() => {
      result.textContent = 'متن درخواست کپی شد. چون سایت هنوز به سرور متصل نیست، درخواست خودکار برای تو ارسال یا ذخیره نمی‌شود. متن را در پیام‌رسان یا ایمیل خودت ارسال کن.\n\n' + details;
    }).catch(() => {});
  }

  result.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
});
