import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit } from "@angular/core";
const { shell } = require("electron");


@Component({
  selector: "app-mod-item",
  templateUrl: "./mod-item.component.html",
  styleUrls: ["./mod-item.component.scss"],
})
export class ModItemComponent implements AfterViewInit {
  @ViewChild("itemToggle") itemToggleRef: ElementRef;
  @ViewChild("updateBTN") updateBTNRef: ElementRef;
  @ViewChild("nexusBTN") nexusBTNRef: ElementRef;
  @Input() mod: any;
  constructor() {}

  ngAfterViewInit(): void {
    this.itemToggleRef.nativeElement.addEventListener('change', this.updateEnabled)
    this.itemToggleRef.nativeElement.checked = this.mod.IsEnabled
  }

  // Open item in native browser
  openNative = (modID) => {
    //Open in system browser
    shell.openExternal(`https://www.nexusmods.com/subnautica/mods/${modID}/`);
  };

  openNexus() {
    if (this.mod.NexusID) {
      console.log(this.mod.NexusID);
      console.log(this.mod);
      this.openNative(this.mod.NexusID);
    } else {
      console.log("Cant find NexusID");
    }
  }

  updateEnabled = (e) => {
    this.mod.changeEnabled(e.target.checked);
  };
}
