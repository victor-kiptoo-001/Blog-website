// import axios from "axios";
// import React, { useState } from "react";
// import { Editor } from "@tinymce/tinymce-react";
// import { useUser } from "./UserContext";

// function MyEditor() {
//   const [isEditorOpen, setIsEditorOpen] = useState(false);
//   const [editorContent, setEditorContent] = useState("Write Content Here!");
//   const [title, setTitle] = useState("");
//   const [category, setCategory] = useState("");
//   const [authorName, setAuthorName] = useState("");
//   const { user } = useUser();
//   const [file, setFile] = useState();
//   const [fileb64, setFileb64] = useState("");
//   const [feedbackMessage, setFeedbackMessage] = useState(null);

//   function handleChange(e) {
//     setFile(e.target.files[0]);
//   }

//   const handleEditorChange = (content, editor) => {
//     setEditorContent(content);
//   };

//   const PostData = async () => {
//     var htmlObject = document.createElement("div");
//     htmlObject.innerHTML = editorContent;

//     const toBase64 = (file) =>
//       new Promise((resolve, reject) => {
//         const reader = new FileReader();
//         reader.readAsDataURL(file);
//         reader.onload = () => resolve(reader.result);
//         reader.onerror = reject;
//       });

//     toBase64(file)
//       .then((data) => setFileb64(data))
//       .catch((e) => console.log("Error converting to b64: " + e));

//     const formData = {
//       category_name: category,
//       description: editorContent,
//       title: title,
//       image_url: fileb64,
//       author_name: authorName
//     };

//     const config = {
//       headers: { Authorization: `Bearer ${user}` },
//     };

//     axios
//       .post("http://127.0.0.1:5555/contents", formData, config)
//       .then((res) => {
//         if (res.status === 200) {
//           setFeedbackMessage("Blog created successfully!");
//           // Clear form fields and editor content
//           setTitle("");
//           setAuthorName("");
//           setEditorContent("Write Content Here!");
//           setFileb64(""); // Clear the base64 data
//         } else {
//           setFeedbackMessage("Error: Unable to create the blog. Please try again.");
//         }
//       })
//       .catch((err) => {
//         setFeedbackMessage("Error: Unable to create the blog. Please try again.");
//       });
//   };

//   return (
//     <div className="my-40 px-10">
//       <div className="block p-5 shadow-lg rounded mb-4">
//         <h2 className="font-bold">Title</h2>
//         <input
//           className="block w-full p-2 border rounded mb-2"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           type="text"
//         />
//         <h2 className="font-bold">Author Name</h2>
//         <input
//           className="block w-full p-2 border rounded mb-2"
//           value={authorName}
//           onChange={(e) => setAuthorName(e.target.value)}
//           type="text"
//         />
//         <h2 className="font-bold">Cover Image</h2>
//         <input
//           className="block w-full p-2 border rounded mb-2"
//           type="file"
//           onChange={handleChange}
//         />
//       </div>
//       {isEditorOpen ? (
//         <div className="editor-container">
//           <Editor
//             apiKey="gpuxz3dnhz86wd1h323po1nlsiou66c3rphfvzg57vejkimj"
//             init={{
//               height: 800,
//               // plugins: "your_plugins_here",
//               // toolbar: "your_toolbar_here",
//               // Other Tinymce editor configurations
//               plugins:
//                 "ai tinycomments mentions anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed permanentpen footnotes advtemplate advtable advcode editimage tableofcontents mergetags powerpaste tinymcespellchecker autocorrect a11ychecker typography inlinecss",
//               toolbar:
//                 "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
//               tinycomments_mode: "embedded",
//               tinycomments_author: "Author name",
//               mergetags_list: [
//                 { value: "First.Name", title: "First Name" },
//                 { value: "Email", title: "Email" },
//               ],
//               ai_request: (request, respondWith) =>
//                 respondWith.string(() =>
//                   Promise.reject("See docs to implement AI Assistant"),
//                 ),

//             }}
//             value={editorContent}
//             onEditorChange={handleEditorChange}
//           />
//           <button
//             onClick={() => setIsEditorOpen(false)}
//             className="rounded-lg bg-[#e0480c] px-4 py-3 text-white transition hover:bg-[rgb(207,124,16)] mt-2"
//           >
//             Close Editor
//           </button>
//         </div>
//       ) : (
//         <button
//           onClick={() => setIsEditorOpen(true)}
//           className="rounded-lg bg-[#F44F10] px-4 py-3 text-white transition hover:bg-[#cf7c10] mx-2"
//         >
//           Open Editor
//         </button>
//       )}
//       <button
//         onClick={() => PostData()}
//         className="rounded-lg bg-[#F44F10] px-4 py-3 text-white transition hover-bg-[#cf7c10] mt-2"
//       >
//         Save
//       </button>
//       {feedbackMessage && (
//         <div className="p-3 mt-3 text-center text-white bg-[#b62626] rounded">
//           {feedbackMessage}
//         </div>
//       )}
//     </div>
//   );
// }

// export default MyEditor;

import axios from "axios";
import React, { useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
// import { useUser } from "./UserContext";

function MyEditor() {
//  var token =localStorage.getItem('token');
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editorContent, setEditorContent] = useState("");
  const [title, setTitle] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [authorName, setAuthorName] = useState("");
  // const x = useUser();
  const [file, setFile] = useState();
  const [fileb64, setFileb64] = useState("");
  const [feedbackMessage, setFeedbackMessage] = useState(null);

  useEffect(() => {
    // Fetch categories from the correct URL
    axios
      .get("http://127.0.0.1:5555/categories")
      .then((response) => setCategories(response.data))

      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  // function handleChange(e) {
  //   setFile(e.target.files[0]);
  // }

  function handleChange(e) {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      setFile(selectedFile);
      const toBase64 = (file) =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
      });
    toBase64(selectedFile)
      .then((data) => setFileb64(data))
      .catch((e) => console.log("Erroor converting yo b64: " + e));
      // try {
      //   const data = await toBase64(file)
      //   setFileb64(data);
      // } catch (error) {
      //   console.log('Error converting to b64: '+error)
      // }
    } else {
      console.error("No file selected");
    }
  }
  const handleEditorChange = (content, editor) => {
    setEditorContent(content);
  };

  // const PostData = async () => {
  //   var htmlObject = document.createElement("div");
  //   htmlObject.innerHTML = editorContent;

  //   const toBase64 = (file) =>
  //     new Promise((resolve, reject) => {
  //       const reader = new FileReader();
  //       reader.readAsDataURL(file);
  //       reader.onload = () => resolve(reader.result);
  //       reader.onerror = reject;
  //     });

  //   toBase64(file)
  //     .then((data) => setFileb64(data))
  //     .catch((e) => console.log("Error converting to b64: " + e));

  //   const formData = {
  //     category_name: selectedCategory,
  //     description: editorContent,
  //     title: title,
  //     image_url: fileb64,
  //     author_name: authorName
  //   };

  //   const config = {
  //     headers: { Authorization: `Bearer ${user}` },
  //   };

  //   axios
  //     .post("http://127.0.0.1:5555/contents", formData, config)
  //     .then((res) => {
  //       console.log("Response from POST request:", res);

  //       if (res.status === 200) {
  //         setFeedbackMessage("Blog created successfully!");
  //         // Clear form fields and editor content
  //         setTitle("");
  //         setAuthorName("");
  //         setSelectedCategory("");
  //         setEditorContent("Write Content Here!");
  //         setFileb64("");
  //         // Clear the base64 data
  //       } else {
  //         setFeedbackMessage("Error: Unable to create the blog. Please try again.");
  //       }

  //     })
  //     .catch((err) => {
  //       setFeedbackMessage("Error: Unable to create the blog. Please try again.");
  //     });
  // };

  const PostData = async () => {
    console.log("title: " + title, "content to post: ", editorContent);
    var htmlObject = document.createElement("div");
    htmlObject.innerHTML = editorContent;
    // const images_list = document.getElementsByTagName("img");
    // const iamges = [];
    // for (let i = 0; i < images_list.length; i++) {
    //   console.log(images_list[i]);
    //   let text = images_list[i].getAttribute("src");
    //   iamges.push(text);
    // }
    // console.log(iamges,user);
    const _token = localStorage.getItem('token');
    const config = {
      headers: { Authorization: `Bearer ${_token}` },
    };
    //  get image urls from cloudinary
    // axios
    //   .post(`http://127.0.0.1:5555/upload-content-image/${id}`, iamges, config)
    //   .then((res) => console.log(res))
    //   .catch((err) => console.log(err));
    // convert to bas64
console.log(_token);
    

    var formData = {
      category_name: selectedCategory,
      description: editorContent,
      title: title,
      image_url: fileb64,
      author_name: authorName,
    };
    console.log(formData);
    axios
      .post("http://127.0.0.1:5555/contents", formData, config)
      .then((res) => {
        console.log(res);
        if (res.status === 201) {
                  setFeedbackMessage("Blog created successfully!");
                  // Clear form fields and editor content
                  setTitle("");
                  setAuthorName("");
                  setSelectedCategory("");
                  setEditorContent("Write Content Here!");
                  setFileb64("");
                  // Clear the base64 data
                } else {
                  setFeedbackMessage("Error: Unable to create the blog. Please try again.");
                }
        
              })
              .catch((err) => {
                setFeedbackMessage("Error: Unable to create the blog. Please try again.");
              });
      // })
      // .catch((err) => console.log(err));
  };
  return (
    <div className="my-40 px-10">
      <div className="mb-4 block rounded p-5 shadow-lg">
        <h2 className="font-bold">Title</h2>
        <input
          className="mb-2 block w-full rounded border p-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
        />
        <h2 className="font-bold">Author Name</h2>
        <input
          className="mb-2 block w-full rounded border p-2"
          value={authorName}
          onChange={(e) => setAuthorName(e.target.value)}
          type="text"
        />
        <h2 className="font-bold">Category</h2>
        <select
          className="mb-2 block w-full rounded border p-2"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="" disabled>
            Select a category
          </option>
          {categories.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
        <h2 className="font-bold">Cover Image</h2>
        <input
          className="mb-2 block w-full rounded border p-2"
          type="file"
          onChange={handleChange}
        />
      </div>
      {isEditorOpen ? (
        <div className="editor-container">
          <Editor
            apiKey="gpuxz3dnhz86wd1h323po1nlsiou66c3rphfvzg57vejkimj"
            init={{
              height: 800,
              plugins:
                "ai tinycomments mentions anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed permanentpen footnotes advtemplate advtable advcode editimage tableofcontents mergetags powerpaste tinymcespellchecker autocorrect a11ychecker typography inlinecss",
              toolbar:
                "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
              tinycomments_mode: "embedded",
              tinycomments_author: "Author name",
              mergetags_list: [
                { value: "First.Name", title: "First Name" },
                { value: "Email", title: "Email" },
              ],
              ai_request: (request, respondWith) =>
                respondWith.string(() =>
                  Promise.reject("See docs to implement AI Assistant"),
                ),
            }}
            value={editorContent}
            onEditorChange={handleEditorChange}
          />
          <button
            onClick={() => setIsEditorOpen(false)}
            className="mt-2 rounded-lg bg-[#e0480c] px-4 py-3 text-white transition hover:bg-[rgb(207,124,16)]"
          >
            Close Editor
          </button>
        </div>
      ) : (
        <button
          onClick={() => setIsEditorOpen(true)}
          className="mx-2 rounded-lg bg-[#F44F10] px-4 py-3 text-white transition hover:bg-[#cf7c10]"
        >
          Open Editor
        </button>
      )}
      <button
        onClick={() => PostData()}
        className="hover-bg-[#cf7c10] mt-2 rounded-lg bg-[#F44F10] px-4 py-3 text-white transition"
      >
        Save
      </button>
      {feedbackMessage && (
        <div className="mt-3 rounded bg-[#b62626] p-3 text-center text-white">
          {feedbackMessage}
        </div>
      )}
    </div>
  );
}

export default MyEditor;
