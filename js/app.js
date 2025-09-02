// Small helper script: nav toggle, contact form handler, year
function initApp(){
  var navToggle=document.getElementById('navToggle');
  var siteNav=document.getElementById('siteNav');
  if(navToggle && siteNav){
    navToggle.addEventListener('click',function(){
      var shown = siteNav.style.display === 'flex';
      siteNav.style.display = shown ? '' : 'flex';
    });
  }

  var yearEl=document.getElementById('year');
  if(yearEl) yearEl.textContent = new Date().getFullYear();

  var form=document.getElementById('contactForm');
  var msg=document.getElementById('message');
  if(form && msg){
    form.addEventListener('submit', async function(e){
      e.preventDefault();
      msg.textContent = '';
      var data = new FormData(form);
      var payload = {
        name: data.get('name') || '',
        email: data.get('email') || '',
        subject: data.get('subject') || '',
        message: data.get('message') || ''
      };

      // Basic client-side validation
      if(!payload.name || !payload.email || !payload.message){
        msg.textContent = 'Please fill name, email and message.';
        return;
      }

      var endpoint = form.getAttribute('data-endpoint') || '';
      if(endpoint){
        try{
          var res = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          });
          if(res.ok){
            msg.textContent = 'Thanks ' + payload.name + '! Your message was sent.';
            form.reset();
          } else {
            msg.textContent = 'Error sending message; server returned ' + res.status;
          }
        }catch(err){
          msg.textContent = 'Error sending message: ' + err.message;
        }
      } else {
        // fallback: open mail client with mailto
        var subject = encodeURIComponent(payload.subject || 'Contact from portfolio');
        var body = encodeURIComponent('Name: ' + payload.name + '\nEmail: ' + payload.email + '\n\n' + payload.message);
        window.location.href = 'mailto:?subject=' + subject + '&body=' + body;
      }
    });
  }

  // Dark mode toggle: robust implementation
  var themeToggle = document.getElementById('themeToggle');
  var root = document.documentElement;
  var THEME_KEY = 'site-theme';

  function setDarkMode(isDark, persist){
    if(isDark){
      root.classList.add('dark');
  // enforce immediate visible colors as inline styles
  try{ document.body.style.background = '#000000'; document.body.style.color = '#ffffff'; }catch(e){}
    } else {
      root.classList.remove('dark');
  try{ document.body.style.background = '#ffffff'; document.body.style.color = '#111111'; }catch(e){}
    }
    if(themeToggle){
      themeToggle.textContent = isDark ? 'Light' : 'Dark';
      themeToggle.setAttribute('aria-pressed', isDark ? 'true' : 'false');
    }
    if(persist){
      try { localStorage.setItem(THEME_KEY, isDark ? 'dark' : 'light'); } catch(e){}
    }
  }

  function initTheme(){
    var saved = null;
    try { saved = localStorage.getItem(THEME_KEY); } catch(e){}
    if(saved === 'dark' || saved === 'light'){
      setDarkMode(saved === 'dark', false);
      return;
    }
    // follow system preference
    var m = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)');
    var prefersDark = m ? m.matches : false;
    setDarkMode(prefersDark, false);

    // react to system changes
    if(m && typeof m.addEventListener === 'function'){
      m.addEventListener('change', function(e){
        var savedNow = null;
        try { savedNow = localStorage.getItem(THEME_KEY); } catch(e){}
        if(savedNow) return; // user has chosen, don't override
        setDarkMode(e.matches, false);
      });
    } else if(m && typeof m.addListener === 'function'){
      m.addListener(function(e){
        var savedNow = null;
        try { savedNow = localStorage.getItem(THEME_KEY); } catch(e){}
        if(savedNow) return;
        setDarkMode(e.matches, false);
      });
    }
  }

  if(themeToggle){
    themeToggle.addEventListener('click', function(){
      var isDark = root.classList.contains('dark');
      setDarkMode(!isDark, true);
    });
  }

  initTheme();
}

// Run initApp now if DOM is ready, otherwise wait for DOMContentLoaded
if(document.readyState === 'loading'){
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
