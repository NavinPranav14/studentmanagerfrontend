export type userStatus = 'Success' | 'Failure';
export interface Staff {
  id: string;
  username: string;
  password: string;
  name: string;
  department: string;
  staffID: string;
  status: string;
  phone: string;
  gender?: string | undefined;
  dob?: string | undefined;
}

export interface editStaff {
  editData: {
    id?: string;
    username?: string;
    password?: string;
    name?: string;
    department?: string;
    staffID?: string;
    status?: string;
    gender?: string;
    dob?: string;
    phone?: string;
  };
}

export interface editStudent {
  editData: {
    id: number;
    username: string;
    password: string;
    roll: number;
    name: string;
    department: string;
    admissionDate: Date;
    status: string;
    gender: string;
    dob: string;
  };
}

export interface StudentDetailsJson {
  status: userStatus;
  data: [
    {
      id: string;
      username: string;
      password: string;
      roll: string;
      name: string;
      department: string;
      admissionDate: Date;
      status: string;
      gender: string;
      dob: string;
    }
  ];
}

export interface Student {
  id: string;
  username: string;
    password?: string;
  roll: string;
  name: string;
  department: string;
  admissionDate: Date;
  status: string;
  gender: string;
  dob: string;
}

export interface StaffDetails {
  status: userStatus;
  data: {
    id: string;
    username: string;
    password: string;
    name: string;
    department: string;
    staffID: string;
    status: string;
    phone: string;
    gender: string;
    dob: string;
  };
}

export interface StudentDetails {
  status: userStatus;
  data: {
    id: string;
    username: string;
    password: string;
    roll: number;
    name: string;
    department: string;
    admission: string;
    status: string;
    gender: string;
    dob: string;
  };
}

export interface StaffDetailsJson {
  status: userStatus;
  data: [
    {
      id: string;
      username: string;
      password: string;
      name: string;
      department: string;
      staffID: string;
      status: string;
      phone: string;
      gender?: string;
      dob?: string;
    }
  ];
}

export interface login {
  status: userStatus;
  message: string;
}

export interface loginInput {
  username: string;
  password: string;
}

export const deleteStudent: string =
  'Do you really want to delete name from departments department? This process cannot be undone';

export const deleteStaff: string =
  'Do you really want to delete name from departments department? This process cannot be undone';

export const confirmation: string = 'Are you sure?';

export const cancel: string = 'Cancel';

export const del: string = 'Delete';

export const staffDetail =
  'Please provide the details of the staff in this form.';

export const studentDetail =
  'Please provide the details of the student in this form.';

export const profileInfo =
  'This is your profile page where you can edit you data. (note that changes made here will affect database and will be displayed in the dashboard)';
