export interface UserData {
  uuid: string;
  email: string;
  name: string;
  surname: string;
  createdAt?: string | Date;
  updatedAt: string | Date | null;
}
