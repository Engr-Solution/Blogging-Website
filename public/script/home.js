let blogCards = db.collection("blogs").get();
let blogId = decodeURI(location.pathname.split("/").pop());

blogCards.then((blogs) => {
  blogs.forEach((blog) => {
    if(blog.id != blogId) BlogCard(blog.data(), blog.id);
  });
});

const BlogCard = (data, id) => {
  const blogSection = document.querySelector(".blogs-section");

  blogSection.innerHTML += `<div class="col-xs-12 col-md-6 mb-3">
            <img src="${data.bannerImage}" alt="blog images">
            <h2 class="blog-title fw-bold py-3 m-0">${data.title.slice(
              0,
              100
            )}...</h2>
            <p class="blog-article p-0">${data.artitle.slice(0, 200)}...</p>
            <a href="/${id}" class="btn btn-primary mt-1">Read</a>
        </div>`;
};
