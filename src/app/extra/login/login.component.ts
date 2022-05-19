import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  menuToggle: any
  navigation: any
  listItems: any;
  constructor() { }

  ngOnInit(): void {
    this.menuToggle = document.querySelector('.menu-toggle')
    this.navigation = document.querySelector('.navigation')
    this.listItems = document.querySelectorAll('.list-item');
  

    }

  onClick() {
    this.navigation.classList.toggle('open');
  }

  onListClick(item:any) {
        this.listItems.forEach((item: any) => item.classList.remove('active'));
  }

}

//  createNewUser(id: number): UserData {
  //   const name =
  //     NAMES[Math.round(Math.random() * (NAMES.length - 1))] +
  //     ' ' +
  //     NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) +
  //     '.';
  
  //   return {
  //     id: id.toString(),
  //     name: name,
  //     progress: Math.round(Math.random() * 100).toString(),
  //     fruit: FRUITS[Math.round(Math.random() * (FRUITS.length - 1))],
  //   };
  // }
  
  // <!-- Small boxes (Stat box) -->
  //       <!-- <div class="row">
  //           <div class="col-lg-3 col-6">
  //             small box
  //             <div class="small-box bg-info">
  //               <div class="inner">
  //                 <h3>150</h3>
  
  //                 <p>Students</p>
  //               </div>
  //               <div class="icon">
  //                 <i class="ion ion-bag"></i>
  //               </div>
  //               <a href="#" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></a>
  //             </div>
  //           </div>
  //           ./col
  //           <div class="col-lg-3 col-6">
  //             small box
  //             <div class="small-box bg-success">
  //               <div class="inner">
  //                 <h3>53</h3>
  
  //                 <p>Assignment assigned</p>
  //               </div>
  //               <div class="icon">
  //                 <i class="ion ion-stats-bars"></i>
  //               </div>
  //               <a href="#" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></a>
  //             </div>
  //           </div>
  //           ./col
  //           <div class="col-lg-3 col-6">
  //             small box
  //             <div class="small-box bg-warning">
  //               <div class="inner">
  //                 <h3>44</h3>
  
  //                 <p>Assignment submited</p>
  //               </div>
  //               <div class="icon">
  //                 <i class="ion ion-person-add"></i>
  //               </div>
  //               <a href="#" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></a>
  //             </div>
  //           </div>
  //           ./col
  //           <div class="col-lg-3 col-6">
  //             small box
  //             <div class="small-box bg-danger">
  //               <div class="inner">
  //                 <h3>65</h3>
  
  //                 <p>Unique Visitors</p>
  //               </div>
  //               <div class="icon">
  //                 <i class="ion ion-pie-graph"></i>
  //               </div>
  //               <a href="#" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></a>
  //             </div>
  //           </div>
  //           ./col
  //         </div> -->
  //       <!-- /.row -->
  //       <!-- Main row -->


  //  const users = Array.from({length: 100}, (_, k) => this.createNewUser(k + 1));

    // Assign the data to the data source for the table to render
    // this.dataSource = new MatTableDataSource(users);


    // ngAfterViewInit() {
    //   this.dataSource.paginator = this.paginator;
    //   this.dataSource.sort = this.sort;
    // console.log(this.sort);
    
    // }
            
              // applyFilter(event: Event) {
              //   const filterValue = (event.target as HTMLInputElement).value;
              //   this.dataSource.filter = filterValue.trim().toLowerCase();
            
              //   if (this.dataSource.paginator) {
              //     this.dataSource.paginator.firstPage();
              //   }
              // }
              // dataSource: MatTableDataSource<UserData>;

  // @ViewChild(MatPaginator) paginator!: MatPaginator;
  // @ViewChild(MatSort) sort!: MatSort 