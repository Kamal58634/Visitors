class VisitorApp {
    constructor() {
        this.addedRowsData = [];
        this.init();
        // const divElement = document.querySelector('[data-img-src]');
        // this.imgSrc = divElement ? divElement.getAttribute('data-img-src') : null;
    
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
        if (event.target.classList.contains('fa-trash-alt')) {
            
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
                this.renderTable();
            } else {
                document.getElementById("error-message").innerHTML = response.error_message;
            }
        })
        .catch(error => {
            console.error(error);
        });
    }
//saveVisitor
saveVisitor() {
    const form = document.querySelector('#myForm');
    const is_ajax_value = document.getElementById("is_ajax").value;
    const currentDate = new Date();

    const jsonData = {
        is_ajax: is_ajax_value,
        // Add other properties as needed
        rows: [],
    };

    this.addedRowsData.forEach((value, index) => {
        const rowObject = {};

        for (const key in value) {
            if (key === "gate") {
                value[key] = this.retritiveSelectItemGate(value[key]);
            }
            rowObject[key] = value[key];
        }

        jsonData.rows.push(rowObject);
    });

    const csrfToken = document.querySelector('[name="csrfmiddlewaretoken"]').value;

    fetch(form.action, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken,
        },
        body: JSON.stringify(jsonData),
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

// 
 

    retritiveSelectItemGate(gateName) {
        const selectGate = document.querySelector('#id_gate');
        const keyValueArray = [];

        for (let i = 0; i < selectGate.options.length; i++) {
            let option = selectGate.options[i];
            let key1 = option.value;
            let value1 = option.text;
            let keyValue = {
                key: key1,
                value: value1
            };
            keyValueArray.push(keyValue);
        }

        const foundElement = keyValueArray.find((value) => {
            return value.value.includes(gateName);
        });

        const codeGate = foundElement ? foundElement.key : null;
        return codeGate;
    }

    renderTable() {
        const form = document.getElementById("form1");
        const formInputs = document.getElementById("form1").elements;
        const sourceTable = document.querySelector("#sourceTable");
        const destinationTable = document.getElementById("table-add-visitors");
        const clonedRows = [];
        const newclone = {};

        sourceTable.querySelectorAll("tr").forEach((row) => {
            let match = true;

            Array.from(formInputs).forEach((input) => {
                if (input.type !== 'submit' && input.name !== "csrfmiddlewaretoken" && input.name !== "is_ajax") {
                    let fieldName = input.name;
                    let fieldValue = input.value;
                    let rowFieldElement = row.querySelector(`input[name=${fieldName}], select[name=${fieldName}]`);

                    if (rowFieldElement) {
                        let rowValueO = rowFieldElement.value;

                        if (fieldValue !== rowValueO) {
                            match = false;
                        }

                        let rowValue = (rowFieldElement.type === 'select-one') ? rowFieldElement.selectedOptions[0].textContent : rowFieldElement.value;
                        newclone[`${fieldName}`] = rowValue;
                    }
                }
            });

            if (match) {
                clonedRows.push(row.cloneNode(true));
            }
        });

        this.addedRowsData.push(newclone);
        
        const newTBodyRow = document.createElement('tr');
        // const newTHeadRow = document.createElement('tr');

        // for (let key of Object.keys(newclone)) {
        //     let newTh = document.createElement('th');
        //     newTh.textContent = key.charAt(0).toUpperCase()+key.slice(1);//key.slice(0,1).toUpperCase()+key.slice(1)
        //     newTHeadRow.appendChild(newTh);
        // }

        // var thead = destinationTable.querySelector("thead");
        // thead.innerHTML = '';
        // thead.appendChild(newTHeadRow);

        for (let value of Object.values(newclone)) {
            let newTd = document.createElement('td');
            newTd.textContent = value;
            newTBodyRow.appendChild(newTd);
            
        }
        console.log(newclone)
        const btnDelete=document.createElement('td');
        // const imgSrc = staticUrl + 'visitors/img/delete-svgrepo-com.svg';
        
        btnDelete.appendChild(this.createItem());//('<a href="#" class="delete-link"><i class="fas fa-star"></i></a>');
        newTBodyRow.appendChild(btnDelete);

        var tbody = destinationTable.querySelector("tbody");
        tbody.appendChild(newTBodyRow);

        const fullName = document.getElementById('id_full_name');
        fullName.value = '';
        document.getElementById('id_contact').value = '';

        const firstInput = form.querySelector('input:not([type="hidden"]),select');
        if (firstInput) {
            fullName.focus();
        }
        this.createUpdateDesTable();
    }
    createItem(){
        const iconElement = document.createElement('i');
        iconElement.classList.add('fas', 'fa-trash-alt');

        // Create an <a> element
        const anchorElement = document.createElement('a');
        anchorElement.href = '#';
        anchorElement.classList.add('delete-link');

        // Append the icon to the <a> element
        
        anchorElement.appendChild(iconElement);
        console.log(anchorElement)
        return anchorElement
    }
    
}

// Instantiate the class when the DOM content is loaded
document.addEventListener('DOMContentLoaded', () => {
    const visitorApp = new VisitorApp();
});

