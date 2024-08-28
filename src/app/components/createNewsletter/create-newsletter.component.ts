import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { EmailTableComponent } from '../email-table/email-table.component';
import { EmailServiceService } from 'src/app/service/email-service.service';
import { WebsocketServiceService } from 'src/app/service/websocket-service.service';
import { NewsletterWithDate } from 'src/app/dto/NewsletterWithDate';
import { Newsletter } from 'src/app/dto/Newsletter';
import { User } from 'src/app/dto/User';
import { MaterialTableComponent } from '../student-table/student-table.component';
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
    private route: Router,
    private socketService: WebsocketServiceService,
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
    //this.setCategories();

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
    this.route.navigate(['/tabs/newsletter']);
  }

  cancel(): void {
    this.route.navigate(['/tabs/newsletter'])
  }

  isDropdownOpen = false;

  selectedItems: Address[] = [];

  toggleDropdown() {
    //event.stopPropagation;
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
    return this.selectedItems
  }

  /*collectSelections(items: any[], selectedItems: CreateNewsletterAddressDTO[], role = '', course = '', department = '') {
    for (const item of items) {
      if (item.items && item.items.length > 0) {
        const newRole = role || (item.name.includes('STUDENT') ? item.name : '');
        const newCourse = item.name.includes('course') ? item.name.replace(' course', '') : course;
        const newDepartment = department || (item.name.includes('Department') ? item.name.replace('Department ', '') : '');
        this.collectSelections(item.items, selectedItems, newRole, newCourse, newDepartment);
      } else
        if (item.groups && item.groups.length > 0) {
          const checkedGroups = item.groups.filter((group: { id: number, name: string, checked: boolean }) => group.checked);
          if (checkedGroups.length > 0) {
            const existingItem = selectedItems.find((dto: CreateNewsletterAddressDTO) => {
              dto.role === role && dto.course === course && dto.department === department;
            });
            if (existingItem) {
              existingItem.group.push(...checkedGroups.map((group: { id: number, name: string, checked: boolean }) => group.name.replace('Group ', '')));
            } else {
              const dto = new CreateNewsletterAddressDTO();
              dto.role = role;
              dto.course = course;
              dto.department = department;
              dto.group = checkedGroups.map((group: { id: number, name: string, checked: boolean }) => group.name.replace('Group ', ''));
              selectedItems.push(dto);
            }
          }
        } else if (item.checked) {
          const existingItem = selectedItems.find((dto: CreateNewsletterAddressDTO) =>
            dto.role === role && dto.course === course && dto.department === department
          );
          if (existingItem) {
            existingItem.group.push(item.name.replace('Group ', ''));
          } else {
            const dto = new CreateNewsletterAddressDTO();
            dto.role = role;
            dto.course = course;
            dto.department = department;
            dto.group = [item.name.replace('Group ', '')];
            selectedItems.push(dto);
          }
        } else if (item.isOpen && item.items) {
          for (const subItem of item.items) {
            if (subItem.checked) {///
              const existingItem = selectedItems.find((dto: CreateNewsletterAddressDTO) =>
                dto.role === role && dto.course === course && dto.department === item.name.replace('Department ', '')
              );
              if (existingItem) {
                existingItem.group.push(subItem.name.replace('Group ', ''));
              } else {
                const dto = new CreateNewsletterAddressDTO();
                dto.role = role;
                dto.course = course;
                dto.department = item.name.replace('Department ', '');
                dto.group = [subItem.name.replace('Group ', '')];
                selectedItems.push(dto);
              }
            }
          }
        }
    }
  }*/


    /*collectSelectionsNO(items: any[], selectedItems: CreateNewsletterAddressDTO[]) {
      for (const item of items) {
        if (item.items && item.items.length > 0) {
          const newRole = item.name.includes('STUDENT')? item.name : '';
          //this.collectSelections(item.items, selectedItems, newRole);
        } else if (item.groups && item.groups.length > 0) {
          const checkedGroups = item.groups.filter((group: { id: number, name: string, checked: boolean }) => group.checked);
          if (checkedGroups.length > 0) {
            const existingItem = selectedItems.find((dto: CreateNewsletterAddressDTO) =>
              dto.role === 'STUDENT' && dto.course === item.name.replace(' course', '') && dto.department === ''
            );
            if (existingItem) {
              existingItem.group.push(...checkedGroups.map((group: { id: number, name: string, checked: boolean }) => group.name.replace('Group ', '')));
            } else {
              const dto = new CreateNewsletterAddressDTO();
              dto.role = 'STUDENT';
              dto.course = item.name.replace(' course', '');
              dto.department = '';
              dto.group = checkedGroups.map((group: { id: number, name: string, checked: boolean }) => group.name.replace('Group ', ''));
              selectedItems.push(dto);
            }
          }
        } else if (item.items && item.items.length > 0) {
          for (const subItem of item.items) {
            if (subItem.checked) {
              const newDepartment = item.name.replace('Department ', '');
              const existingItem = selectedItems.find((dto: CreateNewsletterAddressDTO) =>
                dto.role === 'STUDENT' && dto.course === item.name.replace(' course', '') && dto.department === newDepartment
              );
              if (existingItem) {
                existingItem.group.push(subItem.name.replace('Group ', ''));
              } else {
                const dto = new CreateNewsletterAddressDTO();
                dto.role = 'STUDENT';
                dto.course = item.name.replace(' course', '');
                dto.department = newDepartment;
                dto.group = [subItem.name.replace('Group ', '')];
                selectedItems.push(dto);
              }
            }
          }
        }
      }
    }*/


  /*collectSelectionsNOO(items: any[], selectedItems: CreateNewsletterAddressDTO[], role = '', course = '', department = '') {
    debugger;
    for (const item of items) { //проходка
      if ((item.items && item.items.length > 0)) { //есть ли вложенное
        const newRole = role || (item.name.includes('STUDENT') ? item.name : ''); //запись
        const newCourse = course || (item.name.includes('course') ? item.name.replace(' course', '') : '');
        const newDepartment = department || (item.name.includes('Department') ? item.name.replace('Department ', '') : '');
        console.log('Processing nested items: newRole=', newRole, ', newCourse=', newCourse, ', newDepartment=', newDepartment);
        this.collectSelectionsNOO(item.items, selectedItems, newRole, newCourse, newDepartment); //еще раз для вложенных

      } else if (item.name.includes('course') && !(item.items && item.items.length > 0)) { //если нет вложенных и при этом содержится курс
        const newRole = role || (item.name.includes('STUDENT')? item.name : ''); //запись
        const newCourse = course || (item.name.includes('course')? item.name.replace(' course', '') : '');
        const newDepartment = department || (item.name.includes('Department')? item.name.replace('Department ', '') : '');
        console.log('Processing course without nested items: newRole=', newRole, ', newCourse=', newCourse, ', newDepartment=', newDepartment);
        //this.collectSelections(items, selectedItems, newRole, newCourse, newDepartment);
        course = newCourse;
      } else{
        if (item.groups && item.groups.length > 0) { //если содержит группы
        const checkedGroups = item.groups.filter((group: { id: number, name: string, checked: boolean }) => group.checked);// ищет отмеченные
        if (checkedGroups.length > 0) { //если их много отмеченных
          const existingItem = selectedItems.find((dto: CreateNewsletterAddressDTO) =>
            dto.role === role && dto.course === course && dto.department === department
          );
          if (existingItem) { //если уже существует в массиве такие, то обновляем
            console.log('Adding groups to existing item: ', existingItem);
            existingItem.group.push(...checkedGroups.map((group: { id: number, name: string, checked: boolean }) => group.name.replace('Group ', '')));
          } else { //нет - создаем новые
            const dto = new CreateNewsletterAddressDTO();
            dto.role = role;
            dto.course = course;
            dto.department = department;
            dto.group = checkedGroups.map((group: { id: number, name: string, checked: boolean }) => group.name.replace('Group ', ''));
            console.log('Adding new item: ', dto);
            selectedItems.push(dto);
          }
        }
      } else if (item.checked) { //если этот элемент помечен, то проверяем его в selectedItems
        const existingItem = selectedItems.find((dto: CreateNewsletterAddressDTO) =>
          dto.role === role && dto.course === course && dto.department === department
        );
        if (existingItem) {
          console.log('Adding group to existing item: ', existingItem);
          existingItem.group.push(item.name.replace('Group ', ''));
        } else {
          const dto = new CreateNewsletterAddressDTO();
          dto.role = role;
          dto.course = course;
          dto.department = department;
          dto.group = [item.name.replace('Group ', '')];
          selectedItems.push(dto);
        }
      } else if (item.isOpen && item.items) {  //если он открыт в списке и у него есть вложенные
        for (const subItem of item.items) {
          if (subItem.checked) {  //если он помечен
            const newDepartment = department || (item.name.include('Department') ? item.name.replace('Department ', '') : '');
            const existingItem = selectedItems.find((dto: CreateNewsletterAddressDTO) =>
              dto.role === role && dto.course === course && dto.department === item.name.replace('Department ', '')
            );
            if (existingItem) {
              existingItem.group.push(subItem.name.replace('Group ', ''));
            } else {
              const dto = new CreateNewsletterAddressDTO();
              dto.role = role;
              dto.course = course;
              dto.department = newDepartment;
              dto.group = [subItem.name.replace('Group ', '')];
              selectedItems.push(dto);
            }
          }
        }
      }}
    }
  }*/

  /////////


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


  /*collectSelections(address: any[], selectedItems: CreateNewsletterAddressDTO[]) {
    address.forEach((item) => {
      if (item.items) {
        item.items.forEach((course: { groups: any[]; name: string; items: any[]; }) => {
          if (course.groups) {
            course.groups.forEach((group) => {
              if (group.checked) {
                const dto = new CreateNewsletterAddressDTO();
                dto.role = 'STUDENT';
                dto.course = course.name.replace(' course','');
                dto.department = '';
                dto.group = [group.name.replace('Group ', '')];
                selectedItems.push(dto);
              }
            });
          } else if (course.items) {
            course.items.forEach((department) => {
              department.items.forEach((group: { checked: any; name: string; }) => {
                if (group.checked) {
                  const dto = new CreateNewsletterAddressDTO();
                  dto.role = 'STUDENT';
                  dto.course = course.name.replace(' course', '');
                  dto.department = department.namereplace('Department ', '');
                  dto.group = [group.name.replace('Group ', '')];
                  selectedItems.push(dto);
                }
              });
            });
          }
        });
      }
    });
  }*/


  /*collectSelections(items: any[], selectedItems: CreateNewsletterAddressDTO[], role = '', course = '', department = ''){  //////
    for (const item of items) {
      if (item.items && item.items.length > 0) {
        // Если у элемента есть подэлементы, рекурсивно обрабатываем их
        const newRole = role || (item.name.includes('STUDENT') ? item.name : '');
        const newCourse = item.name.includes('course') ? item.name.replace(' course', '') : course;
        const newDepartment = department || (item.name.includes('DEPARTMENT ') ? item.name.replace('DEPARTMENT ', '') : '');
        this.collectSelections(item.items, selectedItems, newRole, newCourse, newDepartment);
      } else if (item.groups && item.groups.length > 0) {
        ////const checkedGroups = item.groups.filter(group => group.checket);
        if (checkedGroups.length > 0){

        }///
        // Обработка групп, если это курсы без кафедры
        for (const group of item.groups) {
          if (group.checked) {
            const dto = new CreateNewsletterAddressDTO();
            dto.role = role;
            dto.course = course; // Используем имя курса
            dto.department = ''; // Нет кафедры
            dto.group.push(group.name.replace('Group ', ''));
            selectedItems.push(dto);
          }
        }
      } else if (item.checked) {
        // Если это группа в кафедре
        const dto = new CreateNewsletterAddressDTO();
        dto.role = role;
        dto.course = course;
        dto.department = department;
        dto.group.push(item.name.replace('Group ', ''));
        selectedItems.push(dto);
      } else if (item.isOpen && item.items) {
        for (const subItem of item.items) {
          if (subItem.checked) {
            const dto = new CreateNewsletterAddressDTO();
            dto.role = role;
            dto.course = course;
            dto.department = item.name.replace('DEPARTMENT ', '');
            dto.group.push(subItem.name.replace('Group ', ''));
            selectedItems.push(dto);
          }
        }
      }
    }
  }*/

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



  /*daysOfMonth: Array<string> = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"];
  months: Array<string> = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
  years: Array<String> = ["2024", "2025", "2026"];*/
  hours: Array<string> = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"];
  minutes: Array<string> = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59"];

  setDate(event: any) {
    //this.date = formatDate(event.value, 'dd.MM.yyyy', 'en-US');
    const selectedDate: Date = event.value;
    this.date = selectedDate.toISOString();
    console.log(this.date)
  }
}

