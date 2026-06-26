// --- Nested types ---
interface Geo {
  lat: string;
  lng: string;
}

interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

// --- Core entity ---
export interface Employee {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  address: Address;
  company: Company;
}

// --- Component prop types ---
export interface UserListProps {
  selectedEmployee: Employee | null;
  onSelectEmployee: (user: Employee | null) => void;
}

export interface UserCardProps {
  employee: Employee;
  isSelected: boolean;
  onSelectUser: (user: Employee) => void;
}

export interface EmployeeDetailsProps {
  value: Employee | null;
  onChange: (user: Employee | null) => void;
}

export interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export interface AddEmployeeFormProps {
  onAddEmployee: (employee: Omit<Employee, 'id'>) => void;
}