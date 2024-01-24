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
document.addEventListener("DOMContentLoaded", function () {
    // Add an event listener to the form submission
    document.getElementById("form1").addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent the default form submission

        // Get the values from the form fields
        var formInputs = document.getElementById("form1").elements;

        // Get the source table
        var sourceTable = document.querySelector(".table-crud");

        // Get the destination table
        var destinationTable = document.getElementById("table-add-visitors");

        // Clone the rows from the source table based on form field values
        var clonedRows = [];
        sourceTable.querySelectorAll("tr").forEach(function (row) {
            var match = true;

            // Check if the values in the row match the form field values
            Array.from(formInputs).forEach(function (input) {
                var fieldName = input.name;
                var fieldValue = input.value;

                // Handle both input and select elements in the row
                var rowFieldElement = row.querySelector("input[name='" + fieldName + "'], select[name='" + fieldName + "']");
                var rowValue = rowFieldElement ? rowFieldElement.value : null;

                if (fieldValue !== rowValue) {
                    match = false;
                }
            });

            if (match) {
                clonedRows.push(row.cloneNode(true));
            }
        });

        // Append the cloned rows to the destination table
        clonedRows.forEach(function (row) {
            destinationTable.querySelector("tbody").appendChild(row);
        });
    });
});


// ??????????????????
document.addEventListener("DOMContentLoaded", function () {
    // Add an event listener to the form submission
    document.getElementById("form1").addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent the default form submission

        // Get the values from the form fields
        var formInputs = document.getElementById("form1").elements;

        // Get the source table
        var sourceTable = document.querySelector(".table-crud");

        // Get the destination table
        var destinationTable = document.getElementById("table-add-visitors");

        // Clone the rows from the source table based on form field values
        var clonedRows = [];
        sourceTable.querySelectorAll("tr").forEach(function (row) {
            var match = true;

            // Check if the values in the row match the form field values
            Array.from(formInputs).forEach(function (input) {
                var fieldName = input.name;
                var fieldValue = input.value;

                // Handle both input and select elements in the row
                var rowFieldElement = row.querySelector("input[name='" + fieldName + "'], select[name='" + fieldName + "']");
                var rowValue = rowFieldElement ? rowFieldElement.value : null;

                // If either the form field value or row value is not null and they are different, set match to false
                if ((fieldValue || rowValue) && fieldValue !== rowValue) {
                    match = false;
                }
            });

            if (match) {
                clonedRows.push(row.cloneNode(true));
            }
        });

        // Append the cloned rows to the destination table
        clonedRows.forEach(function (row) {
            destinationTable.querySelector("tbody").appendChild(row);
        });
        
    });
});

// 
// function submitAndRenderOld() {
//     var form = document.querySelector("#form1");
//     var formData = new FormData(form);

//     var xhr = new XMLHttpRequest();
//     xhr.open("POST", form.action, true);
//     xhr.setRequestHeader("X-CSRFToken", "{{ csrf_token }}");
    
//     xhr.onreadystatechange = function () {
//         if (xhr.readyState === 4) {
//              if (xhr.status === 200) {
//                 var response = JSON.parse(xhr.responseText);
//                 if (response.valid) {
//                     // Form is valid, proceed with rendering or additional actions
//                      renderTable();
                    
//                 } else {
//                     // Form is not valid, display the error message to the user
//                     document.getElementById("error-message").innerHTML = response.error_message;
//                 }
//             } else {
//                 // Handle other status codes or errors
//                 console.error("Error in form submission");
//             }
//         }
//     };

//     xhr.send(formData);
// }



// llllllllllll
class VisitorApp {
    constructor() {
        this.addedRowsData = [];
        this.init();
    }

    init() {
        this.updateClock();
        setInterval(() => this.updateClock(), 60000);
        this.createUpdateDesTable();

        document.getElementById("form1").addEventListener("submit", (event) => {
            event.preventDefault();
            document.getElementById("is_ajax").value = "1";
            this.submitAndRender();
            document.getElementById("is_ajax").value = "0";
        });

        document.getElementById("save-visitor").addEventListener("click", (event) => {
            event.preventDefault();
            this.saveVisitor();
        });

        document.getElementById('table-add-visitors').addEventListener("click", this.handleTableClick.bind(this));
    }

    handleTableClick(event) {
        if (event.target.classList.contains('delete-link')) {
            this.removeItemDisTable(event);
            
        }
    }

    removeItemDisTable(event) {
        const rowIndex = event.target.closest('tr').rowIndex;
        this.addedRowsData.splice(rowIndex - 1, 1);
        event.target.closest('tr').remove();
        this.createUpdateDesTable();
    }

    updateClock() {
        var now = new Date();
        var hours = now.getHours();
        var minutes = now.getMinutes();
        hours = hours < 10 ? '0' + hours : hours;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var timeString = hours + ':' + minutes;
        document.getElementById('clock').value = timeString;
    }

    createUpdateDesTable() {
        const saveVisitor = document.querySelector('#save-visitor');
        const tbody = document.querySelector("#table-add-visitors").querySelector('tbody');
        const hasRecord = tbody.children.length > 0;

        if (saveVisitor) {
            saveVisitor.disabled = !hasRecord;
        }
    }

    submitAndRender() {
        // ... (your existing code)
    }

    saveVisitor() {
        // ... (your existing code)
    }

    retritiveSelectItemGate(gateName) {
        // ... (your existing code)
    }

    renderTable() {
        // ... (your existing code)
    }
}

// Instantiate the class when the DOM content is loaded
document.addEventListener('DOMContentLoaded', () => {
    const visitorApp = new VisitorApp();
});

// LLLLLLLLLLLLLLLLLLLLLLLL
saveVisitor() {
    const bodyInfo = new FormData();
    const is_ajax_value = document.getElementById("is_ajax").value;
    const currentDate=new Date();
    bodyInfo.append("is_ajax", is_ajax_value);
    // bodyInfo.append("time_is",currentDate),

    this.addedRowsData.forEach((value, index) => {
        for (const key in value) {
            if (key === "gate") {
                value[key] = this.retritiveSelectItemGate(value[key]);
            }
            bodyInfo.append(key, value[key]);
        }
    });
    // 
    
    // 


    console.log(bodyInfo)
    const form = document.querySelector('#myForm');
    const getUrl = form.action;
    const csrfTokenForm2 = form.querySelector('[name="csrfmiddlewaretoken"]').value;

    fetch(getUrl, {
        method: 'POST',
        headers: {
            'X-CSRFToken': csrfTokenForm2,
        },
        body: bodyInfo,
    })
    .then(response => response.json())
    .then(data => {
        if (data.valid) {
            if (data.redirect_url) {
                window.location.href = data.redirect_url;
            } else {
                console.log('Data sent successfully:', data);
            }
        } else {
            console.error('Invalid data:', data);
        }
    })
    .catch(error => {
        console.error('Error sending data:', error);
    });
}