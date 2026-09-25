import { ContactMessageInput, ContactMessageRecord } from "./schema";

// In-memory dummy data store for received messages
export const DUMMY_CONTACT_MESSAGES: ContactMessageRecord[] = [];

export async function createContactMessage(
  input: ContactMessageInput
): Promise<ContactMessageRecord> {
  const newRecord: ContactMessageRecord = {
    id: `msg_${Date.now()}`,
    name: input.name || "Anonymous",
    email: input.email,
    subject: input.subject || "No Subject",
    message: input.message,
    receivedAt: new Date().toISOString(),
  };

  DUMMY_CONTACT_MESSAGES.push(newRecord);
  return newRecord;
}

export async function getContactMessages(): Promise<ContactMessageRecord[]> {
  return DUMMY_CONTACT_MESSAGES;
}
