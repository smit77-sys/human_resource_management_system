'use client';

import { useEffect, useState } from 'react';
import { employeeAPI } from '@/lib/api-endpoints';

interface EmployeeProfile {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  designation: string;
  department: string;
  salary: number;
  dateOfBirth?: string;
  joiningDate?: string;
}

export default function ProfileCard() {
  const [profile, setProfile] = useState<EmployeeProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response: any = await employeeAPI.getMyProfile();
        setProfile(response.data);
      } catch (error) {
        console.error('Failed to fetch profile', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <div>Loading profile...</div>;
  if (!profile) return <div>Failed to load profile</div>;

  return (
    <div className="card">
      <h2 className="text-2xl font-bold mb-4">Profile Information</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="form-label">First Name</label>
          <p className="text-gray-700">{profile.firstName}</p>
        </div>
        <div>
          <label className="form-label">Last Name</label>
          <p className="text-gray-700">{profile.lastName}</p>
        </div>
        <div>
          <label className="form-label">Email</label>
          <p className="text-gray-700">{profile.email}</p>
        </div>
        <div>
          <label className="form-label">Designation</label>
          <p className="text-gray-700">{profile.designation}</p>
        </div>
        <div>
          <label className="form-label">Department</label>
          <p className="text-gray-700">{profile.department}</p>
        </div>
        <div>
          <label className="form-label">Salary</label>
          <p className="text-gray-700">${profile.salary}</p>
        </div>
      </div>
    </div>
  );
}
