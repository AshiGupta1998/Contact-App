import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContactService } from '../services/contact.service';
import { Contact } from '../Models/contact.model';
declare var bootstrap: any;
@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css'],
})
export class ContactListComponent implements OnInit {
  contacts: Contact[] = [];
  selectedContact?: Contact;
  isEdit: boolean = false;
  showModal: boolean = false;
  modalMessage: string = '';
  contactToDelete: number | null = null;
  constructor(
    private contactService: ContactService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadContacts();
  }

  loadContacts(): void {
    this.contactService.getContacts().subscribe((contacts) => {
      this.contacts = contacts;
    });
  }

  openContactModal(contact?: Contact): void {
    this.isEdit = !!contact;
    if (contact) {
      this.selectedContact = { ...contact };
    } else {
      // Reset form data for a new contact
      this.selectedContact = {} as Contact;
    }

    const modal = new bootstrap.Modal(document.getElementById('contactModal')!);
    modal.show();
    this.cdr.detectChanges(); // Force change detection
  }

  onSave(): void {
    this.loadContacts();
    const modal = bootstrap.Modal.getInstance(
      document.getElementById('contactModal')!
    );
    modal.hide();
  }

  deleteContact(id: number): void {
    this.contactToDelete = id;
    this.modalMessage = 'Are you sure you want to delete this contact?';
    this.showModal = true;
  }

  onModalConfirm(confirmed: boolean): void {
    if (confirmed && this.contactToDelete !== null) {
      this.contactService.deleteContact(this.contactToDelete).subscribe(() => {
        this.loadContacts(); // Refresh the contact list
      });
    }
    this.showModal = false;
  }
}
