// document.addEventListener('DOMContentLoaded',updateClock)
updateClock();
setInterval(updateClock, 60000);
createUpdateDesTable();
document.getElementById("form1").addEventListener("submit", function(event) {
    event.preventDefault();  // Prevent the default form submission behavior
    document.getElementById("is_ajax").value = "1";
    submitAndRender();
});


function submitAndRender() {
    var form = document.querySelector("#form1");
    var formData = new FormData(form);

    var xhr = new XMLHttpRequest();
    xhr.open("POST", form.action, true);
    xhr.setRequestHeader("X-CSRFToken", "{{ csrf_token }}");
    
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
             if (xhr.status === 200) {
                var response = JSON.parse(xhr.responseText);
                if (response.valid) {
                    // Form is valid, proceed with rendering or additional actions
                     renderTable();
                    
                } else {
                    // Form is not valid, display the error message to the user
                    document.getElementById("error-message").innerHTML = response.error_message;
                }
            } else {
                // Handle other status codes or errors
                console.error("Error in form submission");
            }
        }
    };

    xhr.send(formData);
}

const addedRowsData = [];
 
function renderTable() {
    const form=document.getElementById("form1");
    var formInputs = document.getElementById("form1").elements;
    var sourceTable = document.querySelector(".table-crud");
    var destinationTable = document.getElementById("table-add-visitors");
    var clonedRows = [];
    var newclone={};
    sourceTable.querySelectorAll("tr").forEach(function (row) {
        var match = true;

        Array.from(formInputs).forEach(function (input) {
            if (input.type !== 'submit' && input.name !== "csrfmiddlewaretoken" && input.name !== "is_ajax") {
                var fieldName = input.name.replace(":","");
                // var fieldName  =fieldName.replace(":","");
                var fieldValue = input.value;

                var rowFieldElement = row.querySelector(`input[name=${fieldName}], select[name=${fieldName}]`);

                if (rowFieldElement) {
                    console.log(rowFieldElement.type)
                    if ((rowFieldElement.type === 'select-one')){
                        console.log(rowFieldElement.selectedOptions[0].textContent);
                    }
                    if(rowFieldElement){
                        // console.log("HHHHHHIIIIII");
                        var rowValueO=rowFieldElement.value;
                    }

                    if (fieldValue !== rowValueO) {
                        match = false;
                    }
                    var rowValue = (rowFieldElement.type === 'select-one') ? rowFieldElement.selectedOptions[0].textContent : rowFieldElement.value;
                    newclone[`${fieldName}`]=rowValue;
                }
            }
        });

        if (match) {
            clonedRows.push(row.cloneNode(true));
            }
    });
    addedRowsData.push(newclone);
    const newTBodyRow = document.createElement('tr');

            const newTHeadRow = document.createElement('tr');
            for (let key of Object.keys(newclone)) {
                let newTh = document.createElement('th');
                newTh.textContent = key;
                newTHeadRow.appendChild(newTh);
            }

            // Append thead row to the destination table
            var thead = destinationTable.querySelector("thead");
            thead.innerHTML = ''; // Clear existing content
            thead.appendChild(newTHeadRow);

            // Create tbody row
            
            for (let value of Object.values(newclone)) {
                let newTd = document.createElement('td');
                newTd.textContent = value;
                newTBodyRow.appendChild(newTd);
            }
           
    // }
    
    var tbody = destinationTable.querySelector("tbody");
    // tbody.innerHTML = ''; // Clear existing content
    tbody.appendChild(newTBodyRow);
    
    // form.reset()
    const fullName=document.getElementById('id_full_name');
    fullName.value='';
    document.getElementById('id_contact').value='';        
    
    const firstInput=form.querySelector('input:not([type="hidden"]),select');
    if(firstInput){
        fullName.focus()
        //firstInput.focus();
    }
    createUpdateDesTable()
}
// Create Update Desination Table
function createUpdateDesTable(){
    const saveVisitor=document.querySelector('#save-visitor');
    const tbody = document.querySelector("#table-add-visitors").querySelector('tbody');
    const hasRecord=tbody.children.length>0
    console.log(hasRecord)
    console.log(tbody)
    console.log(saveVisitor)
    if (saveVisitor){
        saveVisitor.disabled= !hasRecord;
    }
    
}
// End Create Update Desination Table


// End New test
function updateClock() {
    var now = new Date();
    var hours = now.getHours();
    var minutes = now.getMinutes();
    // var seconds = now.getSeconds();

    // Add leading zero if needed
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;

    var timeString = hours + ':' + minutes;

    // Update the value of the input element
    document.getElementById('clock').value = timeString;
}

// Update the clock initially and set an interval to update it every second
// 

