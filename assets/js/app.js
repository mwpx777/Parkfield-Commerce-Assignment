document.addEventListener("DOMContentLoaded", function(event) {
    let element = document.querySelectorAll('.element');
    
        if (element) {
        
          element.forEach(function(el, key){
            
             el.addEventListener('click', function () {
                // console.log(key);
             
                el.classList.toggle("active");
                
                 element.forEach(function(ell, els){
                     if(key !== els) {
                         ell.classList.remove('active');
                     }
                    //   console.log(els);
                 });
             });
          });
        }
    });
    