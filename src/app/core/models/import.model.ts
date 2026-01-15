export interface Import {
  id: number;
  filename: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  total_rows?: number;
  processed_rows?: number;
  error_message?: string;
  created_at: string;
  updated_at: string;
}

export interface ImportListResponse {
  imports: Import[];
}
