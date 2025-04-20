export type userType = {
  id: number;
  email: string;
  password: string;
  username: string | null;
  donationsreceived?: receivedDonationsType[];
  profile?: profileType | null;
  bankCard?: BankCardType | null;
  createdAt: Date;
  updatedAt: Date;
};

export type profileType = {
  id: number;
  name: string;
  about: string;
  avatarImage: string;
  socialmediaurl: string;
  backgroundImage?: string;
  successMessage?: string;
  userid: number;
  createdAt?: string;
  updatedAt?: string;
};

export type BankCardType = {
  id: number;
  country: string;
  firstname: string;
  lastname: string;
  cardnumber: string;
  expires: string;
  year: string;
  cvc: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
};

export type receivedDonationsType = {
  id: number;
  amount: number;
  specialmessage: string;
  avatarimage: string;
  socialmediaurl: string;
  name: string;
  donorid: number;
};
