import { Service } from '@angular/core';
import { Contact } from '../interfaces/contact';

@Service()
export class ContactsService {

contactList:Contact[] = [
    {
      id: "1",
      nombre: "Juan",
      apellido: "Perez",
      email: "juan@maill.com",
      numeroTelefono: "12345",
      direccion: "Mitre 400"
    },
    {
      id: "2",
      nombre: "Pedro",
      apellido: "Gonzalez",
      email: "pedro@mail.com",
      numeroTelefono: "467532",
      direccion: "Tucuman 850"
    },
    {
      id: "3",
      nombre: "Ana",
      apellido: "Lopez",
      email: "ana@mail.com",
      numeroTelefono: '90872',
      direccion: "Sarmiento 1100"
    },
    {
      id: "4",
      nombre: "Pablo",
      apellido: "Gil",
      email: "pablo@mail.com",
      numeroTelefono: "76321",
      direccion: "Pellegrini 1234"
    },
    {
      id: "5",
      nombre: "Sofia",
      apellido: "Garcia",
      email: "sofia@mail.com",
      numeroTelefono: "34781",
    }
  ]

agregarContacto(contacto: Contact) {
  if (!contacto.id) {
    contacto.id = (this.contactList.length + 1).toString();
  }

  this.contactList.push(contacto);
  return contacto.id;
}

  
getContactById(id:string){
  const contactoEncontrado = this.contactList.find(contact => contact.id === id);
  return contactoEncontrado; /// Busca un contacto desde un ID
}

deleteContact(id:string){
  this.contactList = this.contactList.filter(c => c.id !== id);
}

}