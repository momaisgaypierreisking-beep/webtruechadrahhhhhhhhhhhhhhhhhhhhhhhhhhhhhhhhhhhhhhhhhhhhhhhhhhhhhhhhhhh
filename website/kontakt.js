// Kontakt form behavior: validate, store locally, show success
document.addEventListener('DOMContentLoaded', function(){
  const form = document.getElementById('kontaktForm');
  const successMsg = document.getElementById('successMsg');

  function validateEmail(email){
    return /\S+@\S+\.\S+/.test(email);
  }

  form.addEventListener('submit', function(e){
    e.preventDefault();
    const emri = document.getElementById('emri').value.trim();
    const email = document.getElementById('email').value.trim();
    const subjekti = document.getElementById('subjekti').value.trim();
    const mesazhi = document.getElementById('mesazhi').value.trim();

    if(!emri || !email || !mesazhi){
      alert('Ju lutem plotësoni emrin, emailin dhe mesazhin.');
      return;
    }
    if(!validateEmail(email)){
      alert('Email i paqartë — kontrolloni formatin.');
      return;
    }

    // Save message to localStorage (simple inbox)
    try{
      const stored = JSON.parse(localStorage.getItem('kontaktMessages') || '[]');
      stored.push({emri, email, subjekti, mesazhi, koha: new Date().toISOString()});
      localStorage.setItem('kontaktMessages', JSON.stringify(stored));
    }catch(err){
      console.warn('LocalStorage error', err);
    }

    // Show success message
    successMsg.hidden = false;
    successMsg.style.opacity = 0;
    successMsg.style.transition = 'opacity .35s ease';
    requestAnimationFrame(()=> successMsg.style.opacity = 1);

    // Clear form after short delay
    setTimeout(()=>{
      form.reset();
    }, 350);
  });

  // Small UX: focus styling removes success message
  const inputs = form.querySelectorAll('input, textarea');
  inputs.forEach(i=> i.addEventListener('focus', ()=> {
    successMsg.hidden = true;
  }));
});
