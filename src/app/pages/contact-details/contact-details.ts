import { Component, OnInit, input, inject } from '@angular/core';
import { Contact } from '../../interfaces/contact';
import { ContactsService } from '../../services/contactsService';

@Component({
  imports: [],
  selector: 'app-contact-details',
  styleUrl: './contact-details.scss',
  templateUrl: './contact-details.html',
})
export class ContactDetails implements OnInit {
  id = input.required<string>();
  contacto:Contact | undefined;
  contactsService = inject(ContactsService);

  ngOnInit(): void {
    this.contacto = this.contactsService.getContactById(this.id())
  }

}

