
function loadSystem() {
     
     var navigation ="<div id='header' class='header navbar navbar-inverse navbar-fixed-top'>"
               +"      <div class='container-fluid'>"
               +"           <div class='navbar-header'>"
               +"                <a href='index.html' class='navbar-brand'>"
               +"                     <img src='http://tesla-ads.com/system/assets/img/system-logo.png' alt='' /> ADS PLATFORM"
               +"                </a>"
               +"                <button type='button' class='navbar-toggle' data-click='sidebar-toggled'>"
               +"                     <span class='icon-bar'></span>"
               +"                     <span class='icon-bar'></span>"
               +"                     <span class='icon-bar'></span>"
               +"                </button>"
               +"           </div>"
               +"           <ul class='nav navbar-nav navbar-right'>"    
               +"                <li class='dropdown navbar-user'>"
               +"                     <a href='javascript:;' class='dropdown-toggle' data-toggle='dropdown'>"
               +"                          <img src='../assets/img/user-cloud.jpg' alt='' /> "
               +"                          <span class='hidden-xs'>HANA Architect</span> <b class='caret'></b>"
               +"                     </a>"
               +"                     <ul class='dropdown-menu animated fadeInLeft'>"
               +"                          <li class='arrow'></li>"
               +"                          <li><a href='../profile'>Settings</a></li>"
               +"                          <li class='divider'></li>"
               +"                          <li><a class='sair' href='javascript:;'>Log Out</a></li>"
               +"                     </ul>"
               +"                </li>"
               +"           </ul>"
               +"      </div>"
               +"   </div>";



     var menu = "   <div id='sidebar' class='sidebar'>"
               +"        <div data-scrollbar='true' data-height='100%'>"
               +"             <ul class='nav'>"
               +"                  <li class='nav-profile'>"
               +"                       <div class='image'>"
               +"                            <a href='javascript:;'><img src='../assets/img/user-cloud.jpg' alt='' /></a>"
               +"                       </div>"
               +"                       <div class='info'>"
               +"                            Pioneer"
               +"                            <small>HANA Architect</small>"
               +"                       </div>"
               +"                  </li>"
               +"             </ul>"
               +"             <ul class='nav'>"
               +"                  <li class='nav-header'>Navigation</li>"



               +"                  <li>"
               +"                         <a href='javascript:;' class='sidebar-minify-btn' data-click='sidebar-minify'>"
               +"                             <i class='fa fa-angle-double-left'></i>"
               +"                         </a>"
               +"                    </li>"


               +"             </ul>"
               +"        </div>"
               +"   </div>"
               +"   <div class='sidebar-bg'></div>";



     $("#page-container").prepend(navigation+menu);               

     var theme = "<div class='theme-panel'>"
               +"    <a href='javascript:;' data-click='theme-panel-expand' class='theme-collapse-btn'><i class='fa fa-cog'></i></a>"
               +"    <div class='theme-panel-content'>"
               +"        <h5 class='m-t-0'>Color Theme</h5>"
               +"        <ul class='theme-list clearfix'>"
               +"            <li class='active'><a href='javascript:;' class='bg-green' data-theme='default' data-click='theme-selector' data-toggle='tooltip' data-trigger='hover' data-container='body' data-title='Default'>&nbsp;</a></li>"
               +"            <li><a href='javascript:;' class='bg-red' data-theme='red' data-click='theme-selector' data-toggle='tooltip' data-trigger='hover' data-container='body' data-title='Red'>&nbsp;</a></li>"
               +"            <li><a href='javascript:;' class='bg-blue' data-theme='blue' data-click='theme-selector' data-toggle='tooltip' data-trigger='hover' data-container='body' data-title='Blue'>&nbsp;</a></li>"
               +"            <li><a href='javascript:;' class='bg-purple' data-theme='purple' data-click='theme-selector' data-toggle='tooltip' data-trigger='hover' data-container='body' data-title='Purple'>&nbsp;</a></li>"
               +"            <li><a href='javascript:;' class='bg-orange' data-theme='orange' data-click='theme-selector' data-toggle='tooltip' data-trigger='hover' data-container='body' data-title='Orange'>&nbsp;</a></li>"
               +"            <li><a href='javascript:;' class='bg-black' data-theme='black' data-click='theme-selector' data-toggle='tooltip' data-trigger='hover' data-container='body' data-title='Black'>&nbsp;</a></li>"
               +"        </ul>"
               +"        <div class='divider'></div>"
               +"        <div class='row m-t-10'>"
               +"            <div class='col-md-5 control-label double-line'>Header Styling</div>"
               +"            <div class='col-md-7'>"
               +"                <select name='header-styling' class='form-control input-sm'>"
               +"                    <option value='1'>default</option>"
               +"                    <option value='2'>inverse</option>"
               +"                </select>"
               +"            </div>"
               +"        </div>"
               +"        <div class='row m-t-10'>"
               +"            <div class='col-md-5 control-label'>Header</div>"
               +"            <div class='col-md-7'>"
               +"                <select name='header-fixed' class='form-control input-sm'>"
               +"                    <option value='1'>fixed</option>"
               +"                    <option value='2'>default</option>"
               +"                </select>"
               +"            </div>"
               +"        </div>"
               +"        <div class='row m-t-10'>"
               +"            <div class='col-md-5 control-label double-line'>Sidebar Styling</div>"
               +"            <div class='col-md-7'>"
               +"                <select name='sidebar-styling' class='form-control input-sm'>"
               +"                    <option value='1'>default</option>"
               +"                    <option value='2'>grid</option>"
               +"                </select>"
               +"            </div>"
               +"        </div>"
               +"        <div class='row m-t-10'>"
               +"            <div class='col-md-5 control-label'>Sidebar</div>"
               +"            <div class='col-md-7'>"
               +"                <select name='sidebar-fixed' class='form-control input-sm'>"
               +"                    <option value='1'>fixed</option>"
               +"                    <option value='2'>default</option>"
               +"                </select>"
               +"            </div>"
               +"        </div>"
               +"        <div class='row m-t-10'>"
               +"            <div class='col-md-5 control-label double-line'>Sidebar Gradient</div>"
               +"            <div class='col-md-7'>"
               +"                <select name='content-gradient' class='form-control input-sm'>"
               +"                    <option value='1'>disabled</option>"
               +"                    <option value='2'>enabled</option>"
               +"                </select>"
               +"            </div>"
               +"        </div>"
               +"        <div class='row m-t-10'>"
               +"            <div class='col-md-5 control-label double-line'>Content Styling</div>"
               +"            <div class='col-md-7'>"
               +"                <select name='content-styling' class='form-control input-sm'>"
               +"                    <option value='1'>default</option>"
               +"                    <option value='2'>black</option>"
               +"                </select>"
               +"            </div>"
               +"        </div>"
               +"        <div class='row m-t-10'>"
               +"            <div class='col-md-12'>"
               +"                <a href='#' class='btn btn-inverse btn-block btn-sm' data-click='reset-local-storage'><i class='fa fa-refresh m-r-3'></i> Reset Local Storage</a>"
               +"            </div>"
               +"        </div>"
               +"    </div>"
               +"</div>";

    $('body div#page-container').append(theme);     

    loadMenu();
}      


function loadMenu() {

     url = "../assets/json/menu.json";
     $.ajax({
         type: 'GET',
         url: url,
         //data: data,
         dataType: 'json',
         success: function(json) {

               $.each(json, function(i, item){
                    
                    itemMenu = "<li class='has-sub "+item.name+"'>"
                                   +"<a href='../"+item.name+"' >"
                                        +"<i class='fa "+item.icon+"'></i>"
                                        +"<span>"+item.label+"</span>"
                                   +"</a>"
                              +"</li>";

                    $('ul.nav li.nav-header').after(itemMenu);

               });

         },
         error: function(error) {
               console.log(error);
         }
     });
}


function activeMenu(menu) {
       
    setTimeout(function(){
        $('#sidebar ul.nav li.'+menu).addClass("active");    
        console.log('menu ativar');    
    },1000);
    
}

$(document).ready(function() {
    
    loadSystem();

    $('#header ul a.sair').click(function(){
          sessionStorage.removeItem('user');
          sessionStorage.removeItem('base');
          window.location="index.html";
    });
});