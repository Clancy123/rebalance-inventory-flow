
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Archive, Plus, Upload } from "lucide-react";

export function SKUManagement() {
  const skus = [
    {
      id: "A123",
      name: "Blue Cotton Shirt",
      category: "Apparel",
      reorderPoint: 30,
      active: true
    },
    {
      id: "B456", 
      name: "Red Hoodie",
      category: "Apparel",
      reorderPoint: 25,
      active: true
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">SKU Management</h1>
        <div className="flex gap-2">
          <Button variant="outline">
            <Upload className="w-4 h-4 mr-2" />
            Upload CSV
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add SKU
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Product Catalog</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">SKU ID</th>
                  <th className="text-left py-2">Product Name</th>
                  <th className="text-left py-2">Category</th>
                  <th className="text-left py-2">Reorder Point</th>
                  <th className="text-left py-2">Status</th>
                  <th className="text-left py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {skus.map((sku) => (
                  <tr key={sku.id} className="border-b">
                    <td className="py-3 font-mono">{sku.id}</td>
                    <td className="py-3">{sku.name}</td>
                    <td className="py-3">{sku.category}</td>
                    <td className="py-3">{sku.reorderPoint}</td>
                    <td className="py-3">
                      <Badge className={sku.active ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
                        {sku.active ? "✅ Active" : "❌ Inactive"}
                      </Badge>
                    </td>
                    <td className="py-3">
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">Edit</Button>
                        <Button variant="outline" size="sm">Archive</Button>
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
        <Archive className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-600 mb-2">Advanced SKU Management Coming Soon</h2>
        <p className="text-gray-500">Bulk operations, detailed product views, and inventory tracking per SKU.</p>
      </div>
    </div>
  );
}
