export interface Customer {
  id: number;
  full_name: string;
  email: string;
  phone?: string;
  document: string;
  created_at?: string;
  updated_at?: string;
}

export interface CustomerCreateRequest {
  full_name: string;
  email: string;
  phone?: string;
  document: string;
}

export interface CustomerUpdateRequest {
  full_name?: string;
  email?: string;
  phone?: string;
  document?: string;
}
