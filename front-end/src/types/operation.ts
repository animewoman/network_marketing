export interface TransferData {
  score: number | null;
  login: string;
}

export interface Report {
  from: string;
  score: number;
  status: ReportStatus;
  type: string;
}

interface ReportStatus {
  color: string;
  title: string;
}
