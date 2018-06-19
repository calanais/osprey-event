// init Masonry
var grid = document.querySelector('.grid');

var msnry = new Masonry( grid, {
  itemSelector: '.grid-item',
  columnWidth: '.grid-sizer',
  percentPosition: true
});

let updateGrid = ()=>{
    var request = new XMLHttpRequest();

    request.open('GET', 'api?names', true);
    request.onload = function () {
    
      // Begin accessing JSON data here
      var data = JSON.parse(this.response);
    
      if (request.status >= 200 && request.status < 400) {
    
        for (let name of data.filenames){
          const logo = document.createElement('img');
          if (!document.getElementById(name)){
                logo.id=name;
                logo.src = `api?load=${name}`;
            
                const container = document.createElement('div');
                container.setAttribute('class', 'grid-item');
            
                container.appendChild(logo);
                grid.appendChild(container);
                console.log(name);
          }
        }
    
        imagesLoaded( grid ).on( 'progress', function() {
          // layout Masonry after each image loads
          msnry.layout();
        });
      } else {
        console.log('error');
      }
    }
    
    request.send();
}

updateGrid();