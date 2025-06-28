
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Package, TrendingUp, TrendingDown, ArrowRightLeft, Truck } from "lucide-react";

// Mock store data with geographical information
const storeLocations = [
  { 
    id: "NYC-05", 
    name: "5th Avenue", 
    coords: { lat: 40.7614, lng: -73.9776 }, 
    status: "deficit", 
    stock: 245, 
    forecast: 320,
    address: "767 5th Ave, New York, NY 10153"
  },
  { 
    id: "LA-West", 
    name: "Beverly Hills", 
    coords: { lat: 34.0736, lng: -118.4004 }, 
    status: "surplus", 
    stock: 420, 
    forecast: 280,
    address: "9570 Wilshire Blvd, Beverly Hills, CA 90212"
  },
  { 
    id: "Chicago-Loop", 
    name: "Magnificent Mile", 
    coords: { lat: 41.8957, lng: -87.6237 }, 
    status: "balanced", 
    stock: 310, 
    forecast: 305,
    address: "835 N Michigan Ave, Chicago, IL 60611"
  },
  { 
    id: "Miami-Beach", 
    name: "Lincoln Road", 
    coords: { lat: 25.7907, lng: -80.1351 }, 
    status: "deficit", 
    stock: 150, 
    forecast: 240,
    address: "1111 Lincoln Rd, Miami Beach, FL 33139"
  },
  { 
    id: "Seattle-Pike", 
    name: "Pike Place", 
    coords: { lat: 47.6089, lng: -122.3403 }, 
    status: "surplus", 
    stock: 380, 
    forecast: 290,
    address: "1428 Post Alley, Seattle, WA 98101"
  }
];

const activeTransfers = [
  {
    id: "T001",
    from: "Seattle-Pike",
    to: "Miami-Beach",
    fromCoords: { lat: 47.6089, lng: -122.3403 },
    toCoords: { lat: 25.7907, lng: -80.1351 },
    sku: "E345",
    quantity: 25,
    status: "in-transit"
  },
  {
    id: "T002",
    from: "LA-West",
    to: "NYC-05",
    fromCoords: { lat: 34.0736, lng: -118.4004 },
    toCoords: { lat: 40.7614, lng: -73.9776 },
    sku: "D012",
    quantity: 30,
    status: "approved"
  }
];

export function MapView() {
  const [selectedStore, setSelectedStore] = useState<string | null>(null);
  const [showTransfers, setShowTransfers] = useState(true);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "surplus": return "text-yellow-600 bg-yellow-100";
      case "deficit": return "text-red-600 bg-red-100";
      default: return "text-green-600 bg-green-100";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "surplus": return TrendingUp;
      case "deficit": return TrendingDown;
      default: return Package;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Map Placeholder */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Store Locations & Transfer Routes</CardTitle>
              <div className="flex items-center gap-4">
                <Button 
                  variant={showTransfers ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setShowTransfers(!showTransfers)}
                >
                  <ArrowRightLeft className="w-4 h-4 mr-2" />
                  Show Transfers
                </Button>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span>Balanced</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span>Surplus</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span>Deficit</span>
                  </div>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Map Placeholder - In a real app, this would be Google Maps or similar */}
            <div className="h-96 bg-gray-100 rounded-lg relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50"></div>
              
              {/* Store pins positioned approximately based on US geography */}
              {storeLocations.map((store) => {
                const StatusIcon = getStatusIcon(store.status);
                // Convert lat/lng to approximate positions on our mock map
                const left = ((store.coords.lng + 125) / 60) * 100; // Rough conversion
                const top = ((50 - store.coords.lat) / 25) * 100; // Rough conversion
                
                return (
                  <div
                    key={store.id}
                    className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all hover:scale-110 ${
                      selectedStore === store.id ? 'scale-125 z-10' : ''
                    }`}
                    style={{ left: `${Math.max(10, Math.min(90, left))}%`, top: `${Math.max(10, Math.min(90, top))}%` }}
                    onClick={() => setSelectedStore(selectedStore === store.id ? null : store.id)}
                  >
                    <div className={`p-2 rounded-full shadow-lg border-2 border-white ${
                      store.status === 'surplus' ? 'bg-yellow-500' :
                      store.status === 'deficit' ? 'bg-red-500' : 'bg-green-500'
                    }`}>
                      <MapPin className="w-4 h-4 text-white" />
                    </div>
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 bg-white px-2 py-1 rounded shadow-md text-xs font-medium whitespace-nowrap">
                      {store.id}
                    </div>
                  </div>
                );
              })}

              {/* Transfer routes */}
              {showTransfers && activeTransfers.map((transfer) => {
                const fromLeft = ((transfer.fromCoords.lng + 125) / 60) * 100;
                const fromTop = ((50 - transfer.fromCoords.lat) / 25) * 100;
                const toLeft = ((transfer.toCoords.lng + 125) / 60) * 100;
                const toTop = ((50 - transfer.toCoords.lat) / 25) * 100;
                
                return (
                  <svg key={transfer.id} className="absolute inset-0 w-full h-full pointer-events-none">
                    <defs>
                      <marker
                        id={`arrowhead-${transfer.id}`}
                        markerWidth="10"
                        markerHeight="7"
                        refX="9"
                        refY="3.5"
                        orient="auto"
                      >
                        <polygon
                          points="0 0, 10 3.5, 0 7"
                          fill="#3b82f6"
                        />
                      </marker>
                    </defs>
                    <line
                      x1={`${Math.max(10, Math.min(90, fromLeft))}%`}
                      y1={`${Math.max(10, Math.min(90, fromTop))}%`}
                      x2={`${Math.max(10, Math.min(90, toLeft))}%`}
                      y2={`${Math.max(10, Math.min(90, toTop))}%`}
                      stroke="#3b82f6"
                      strokeWidth="2"
                      strokeDasharray={transfer.status === 'in-transit' ? "5,5" : "none"}
                      markerEnd={`url(#arrowhead-${transfer.id})`}
                    />
                  </svg>
                );
              })}

              {/* Map attribution */}
              <div className="absolute bottom-2 left-2 text-xs text-gray-500 bg-white px-2 py-1 rounded">
                Interactive Map View
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Store Details Sidebar */}
        <Card>
          <CardHeader>
            <CardTitle>Store Details</CardTitle>
          </CardHeader>
          <CardContent>
            {!selectedStore ? (
              <div className="text-center text-gray-500 py-8">
                <MapPin className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>Click on a store pin to view details</p>
              </div>
            ) : (
              <div className="space-y-4">
                {storeLocations
                  .filter(store => store.id === selectedStore)
                  .map(store => {
                    const StatusIcon = getStatusIcon(store.status);
                    return (
                      <div key={store.id} className="space-y-4">
                        <div>
                          <h3 className="font-semibold text-lg">{store.name}</h3>
                          <p className="text-sm text-gray-600">{store.id}</p>
                          <p className="text-xs text-gray-500 mt-1">{store.address}</p>
                        </div>
                        
                        <div className={`flex items-center gap-2 p-3 rounded-lg ${getStatusColor(store.status)}`}>
                          <StatusIcon className="w-5 h-5" />
                          <span className="font-medium capitalize">{store.status}</span>
                        </div>

                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Current Stock</span>
                            <span className="font-semibold">{store.stock}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Forecasted Demand</span>
                            <span className="font-semibold">{store.forecast}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Difference</span>
                            <span className={`font-semibold ${
                              store.stock - store.forecast > 0 ? 'text-yellow-600' : 
                              store.stock - store.forecast < 0 ? 'text-red-600' : 'text-green-600'
                            }`}>
                              {store.stock - store.forecast > 0 ? '+' : ''}{store.stock - store.forecast}
                            </span>
                          </div>
                        </div>

                        <div className="pt-4 border-t">
                          <h4 className="font-medium mb-2">Recent Transfers</h4>
                          <div className="space-y-2">
                            {activeTransfers
                              .filter(t => t.from === store.id || t.to === store.id)
                              .map(transfer => (
                                <div key={transfer.id} className="flex items-center gap-2 p-2 bg-blue-50 rounded text-sm">
                                  <Truck className="w-4 h-4 text-blue-600" />
                                  <div>
                                    <div className="font-medium">
                                      {transfer.from === store.id ? `To ${transfer.to}` : `From ${transfer.from}`}
                                    </div>
                                    <div className="text-gray-600">
                                      {transfer.sku} • Qty: {transfer.quantity}
                                    </div>
                                  </div>
                                  <Badge variant="outline" className="ml-auto">
                                    {transfer.status}
                                  </Badge>
                                </div>
                              ))
                            }
                            {activeTransfers.filter(t => t.from === store.id || t.to === store.id).length === 0 && (
                              <p className="text-sm text-gray-500">No recent transfers</p>
                            )}
                          </div>
                        </div>

                        <Button className="w-full" size="sm">
                          View Full History
                        </Button>
                      </div>
                    );
                  })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Active Transfers Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Truck className="w-5 h-5" />
            Active Transfers
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Transfer ID</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Route</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">SKU</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Quantity</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {activeTransfers.map((transfer) => (
                  <tr key={transfer.id} className="hover:bg-gray-50">
                    <td className="py-3 px-4 font-mono text-sm">{transfer.id}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm">{transfer.from}</span>
                        <ArrowRightLeft className="w-4 h-4 text-gray-400" />
                        <span className="text-sm">{transfer.to}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-mono text-sm">{transfer.sku}</td>
                    <td className="py-3 px-4 font-semibold">{transfer.quantity}</td>
                    <td className="py-3 px-4">
                      <Badge variant={transfer.status === 'in-transit' ? 'default' : 'secondary'}>
                        {transfer.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Button variant="outline" size="sm">
                        Track
                      </Button>
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
