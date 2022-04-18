const blogSection = document.querySelector(".blogs-section");

const userWrittenBlogs = db
  .collection("blogs")
  //   .where("authur", "==", auth.currentUser.email.split('@')[0])
  .get()
  .then((blogs) => {
    blogs.forEach((blog) => {
      authurWrittenBlogCard(blog.data(), blog.id);
    });
  })
  .catch((err) => {
    console.log(err);
  });

const authurWrittenBlogCard = (data, id) => {
  blogSection.innerHTML += `<div class="col-xs-12 col-md-6 mb-3">
            <img src="${data.bannerImage}" alt="blog images">
            <h2 class="blog-title fw-bold py-3 m-0">${data.title.slice(
              0,
              100
            )}...</h2>
            <p class="blog-article p-0">${data.artitle.slice(0, 200)}...</p>
            <a href="/${id}" class="btn btn-primary mt-1">Read</a>
            <a href="/${id}/editor" class="editBlog btn btn-success mt-1">Edit Blog</a>
            <a href="#" class="btn btn-danger mt-1" onclick='deleteBlog("${id}")'>Delete</a>
        </div>`;
};

const deleteBlog = (_id) => {
  db.collection("blogs")
    .doc(_id)
    .delete()
    .then(() => {
      location.reload();
    })
    .catch((err) => {
      console.log(err);
    });
};
