import { Component, OnInit, ElementRef, ViewChild, AfterContentInit, AfterViewInit, ViewEncapsulation, ViewChildren, QueryList, ContentChildren } from '@angular/core';
import { Router } from '@angular/router';
import { ElectronService } from '../core/services/electron/electron.service';
import FileTree from '../Utilities/FileTree.js';
import { DataService } from '../data.service';
import { Subscription } from 'rxjs';

const fs = require('fs');
const { dialog, ipcRenderer } = require('electron')
const items = require('./modItems')
const fetch = require('node-fetch');
let settings = { method: "Get" };
let url = "https://github.com/ccgould/FCStudios_SubnauticaMods/blob/master/nexusIDs.json?raw=true";

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

export class HomeComponent implements AfterViewInit, OnInit{
  @ViewChild('items') itemsElementRef: ElementRef;
  @ViewChild('search') searchref: ElementRef;
  // @ViewChildren('modItem') strong;
  @ContentChildren('modItem', {descendants: true}) modItemRefs;
  installedMods: [0];
  currentMods: any

  ngOnInit(): void {
    this.installedMods = [0]
  }

  ngAfterViewInit(){

//     //Filter items with "search"
//     this.searchref.nativeElement.addEventListener('keyup', e=>{
//       console.log("searching ...")
//       console.log(this.modItemRefs)

//   //Loop Items
//   Array.from(this.modItemRefs).forEach(item => {
     
//       console.log('ho')
//       console.log(item)
//       // //Hide items that dont match search value
//       // let hasMatch = item.innerText.toLowerCase().includes(search.value)
//       // item.style.display = hasMatch ? 'flex' : 'none'
//   })
// })
    this.getMods();
    this.showNotification();
  }

  constructor(private router: Router, private electron: ElectronService, private data:DataService) { }
  

  closeWindow()
  {
    this.electron.window.close();
  }

  minimizeWindow()
  {
    this.electron.window.minimize();
  }

  expandWindow()
  {
    this.electron.window.isMaximized() ? this.electron.window.unmaximize() : this.electron.window.maximize();
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
    console.log("Getting Mods")

    fetch(url, settings)
    .then(res => res.json())
    .then((json) => {

      console.log(json)

      const path = 'F:\\Program Files\\Epic Games\\Subnautica\\QMods';
      var fileTree = new FileTree(path);
  
        fileTree.build();
  
        for (let index = 0; index < fileTree.items.length; index++) {
          let folder = fileTree.items[index];
          if(folder.name.startsWith('FCS') && folder.isDirectory)
          {
            this.installedMods.push(folder);
            folder.getModData(json,this.data);
            //this.currentMods.append(folder)
            //let itemNode = document.createElement('app-mod-item');
            //this.itemsElementRef.nativeElement.appendChild(itemNode)
            //items.addItem(folder,this.itemsElementRef.nativeElement)
          }
        }
    });
  }
}
