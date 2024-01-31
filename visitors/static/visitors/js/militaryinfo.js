// $(function(){
//     // Your jQuery code goes here
//     $("#openPopup").click(function(){
//         var currentWindowX = window.screenX || window.screenLeft;
//         var currentWindowY = window.screenY || window.screenTop;

//         // Calculate the new position relative to the current window
//         var newX = currentWindowX + 100;  // adjust as needed
//         var newY = currentWindowY + 100;  // adjust as needed

//         // Customize the appearance of the popup window
//         // var popupFeatures = "width=150, height=150, top=" + newY + ", left=" + newX + ", location=no, menubar=no, status=no, titlebar=no";
//         var popupFeatures = "width=150, height=150, top=50%" + ", left=50%" + ", location=no, menubar=no, status=no, titlebar=no";

//         // Open a new window with the specified features
//         var popup = window.open("", "Popup", popupFeatures);

//         // Load the content into the new window
//         $(popup.document.body).load("{% url 'visitors:partial_form_view' %}");
//     });
// });

// document.addEventListener("DOMContentLoaded", function() {
//     // Attach click event listener to each button
//     document.querySelectorAll(".openModalBtn").forEach(function(button) {
//         button.addEventListener("click", function() {
//             // Extract the target modal id from the data attribute
//             var targetModalId = button.getAttribute("data-target");

//             // Show the corresponding modal
//             document.getElementById(targetModalId).style.display = "block";
//         });
//     });

//     // Attach click event listener to each close button
//     document.querySelectorAll(".closeModalBtn").forEach(function(button) {
//         button.addEventListener("click", function() {
//             // Hide the parent modal
//             button.closest(".custom-modal").style.display = "none";
//         });
//     });
// });

// &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
// document.addEventListener("DOMContentLoaded", function() {
//     document.querySelector(".openModalBtn").addEventListener("click", function() {
//         var modalId = this.getAttribute("data-target");
//         var modal = document.getElementById(modalId);
//         console.log(modal)

//         // Fetch services data and update the dropdown when the modal is shown
//         fetchServicesData(modalId);

//         // Calculate the position relative to the button
//         var buttonRect = this.getBoundingClientRect();
//         modal.style.top = buttonRect.top + window.scrollY + "px";
//         modal.style.left = buttonRect.left + window.scrollX + "px";

//         modal.style.display = "block";
//     });

//     document.querySelectorAll(".closeModalBtn").forEach(function(button) {
//         button.addEventListener("click", function() {
//             button.closest(".custom-modal").style.display = "none";
//         });
//     });
// });

// function fetchServicesData(modalId) {
//     // Fetch services data from the server
//     const url=document.getElementById('yourElement').dataset.url;//"{% url 'visitors:partial_form_view' %}"
    
//     fetch(url)
//         .then(response => response.json())
//         .then(data => {
//             // Update the dropdown options
//             var dropdown = document.getElementById("serviceDropdown" + modalId.slice(-1));
//             console.log(dropdown)
//             dropdown.innerHTML = ""; // Clear existing options

//             // Add options based on the fetched data
//             data.forEach(service => {
//                 var option = document.createElement("option");
//                 option.value = service.pk; // Assuming 'pk' is the primary key field
//                 option.textContent = service.fields.name; // Adjust based on your model structure
//                 dropdown.appendChild(option);
//             });
//         })
//         .catch(error => {
//             console.error('Error fetching services:', error);
//         });
// }
//**************************************************** */
// militaryinfo.js
document.addEventListener("DOMContentLoaded", function() {
    var activeModal = null;

    document.querySelectorAll(".openModalBtn").forEach(function(button) {
        button.addEventListener("click", function() {
            var modalId = this.getAttribute("data-target");
            var modal = document.getElementById(modalId);

            // Close the currently active modal (if any)
            if (activeModal) {
                activeModal.style.display = "none";
            }

            // Fetch checkbox data and update the form when the modal is shown
            fetchCheckboxData(modalId);

            // Calculate the position relative to the button
            var buttonRect = this.getBoundingClientRect();
            modal.style.top = buttonRect.top + window.scrollY + "px";
            modal.style.left = buttonRect.left + window.scrollX + "px";

            modal.style.display = "block";

            // Set the currently active modal
            activeModal = modal;
        });
    });

    document.querySelectorAll(".closeModalBtn").forEach(function(button) {
        button.addEventListener("click", function() {
            if (activeModal) {
                activeModal.style.display = "none";
                activeModal = null;
            }
        });
    });

    function fetchCheckboxData(modalId) {
        // Fetch checkbox data from the server
        const url = document.getElementById('yourElement').dataset.url;
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                const dataArray = Array.isArray(data) ? data : [data];
                var form = document.getElementById("checkboxForm" + modalId.slice(-1));
                form.innerHTML = ""; // Clear existing checkboxes

                dataArray.forEach(checkboxItem => {
                    var checkbox = document.createElement("input");
                    checkbox.type = "checkbox";
                    checkbox.name = "checkboxName"; // Adjust based on your needs
                    checkbox.value = checkboxItem.id; // Adjust based on your model structure
                    checkbox.id = "checkboxId" + checkboxItem.id; // Adjust based on your model structure

                    var label = document.createElement("label");
                    label.htmlFor = checkbox.id;

                    if (typeof checkboxItem.name !== 'undefined') {
                        label.appendChild(document.createTextNode(checkboxItem.name));
                    } else {
                        var defaultName = "Default Name"; // Adjust based on your needs
                        console.error(`Invalid data format. 'name' property is undefined. Using default name: ${defaultName}`);
                        label.appendChild(document.createTextNode(defaultName));
                    }

                    form.appendChild(checkbox);
                    form.appendChild(label);
                    form.appendChild(document.createElement("br")); // Line break between checkboxes
                });
            })
            .catch(error => {
                console.error('Error fetching checkboxes:', error);
            });
    }
});

