import React from "react";

export default function Profile() {
    const [file, setFile] = useState(null)
    // const handleSubmit= (e)=>{
    //     e.preventDefault();//to stop by default reloading
    //     console.log(user);
    // }

    const handleInput = (e)=>{
        console.log(URL.createObjectURL(e.target.files[0]));
    }
  return (
    <div>
      <form>
        <div className="mb-3">
          <label className="form-label" htmlFor="customFile">
            Upload your image
          </label>
          <input type="file" className="form-control" id="customFile" onChange={handleInput} />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
