
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Plus } from "lucide-react";

export function UserManagement() {
  const users = [
    {
      username: "admin1",
      email: "admin@smartstock.com",
      role: "Admin",
      lastLogin: "Today",
      status: "active"
    },
    {
      username: "analyst2",
      email: "analyst@smartstock.com", 
      role: "Analyst",
      lastLogin: "Yesterday",
      status: "active"
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add User
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>System Users</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Username</th>
                  <th className="text-left py-2">Email</th>
                  <th className="text-left py-2">Role</th>
                  <th className="text-left py-2">Last Login</th>
                  <th className="text-left py-2">Status</th>
                  <th className="text-left py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.username} className="border-b">
                    <td className="py-3 font-medium">{user.username}</td>
                    <td className="py-3">{user.email}</td>
                    <td className="py-3">
                      <Badge variant={user.role === 'Admin' ? 'default' : 'secondary'}>
                        {user.role}
                      </Badge>
                    </td>
                    <td className="py-3">{user.lastLogin}</td>
                    <td className="py-3">
                      <Badge className="bg-green-100 text-green-800">✅ Active</Badge>
                    </td>
                    <td className="py-3">
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">Edit</Button>
                        <Button variant="outline" size="sm">Suspend</Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <div className="text-center py-20">
        <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-600 mb-2">Advanced User Management Coming Soon</h2>
        <p className="text-gray-500">Role-based permissions, activity logging, and user analytics.</p>
      </div>
    </div>
  );
}
