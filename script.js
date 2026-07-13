// ===== 暗色模式切换 =====
// 检查 localStorage 或系统偏好，恢复上次选择的主题
function initTheme() {
  const saved = localStorage.getItem('theme');
  if (saved) {
    document.documentElement.setAttribute('data-theme', saved);
    updateIcon(saved);
  } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.setAttribute('data-theme', 'dark');
    updateIcon('dark');
  }
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  updateIcon(next);
}

function updateIcon(theme) {
  const icon = document.querySelector('.theme-icon');
  icon.textContent = theme === 'dark' ? '☀️' : '🌙';
}

document.getElementById('theme-toggle').addEventListener('click', toggleTheme);
initTheme();

// ===== 打字机效果 =====
// 在 Hero 区域逐字显示文字，增加交互感
const texts = ['一个开发者', 'CI/CD 学习者', 'GitHub Actions 玩家'];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typewriterEl = document.getElementById('typewriter');

function typeEffect() {
  const currentText = texts[textIndex];

  if (!isDeleting) {
    // 正在打字：逐字增加
    typewriterEl.textContent = currentText.substring(0, charIndex + 1);
    charIndex++;

    if (charIndex === currentText.length) {
      // 打完了，停顿 2 秒后开始删除
      isDeleting = true;
      setTimeout(typeEffect, 2000);
      return;
    }
    setTimeout(typeEffect, 100);
  } else {
    // 正在删除：逐字减少
    typewriterEl.textContent = currentText.substring(0, charIndex - 1);
    charIndex--;

    if (charIndex === 0) {
      // 删完了，切换到下一句话
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
      setTimeout(typeEffect, 500);
      return;
    }
    setTimeout(typeEffect, 50);
  }
}

// 页面加载后开始打字机效果
typeEffect();

// ===== 平滑滚动 =====
// 让锚点链接平滑滚动到目标区域
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
