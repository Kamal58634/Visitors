document.addEventListener("DOMContentLoaded", createModal) 

function createModal(){
    let activeModal = null;

    document.querySelectorAll('.openModalBtn').forEach(button => {
        button.addEventListener("click", function () {
            let modalId = this.getAttribute('data-target');
            let modal = document.getElementById(modalId);

            if (activeModal) {
                activeModal.style.display = "none";
            }
            // fetchCheckboxData(modalId)
            var buttonRect = this.getBoundingClientRect();
            modal.style.top = buttonRect.top + window.scrollY + "px";
            modal.style.left = buttonRect.left + window.scrollX + "px";
            // console.log(buttonRect)

            modal.style.display = 'block';
            disableSubmitButton();
            checkBoxRemover();
            removeHiddenInput();
            activeModal = modal;
        });
        
        
    });

    

    // Select all checkboxes
    const checkboxes = document.querySelectorAll('.custom-modal-content input[type="checkbox"]');

    // Add event listener to checkboxes
    checkboxes.forEach(function (checkbox) {
        checkbox.addEventListener('change', function () {
            // Check if at least one checkbox is checked
            const atLeastOneChecked = Array.from(checkboxes).some(checkbox => checkbox.checked);
            console.log(atLeastOneChecked)
            // Enable/disable the submit button based on checkbox state
            atLeastOneChecked ? enableSubmitButton() : disableSubmitButton();
        });
    });

    document.querySelectorAll(".closeModalBtn").forEach(function (button) {
        button.addEventListener("click", function () {
            if (activeModal) {
                activeModal.style.display = "none";
                activeModal = null;
               
            }
        });
    });

}
function disableModal(){
    document.querySelectorAll('.custom-modal').forEach((modal) => {
        modal.style.display='none';
        disableSubmitButton()

    })
}
// Function to disable the submit button
function disableSubmitButton() {
    // Select the submit button
    const submitButtons = document.querySelectorAll('.do-form-add-visitor');
    submitButtons.forEach((submitButton) =>{
        submitButton.disabled = true;

    })
    // submitButton.style.backgroundColor = 'gray';
    // submitButton.style.color = 'white';
    // Disable the submit button
    
}

// Function to enable the submit button
function enableSubmitButton() {
    // Select the submit button
    const submitButtons = document.querySelectorAll('.do-form-add-visitor');
    submitButtons.forEach((submitButton) =>{
        submitButton.disabled = false;

    })
    // const submitButton = document.querySelector('.do-form-add-visitor');
    // Enable the submit button
    
}
function removeHiddenInput(){
    
   const hiddenInput= document.querySelectorAll('checkbox-hidden-input');
      if(hiddenInput){
        hiddenInput.forEach((hiddenElement) => {
            hiddenElement.remove();
        })
   }
}
function checkBoxRemover(){
    document.querySelectorAll('.input-service').forEach((input) => {
        
        if(input.checked){
            
            input.checked=false;
        }
    })
}

document.querySelectorAll('.do-form-add-visitor').forEach(function(submitButton){
    submitButton.addEventListener('click', function (event) {
        event.preventDefault();
        const form=this.closest('form');
        
        if(!form){
            console.error('Form not found');
            return;
        }
        const modal=form.closest('.custom-modal');
        if(!modal){
            console.error('Modal not found');
            return;
        }
        removeHiddenInput();
        hiddenInputs = [];
        form.querySelectorAll('.custom-modal-content input[type="checkbox"]').forEach((checkBoxItem) => {
            if(checkBoxItem.checked){
                hiddenInput=document.createElement('input');
                hiddenInput.type="hidden";
                hiddenInput.name=checkBoxItem.name;
                hiddenInput.value=checkBoxItem.value;
                hiddenInput.classList.add('checkbox-hidden-input')
                hiddenInputs.push(hiddenInput);
                
            }
        })
        if(hiddenInputs.lenghth>0){
            hiddenInputs.forEach((input) => {
                form.appendChild(input);
            })
        }
        
        checkBoxRemover();
        disableSubmitButton();
        disableModal();
        // console.log(hiddenInputs)
        console.log(form)
        var urlWithHiddenInput = form.action + '?' +hiddenInputs.map((input) => `${input.name}=${input.value}`).join('&') //hiddenInput.name + '=' + hiddenInput.value;
        window.location.href = urlWithHiddenInput;
        removeHiddenInput();
        // form.submit();
    })
})

// New
//     document.querySelectorAll('.do-form-add-visitor').forEach(function (submitButton) {
//         console.error('Waiiiiit')
//         submitButton.addEventListener('click', function (event) {
//             // Prevent the default form submission
//             event.preventDefault();

//             // Find the closest form to the clicked button
//             const form = this.closest('form');

//             if (!form) {
//                 console.error('Form not found');
//                 return;
//             }

//             // Find the closest modal to the form
//             const modal = form.closest('.custom-modal');

//             if (!modal) {
//                 console.error('Modal not found');
//                 return;
//             }

//             // Remove existing hidden inputs
//             form.querySelectorAll('.checkbox-hidden-input').forEach(function (input) {
//                 input.remove();
//             });

//             // Delay the creation of hidden inputs to ensure checkbox states are updated
//             setTimeout(function () {
//                 // Add hidden inputs for selected checkboxes
//                 form.querySelectorAll('.custom-modal-content input[type="checkbox"]').forEach(function (checkbox) {
//                     if (checkbox.checked) {
//                         const hiddenInput = document.createElement('input');
//                         hiddenInput.type = 'hidden';
//                         hiddenInput.name = checkbox.name;
//                         hiddenInput.value = checkbox.value;
//                         hiddenInput.classList.add('checkbox-hidden-input');
//                         form.appendChild(hiddenInput);
//                     }
//                 });

//                 // Submit the form
//                 form.submit();

//                 // Close the modal
//                 modal.style.display = 'none';
//                 window.close()
//             }, 100);
//         });
// });
// End New






    // document.addEventListener('DOMContentLoaded', function() {
    //     // Select all checkboxes
    //     const checkboxes = document.querySelectorAll('.custom-modal-content input[type="checkbox"]');
        
    //     // Select the submit button
    //     const submitButton = document.querySelector('.custom-modal-content input[type="submit"]');
    //     console.log(submitButton)
    //     // Disable the submit button initially
    //     submitButton.disabled = true;
        
    //     // Add event listener to checkboxes
    //     checkboxes.forEach(function(checkbox) {
    //         checkbox.addEventListener('change', function() {
    //             // Check if at least one checkbox is checked
    //             const atLeastOneChecked = Array.from(checkboxes).some(checkbox => checkbox.checked);
                
    //             // Enable/disable the submit button based on checkbox state
    //             submitButton.disabled = !atLeastOneChecked;
    //         });
    //     });
    // });
    
    // let selectedChechBox = [];

    // document.querySelectorAll(".sendToServer").forEach(button => {
    //     button.addEventListener('click', function () {
    //         selectedChechBox = [];
    //         document.querySelectorAll('input[type="checkbox"]').forEach(function (checkbox) {
    //             if (checkbox.checked) {
    //                 selectedChechBox.push(checkbox.value);
    //             }
    //         });
    //     console.log(selectedChechBox,selectedChechBox.length)
    //     if (selectedChechBox.length>0){
    //         console.log(selectedChechBox)
            
    //         doServerServices(selectedChechBox,this) 
    //     }
        
    //     });
        
    // });

    // This logs an empty array because it's executed before any checkboxes are checked
    // console.log(selectedChechBox);
    // document.querySelector(".sendToServer").addEventListener("click",function(){
    //         document.querySelectorAll('input[type="checkbox"]').forEach(function(checkbox){
    //             if(checkbox.checked){
    //                 selectedChechBox.push(checkbox.value)
    //             }
    //         })
            

    //     })
    //     console.log(selectedChechBox)
    function doServerServices1(selectedChechBox,modalId){
        const csrfToken = document.querySelector('[name="csrfmiddlewaretoken"]').value;
        const url=modalId.getAttribute('server-url')//.dataset.url;
        const fullUrl = `${url}?services=${selectedChechBox.join(',')}`;
        console.log(url)
        fetch(fullUrl,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken,
        },
        // body: JSON.stringify(selectedChechBox),

        })
        .then(response => {
            if(!response.ok){
                throw new Error("Network response was not ok");
            }
            return response.json();

        })
        .then(data => {
            if (data.valid) {
                // Redirect to the new page
                console.log(data.redirect_url)
                window.location.href = data.redirect_url;
            } else {
                console.error('Invalid data:', data.error);
            }
        })
        .catch(error => {
            console.error('Error sending data:', error);
        });
    }

    function fetchCheckboxData1(modalId){
        
        const url=document.getElementById(modalId).getAttribute('data-url')//.dataset.url;
        
        console.log(url)
        
        fetch(url)
        .then(response => {
            if(!response.ok){
                throw new Error("Network response was not ok");
            }
            return response.json();
            

        })
        .then(data => {
            const dataArray=Array.isArray(data) ?data :[data];
            const form=document.getElementById("checkboxForm"+modalId.slice(-1));
            form.innerHTML="";
            console.log(form)
            dataArray.forEach(checkboxItem => {
                let checkbox=document.createElement('input');
                checkbox.type="checkbox";
                checkbox.name=checkboxItem.name;
                checkbox.value=checkboxItem.id;
                checkbox.id="checkbox"+checkboxItem.id

                let label=document.createElement('lable');
                label.htmlFor=checkbox.id
                if(typeof checkboxItem.name !=='undefined'){
                    label.appendChild(document.createTextNode(checkboxItem.name))
                }else{
                    let defaultName="Not defined Service"
                    console.error(`Invalid data format. 'name' property is undefined. Using default name: ${defaultName}`);
                    label.appendChild(document.createTextNode(defaultName));
                }
                form.appendChild(checkbox);
                form.appendChild(label);
                form.appendChild(document.createElement('br'));
                

            })

        })
        .catch(error => {
            console.error('Error fetching checkboxes:', error);
        })
    }





// <!-- In your HTML -->
// <table class="table-crud">
//   <tr data-clone="condition1" data-input-value="value1" data-select-value="option1">
//     <td>Row 1 Data</td>
//   </tr>
//   <tr data-clone="condition2" data-input-value="value2" data-select-value="option2">
//     <td>Row 2 Data</td>
//   </tr>
//   <!-- Other rows... -->
// </table>

// <form id="form1">
//   <label for="inputField">Input Field:</label>
//   <input type="text" id="inputField" name="inputField" value="value1">

//   <label for="selectField">Select Field:</label>
//   <select id="selectField" name="selectField">
//     <option value="option1">Option 1</option>
//     <option value="option2">Option 2</option>
//   </select>

//   <input type="submit" value="Submit">
// </form>

//<!-- In your JavaScript -->
// document.addEventListener("DOMContentLoaded", function () {
//     // Add an event listener to the form submission
//     document.getElementById("form1").addEventListener("submit", function (event) {
//         event.preventDefault(); // Prevent the default form submission

//         // Get the values from the form fields
//         var formInputs = document.getElementById("form1").elements;

//         // Get the source table
//         var sourceTable = document.querySelector(".table-crud");

//         // Get the destination table
//         var destinationTable = document.getElementById("table-add-visitors");

//         // Clone the rows from the source table based on form field values
//         var clonedRows = [];
//         sourceTable.querySelectorAll("tr").forEach(function (row) {
//             var match = true;

//             // Check if the values in the row match the form field values
//             Array.from(formInputs).forEach(function (input) {
//                 var fieldName = input.name;
//                 var fieldValue = input.value;

//                 // Handle both input and select elements in the row
//                 var rowFieldElement = row.querySelector("input[name='" + fieldName + "'], select[name='" + fieldName + "']");
//                 var rowValue = rowFieldElement ? rowFieldElement.value : null;

//                 if (fieldValue !== rowValue) {
//                     match = false;
//                 }
//             });

//             if (match) {
//                 clonedRows.push(row.cloneNode(true));
//             }
//         });

//         // Append the cloned rows to the destination table
//         clonedRows.forEach(function (row) {
//             destinationTable.querySelector("tbody").appendChild(row);
//         });
//     });
// });


// // ??????????????????
// document.addEventListener("DOMContentLoaded", function () {
//     // Add an event listener to the form submission
//     document.getElementById("form1").addEventListener("submit", function (event) {
//         event.preventDefault(); // Prevent the default form submission

//         // Get the values from the form fields
//         var formInputs = document.getElementById("form1").elements;

//         // Get the source table
//         var sourceTable = document.querySelector(".table-crud");

//         // Get the destination table
//         var destinationTable = document.getElementById("table-add-visitors");

//         // Clone the rows from the source table based on form field values
//         var clonedRows = [];
//         sourceTable.querySelectorAll("tr").forEach(function (row) {
//             var match = true;

//             // Check if the values in the row match the form field values
//             Array.from(formInputs).forEach(function (input) {
//                 var fieldName = input.name;
//                 var fieldValue = input.value;

//                 // Handle both input and select elements in the row
//                 var rowFieldElement = row.querySelector("input[name='" + fieldName + "'], select[name='" + fieldName + "']");
//                 var rowValue = rowFieldElement ? rowFieldElement.value : null;

//                 // If either the form field value or row value is not null and they are different, set match to false
//                 if ((fieldValue || rowValue) && fieldValue !== rowValue) {
//                     match = false;
//                 }
//             });

//             if (match) {
//                 clonedRows.push(row.cloneNode(true));
//             }
//         });

//         // Append the cloned rows to the destination table
//         clonedRows.forEach(function (row) {
//             destinationTable.querySelector("tbody").appendChild(row);
//         });
        
//     });
// });

// // 
// // function submitAndRenderOld() {
// //     var form = document.querySelector("#form1");
// //     var formData = new FormData(form);

// //     var xhr = new XMLHttpRequest();
// //     xhr.open("POST", form.action, true);
// //     xhr.setRequestHeader("X-CSRFToken", "{{ csrf_token }}");
    
// //     xhr.onreadystatechange = function () {
// //         if (xhr.readyState === 4) {
// //              if (xhr.status === 200) {
// //                 var response = JSON.parse(xhr.responseText);
// //                 if (response.valid) {
// //                     // Form is valid, proceed with rendering or additional actions
// //                      renderTable();
                    
// //                 } else {
// //                     // Form is not valid, display the error message to the user
// //                     document.getElementById("error-message").innerHTML = response.error_message;
// //                 }
// //             } else {
// //                 // Handle other status codes or errors
// //                 console.error("Error in form submission");
// //             }
// //         }
// //     };

// //     xhr.send(formData);
// // }



// // llllllllllll
// class VisitorApp {
//     constructor() {
//         this.addedRowsData = [];
//         this.init();
//     }

//     init() {
//         this.updateClock();
//         setInterval(() => this.updateClock(), 60000);
//         this.createUpdateDesTable();

//         document.getElementById("form1").addEventListener("submit", (event) => {
//             event.preventDefault();
//             document.getElementById("is_ajax").value = "1";
//             this.submitAndRender();
//             document.getElementById("is_ajax").value = "0";
//         });

//         document.getElementById("save-visitor").addEventListener("click", (event) => {
//             event.preventDefault();
//             this.saveVisitor();
//         });

//         document.getElementById('table-add-visitors').addEventListener("click", this.handleTableClick.bind(this));
//     }

//     handleTableClick(event) {
//         if (event.target.classList.contains('delete-link')) {
//             this.removeItemDisTable(event);
            
//         }
//     }

//     removeItemDisTable(event) {
//         const rowIndex = event.target.closest('tr').rowIndex;
//         this.addedRowsData.splice(rowIndex - 1, 1);
//         event.target.closest('tr').remove();
//         this.createUpdateDesTable();
//     }

//     updateClock() {
//         var now = new Date();
//         var hours = now.getHours();
//         var minutes = now.getMinutes();
//         hours = hours < 10 ? '0' + hours : hours;
//         minutes = minutes < 10 ? '0' + minutes : minutes;
//         var timeString = hours + ':' + minutes;
//         document.getElementById('clock').value = timeString;
//     }

//     createUpdateDesTable() {
//         const saveVisitor = document.querySelector('#save-visitor');
//         const tbody = document.querySelector("#table-add-visitors").querySelector('tbody');
//         const hasRecord = tbody.children.length > 0;

//         if (saveVisitor) {
//             saveVisitor.disabled = !hasRecord;
//         }
//     }

//     submitAndRender() {
//         // ... (your existing code)
//     }

//     saveVisitor() {
//         // ... (your existing code)
//     }

//     retritiveSelectItemGate(gateName) {
//         // ... (your existing code)
//     }

//     renderTable() {
//         // ... (your existing code)
//     }
// }

// // Instantiate the class when the DOM content is loaded
// document.addEventListener('DOMContentLoaded', () => {
//     const visitorApp = new VisitorApp();
// });

// LLLLLLLLLLLLLLLLLLLLLLLL
// saveVisitor() {
//     const bodyInfo = new FormData();
//     const is_ajax_value = document.getElementById("is_ajax").value;
//     const currentDate=new Date();
//     bodyInfo.append("is_ajax", is_ajax_value);
//     // bodyInfo.append("time_is",currentDate),

//     this.addedRowsData.forEach((value, index) => {
//         for (const key in value) {
//             if (key === "gate") {
//                 value[key] = this.retritiveSelectItemGate(value[key]);
//             }
//             bodyInfo.append(key, value[key]);
//         }
//     });
//     // 
    
//     // 


//     console.log(bodyInfo)
//     const form = document.querySelector('#myForm');
//     const getUrl = form.action;
//     const csrfTokenForm2 = form.querySelector('[name="csrfmiddlewaretoken"]').value;

//     fetch(getUrl, {
//         method: 'POST',
//         headers: {
//             'X-CSRFToken': csrfTokenForm2,
//         },
//         body: bodyInfo,
//     })
//     .then(response => response.json())
//     .then(data => {
//         if (data.valid) {
//             if (data.redirect_url) {
//                 window.location.href = data.redirect_url;
//             } else {
//                 console.log('Data sent successfully:', data);
//             }
//         } else {
//             console.error('Invalid data:', data);
//         }
//     })
//     .catch(error => {
//         console.error('Error sending data:', error);
//     });
// }