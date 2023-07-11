import { useContext, useEffect, useState } from "react";
import JobCard from "../components/JobCard";
import { Link } from "react-router-dom";
import UserContext from "../context/UserContext";
import JobListing from "../components/JobListing";

function UserJobPosts() {
  const { user, setUser } = useContext(UserContext);
  const [jobPosts, setJobPosts] = useState([]);
  const API_URL = process.env.REACT_APP_API_URL;

  const getAllJobPosts = () => {
    fetch(`${API_URL}/jobs`, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
      .then(response => response.json())
      .then(data => {
        setJobPosts(data);
      });

  };
  useEffect(() => {
    getAllJobPosts();
  }, []);

  const jobPostsList = jobPosts.map((jobPost) => {
    return (
      <li key={jobPost._id}>
        <JobListing job={jobPost} />
      </li>
    )
  })

  return (
    <div className='page' id='user-job-posts-page'>
      <section className="page-header-container">
        <h1 className="page-title">User Job Posts</h1>
        {user && <button><Link to='/createjob'>Add a Job Post</Link></button>}
      </section>
      <section className="job-listing-container">
        <ul>{jobPostsList}</ul>
      </section>
    </div>
  )
}
export default UserJobPosts
