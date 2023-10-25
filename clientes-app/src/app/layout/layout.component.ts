import { Component } from '@angular/core';

import * as $ from 'jquery'
import { Usuario } from '../login/usuario';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {

  ngAfterViewInit(){
    (function($) {
      "use strict";
  
      var path = window.location.href; 
          $("#layoutSidenav_nav .sb-sidenav a.nav-link").each(function() {
              if (this instanceof HTMLAnchorElement && this.href === path) {
                  $(this).addClass("active");
              }
          });
  
      // Toggle the side navigation
      $("#sidebarToggle").on("click", function(e) {
          e.preventDefault();
          $("body").toggleClass("sb-sidenav-toggled");
      });
  })(jQuery);
  }

}
