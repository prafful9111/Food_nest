// Auth & Users
export interface UserResponse {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
}

export interface TokenResponse {
  access_token: string;
  token_type: string;
}

// Food & Combos
export interface FoodItemResponse {
  id: string;
  name: string;
  price: number;
  category: string;
  available: boolean;
  image_url: string | null;
  tax_rate: number;
}

export interface ComboResponse {
  id: string;
  name: string;
  price: number;
  available: boolean;
  food_items: FoodItemResponse[];
}

// Inventory
export interface InventoryItemResponse {
  id: string;
  name: string;
  current: number;
  max_capacity: number;
  unit: string;
  is_raw_material: boolean;
}

// Routes & Teams
export interface RouteStopResponse {
  id: string;
  name: string;
  order_index: number;
  latitude: number;
  longitude: number;
  route_id: string;
}

export interface RouteResponse {
  id: string;
  name: string;
  status: string;
  rider_id: string | null;
  team_id: string | null;
  duration: number;
  stops: RouteStopResponse[];
}

export interface TeamResponse {
  id: string;
  name: string;
  members: UserResponse[];
}

// Vehicles
export interface BatteryResponse {
  id: string;
  imei: string;
  type: string;
  capacity: string;
  status: string;
  vehicle_id: string | null;
}

export interface ServiceRecordResponse {
  id: string;
  date: string;
  type: string;
  description: string | null;
  cost: number;
  mechanic: string | null;
  vehicle_id: string;
}

export interface VehicleResponse {
  id: string;
  registration_no: string;
  status: string;
  assigned_rider_id: string | null;
  batteries: BatteryResponse[];
  service_records: ServiceRecordResponse[];
}

// Sales
export interface SaleItemResponse {
  id: string;
  food_item_id: string;
  quantity: number;
  unit_price: number;
  sale_id: string;
  food_item: FoodItemResponse;
}

export interface SaleResponse {
  id: string;
  total: number;
  payment_method: string;
  rider_id: string;
  timestamp: string;
  rider: UserResponse;
  items: SaleItemResponse[];
}

// Tasks & Requests
export interface RefillRequestResponse {
  id: string;
  food_item_id: string;
  quantity: number;
  priority: string;
  rider_id: string;
  status: string;
  assigned_cook_id: string | null;
  coordinator_id: string | null;
  started_at: string | null;
  delivered_at: string | null;
  food_item: FoodItemResponse;
  rider: UserResponse;
}

export interface TaskResponse {
  id: string;
  title: string;
  priority: string;
  status: string;
  assigned_by_id: string;
  created_at: string;
  assigned_to: UserResponse;
  assigned_by: UserResponse;
}

