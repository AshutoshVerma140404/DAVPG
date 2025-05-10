import React from 'react';
import './AlumniAssoc.css';

const AlumniAssoc = () => {
  return (
    <>
      <div className="head_title">ALUMNI ASSOCIATION MEMBERS</div>
      <div className="page_content">
        <table className="table table-hover alumni_table">
          <tbody>
            <tr>
              <th scope="row">Prof. Shail Pande</th>
              <td>Convener</td>
            </tr>
            <tr>
              <th scope="row">Shri Jaspal Singh</th>
              <td>President</td>
            </tr>
            <tr>
              <th scope="row">Mrs. Reeta Srivastava</th>
              <td>Vice President</td>
            </tr>
            <tr>
              <th scope="row">Dr. Sanjay Pandey</th>
              <td>Secretary</td>
            </tr>
            <tr>
              <th scope="row">Shri Amit Singhaniya</th>
              <td>Treasurer</td>
            </tr>
            <tr>
              <th scope="row">Dr. Poonam Srivastava</th>
              <td>Member</td>
            </tr>
            <tr>
              <th scope="row">Dr. Sanjay Singh</th>
              <td>Member</td>
            </tr>
            <tr>
              <th scope="row">Dr. Alpana Tripathi</th>
              <td>Member</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AlumniAssoc;
