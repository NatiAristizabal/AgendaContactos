import { inject, Service, signal } from '@angular/core';
import { Contact } from '../interfaces/contact';
import { Auth } from './auth';

@Service()
export class ContactsService {

authService = inject(Auth);

readonly contactList = signal<Contact[]>([]);


agregarContacto(nuevoContacto:Contact){
  }

async getContacts():Promise<Contact[]>{
  const res = await fetch("http://localhost:5000/api/contacts",{
    method: "GET",
    headers: {
        Authorization: "Bearer "+this.authService.token
    },
    
  })
  if (!res.ok) return [];
  const contactos = await res.json()
  this.contactList.set(contactos);
  console.log(this.contactList)

  return contactos;
}

// Busca un contacto desde un ID
getContactById(id:number){
  
}

deleteContact(id:number){
  
}

editContact(contact:Contact){
  
}


}