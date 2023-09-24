import { Component, OnInit } from '@angular/core';
import { DocumentData } from '@angular/fire/firestore';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css'],
})
export class NewPostComponent implements OnInit {
  permalinkValue: string = '';
  postImgSrc: any = './assets/placeholder-image.jpg';
  selectedPostImage: any;
  categories: Array<{ id: string; data: DocumentData }>;

  constructor(private categoryService: CategoriesService) {}

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((value) => {
      this.categories = value;
    });
  }

  onTitleChange(event: Event) {
    const title = (event.target as HTMLInputElement).value;
    this.permalinkValue = title.replaceAll(' ', '-');
  }

  handlePostImagePreview(event: Event) {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.postImgSrc = e.target.result;
    };

    reader.readAsDataURL((event.target as HTMLInputElement).files[0]);
    this.selectedPostImage = (event.target as HTMLInputElement).files[0];
  }
}
