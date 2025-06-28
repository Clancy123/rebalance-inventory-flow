
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Settings as SettingsIcon, User, Bell, Shield, Database, Truck, BarChart3 } from "lucide-react";

export function Settings() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [autoApprovalThreshold, setAutoApprovalThreshold] = useState("1000");
  const [forecastModel, setForecastModel] = useState("prophet");

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-blue-50 rounded-xl">
          <SettingsIcon className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600">Manage your SmartStock preferences and configurations</p>
        </div>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
          <TabsTrigger value="forecasting">Forecasting</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Profile Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" defaultValue="Admin" />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" defaultValue="User" />
                </div>
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" defaultValue="admin@smartstock.com" />
              </div>
              <div>
                <Label htmlFor="company">Company</Label>
                <Input id="company" defaultValue="SmartStock Corp" />
              </div>
              <Button>Save Changes</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Regional Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select defaultValue="america/new_york">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="america/new_york">Eastern Time (EST)</SelectItem>
                      <SelectItem value="america/chicago">Central Time (CST)</SelectItem>
                      <SelectItem value="america/denver">Mountain Time (MST)</SelectItem>
                      <SelectItem value="america/los_angeles">Pacific Time (PST)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="currency">Currency</Label>
                  <Select defaultValue="usd">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="usd">USD ($)</SelectItem>
                      <SelectItem value="eur">EUR (€)</SelectItem>
                      <SelectItem value="gbp">GBP (£)</SelectItem>
                      <SelectItem value="cad">CAD (C$)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Notification Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="email-notifications" className="text-base font-medium">Email Notifications</Label>
                  <p className="text-sm text-gray-600">Receive inventory alerts and reports via email</p>
                </div>
                <Switch
                  id="email-notifications"
                  checked={emailNotifications}
                  onCheckedChange={setEmailNotifications}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="push-notifications" className="text-base font-medium">Push Notifications</Label>
                  <p className="text-sm text-gray-600">Get real-time alerts in your browser</p>
                </div>
                <Switch
                  id="push-notifications"
                  checked={pushNotifications}
                  onCheckedChange={setPushNotifications}
                />
              </div>

              <div className="space-y-4 pt-4 border-t">
                <h4 className="font-medium">Alert Types</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label>Stock shortages</Label>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Transfer suggestions</Label>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Forecast accuracy updates</Label>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>System maintenance</Label>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inventory" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="w-5 h-5" />
                Inventory Management
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="low-stock-threshold">Low Stock Threshold (%)</Label>
                <Input id="low-stock-threshold" type="number" defaultValue="20" className="mt-1" />
                <p className="text-sm text-gray-600 mt-1">Alert when stock falls below this percentage of maximum capacity</p>
              </div>

              <div>
                <Label htmlFor="reorder-point">Auto-Reorder Point</Label>
                <Select defaultValue="15">
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10 days</SelectItem>
                    <SelectItem value="15">15 days</SelectItem>
                    <SelectItem value="30">30 days</SelectItem>
                    <SelectItem value="never">Never (Manual only)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-medium">Automatic Stock Reconciliation</Label>
                  <p className="text-sm text-gray-600">Automatically reconcile inventory discrepancies</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="w-5 h-5" />
                Transfer Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="auto-approval">Auto-Approval Threshold ($)</Label>
                <Input
                  id="auto-approval"
                  type="number"
                  value={autoApprovalThreshold}
                  onChange={(e) => setAutoApprovalThreshold(e.target.value)}
                  className="mt-1"
                />
                <p className="text-sm text-gray-600 mt-1">Transfers below this value are automatically approved</p>
              </div>

              <div>
                <Label htmlFor="max-distance">Maximum Transfer Distance (miles)</Label>
                <Select defaultValue="500">
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="100">100 miles</SelectItem>
                    <SelectItem value="250">250 miles</SelectItem>
                    <SelectItem value="500">500 miles</SelectItem>
                    <SelectItem value="1000">1000 miles</SelectItem>
                    <SelectItem value="unlimited">Unlimited</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="forecasting" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Forecasting Model
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="forecast-model">Primary Model</Label>
                <Select value={forecastModel} onValueChange={setForecastModel}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="prophet">Prophet (Recommended)</SelectItem>
                    <SelectItem value="xgboost">XGBoost</SelectItem>
                    <SelectItem value="ensemble">Ensemble (Prophet + XGBoost)</SelectItem>
                    <SelectItem value="arima">ARIMA</SelectItem>
                  </SelectContent>
                </Select>
                <div className="mt-2">
                  <Badge variant="secondary">Current Accuracy: 91.2%</Badge>
                </div>
              </div>

              <div>
                <Label htmlFor="forecast-horizon">Forecast Horizon (days)</Label>
                <Select defaultValue="30">
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7">7 days</SelectItem>
                    <SelectItem value="14">14 days</SelectItem>
                    <SelectItem value="30">30 days</SelectItem>
                    <SelectItem value="60">60 days</SelectItem>
                    <SelectItem value="90">90 days</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-medium">Include Weather Data</Label>
                  <p className="text-sm text-gray-600">Use weather patterns to improve forecasting accuracy</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-medium">Holiday Adjustments</Label>
                  <p className="text-sm text-gray-600">Account for seasonal and holiday demand patterns</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="account" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Security & Access
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="current-password">Current Password</Label>
                <Input id="current-password" type="password" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="new-password">New Password</Label>
                <Input id="new-password" type="password" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input id="confirm-password" type="password" className="mt-1" />
              </div>
              <Button>Update Password</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Two-Factor Authentication</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-medium">Enable 2FA</Label>
                  <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
                </div>
                <Switch />
              </div>
              <Button variant="outline">Set up Authenticator App</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Data Management</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <Label className="text-base font-medium">Export Data</Label>
                  <p className="text-sm text-gray-600">Download your inventory and transfer data</p>
                </div>
                <Button variant="outline">Export</Button>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <Label className="text-base font-medium">Clear Cache</Label>
                  <p className="text-sm text-gray-600">Reset cached forecasts and calculations</p>
                </div>
                <Button variant="outline">Clear</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
