
# TQIP PHI XML Remover

This tool is designed to clean Protected Health Information (PHI) from XML files, specifically targeting Trauma Quality Improvement Program (TQIP) files. It runs entirely offline within your web browser, ensuring that data remains local and secure.

## Features

- **Automatic PHI Field Removal**: Pre-selects known sensitive fields for removal.
- **Customizable Field Removal**: Manually select additional fields to remove.
- **Offline Execution**: Runs locally in the browser without requiring an internet connection.
- **XML Export**: Saves the cleaned XML file directly to your computer.

## Requirements

- A modern web browser (e.g., Google Chrome, Firefox, Safari, Edge).
- No internet connection required.

## Download and Setup

1. **Download the Files**: Click on the repository's `Download ZIP` button or clone the repository to your local machine:
   ```bash
   git clone https://github.com/your-username/xml-phi-removal-tool.git
   ```
2. **Extract and Navigate to the Files**:
   - If downloaded as a ZIP, extract the files to a folder on your computer.
   - Ensure you have all the necessary files: `index.html`, `script.js`, `styles.css`.

## Running the Tool

1. **Open the HTML File**:
   - Navigate to the folder where you downloaded/extracted the tool.
   - Double-click on `index.html` to open it in your default web browser. 
   - Alternatively, you can right-click and select **Open with** > **Browser Name**.

2. **Using the Tool**:
   - **Step 1**: Click **Choose File** to upload your XML file.
   - **Step 2**: The tool will parse the XML and display all unique fields as checkboxes. PHI-related fields will be automatically selected and highlighted.
   - **Step 3**: Optionally, select or deselect additional fields you want to remove.
   - **Step 4**: Click **Remove Selected Columns** to clean the XML file.
   - **Step 5**: Click the **Download** button to save the modified XML file to your computer.

3. **Save the Modified XML File**:
   - After processing, click **Download Cleaned XML File** to save the updated file locally.
   - The file will be saved as `modified.xml`.

## Troubleshooting

- **File Not Loading**: Ensure you are uploading a valid XML file.
- **Browser Compatibility**: Use a modern browser. Outdated browsers may not support all JavaScript features.
- **Display Issues**: Refresh the page or clear your browser cache if elements aren't displaying correctly.

## Security Considerations

This tool is designed to run offline and keep all data local, which helps secure sensitive data by preventing transmission over the internet. However, ensure that you store and manage your files securely after using the tool.
