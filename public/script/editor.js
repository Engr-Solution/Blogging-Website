// Blog title and artitle
const blogTitle = document.querySelector("#title");
const blogArtitle = document.querySelector("#artitle");

const bannerImage = document.querySelector("#banner-image");
const artitleImage = document.querySelector("#artitle-image");

const banner = document.querySelector(".blog-banner");
const publishBtn = document.querySelector("#publish");
let bannerPath;

bannerImage.addEventListener("change", () => {
  uploadImage(bannerImage, "banner");
});
artitleImage.addEventListener("change", () => {
  uploadImage(artitleImage, "artitle");
});

const uploadImage = async (imageUploaded, imageUploadedType) => {
  const [file] = imageUploaded.files;
  if (file && file.type.includes("image")) {
    const formData = new FormData();
    formData.append("image", file);

   await fetch("/upload", {
      method: "post",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (imageUploadedType == "artitle") addImage(data, file.name);
        else {
          bannerPath = `${location.origin}/${data}`;
          banner.style.backgroundImage = `url('${bannerPath}')`;
        }
      });
  } else {
    alert("Insert Image Only!");
  }
};

const addImage = (imageUrl, alt) => {
  let curPos = blogArtitle.selectionStart;
  let imageRegex = `\r![${alt}](${imageUrl})\r`;
  blogArtitle.value =
    blogArtitle.value.slice(0, curPos) +
    imageRegex +
    blogArtitle.value.slice(curPos);
};

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const alphaNum = "abcdefghijklmnopqrstuvwxyz0123456789";

publishBtn.addEventListener("click", () => {
  if(blogTitle.value.length && blogArtitle.value.length) {
      let docName;
    if(blogId[0] == 'editor'){
        let title = blogTitle.value.split(" ").join("-");
        let id = "";
        for (let i = 0; i < 5; i++) {
          id += alphaNum[Math.floor(Math.random() * alphaNum.length)];
        }
        docName = `${title}-${id}`;
    }else docName = blogId[0];

    let date = new Date();

    db.collection("blogs")
      .doc(docName)
      .set({
        title: blogTitle.value,
        artitle: blogArtitle.value,
        bannerImage: bannerPath,
        publishedDate: `${date.getDate() + 1} ${
          months[date.getMonth()]
        } ${date.getFullYear()}`,
        authur: auth.currentUser.email.split("@")[0],
      })
      .then(() => {
        location.href = `/${docName}`;
      })
      .catch((err) => console.log(err));
  }
});

auth.onAuthStateChanged((user) => {
  if (!user) location.replace("/login");
});

let blogId = location.pathname.split("/");
blogId.shift();
if (blogId[0] != "editor") {
  db.collection("blogs")
    .doc(decodeURI(blogId[0]))
    .get()
    .then((doc) => {
      if (doc.exists) {
        let data = doc.data();
        bannerPath = data.bannerImage;
        banner.style.backgroundImage = `url('${bannerPath}')`;
        blogTitle.value = data.title;
        blogArtitle.value = data.artitle;
      } else location.replace("/");
    });
}
