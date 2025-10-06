import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

export const EditBook = () => {
  let { id } = useParams()
  let navigate = useNavigate()

  // Book data state including imagePath for existing image
  let [data, updateData] = useState({
    title: "",
    isbn: "",
    numberOfCopies: 0,
    author: "",
    userId:localStorage.getItem("userid"),
    imagePath: "",
  })

  console.log(localStorage.getItem("username"));
   localStorage.getItem("username");
  // State for selected new image file and preview URL
  let [selectedFile, setSelectedFile] = useState(null)
  let [previewUrl, setPreviewUrl] = useState("")
  let [error, setError] = useState("")

  // Load existing book data
  useEffect(() => {
    axios.get(`http://localhost:8181/api/books/${id}`)
      .then(response => {
        const book = response.data.data;
        updateData({
          title: book.title,
          isbn: book.isbn,
          numberOfCopies: book.numberOfCopies,
          author: book.author,
          userId:localStorage.getItem("userid"),
          imagePath: book.imagePath
        });
      })
      .catch(err => setError(err.message || "Failed to load book"));
  }, [id])

  // Generate preview URL when selectedFile changes
  useEffect(() => {
    if (!selectedFile) {
      setPreviewUrl("");
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreviewUrl(objectUrl);

    // Cleanup URL object when component unmount or file changes
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile])

  // Handle file input change
  function handleFileChange(e) {
    setSelectedFile(e.target.files[0]);
  }

  // Submit form data with optional new image
  async function hadleEditBook() {
    const formData = new FormData();
    formData.append("book", new Blob([JSON.stringify(data)], { type: "application/json" }));
    if (selectedFile) {
      formData.append("image", selectedFile);
    }

    try {
      const response = await fetch(`http://localhost:8181/api/books/edit/${id}`, {
        method: "PUT",
        body: formData, // Browser sets Content-Type automatically
      });

      if (response.ok) {
        alert("Updated Successfully");
        navigate("/books");
      } else {
        alert("Failed to update book");
      }
    } catch (err) {
      alert("Failed to update book: " + err.message);
    }
  }

  return (
    <div className="editbook-container mx-auto mt-5 w-50 p-5 shadow rounded">
      <h1 className="editbook-title display-4 mb-4 text-center">Edit Book</h1>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="editbook-form d-flex flex-column gap-4">
        <input
          type="text"
          className="editbook-input form-control"
          placeholder="Title"
          value={data.title}
          onChange={e => updateData({ ...data, title: e.target.value })}
        />

        <input
          type="text"
          className="editbook-input form-control"
          placeholder="ISBN"
          value={data.isbn}
          onChange={e => updateData({ ...data, isbn: e.target.value })}
        />

        <input
          type="number"
          className="editbook-input form-control"
          placeholder="Copies"
          value={data.numberOfCopies}
          onChange={e => updateData({ ...data, numberOfCopies: e.target.value })}
        />

        <input
          type="text"
          className="editbook-input form-control"
          placeholder="Author"
          value={data.author}
          onChange={e => updateData({ ...data, author: e.target.value })}
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />

        {/* Image preview */}
        <div className="mt-3 text-center">
          <img
            src={previewUrl || (data.imagePath ? `http://localhost:8181${data.imagePath}` : "/default-image.png")}
            alt="Book Cover Preview"
            height="200"
            style={{ objectFit: "contain" }}
          />
        </div>

        <button className="editbook-btn btn btn-primary align-self-center px-5 mt-3" onClick={hadleEditBook}>
          Save Changes
        </button>
      </div>
    </div>
  );
}
