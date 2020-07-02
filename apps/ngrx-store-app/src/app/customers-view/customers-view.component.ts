import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomersEntity, loadCustomers, selectAll, selectEntities, selectTotal, removeCustomer, editCustomer } from '@fis/customers';
import { Store, select } from '@ngrx/store';

@Component({
  selector: 'fis-customers-view',
  templateUrl: './customers-view.component.html',
  styleUrls: ['./customers-view.component.scss']
})
export class CustomersViewComponent implements OnInit {

  customers$: Observable<CustomersEntity[]>;
  updatedName: string;
  isEdit = false;
  selectedCustomer: number;

  constructor(private store: Store< { customers: CustomersEntity[] } >) {
    this.store.dispatch(loadCustomers());
    store.pipe(select('customers'));

    this.customers$ = store.select(selectAll);

    store.select(selectTotal).subscribe(entity => {
      console.log('entity...............', entity);
    });

  }

  delete(item) {
    console.log('in delete..', item);
    this.store.dispatch(removeCustomer( { custId: item.id } ));
  }

  showEdit(item) {
    this.isEdit = true;
    this.updatedName = item.name;
    this.selectedCustomer = item.id;
  }

  edit(item) {
    this.store.dispatch(editCustomer({ update: { id: item.id, changes: { name: this.updatedName } } }));
    this.isEdit = false;
  }

  ngOnInit(): void {
  }

}
