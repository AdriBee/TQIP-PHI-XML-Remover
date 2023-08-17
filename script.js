function parseXML(xmlString) {
    const parser = new DOMParser();
    return parser.parseFromString(xmlString, 'text/xml');
}

function serializeXML(xmlDocument) {
    const serializer = new XMLSerializer();
    return serializer.serializeToString(xmlDocument);
}

let xmlDoc = null;
let modifiedXML = '';

function loadAndDisplayColumns() {
    const fileInput = document.getElementById('xmlInput');
    const fileNameDisplay = document.getElementById('chosenFileName');
    const reader = new FileReader();

    reader.onload = function(event) {
        xmlDoc = parseXML(event.target.result);
        const autoRemoveDiv = document.getElementById('autoRemoveList');
        const showColumns = document.getElementById('showColumnsDiv');

        const tagsToRemove = ["LastModifiedDateTime", "FacilityId", "PatientId", "HomeZip", "HomeCountry", "HomeCity", "HomeState", "HomeCounty", "HomeResidences", "DateOfBirth", "Age", "AgeUnits", "IncidentDate", "IncidentTime", "PlaceOfInjuryCode", "InjuryZip", "IncidentCountry", "IncidentCity", "IncidentState", "IncidentCounty", "HospitalArrivalDate", "HospitalArrivalTime", "TraumaSurgeonArrivalDate", "TraumaSurgeonArrivalTime", "PatientUUID", "EdDischargeDate", "EdDischargeTime", "HospitalDischargeDate", "HospitalDischargeTime", "WithdrawalOfLifeSupportingTreatmentDate", "WithdrawalOfLifeSupportingTreatmentTime", "NationalProviderIdentifier" ]; // Replace with your desired tags

        // Extract unique element names from the XML
        const allElements = xmlDoc.getElementsByTagName('*');
        const uniqueElementNames = [...new Set(Array.from(allElements).map(el => el.nodeName))];

        // Create checkboxes for each unique element name
        const container = document.getElementById('columnsContainer');
        container.innerHTML = '';
        let removedColumns = []
        for (const name of uniqueElementNames) {
            const checkboxDiv = document.createElement('div'); // Create a new div for each checkbox-label pair
            checkboxDiv.classList.add('checkboxItem'); // Add a class for styling
        
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.value = name;
            checkbox.id = 'checkbox_' + name;
            if (tagsToRemove.some(item => item.toLowerCase() === name.toLowerCase())){
                checkboxDiv.style.backgroundColor = 'yellow'
                checkbox.checked = true
                checkbox.disabled = true
                removedColumns.push(name)
            }
        
            const label = document.createElement('label');
            label.htmlFor = 'checkbox_' + name;
            label.textContent = name;
        
            checkboxDiv.appendChild(checkbox);  // Append checkbox to the div
            checkboxDiv.appendChild(label);     // Append label to the div
            container.appendChild(checkboxDiv); // Append the div to the container
        }
        autoRemoveDiv.textContent = 'Automatically Selected Columns to be DELETED: ' + removedColumns.join(', ');
        autoRemoveDiv.style.display = 'block';  // Make it visible
        showColumns.style.display = 'block';
        
        fileNameDisplay.textContent = ` (${fileInput.files[0].name})`;
    }

    reader.readAsText(fileInput.files[0]);
}

function toggleColumnsContainer() {
  var columnsContainer = document.getElementById("columnsContainer");
  var showColumnsCheckbox = document.getElementById("showColumnsCheckbox");

  if (showColumnsCheckbox.checked) {
    columnsContainer.style.display = "block";
  } else {
    columnsContainer.style.display = "none";
  }
}


function nodeToTable(node) {
    // Base case: if the node is a text node and has non-whitespace content, return its text
    if (node.nodeType === 3 && node.nodeValue.trim() !== '') {
        const container = document.createElement('span');
        container.textContent = node.nodeValue.trim();
        return container;
    }

    const table = document.createElement('table');
    const tbody = document.createElement('tbody');
    table.appendChild(tbody);

    for (const child of node.children) {
        const row = document.createElement('tr');
        const headerCell = document.createElement('th');
        headerCell.textContent = child.nodeName;
        const contentCell = document.createElement('td');

        contentCell.appendChild(nodeToTable(child)); // Recursion

        row.appendChild(headerCell);
        row.appendChild(contentCell);
        tbody.appendChild(row);
    }

    return table;
}

function removeSelectedColumns() {
    if (!xmlDoc) return;

    const checkboxes = document.querySelectorAll('#columnsContainer input[type="checkbox"]:checked');
    checkboxes.forEach(checkbox => {
        const elements = xmlDoc.getElementsByTagName(checkbox.value);
        while (elements.length > 0) {
            elements[0].parentNode.removeChild(elements[0]);
        }
    });

    updateSuccessMessage(checkboxes);
    // updateModifiedColumnsList();

    // const table = nodeToTable(xmlDoc);
    // const outputDiv = document.getElementById('output');
    // outputDiv.innerHTML = ''; // Clear previous content

    // if (table) {
    //     outputDiv.appendChild(table);
    // } else {
    //     outputDiv.textContent = 'No valid rows to display.';
    // }

    modifiedXML = serializeXML(xmlDoc);
}

function updateSuccessMessage(checkboxes) {
    const successMessageDiv = document.getElementById('successMessage');
    if (checkboxes.length > 0) {
        const removedColumns = Array.from(checkboxes).map(checkbox => checkbox.value);
        successMessageDiv.textContent = 'Removed Columns: ' + removedColumns.join(', ');
        successMessageDiv.style.display = 'block';  // Make it visible
    } else {
        successMessageDiv.textContent = 'No columns selected for removal.';
        successMessageDiv.style.display = 'block';  // Make it visible
    }
}


function updateModifiedColumnsList() {
    const allElements = xmlDoc.getElementsByTagName('*');
    const uniqueElementNames = [...new Set(Array.from(allElements).map(el => el.nodeName))];
    
    const columnsList = document.getElementById('modifiedColumnsList');
    columnsList.innerHTML = ''; // Clear previous columns
    for (const name of uniqueElementNames) {
        const listItem = document.createElement('li');
        listItem.textContent = name;
        columnsList.appendChild(listItem);
    }
}



function download() {
    const text = serializeXML(xmlDoc);
    const blob = new Blob([modifiedXML], {type: 'text/xml'});
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'modified.xml';
    a.click();

    URL.revokeObjectURL(url);
}
