import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let blogs = [];

app.get("/", (req,res)=>{
    res.render("index.ejs", {blogs});
});

app.get("/about-us",(req,res)=>{
    res.render("about-us.ejs");
});

app.get("/new-blog", (req,res)=>{
    res.render("new-blog.ejs");
});

app.get("/edit/:id",(req,res)=>{
    const blogId = parseInt(req.params.id);
    const blogObj = blogs.find(b => b.id === blogId);
    res.render("edit-blog.ejs",{blogObj});
})

app.post("/submit",(req,res)=>{
    let id=1;
    let postName=req.body.blogOwner;
    let postTitle=req.body.title;
    let postContent=req.body.content;
    const blogObj = {
  id,
  postName: req.body.blogOwner,
  postTitle: req.body.title,
  postContent: req.body.content
};
    blogs.push(blogObj);
    res.render("index.ejs",{blogs,blogObj});
});

app.post("/delete/:id",(req,res)=>{
    blogs.forEach(blogObj => {
         if (req.params.id==blogObj.id) {
            blogs.splice(blogObj.id-1,1);
            console.log(blogObj.id);
            console.log(req.params.id);
            console.log("blog deleted");
        }
    }); 
    res.redirect("/");
});

app.post("/edit/:id",(req,res)=>{
    const blogId = parseInt(req.params.id);
    const blogObj = blogs.find((b) => b.id === blogId);
        if(!blogObj){
        return res.status(404).send("Blog not found!");
    }

            blogObj.postTitle=req.body.newTitle;
            blogObj.postName=req.body.newName;
            blogObj.postContent=req.body.newContent;
            console.log(blogObj.id);
            console.log("blog edited");

    res.redirect("/");
})

app.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
});