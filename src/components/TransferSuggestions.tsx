import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowRightLeft, Truck, MapPin, Clock, CheckCircle, XCircle, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const initialTransferSuggestions = [
  {
    id: "T001",
    fromStore: "Seattle-Pike",
    fromStoreId: "#089",
    toStore: "Portland-SW",
    toStoreId: "#156",
    sku: "E345",
    productName: "Rain Jacket",
    quantity: 25,
    distance: "280 km",
    estimatedTime: "4 hours",
    priority: "High",
    status: "pending",
    reason: "Forecasted demand surge in Portland",
    costSaving: "$1,250"
  },
  {
    id: "T002",
    fromStore: "Denver-Mall",
    fromStoreId: "#278",
    toStore: "Austin-Central",
    toStoreId: "#156",
    sku: "H234",
    productName: "Winter Coat",
    quantity: 15,
    distance: "1,200 km",
    estimatedTime: "18 hours",
    priority: "Medium",
    status: "approved",
    reason: "Seasonal demand shift",
    costSaving: "$890"
  },
  {
    id: "T003",
    fromStore: "LA-West",
    fromStoreId: "#107",
    toStore: "Miami-Beach",
    toStoreId: "#143",
    sku: "D012",
    productName: "Summer Dress",
    quantity: 30,
    distance: "3,500 km",
    estimatedTime: "2 days",
    priority: "High",
    status: "pending",
    reason: "Inventory shortage detected",
    costSaving: "$2,100"
  },
  {
    id: "T004",
    fromStore: "Boston-North",
    fromStoreId: "#234",
    toStore: "NYC-05",
    toStoreId: "#301",
    sku: "F678",
    productName: "Leather Boots",
    quantity: 20,
    distance: "350 km",
    estimatedTime: "5 hours",
    priority: "Low",
    status: "rejected",
    reason: "Regional preference alignment",
    costSaving: "$450"
  },
  {
    id: "T005",
    fromStore: "Chicago-Loop",
    fromStoreId: "#205",
    toStore: "Detroit-Central",
    toStoreId: "#198",
    sku: "C789",
    productName: "White Sneakers",
    quantity: 18,
    distance: "450 km",
    estimatedTime: "6 hours",
    priority: "Medium",
    status: "approved",
    reason: "Balance inventory levels",
    costSaving: "$720"
  }
];

export function TransferSuggestions() {
  const { toast } = useToast();
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTransfers, setSelectedTransfers] = useState<string[]>([]);
  const [transferSuggestions, setTransferSuggestions] = useState(initialTransferSuggestions);

  const filteredTransfers = transferSuggestions.filter(transfer => {
    const matchesStatus = statusFilter === "all" || transfer.status === statusFilter;
    const matchesPriority = priorityFilter === "all" || transfer.priority.toLowerCase() === priorityFilter;
    const matchesSearch = transfer.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transfer.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transfer.fromStore.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transfer.toStore.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesPriority && matchesSearch;
  });

  const handleSelectTransfer = (transferId: string) => {
    setSelectedTransfers(prev => 
      prev.includes(transferId) 
        ? prev.filter(id => id !== transferId)
        : [...prev, transferId]
    );
  };

  const handleApproveTransfer = (transferId: string) => {
    setTransferSuggestions(prev => prev.map(transfer => 
      transfer.id === transferId ? { ...transfer, status: "approved" } : transfer
    ));
    toast({
      title: "Transfer Approved",
      description: `Transfer ${transferId} has been approved successfully`,
    });
  };

  const handleRejectTransfer = (transferId: string) => {
    setTransferSuggestions(prev => prev.map(transfer => 
      transfer.id === transferId ? { ...transfer, status: "rejected" } : transfer
    ));
    toast({
      title: "Transfer Rejected",
      description: `Transfer ${transferId} has been rejected`,
      variant: "destructive",
    });
  };

  const handleBulkApprove = () => {
    setTransferSuggestions(prev => prev.map(transfer => 
      selectedTransfers.includes(transfer.id) && transfer.status === "pending"
        ? { ...transfer, status: "approved" }
        : transfer
    ));
    toast({
      title: "Bulk Approval Complete",
      description: `${selectedTransfers.length} transfers have been approved`,
    });
    setSelectedTransfers([]);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Approved</Badge>;
      case "rejected":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Rejected</Badge>;
      default:
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pending</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "high":
        return <Badge variant="destructive">High</Badge>;
      case "medium":
        return <Badge variant="secondary">Medium</Badge>;
      default:
        return <Badge variant="outline">Low</Badge>;
    }
  };

  const totalCostSaving = filteredTransfers
    .filter(t => selectedTransfers.includes(t.id))
    .reduce((sum, t) => sum + parseInt(t.costSaving.replace(/[\$,]/g, '')), 0);

  return (
    <div className="p-6 space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 rounded-lg">
                <ArrowRightLeft className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">{transferSuggestions.length}</div>
                <div className="text-sm text-gray-600">Total Suggestions</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-50 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">{transferSuggestions.filter(t => t.status === "approved").length}</div>
                <div className="text-sm text-gray-600">Approved</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-50 rounded-lg">
                <Clock className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">{transferSuggestions.filter(t => t.status === "pending").length}</div>
                <div className="text-sm text-gray-600">Pending</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-50 rounded-lg">
                <XCircle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">{transferSuggestions.filter(t => t.status === "rejected").length}</div>
                <div className="text-sm text-gray-600">Rejected</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Actions */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <CardTitle>Transfer Suggestions</CardTitle>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search transfers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full sm:w-48"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-32">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="w-full sm:w-32">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priority</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          {selectedTransfers.length > 0 && (
            <div className="flex items-center justify-between bg-blue-50 p-3 rounded-lg">
              <div className="text-sm">
                {selectedTransfers.length} transfers selected • Potential savings: ${totalCostSaving.toLocaleString()}
              </div>
              <div className="flex gap-2">
                <Button size="sm" onClick={handleBulkApprove}>
                  Bulk Approve
                </Button>
                <Button variant="outline" size="sm">
                  Export Selected
                </Button>
              </div>
            </div>
          )}
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-3 px-4 text-left">
                    <Checkbox
                      checked={selectedTransfers.length === filteredTransfers.filter(t => t.status === "pending").length}
                      onCheckedChange={(checked) => {
                        const pendingTransfers = filteredTransfers.filter(t => t.status === "pending");
                        if (checked) {
                          setSelectedTransfers(pendingTransfers.map(t => t.id));
                        } else {
                          setSelectedTransfers([]);
                        }
                      }}
                    />
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">ID</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">From → To</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Product</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Quantity</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Distance</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Priority</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Savings</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredTransfers.map((transfer) => (
                  <tr key={transfer.id} className="hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <Checkbox
                        checked={selectedTransfers.includes(transfer.id)}
                        onCheckedChange={() => handleSelectTransfer(transfer.id)}
                        disabled={transfer.status !== "pending"}
                      />
                    </td>
                    <td className="py-3 px-4 font-mono text-sm">{transfer.id}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className="text-sm">
                          <div className="font-medium">{transfer.fromStore}</div>
                          <div className="text-gray-500">{transfer.fromStoreId}</div>
                        </div>
                        <ArrowRightLeft className="w-4 h-4 text-gray-400" />
                        <div className="text-sm">
                          <div className="font-medium">{transfer.toStore}</div>
                          <div className="text-gray-500">{transfer.toStoreId}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div>
                        <div className="font-medium">{transfer.productName}</div>
                        <div className="text-sm text-gray-500 font-mono">{transfer.sku}</div>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-semibold">{transfer.quantity}</td>
                    <td className="py-3 px-4">
                      <div className="text-sm">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {transfer.distance}
                        </div>
                        <div className="flex items-center gap-1 text-gray-500">
                          <Truck className="w-3 h-3" />
                          {transfer.estimatedTime}
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      {getPriorityBadge(transfer.priority)}
                    </td>
                    <td className="py-3 px-4">
                      {getStatusBadge(transfer.status)}
                    </td>
                    <td className="py-3 px-4 font-semibold text-green-600">
                      {transfer.costSaving}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-1">
                        {transfer.status === "pending" && (
                          <>
                            <Button 
                              size="sm" 
                              className="bg-green-600 hover:bg-green-700 text-white"
                              onClick={() => handleApproveTransfer(transfer.id)}
                            >
                              Approve
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleRejectTransfer(transfer.id)}
                            >
                              Reject
                            </Button>
                          </>
                        )}
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
