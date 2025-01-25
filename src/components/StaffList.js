import React from "react";

const StaffList = ({ staff }) => {
  return (
    <div>
      <h2>Staff List</h2>
      <ul>
        {staff.map((member) => (
          <li key={member.id}>{member.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default StaffList;
