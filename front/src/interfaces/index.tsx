export type StatesID = "PENDENTE" | "RECUSADO" | "TRATAMENTO" | "FINALIZADO";
export interface TicketInterface {
  id: number;
  title: string;
  description: string;
  created_at: Date;
  updated_at: Date;
  created_by: number;
  updated_by: number;
  id_state: StatesID;
  id_department: number;
  observacoes?: string;
}

export interface StateInterface {
  id: StatesID,
  title: string
}

export interface DepartmentInterface {
  id: number,
  title: string
}