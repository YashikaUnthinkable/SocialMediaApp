import React,{useState} from 'react'

export default function Contact() {
    const [user,setUser] = useState({
        username: "",
        email: "",
        message: ""
    })

    const handleInput = (e)=>{
        let name = e.target.name;
        let value = e.target.value;
        let newUser = {...user};
        newUser[name] = value;
        setUser(newUser);
    }
    const handleSubmit = (e)=>{
        e.preventDefault();
        console.log(user);
    }
  return (
    <div className="container ">
      <div className="row m-5 center">
        <img
          src="/images/registration.png"
          className="h-100 w-50"
          alt="not available"
        />
        <div className="col-sm text-left m-2">
          <form onSubmit={handleSubmit}>
          <div className="form-group mt-3">
              <label htmlFor="username">Name</label>
              <input
                type="text"
                className="form-control"
                id="username"
                name="username"
                placeholder="Enter name"
                required
                autoComplete="off"
                value={user.username}
                onChange={handleInput}
              />
            </div>
            <div className="form-group mt-3">
              <label htmlFor="email">Email address</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                required
                autoComplete="off"
                value={user.email}
                onChange={handleInput}
              />
            </div>
            <div className="form-group mt-3">
              <label htmlFor="password">Password</label>
              <textarea 
              name="message" 
              className='form-control'
              id="message" 
              cols="30" 
              rows="10"
              required
              autoComplete='off'
              value= {user.message}
              onChange={handleInput}
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary mt-3">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
