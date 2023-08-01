export interface Contact {
  id: string;
  name: string;
  email: string[];
  phoneNumber: string[];
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  createdAt: string;
  contacts: Contact[];
}
