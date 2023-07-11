import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import JobCard from "../components/JobCard";
import JobListing from "../components/JobListing";

export default function SavedJobsPage() {
  const [job, setJob] = useState();
  const [jobPosts, setJobPosts] = useState([]);
  const token = `Bearer ${localStorage.getItem('token')}`;
  const AWS_EC2_URL = process.env.REACT_APP_AWS_EC2_URL;

  const getAllJobPosts = () => {
    fetch(`${AWS_EC2_URL}/bookmarklist`, {
      method: 'GET',
      headers: new Headers({
        'Authorization': token,
        'Content-Type': 'application/json'
      })
    })
      .then(response => {
        if (response.status === 409) {
          alert(response.message);
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
        setJobPosts(data);
      });

  };

  useEffect(() => {
    getAllJobPosts();
  }, [token]);

  let jobPostsList;

  if (!jobPosts) {
    return (
      <li>
        <div className='job-listing' >
          <div className="job-listing-header">
            <p>
              Something went wrong with saved list.
            </p>
          </div>
        </div>
      </li>
    )
  }

  if (jobPosts?.jobs?.length === 0) {
    jobPostsList = jobPosts?.jobs.map((jobPost) => {
      return (
        <li key={jobPost?._id}>
          <div className='job-listing' >
            <div className="job-listing-header">
              <p>
                Nothing saved yet.
              </p>
            </div>
          </div>
        </li>
      )
    })
  }
  else {
    jobPostsList = jobPosts.filter(j => j !== null).map((jobPost) => {
      jobPost = { ...jobPost, isBookmarked: true };
      return (
        <li key={jobPost?._id}>
          <JobListing job={jobPost} />
        </li>
      )
    })
  }

  return (
    <div className='page' id='saved-jobs-page'>
      <section className="page-header-container">
        <h1 className="page-title">Saved Jobs</h1>
      </section>
      <section className="job-listing-container">
        <ul>{jobPostsList}</ul>
      </section>
    </div>
  )
}
