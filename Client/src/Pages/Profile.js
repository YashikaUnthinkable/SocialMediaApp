import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";


function Profile(props) {
  const [file, setFile] = useState(null);
  const nevigate = useNavigate();
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      console.error('No file selected.');
      return;
    }

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch('/api/posts/upload', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Failed to upload image');
      }

      const data = await response.json();
      console.log('File uploaded:', data.filename);
      nevigate("/");
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };
  if(props.isLoggedIn){
    return (
      <div>
        <h1>Image Upload</h1>
        <form onSubmit={handleSubmit}>
          <input type="file" className='form-control' onChange={handleFileChange} />
          <button type="submit" className="btn btn-primary">Upload</button>
        </form>
      </div>
    );
  }
  else{
    nevigate("/login");
  }
  
}

export default Profile;
