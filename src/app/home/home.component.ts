import { Component, OnInit, ElementRef, ViewChild, AfterContentInit, AfterViewInit, ViewEncapsulation  } from '@angular/core';
import { Router } from '@angular/router';
import { ElectronService } from '../core/services/electron/electron.service';
import FileTree from '../Utilities/FileTree.js';
const fs = require('fs');
const { dialog, ipcRenderer } = require('electron')
const items = require('./modItems')

// ipcRenderer.on('ping', function(event, message) {
//   console.log(message);  // Prints "whoooooooh!"
//   getMods();
//   showNotification();
// });


const options = {
  type: 'question',
  buttons: ['Cancel', 'Yes, please', 'No, thanks'],
  defaultId: 2,
  title: 'Question',
  message: 'Do you want to do this?',
  detail: 'It does not really matter',
  checkboxLabel: 'Remember my answer',
  checkboxChecked: true,
};

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements AfterViewInit{
  @ViewChild('items') itemsElementRef: ElementRef;
  
  ngAfterViewInit(){
    let search = document.getElementById('search')
    search.addEventListener('keyup', e=>{

      Array.from(document.getElementsByClassName('mod-item')).forEach(modItem => {
        console.log(modItem)
      let hasMatch = modItem.innerHTML.toLowerCase().includes(search.value.toLowerCase())
      console.log(hasMatch)
      modItem.style.display = hasMatch ? 'grid' : 'none'

      })
    })

    this.getMods();
    this.showNotification();
  }

  installedMods: any;

  constructor(private router: Router, private electron: ElectronService) { }
  
  closeWindow()
  {
    this.electron.window.close();
  }

  minimizeWindow()
  {
    this.electron.window.minimize();
  }

  showNotification()
{
  let myNotification = new Notification('FCS Mod Manager', {
    body: 'Got Mods'
  })
  
  myNotification.onclick = () => {
    console.log('Notification clicked')
  }
}
  getMods()
  {
    // console.log("Click");
    this.installedMods = new Array();
    const path = 'F:\\Program Files\\Epic Games\\Subnautica\\QMods';
    var fileTree = new FileTree(path);

      fileTree.build();

      for (let index = 0; index < fileTree.items.length; index++) {
        let folder = fileTree.items[index];
        if(folder.name.startsWith('FCS') && folder.isDirectory)
        {
          this.installedMods.push(folder);
          folder.getModData();
          items.addItem(folder,this.itemsElementRef.nativeElement)
        }
        
        // console.log(fileTree.items[index].path);

      }
      console.log(this.installedMods.length);  

      console.log(fileTree);
  }
}
