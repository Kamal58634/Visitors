function my_btn_search(){
   const myalert=document.querySelector(".alert")
   
        myalert.setAttribute("style","display:block;")
        console.log(myalert)   
   
}

// function setCurrentSateTime(){
//         const current_date=new Date();
//         const format_current_date=current_date.toLocaleString();
        
//         const my_current_date=document.querySelector("#issue_date");
//         my_current_date.innerHTML=format_current_date;

// }
// document.addEventListener("DOMContentLoaded",function(){
        
//         setCurrentSateTime();
// });

// custom.js

// custom.js

document.addEventListener('DOMContentLoaded', function() {
        // Get all HTML datetime-local inputs on the page
        var datetimeInputs = document.querySelectorAll('input[type="datetime-local"]');
    
        // Loop through each input
        datetimeInputs.forEach(function(input) {
            // Get the value of the input
            var inputValue = input.value;
            console.log(inputValue)
    
            // If the input has a value, convert it to the user's local time zone
            if (inputValue) {
                var localDate = new Date(inputValue);
                var offsetMinutes = localDate.getTimezoneOffset();
                localDate.setMinutes(localDate.getMinutes() - offsetMinutes);
    
                // Format the local date as YYYY-MM-DDTHH:mm to match the datetime-local input format
                var formattedDate = localDate.toISOString().slice(0, 16);
                console.log(formattedDate)
                // Set the input value to the formatted local datetime
                input.value = formattedDate;
            }
        });
    });
    