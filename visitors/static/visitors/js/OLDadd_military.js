// document.addEventListener('DOMContentLoaded',updateClock)
updateClock();
setInterval(updateClock, 60000);
createUpdateDesTable();
const addedRowsData = [];
document.getElementById("form1").addEventListener("submit", function(event) {
    event.preventDefault();  // Prevent the default form submission behavior
    document.getElementById("is_ajax").value = "1";
    submitAndRender();
    document.getElementById("is_ajax").value = "0"
});


document.getElementById("save-visitor").addEventListener("click", function (event) {
    event.preventDefault();
    // console.log(addedRowsData);

    const bodyInfo = new FormData();
    const is_ajax_value=document.getElementById("is_ajax").value
    bodyInfo.append("is_ajax", is_ajax_value);
    addedRowsData.forEach((value, index) => {
        // Assuming `value` is an object with key-value pairs
        for (const key in value) {
            // bodyInfo.append(`row${index}_${key}`, value[key]);
            if(key==="gate"){
                    value[key]=retritiveSelectItemGate(value[key])
            } 
            bodyInfo.append(key, value[key]);
        }
    });
    retritiveSelectItemGate()
    console.log(bodyInfo);

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
                    console.log(data.redirect_url)
                    // Redirect to the specified URL
                    window.location.href = data.redirect_url;
                } else {
                    // Handle other actions for a successful response
                    console.log('Data sent successfully:', data);
                }
            } else {
                // Handle case where data.valid is false
                console.error('Invalid data:', data);
            }
        })
        .catch(error => {
            console.error('Error sending data:', error);
        });
});
// Retritive from Gate Select
function retritiveSelectItemGate(gateName){
    const selectGate=document.querySelector('#id_gate');
    const keyValueArray=[];
    for (let i=0 ;i<selectGate.options.length;i++){
        let option=selectGate.options[i]
        let key1=option.value;
        let value1=option.text;
        //keyValue.append(key,value);
        let keyValue={
            key:key1,
            value:value1
        }
        keyValueArray.push(keyValue);
    }
    const foundElement=keyValueArray.find((value)=>{
       return value.value.includes(gateName);
    })
    const codeGate=foundElement ?foundElement.key :null;
    return codeGate;
}
// End Retritive from Gate Select

// New
function submitAndRender() {
    var form = document.querySelector("#form1");
    var formData = new FormData(form);

    fetch(form.action, {
        method: 'POST',
        headers: {
            'X-CSRFToken': "{{ csrf_token }}",
        },
        body: formData,
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error in form submission. Status: ${response.status}`);
        }
        return response.json();
    })
    .then(response => {
        if (response.valid) {
            // Form is valid, proceed with rendering or additional actions
            renderTable();
        } else {
            // Form is not valid, display the error message to the user
            document.getElementById("error-message").innerHTML = response.error_message;
        }
    })
    .catch(error => {
        // Handle errors during the fetch
        console.error(error);
    });
}



 
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
                   
                    // if ((rowFieldElement.type === 'select-one')){
                    //     console.log(rowFieldElement.selectedOptions[0].textContent);
                    // }
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

