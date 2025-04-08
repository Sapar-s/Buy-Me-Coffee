export type userType = {
  id: number;
  email: string;
  password: string;
  username: string | null;
  donationsReceived?: receivedDonationsType[];
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
  firstName: string;
  lastName: string;
  cardNumber: string;
  expiryDate: string;
  cvc: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
};

export type receivedDonationsType = {
  id: number;
  amount: number;
  specialMessage: string;
  socialMediaURLOrBuyMeCoffee: string;
  donorId: number;
};
