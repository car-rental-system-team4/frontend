import { useState } from 'react';

export default function AdminUsersPage() {
  const [users, setUsers] = useState([
    { id: 1, name: 'Rajesh Kumar', email: 'rajesh@example.com', role: 'Customer', status: 'Active', joinedDate: '2025-01-15' },
    { id: 2, name: 'Priya Singh', email: 'priya@example.com', role: 'Vendor', status: 'Active', joinedDate: '2025-02-20' },
    { id: 3, name: 'Admin User', email: 'admin@rentyourcar.com', role: 'Admin', status: 'Active', joinedDate: '2024-12-01' },
    { id: 4, name: 'Spam User', email: 'spam@example.com', role: 'Customer', status: 'Blocked', joinedDate: '2025-03-10' },
    { id: 5, name: 'Amit Patel', email: 'amit@example.com', role: 'Customer', status: 'Active', joinedDate: '2025-04-05' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const toggleStatus = (id) => {
    setUsers(users.map(user => {
      if (user.id === id) {
        return { ...user, status: user.status === 'Active' ? 'Blocked' : 'Active' };
      }
      return user;
    }));
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1 className="fw-bold mb-4">👥 Manage Users</h1>

      {/* Search Bar */}
      <div className="card shadow-sm border-0 mb-4">
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                placeholder="Search users by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="card shadow-sm border-0">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0 align-middle">
              <thead className="table-light">
                <tr>
                  <th>User ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Joined Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map(user => (
                  <tr key={user.id}>
                    <td>#{user.id}</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <div className="bg-light rounded-circle p-2 me-2">
                          👤
                        </div>
                        <strong>{user.name}</strong>
                      </div>
                    </td>
                    <td>{user.email}</td>
                    <td>
                      <span className={`badge ${user.role === 'Admin' ? 'bg-danger' :
                        user.role === 'Vendor' ? 'bg-info' : 'bg-primary'
                        }`}>
                        {user.role}
                      </span>
                    </td>
                    <td>{user.joinedDate}</td>
                    <td>
                      <span className={`badge ${user.status === 'Active' ? 'bg-success' : 'bg-secondary'}`}>
                        {user.status}
                      </span>
                    </td>
                    <td>
                      <button className="btn btn-sm btn-outline-secondary me-2">View</button>
                      {user.role !== 'Admin' && (
                        <button
                          className={`btn btn-sm ${user.status === 'Active' ? 'btn-outline-danger' : 'btn-outline-success'}`}
                          onClick={() => toggleStatus(user.id)}
                        >
                          {user.status === 'Active' ? 'Block' : 'Unblock'}
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredUsers.length === 0 && (
            <div className="text-center py-5">
              <p className="text-muted">No users found matching your search.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
