let docId = decodeURI(location.pathname.split("/").pop());

let blog = db.collection("blogs").doc(docId);
blog.get().then((doc) => {
  if (doc.exists) setupBlog(doc, doc.data());
  else location.replace("/");
});

const setupBlog = (doc, data) => {
  console.log(doc, data);

  const titleHead = document.querySelector("title");
  const blogBanner = document.querySelector(".banner");
  const blogTitle = document.querySelector(".blog-title");
  const blogArtitle = document.querySelector(".blog-artitle");
  const datePublished = document.querySelector(".published-date");

  titleHead.innerHTML += data.title;
  blogBanner.style.backgroundImage = `url('${data.bannerImage}')`;
  blogTitle.innerHTML = data.title;
  datePublished.innerHTML += data.publishedDate;
  datePublished.innerHTML += ` -- ${data.authur}`;

  try {
    if (data.authur == auth.currentUser.email.split("@")[0]) {
      let editBtn = document.querySelector(".editBtn");
      editBtn.classList.add("edit");
      editBtn.href = `/${docId}/editor`;
      console.log(data);
    }
  } catch {}

  writeArticle(data.artitle, blogArtitle);
};

const writeArticle = (artitle, element) => {
  artitle = artitle.split("\n");

  artitle.forEach((elem) => {
    if (elem.length && elem[0] == "#") {
      let i = 0;
      let _h = 0;
      while (elem[i] == "#") {
        _h++;
        i++;
      }

      element.innerHTML += `<h${_h} class='fs-${_h}'>${elem.slice(
        _h,
        elem.length
      )}</h${_h}>`;
    } else if (elem.length && elem[0] == "!" && elem[1] == "[") {
      let closeSqrBracketPos = elem.indexOf("]");
      let alt = elem.slice(2, closeSqrBracketPos);
      let url = elem.slice(closeSqrBracketPos + 2, elem.length - 1);

      element.innerHTML += `<img src="${url}" alt="${alt}">`;
    } else {
      element.innerHTML += `<p class="artitle py-3 mb-3">${elem}</p>`;
    }
  });
};
