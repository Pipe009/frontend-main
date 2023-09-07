import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';
import { useRouter } from "next/router";

export async function getServerSideProps(req) {
  const {id}   = req.query;
  const res = await fetch('https://front-rickconway.vercel.app/api/users/'+ id , {
    method: 'GET',
    
  })
  const posts = await res.json();
console.log(posts)


  return {
    props: {
      posts,
    },
  };
}

export default function Component({ posts }) {
  const { data: session } = useSession();
  const router = useRouter()

  //----------------------start handleUpdate--------------------------
  const handleUpdate = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const jsonData = {
      id: data.get('txt_studentid'),
      studentid: data.get('txt_studentid'),
      firstname: data.get('txt_firstname'),
      lastname: data.get('txt_lastname'),
      username: data.get('txt_username'),
      password: data.get('txt_password'),
      status: data.get('txt_status')
    }

      fetch(`https://nattawut009-ji560chan-gmailcom.vercel.app/api/users`, {
        method: 'PUT', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonData),
      })
      .then((response) => response.json())
      .then((data) => {
        if (data.status == 'ok') {
          router.push('/dashboard')
        } else {
          console.log('Add Data Not Success')
          router.push('/dashboard')
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
 

  }; //end handleSubmit
//----------------------end handleSubmit--------------------------
  if (session) {
    return (
      <>
        <header>
          <nav className="navbar fixed-top navbar-expand-lg bg-success">
            <div className="container-fluid">
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon" />
              </button>
              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
                Signed in as {session.user.fname} {session.user.lname} <br />
                <span>&nbsp;</span>
                <form className="d-flex" role="search">
                  <button
                    className="btn btn-info"
                    type="submit"
                    onClick={() => signOut()}
                  >
                    Sign Out
                  </button>
                </form>
              </div>
            </div>
          </nav>
        </header>
        <br /><br /><br />
        <main>
          <div className="container-fluid">
            <p></p>
            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <h5 className="card-header">
                    <i className="bi bi-person-vcard-fill" /> Add Member
                  </h5>
                  <div className="card-body">
                 
                    <form onSubmit={handleUpdate}>
                    {posts.user.map((post, i) => (
                    <>
                    {/* <div className="input-group mb-3">
                        <input
                          type="text"
                          name="txt_id"
                          id="txt_id"
                          className="form-control bg-white"
                          placeholder="ID"
                          // onChange={(event) => { setId(event.target.value) }}
                          defaultValue={post.id}
                          readOnly 
                          required
                        />
                        </div> */}
                      <div className="input-group mb-3">
                        <input
                          type="text"
                          name="txt_studentid"
                          id="txt_studentid"
                          className="form-control bg-white"
                          placeholder="StudentID"
                          // onChange={(event) => { setStudentID(event.target.value) }}
                          defaultValue={post.id}
                          readOnly
                        />
                      </div>
                      <div className="input-group mb-3">
                        <input
                          type="text"
                          name="txt_firstname"
                          id="txt_firstname"
                          className="form-control bg-white"
                          placeholder="Firstname"
                          // onChange={(event) => { setFirstname(event.target.value) }}
                          defaultValue={post.firstname}
                          required
                        />
                      </div>
                      <div className="input-group mb-3">
                        <input
                          type="text"
                          name="txt_lastname"
                          id="txt_lastname"
                          className="form-control bg-white"
                          placeholder="Lastname"
                          // onChange={(event) => { setLastname(event.target.value) }}
                          defaultValue={post.lastname}
                          required
                        />
                      </div>
                      <div className="input-group mb-3">
                        <input
                          type="text"
                          name="txt_username"
                          id="txt_username"
                          className="form-control bg-white"
                          placeholder="Username"
                          // onChange={(event) => { setUsername(event.target.value) }}
                          defaultValue={post.username}
                          required
                        />
                      </div>
                      <div className="input-group mb-3">
                        <input
                          type="text"
                          name="txt_password"
                          id="txt_password"
                          className="form-control bg-white"
                          placeholder="Password"
                          // onChange={(event) => { setPassword(event.target.value) }}
                          defaultValue={post.password}
                          required
                        />
                      </div>
                      <div className="input-group mb-3">
                        <input
                          type="text"
                          name="txt_status"
                          id="txt_status"
                          className="form-control bg-white"
                          // onChange={(event) => { setStatus(event.target.value) }}
                          defaultValue={post.status}
                          placeholder="Status"
                          required
                        />
                      </div>

                      <p />
                      <div className="row">
                        <div className="col-md-12 text-center text-lg-start">
                          <button
                            type="submit"
                            className="btn btn-outline-success btn-block"
                          >
                            <span>Save</span>{" "}
                            <i className="bi bi-arrow-right" />
                          </button>&nbsp;&nbsp;&nbsp;
                          <Link href="./" className="btn btn-outline-warning">Back</Link>
                        </div>
                      </div>
                      </>
                    ))}
                    </form>
                    <p></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <br></br>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
}