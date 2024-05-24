// Defining the interface of contact list
export interface DataItem {
  id: number; // Unique identifier for each contact
  firstName: string; // First name of the contact
  lastName: string; // Last name of the contact
  status: 'active' | 'inactive'; // Status of the contact, either active or inactive
}

// Initial data for the contact list
export const initialData: DataItem[] = [
  // will add some initial data if needed
];
