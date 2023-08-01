import { Contact } from "../../pages/Dashboard/@types";
import { Container } from "./style";

interface CardProps {
  contact: Contact;
}

export const Card = ({ contact }: CardProps) => {
  return (
    <Container>
      <h1>{contact.name}</h1>
      <p>{contact.name}</p>
      {contact.email.map((item, index) => (
        <p key={index}>{item}</p>
      ))}
      {contact.phoneNumber.map((item, index) => (
        <p key={index}>{item}</p>
      ))}
      <button onClick={() => console.log("clicke")}>Deletar</button>
    </Container>
  );
};
