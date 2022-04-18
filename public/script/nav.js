const nav = document.querySelector(".navbar");

auth.onAuthStateChanged((user) => {
  if(user) {
    nav.innerHTML = `
        <img src="../images/logo.jpg" alt="logo" class="logo">
        <ul class="nav-items d-flex justify-content-between align-items-center m-0">
            <li class="nav-item fs-5 fw-bold"><a href="/">Home</a></li>
            <li class="nav-item fs-5 fw-bold"><a href="/editor">Write A Blog</a></li>
            <li class="nav-item fs-5 fw-bold"><a href="/admin">Dashboard</a></li>;
            <li class="nav-item fs-5 fw-bold" onclick='logout()'><a href="/">Logout</a></li>
        </ul>`;

        handleActive();
      }else {
      nav.innerHTML = `
      <img src="../images/logo.jpg" alt="logo" class="logo">
        <ul class="nav-items d-flex justify-content-between align-items-center m-0">
        <li class="nav-item fs-5 fw-bold"><a href="/">Home</a></li>
        <li class="nav-item fs-5 fw-bold"><a href="/editor">Write A Blog</a></li>
        <li class="nav-item fs-5 fw-bold"><a href="/login">Login</a></li>
        </ul>`;

        handleActive();
      }
    });
    
const handleActive = () => {
      const items = document.querySelectorAll('.nav-items li');

      items.forEach(item => {
        item.addEventListener("click", () => {
          item.classList.add('active')
        });
      })

      console.log(items);
}