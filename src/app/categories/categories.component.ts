import { Component, OnInit } from '@angular/core';
import { DocumentData } from '@angular/fire/firestore';
import { Category } from '../models/category';
import { CategoriesService } from '../services/categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  categories: Array<{ id: string; data: DocumentData }>;
  formCategory: string = '';
  formStatus: string = 'Add'; // 'Add'  ||  'Edit'
  categoryIdToEdit: string;

  constructor(private categoryService: CategoriesService) {}

  ngOnInit(): void {
    this.categoryService
      .getCategories()
      .subscribe((data: { id: string; data: DocumentData }[]) => {
        console.log('OnInIt category data: ', data);
        this.categories = data;
      });
  }

  onSubmit(formData: any) {
    let categoryData: Category = {
      category: formData.value.category,
    };

    if (this.formStatus === 'Add') {
      this.categoryService.saveCategoryData(categoryData);
    } else if (this.formStatus === 'Edit') {
      this.categoryService.updateCategory(this.categoryIdToEdit, categoryData);
      this.formStatus = 'Add';
    }

    formData.reset();
  }

  onEditHandle(categoryId: string, categoryName: string) {
    this.formStatus = 'Edit';

    this.categoryIdToEdit = categoryId;
    this.formCategory = categoryName;
  }

  onDeleteHandle(categoryId: string) {
    this.categoryService.deleteCategory(categoryId);
  }
}

// 3:42
