// import { ReactNode, createContext, useEffect, useState } from "react";
// import { api } from "../../services/api";
// // import { useNavigate } from "react-router-dom";

// interface AuthProviderProps {
//   children: ReactNode;
// }

// // export interface Contact {
// //     id: string,
// //     status: string,
// //     description: string,
// //     title: string
// // }

// interface ContactsContextValues {
//   contacts: any;
// }

// export const ContactsContext = createContext({} as ContactsContextValues);

// export const AuthProvider = ({ children }: AuthProviderProps) => {
//   const [contacts, setContacts] = useState<any>();

//   // const [isOpenModal, setIsOpenModal] = useState(false)

//   return (
//     <ContactsContext.Provider value={{ contacts }}>
//       {children}
//     </ContactsContext.Provider>
//   );
// };
