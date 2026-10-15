export interface ContactMessageInput {
  name?: string;
  email: string;
  subject?: string;
  message: string;
}

export interface ContactMessageRecord extends ContactMessageInput {
  id: string;
  receivedAt: string;
}
