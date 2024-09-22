import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmailServiceService } from 'src/app/service/email-service.service';
import { NewsletterWithDate } from 'src/app/dto/NewsletterWithDate';
import { Newsletter } from 'src/app/dto/Newsletter';
import { Address } from 'src/app/dto/Address';

@Component({
  selector: 'app-newsletter',
  templateUrl: './create-newsletter.component.html',
  styleUrls: ['./create-newsletter.component.scss']
})
export class CreateNewsletterComponent implements OnInit {

  title = 'New Newsletter';

  newsletter: NewsletterWithDate;

  date: string;

  minute: string;
  hour: string;
  day: string;
  month: string;
  year: string;

  constructor(private emailService: EmailServiceService,
    private router: Router
  ) {
    this.newsletter = new NewsletterWithDate();
    this.date = "";

    this.minute = "";
    this.hour = "";
    this.day = "";
    this.month = "";
    this.year = "";
  }

  ngOnInit() {
  }

  messNewsletter(): void {

    console.log("mess email");
    var nlDto = new Newsletter();

    this.date = this.date.slice(0, -14) + "T" + this.hour + ":" + this.minute + ":00.000Z";
    nlDto.id = this.newsletter.id;
    nlDto.date = this.date;
    nlDto.text = this.newsletter.text;
    nlDto.subject = this.newsletter.subject;
    nlDto.sent = this.newsletter.sent;
    nlDto.status = this.newsletter.status;
    nlDto.address = this.selectedItems;
    console.log(nlDto);
    this.emailService.messNewsletter(nlDto).subscribe(() => { });//отправка через httpClient
    this.router.navigate(['/tabs/newsletter']);
  }

  cancel(): void {
    this.router.navigate(['/tabs/newsletter'])
  }

  isDropdownOpen = false;

  selectedItems: Address[] = [];

  selectedAddresses: string[] = [];

  showAddress(): string {

    this.selectedAddresses = [];
    this.selectedItems.forEach((address: Address): void => {
      if (address.role == 'ADMIN') {
        this.selectedAddresses.push("All of admins");
      } else {
        if (address.course == '1') {
          this.selectedAddresses.push("Students - 1 course" + " - " + address.group + " group");
        } else {
          this.selectedAddresses.push("Students - " + address.course + " course - " + address.department + " department - " + address.group + " group");
        }
      }
    })
    return this.selectedAddresses.join(",");
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
    console.log(this.isDropdownOpen);
  }

  toggleSubDropdown(item: any, event: Event) {
    item.isOpen = !item.isOpen;
    event.stopPropagation();
  }

  onCheckboxChangeAdmin(event: any) {
    this.checkboxAdmin[0].checked = event.target.checked;
  }

  saveSelection(): Address[] {
    this.selectedItems = [];
    if (this.checkboxAdmin[0].checked) {
      const dto = new Address;
      dto.role = 'ADMIN',
        dto.course = '',
        dto.department = '',
        dto.group = [];
      this.selectedItems.push(dto);
    }
    this.collectSelections(this.address, this.selectedItems);
    this.closeAllDropdowns(this.address);
    console.log(this.selectedItems);
    this.toggleDropdown();
    this.selectedAddresses.join(', ');
    return this.selectedItems
  }

  collectSelections(address: any[], selectedItems: Address[]) {
    address.forEach((item) => {
      if (item.items) {
        item.items.forEach((course: { groups: any[]; name: string; items: any[]; }) => {
          if (course.groups) {
            course.groups.forEach((group) => {
              if (group.checked) {
                const existingItem = selectedItems.find((item) => item.role === 'STUDENT' && item.course === course.name.replace(' course', '') && item.department === '');
                if (existingItem) {
                  existingItem.group.push(group.name.replace('Group ', ''));
                } else {
                  const dto = new Address();
                  dto.role = 'STUDENT';
                  dto.course = course.name.replace(' course', '');
                  dto.department = '';
                  dto.group = [group.name.replace('Group ', '')];
                  selectedItems.push(dto);
                }
              }
            });
          } else if (course.items) {
            course.items.forEach((department) => {
              department.items.forEach((group: { checked: any; name: string; }) => {
                if (group.checked) {
                  const existingItem = selectedItems.find((item) => item.role === 'STUDENT' && item.course === course.name.replace(' course', '') && item.department === department.name.replace('Department ', ''));
                  if (existingItem) {
                    existingItem.group.push(group.name.replace('Group ', ''));
                  } else {
                    const dto = new Address();
                    dto.role = 'STUDENT';
                    dto.course = course.name.replace(' course', '');
                    dto.department = department.name.replace('Department ', '');
                    dto.group = [group.name.replace('Group ', '')];
                    selectedItems.push(dto);
                  }
                }
              });
            });
          }
        });
      }
    });
  }

  closeAllDropdowns(items: any[]) {
    for (const item of items) {
      item.isOpen = false;
      if (item.items && item.items.length > 0) {
        this.closeAllDropdowns(item.items);
      }
      if (item.groups && item.groups.length > 0) {
        for (const group of item.groups) {
          group.isOpen = false;
        }
      }
    }
  }

  onCheckboxChangeGroup(group: any, event: any) {
    group.checked = event.target.checked;
  }

  toggleCategoryDropdown(category: any, event: Event) {
    event.stopPropagation;
    category.isOpen = !category.isOpen;
  }

  onCheckboxChange(event: Event) {
    this.isDropdownOpen = false;
  }

  dto: Address = new Address();

  checkboxAdmin = [
    { id: 1, name: 'ADMIN', checked: false } //здесь и далее id нужно было для старой реализации (проходка по всем) можно убрать
  ];

  address = [
    {
      name: 'STUDENT',
      isOpen: false,
      items: [
        {
          name: '1 course',
          isOpen: false,
          groups: [
            { id: 1, name: 'Group 1.1', checked: false },
            { id: 2, name: 'Group 1.2', checked: false },
            { id: 3, name: 'Group 1.3', checked: false },
            { id: 4, name: 'Group 2.1', checked: false },
            { id: 5, name: 'Group 3.1', checked: false },
            { id: 6, name: 'Group 3.2', checked: false }
          ]
        },
        {
          name: '2 course',
          isOpen: false,
          items: [
            {
              name: 'Department KFA',
              isOpen: false,
              items: [
                { id: 7, name: 'Group 1.1', checked: false },
                { id: 8, name: 'Group 1.2', checked: false },
                { id: 9, name: 'Group 1.3', checked: false }
              ]
            },
            {
              name: 'Department KMA',
              isOpen: false,
              items: [
                { id: 10, name: 'Group 2.1', checked: false }
              ]
            },
            {
              name: 'Department KUCP',
              isOpen: false,
              items: [
                { id: 11, name: 'Group 3.1', checked: false },
                { id: 12, name: 'Group 3.2', checked: false }
              ]
            },
          ]
        },
        {
          name: '3 course',
          isOpen: false,
          items: [
            {
              name: 'Department KFA',
              isOpen: false,
              items: [
                { id: 7, name: 'Group 1.1', checked: false },
                { id: 8, name: 'Group 1.2', checked: false },
                { id: 9, name: 'Group 1.3', checked: false }
              ]
            },
            {
              name: 'Department KMA',
              isOpen: false,
              items: [
                { id: 10, name: 'Group 2.1', checked: false }
              ]
            },
            {
              name: 'Department KUCP',
              isOpen: false,
              items: [
                { id: 11, name: 'Group 3.1', checked: false },
                { id: 12, name: 'Group 3.2', checked: false }
              ]
            },
          ]
        }
      ]
    }
  ]

  hours: Array<string> = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"];
  minutes: Array<string> = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59"];

  setDate(event: any) {
    const selectedDate: Date = event.value;
    const localDate = new Date(selectedDate.getTime() - selectedDate.getTimezoneOffset() * 60000);
    this.date = localDate.toISOString();
    console.log("this.date: " + this.date)
  }
}

