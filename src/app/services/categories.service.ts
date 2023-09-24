import { Injectable, inject } from '@angular/core';
import {
  CollectionReference,
  Firestore,
  addDoc,
  collection,
  collectionSnapshots,
  deleteDoc,
  doc,
  updateDoc
} from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';

import { Category } from '../models/category';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private firestore: Firestore = inject(Firestore);
  private categoryRef: CollectionReference = collection(
    this.firestore,
    'categories'
  );

  constructor(private toastr: ToastrService) {}

  // SAVE CATEGORY DATA
  saveCategoryData(categoryData: Category) {
    addDoc(this.categoryRef, categoryData)
      .then((docRef) => {
        console.log(docRef);
        this.toastr.success('Data Inserted Successfully.');
      })
      .catch((error) => console.log('error: ' + error));
  }

  //  GET ALL CATEGORIES
  getCategories() {
    return collectionSnapshots(this.categoryRef).pipe(
      map((actions) =>
        actions.map((action) => {
          const data = action.data();
          const id = action.id;
          return { id, data };
        })
      )
    );
  }

  // UPDATE CATEGORY
  updateCategory(id: string, updatedData: object) {
    updateDoc(doc(this.categoryRef, id), updatedData).then((response) => {
      console.log('update response: ', response);
      this.toastr.success('Data Updated Successfully.');
    });
  }

  // DELETE CATEGORY
  deleteCategory(id: string) {
    deleteDoc(doc(this.categoryRef, id)).then((response) => {
      console.log('delete response: ', response);
      this.toastr.success('Data Deleted Successfully.');
    });
  }
}
